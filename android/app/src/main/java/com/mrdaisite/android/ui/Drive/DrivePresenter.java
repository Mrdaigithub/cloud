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
import android.app.AlertDialog;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.v4.app.FragmentActivity;

import com.mrdaisite.android.MyApplication;
import com.mrdaisite.android.R;
import com.mrdaisite.android.data.model.Resource;
import com.mrdaisite.android.data.model.Resource_;
import com.mrdaisite.android.data.model.User;
import com.mrdaisite.android.data.sources.remote.ApiService;
import com.mrdaisite.android.ui.CommonPresenter;
import com.mrdaisite.android.util.CallbackUnit;
import com.mrdaisite.android.util.Constants;
import com.mrdaisite.android.util.HttpCallBackWrapper;
import com.mrdaisite.android.util.schedulers.BaseSchedulerProvider;
import com.orhanobut.logger.Logger;

import org.greenrobot.essentials.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

import io.objectbox.Box;
import io.reactivex.Observable;
import io.reactivex.ObservableSource;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;
import io.reactivex.functions.Function;
import pub.devrel.easypermissions.AfterPermissionGranted;
import pub.devrel.easypermissions.EasyPermissions;
import pub.devrel.easypermissions.PermissionRequest;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.mrdaisite.android.util.Constants.REQUEST_CODE_READ_EXTERNAL_STORAGE;

public class DrivePresenter extends CommonPresenter implements DriveContract.Presenter {

    private ApiService mApiService = MyApplication.getInstance().getApiService();
    private Box<User> mUserBox = MyApplication.getInstance().getBoxStore().boxFor(User.class);
    private Box<Resource> mResourceBeanBox = MyApplication.getInstance().getBoxStore().boxFor(Resource.class);

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
        try {
            Logger.e(FileUtils.getMd5(f));
        } catch (IOException e) {
            e.printStackTrace();
        }
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
}
