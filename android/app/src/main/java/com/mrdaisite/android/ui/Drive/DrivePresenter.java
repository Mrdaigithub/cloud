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

import android.support.annotation.NonNull;

import com.mrdaisite.android.MyApplication;
import com.mrdaisite.android.data.model.Resource;
import com.mrdaisite.android.data.model.Resource_;
import com.mrdaisite.android.data.model.User;
import com.mrdaisite.android.data.sources.remote.ApiService;
import com.mrdaisite.android.util.CallbackUnit;
import com.mrdaisite.android.util.HttpCallBackWrapper;
import com.mrdaisite.android.util.schedulers.BaseSchedulerProvider;

import java.util.List;
import java.util.Objects;

import io.objectbox.Box;
import io.reactivex.Observable;
import io.reactivex.ObservableSource;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;
import io.reactivex.functions.Function;

import static com.google.common.base.Preconditions.checkNotNull;

public class DrivePresenter implements DriveContract.Presenter {

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

    /**
     * 从服务器获取resource list
     */
    public void fetchRemoteResources(CallbackUnit callBackUnit) {
        mApiService.getResources()
                .subscribeOn(mSchedulerProvider.io())
                .observeOn(mSchedulerProvider.ui())
                .subscribe(new HttpCallBackWrapper<List<Resource>>() {
                    @Override
                    public void onBegin(Disposable d) {

                    }

                    @Override
                    public void onSuccess(List<Resource> resources) {
                        mResourceBeanBox.removeAll();
                        for (Resource resource : resources) {
                            mResourceBeanBox.put(resource);
                        }
                        callBackUnit.callbackFunc(resources);
                    }

                    @Override
                    public void onError(String msg) {

                    }
                });
    }

    /**
     * 从本地获取resource list
     *
     * @param path
     * @return
     */
    public List<Resource> fetchLocalResources(String path) {
        return mResourceBeanBox.query()
                .equal(Resource_.path, path)
                .filter((resource) -> !resource.isTrashed())
                .order(Resource_.file)
                .build()
                .find();
    }

    @Override
    public void mkdir(String newDirName) {
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
                        mDriveView.resourceViewRefresh(true, true);
                    }

                    @Override
                    public void onError(String msg) {

                    }
                });
    }

    @Override
    public void renameResource(long resourceId, String newResourceNameText) {
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
                        mDriveView.resourceViewRefresh(true, false);
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
}
