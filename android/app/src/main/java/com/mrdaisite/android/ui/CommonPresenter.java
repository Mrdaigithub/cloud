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

package com.mrdaisite.android.ui;

import com.mrdaisite.android.MyApplication;
import com.mrdaisite.android.data.Injection;
import com.mrdaisite.android.data.model.Resource;
import com.mrdaisite.android.data.model.Resource_;
import com.mrdaisite.android.data.sources.remote.ApiService;
import com.mrdaisite.android.util.CallbackUnit;
import com.mrdaisite.android.util.HttpCallBackWrapper;
import com.mrdaisite.android.util.schedulers.BaseSchedulerProvider;

import java.util.List;

import io.objectbox.Box;
import io.reactivex.disposables.Disposable;

public class CommonPresenter {
    private final static BaseSchedulerProvider mSchedulerProvider = Injection.provideSchedulerProvider();
    private static ApiService mApiService = MyApplication.getInstance().getApiService();
    private static Box<Resource> mResourceBeanBox = MyApplication.getInstance().getBoxStore().boxFor(Resource.class);

    /**
     * 从服务器获取resource list
     */
    public static void fetchRemoteResources(CallbackUnit callbackUnit) {
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
                        callbackUnit.callbackFunc(resources);
                    }

                    @Override
                    public void onError(String msg) {

                    }
                });
    }

    /**
     * 从本地获取resource list
     *
     * @return
     */
    public static List<Resource> fetchLocalTrashedResources() {
        return mResourceBeanBox.query()
                .equal(Resource_.trashPath, "0")
                .filter((resource) -> resource.isTrashed())
                .order(Resource_.file)
                .build()
                .find();
    }

    /**
     * 从本地获取trashed resource list
     *
     * @param path
     * @return
     */
    public static List<Resource> fetchLocalResources(String path) {
        return mResourceBeanBox.query()
                .equal(Resource_.path, path)
                .filter((resource) -> !resource.isTrashed())
                .order(Resource_.file)
                .build()
                .find();
    }
}
