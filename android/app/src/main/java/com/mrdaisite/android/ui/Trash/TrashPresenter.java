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
import com.mrdaisite.android.data.model.Resource;
import com.mrdaisite.android.data.model.Resource_;
import com.mrdaisite.android.data.sources.remote.ApiService;
import com.mrdaisite.android.ui.CommonPresenter;
import com.mrdaisite.android.util.CallbackUnit;
import com.mrdaisite.android.util.HttpCallBackWrapper;
import com.mrdaisite.android.util.schedulers.BaseSchedulerProvider;
import com.orhanobut.logger.Logger;

import java.util.List;

import io.objectbox.Box;
import io.reactivex.Observable;
import io.reactivex.ObservableSource;
import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;
import io.reactivex.functions.Function;
import retrofit2.Response;

import static com.google.common.base.Preconditions.checkNotNull;

public class TrashPresenter extends CommonPresenter implements TrashContract.Presenter {

    private ApiService mApiService = MyApplication.getInstance().getApiService();
    private Box<Resource> mResourceBeanBox = MyApplication.getInstance().getBoxStore().boxFor(Resource.class);

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
    public void restoreResource(long resourceId, CallbackUnit callbackUnit) {
        mApiService.restoreResource(resourceId)
                .subscribeOn(mSchedulerProvider.io())
                .observeOn(mSchedulerProvider.ui())
                .subscribe(new HttpCallBackWrapper<Resource>() {
                    @Override
                    public void onBegin(Disposable d) {

                    }

                    @Override
                    public void onSuccess(Resource resource) {
                        mResourceBeanBox.put(resource);
                        callbackUnit.callbackFunc(resource);
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
                .subscribe(new HttpCallBackWrapper<Response<Void>>() {
                    @Override
                    public void onBegin(Disposable d) {

                    }

                    @Override
                    public void onSuccess(Response<Void> voidResponse) {
                        mResourceBeanBox.remove(resourceId);
                        callbackUnit.callbackFunc(null);
                    }

                    @Override
                    public void onError(String msg) {

                    }
                });
    }

    public void removeResource(List<Long> resourceIdList, CallbackUnit callbackUnit) {
        Observable observable = Observable.fromArray(resourceIdList.toArray(new Long[0]))
                .subscribeOn(mSchedulerProvider.io())
                .flatMap((Function<Long, ObservableSource<?>>) id -> mApiService.removeResource(id))
                .observeOn(mSchedulerProvider.ui());
        observable.subscribe(new Observer<Response<Void>>() {
            @Override
            public void onSubscribe(Disposable d) {

            }

            @Override
            public void onNext(Response<Void> voidResponse) {

            }

            @Override
            public void onError(Throwable e) {

            }

            @Override
            public void onComplete() {
                for (long resourceId : resourceIdList) {
                    mResourceBeanBox.remove(resourceId);
                }
                callbackUnit.callbackFunc(null);
            }
        });
    }
}
