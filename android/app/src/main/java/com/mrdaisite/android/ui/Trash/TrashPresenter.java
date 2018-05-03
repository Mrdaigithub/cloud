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

package com.mrdaisite.android.ui.Trash;

import android.support.annotation.NonNull;

import com.mrdaisite.android.MyApplication;
import com.mrdaisite.android.data.model.ResourceBean;
import com.mrdaisite.android.data.model.ResourceBean_;
import com.mrdaisite.android.data.model.Resources;
import com.mrdaisite.android.data.sources.remote.ApiService;
import com.mrdaisite.android.util.CallbackUnit;
import com.mrdaisite.android.util.HttpCallBackWrapper;
import com.mrdaisite.android.util.schedulers.BaseSchedulerProvider;

import java.util.List;
import java.util.logging.Logger;

import io.objectbox.Box;
import io.reactivex.disposables.Disposable;

import static com.google.common.base.Preconditions.checkNotNull;

public class TrashPresenter implements TrashContract.Presenter {

    private ApiService mApiService = MyApplication.getInstance().getApiService();
    private Box<ResourceBean> mResourceBeanBox = MyApplication.getInstance().getBoxStore().boxFor(ResourceBean.class);

    @NonNull
    private final TrashContract.View mTrashView;

    @NonNull
    private final BaseSchedulerProvider mSchedulerProvider;

    TrashPresenter(TrashFragment trashFragment, BaseSchedulerProvider schedulerProvider) {
        mTrashView = checkNotNull(trashFragment);
        mTrashView.setPresenter(this);
        mSchedulerProvider = checkNotNull(schedulerProvider);
    }

    @Override
    public void subscribe() {

    }

    @Override
    public void unsubscribe() {

    }

    @Override
    public void fetchRemoteResources(CallbackUnit callBackUnit) {
        mApiService.getResources()
                .subscribeOn(mSchedulerProvider.io())
                .observeOn(mSchedulerProvider.ui())
                .subscribe(new HttpCallBackWrapper<Resources>() {
                    @Override
                    public void onBegin(Disposable d) {

                    }

                    @Override
                    public void onSuccess(Resources resources) {
                        callBackUnit.callbackFunc(resources);
                    }

                    @Override
                    public void onError(String msg) {

                    }
                });
    }

    @Override
    public List<ResourceBean> fetchLocalTrashedResources() {
        return mResourceBeanBox.query()
                .equal(ResourceBean_.trashPath, "0")
                .filter((resource) -> resource.isTrashed())
                .build()
                .find();
    }

    @Override
    public void restoreResource(long resourceId, CallbackUnit callbackUnit) {
        mApiService.restoreResource(resourceId)
                .subscribeOn(mSchedulerProvider.io())
                .observeOn(mSchedulerProvider.ui())
                .subscribe(new HttpCallBackWrapper<ResourceBean>() {
                    @Override
                    public void onBegin(Disposable d) {

                    }

                    @Override
                    public void onSuccess(ResourceBean resourceBean) {
                        mResourceBeanBox.put(resourceBean);
                        callbackUnit.callbackFunc(resourceBean);
                    }

                    @Override
                    public void onError(String msg) {

                    }
                });
    }

    @Override
    public void removeResource(long resourceId, CallbackUnit callbackUnit) {
        mApiService.removeResource(resourceId)
                .subscribeOn(mSchedulerProvider.io())
                .observeOn(mSchedulerProvider.ui())
                .subscribe(new HttpCallBackWrapper<String>() {
                    @Override
                    public void onBegin(Disposable d) {

                    }

                    @Override
                    public void onSuccess(String s) {
                        com.orhanobut.logger.Logger.e(s);
                    }

                    @Override
                    public void onError(String msg) {

                    }
                });
    }
}
