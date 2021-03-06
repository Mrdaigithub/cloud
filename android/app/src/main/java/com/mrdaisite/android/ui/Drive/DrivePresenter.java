/*
 * MIT License
 *
 * Copyright (c) 2017 Mrdai
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package com.mrdaisite.android.ui.Drive;

import android.Manifest;
import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v4.app.FragmentActivity;

import com.mrdaisite.android.MyApplication;
import com.mrdaisite.android.R;
import com.mrdaisite.android.data.model.Preprocess;
import com.mrdaisite.android.data.model.Resource;
import com.mrdaisite.android.data.model.Resource_;
import com.mrdaisite.android.data.model.Uploading;
import com.mrdaisite.android.data.model.User;
import com.mrdaisite.android.data.sources.remote.ApiService;
import com.mrdaisite.android.ui.CommonPresenter;
import com.mrdaisite.android.util.CallbackUnit;
import com.mrdaisite.android.util.HttpCallBackWrapper;
import com.mrdaisite.android.util.StreamFileReader;
import com.mrdaisite.android.util.schedulers.BaseSchedulerProvider;

import org.greenrobot.essentials.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import io.objectbox.Box;
import io.reactivex.Observable;
import io.reactivex.ObservableSource;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;
import io.reactivex.functions.Function;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import pub.devrel.easypermissions.AfterPermissionGranted;
import pub.devrel.easypermissions.EasyPermissions;
import pub.devrel.easypermissions.PermissionRequest;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.mrdaisite.android.util.Constants.REQUEST_CODE_READ_EXTERNAL_STORAGE;

public class DrivePresenter extends CommonPresenter implements DriveContract.Presenter {

    private ApiService mApiService = MyApplication.getInstance().getApiService();
    private Box<User> mUserBox = MyApplication.getInstance().getBoxStore().boxFor(User.class);
    private Box<Resource> mResourceBeanBox = MyApplication.getInstance().getBoxStore().boxFor(Resource.class);
    private int progressVal;

    @NonNull
    private final DriveContract.View mDriveView;

    @NonNull
    private final BaseSchedulerProvider mSchedulerProvider;

    DrivePresenter(DriveFragment driveFragment, BaseSchedulerProvider schedulerProvider) {
        mDriveView = checkNotNull(driveFragment);
        mDriveView.setPresenter(this);
        mSchedulerProvider = checkNotNull(schedulerProvider);
    }

    @Override
    public void subscribe() {
        User userInfo = mUserBox.query().build().findFirst();
        mDriveView.setProfileUsername(Objects.requireNonNull(userInfo).getUsername());
        mDriveView.setProfileEmail(Objects.requireNonNull(userInfo).getEmail());
    }

    @Override
    public void unsubscribe() {

    }

    @Override
    public void mkdir(String newDirName, CallbackUnit callbackUnit) {
        mApiService.mkdir(DriveFragment.path, newDirName)
                .subscribeOn(mSchedulerProvider.io())
                .observeOn(mSchedulerProvider.ui())
                .subscribe(new HttpCallBackWrapper<Resource>() {
                    @Override
                    public void onBegin(Disposable d) {

                    }

                    @Override
                    public void onSuccess(Resource resource) {
                        mResourceBeanBox.put(resource);
                        callbackUnit.callbackFunc(null);
                    }

                    @Override
                    public void onError(String msg) {

                    }
                });
    }

    @Override
    public void renameResource(long resourceId, String newResourceNameText, CallbackUnit callbackUnit) {
        mApiService.renameResource(resourceId, newResourceNameText)
                .subscribeOn(mSchedulerProvider.io())
                .observeOn(mSchedulerProvider.ui())
                .subscribe(new HttpCallBackWrapper<Resource>() {
                    @Override
                    public void onBegin(Disposable d) {
                    }

                    @Override
                    public void onSuccess(Resource resource) {
                        mResourceBeanBox.put(resource);
                        callbackUnit.callbackFunc(null);
                    }

                    @Override
                    public void onError(String msg) {
                        com.orhanobut.logger.Logger.e(msg);
                    }
                });
    }

    @Override
    public void removeResources(List<Long> resourceIdList, CallbackUnit callbackUnit) {
        Observable observable = Observable.fromArray(resourceIdList.toArray(new Long[0]))
                .subscribeOn(mSchedulerProvider.io())
                .flatMap((Function<Long, ObservableSource<?>>) id -> mApiService.trashedResource(id))
                .observeOn(mSchedulerProvider.ui());

        observable.subscribe(new Observer<Resource>() {
            @Override
            public void onSubscribe(Disposable d) {

            }

            @Override
            public void onNext(Resource resource) {
                mResourceBeanBox.put(resource);
            }

            @Override
            public void onError(Throwable e) {

            }

            @Override
            public void onComplete() {
                callbackUnit.callbackFunc(null);
            }
        });
    }

    @AfterPermissionGranted(REQUEST_CODE_READ_EXTERNAL_STORAGE)
    public void requestReadExternalStoragePermission(FragmentActivity fragmentActivity,
                                                     Context context) {
        if (EasyPermissions.hasPermissions(context, Manifest.permission.READ_EXTERNAL_STORAGE)) {
            mDriveView.toSystemFileExplorer();
        } else {
            EasyPermissions.requestPermissions(
                    new PermissionRequest.Builder(fragmentActivity, REQUEST_CODE_READ_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE)
                            .setRationale(R.string.upload_need_read_write_external_storage)
                            .setPositiveButtonText(R.string.ok)
                            .setNegativeButtonText(R.string.cancel)
                            .build()
            );
        }
    }

    @Override
    public void handleUpload(String filepath) {
        File f = new File(filepath);
        boolean isAdmin = mUserBox.getAll().get(0).isIsAdmin();
        long capacity = mUserBox.getAll().get(0).getCapacity();
        long used = mUserBox.getAll().get(0).getUsed();

        if (mResourceBeanBox.query()
                .equal(Resource_.path, DriveFragment.path)
                .equal(Resource_.trashed, false)
                .equal(Resource_.resourceName, f.getName())
                .build().find().size() > 0) {
            mDriveView.showMessage("在当前目录下已有同名文件");
            return;
        }
        if (!isAdmin && f.length() + used >= capacity) {
            mDriveView.showMessage("存储容量不足");
            return;
        }
        preprocess(f);
    }

    /**
     * 预处理上传文件 (判断秒传)
     *
     * @param f
     */
    private void preprocess(File f) {
        String filename = f.getName();
        long fileSize = f.length();
        String fileHash = null;
        String locale = "zh";
        String group = "file";
        String path = DriveFragment.path;

        try {
            fileHash = FileUtils.getMd5(f).toLowerCase();
        } catch (IOException e) {
            mDriveView.showMessage("文件Hash计算失败");
            e.printStackTrace();
            return;
        }

        mApiService.preprocess(filename, fileSize, fileHash, locale, group, path)
                .subscribeOn(mSchedulerProvider.io())
                .observeOn(mSchedulerProvider.ui())
                .subscribe(new HttpCallBackWrapper<Preprocess>() {
                    @Override
                    public void onBegin(Disposable d) {
                        mDriveView.showUploadProgressDialog();
                    }

                    @Override
                    public void onSuccess(Preprocess preprocess) {
                        if (preprocess.getSavedPath().equals("")) {
                            long chunkSize = preprocess.getChunkSize();
                            String uploadBaseName = preprocess.getUploadBaseName();
                            String uploadExt = preprocess.getUploadExt();
                            String subDir = preprocess.getSubDir();

                            try {
                                uploadChunk(f, chunkSize, uploadBaseName, uploadExt, subDir);
                            } catch (IOException e) {
                                mDriveView.showMessage("上传文件失败");
                                e.printStackTrace();
                                return;
                            }
                        } else {
                            mDriveView.updateUploadProgress(100);
                        }
                    }

                    @Override
                    public void onError(String msg) {

                    }
                });
    }

    /**
     * 上传文件分块
     *
     * @param f
     * @param chunkSize
     * @param uploadBaseName
     * @param uploadExt
     * @param subDir
     * @throws IOException
     */
    private void uploadChunk(File f, long chunkSize, String uploadBaseName, String uploadExt, String subDir) throws IOException {

        String filepath = f.getAbsolutePath();
        String filename = f.getName();
        long fileSize = f.length();
        int chunkTotal = (int) Math.ceil((double) fileSize / (double) chunkSize);
        Integer[] chunkArray = new Integer[chunkTotal];
        for (int i = 0; i < chunkTotal; i++) {
            chunkArray[i] = i + 1;
        }

        StreamFileReader reader = new StreamFileReader(filepath, (int) chunkSize);

        Observable observable = Observable.fromArray(chunkArray)
                .subscribeOn(mSchedulerProvider.io())
                .flatMap((Function<Integer, ObservableSource<?>>) chunkIndex -> {
                    reader.read();

                    RequestBody requestFile = RequestBody.create(
                            MediaType.parse("application/octet-stream"),
                            reader.getArray());
                    MultipartBody.Part body = MultipartBody.Part.createFormData("file", "blob", requestFile);

                    Map<String, RequestBody> partMap = new HashMap<>();
                    partMap.put("filename", RequestBody.create(okhttp3.MultipartBody.FORM, filename));
                    partMap.put("file_size", RequestBody.create(okhttp3.MultipartBody.FORM, Long.toString(fileSize)));
                    partMap.put("upload_ext", RequestBody.create(okhttp3.MultipartBody.FORM, uploadExt));
                    partMap.put("chunk_total", RequestBody.create(okhttp3.MultipartBody.FORM, Integer.toString(chunkTotal)));
                    partMap.put("chunk_index", RequestBody.create(okhttp3.MultipartBody.FORM, Integer.toString(chunkIndex)));
                    partMap.put("upload_basename", RequestBody.create(okhttp3.MultipartBody.FORM, uploadBaseName));
                    partMap.put("sub_dir", RequestBody.create(okhttp3.MultipartBody.FORM, subDir));
                    partMap.put("group", RequestBody.create(okhttp3.MultipartBody.FORM, "file"));
                    partMap.put("locale", RequestBody.create(okhttp3.MultipartBody.FORM, "zh"));
                    partMap.put("path", RequestBody.create(okhttp3.MultipartBody.FORM, DriveFragment.path));

                    return mApiService.uploading(body, partMap);
                })
                .observeOn(mSchedulerProvider.ui());
        observable.subscribe(new Observer<Uploading>() {
            @Override
            public void onSubscribe(Disposable d) {
                progressVal = 0;
                mDriveView.showUploadProgressDialog();
            }

            @Override
            public void onNext(Uploading uploading) {
                mDriveView.updateUploadProgress((++progressVal) * 100 / chunkTotal);
            }

            @Override
            public void onError(Throwable e) {
                mDriveView.closeUploadProgressDialog();
                mDriveView.showMessage("文件上传失败");
            }

            @Override
            public void onComplete() {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    mDriveView.showMessage("文件上传失败");
                }
            }
        });
    }
}
