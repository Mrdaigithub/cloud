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

package com.mrdaisite.android.ui.Download;

import android.support.annotation.NonNull;

import com.mrdaisite.android.MyApplication;
import com.mrdaisite.android.data.model.Resource;
import com.mrdaisite.android.data.sources.remote.ApiService;
import com.mrdaisite.android.ui.CommonPresenter;
import com.mrdaisite.android.util.CallbackUnit;
import com.mrdaisite.android.util.schedulers.BaseSchedulerProvider;

import java.util.List;

import io.objectbox.Box;

import static com.google.common.base.Preconditions.checkNotNull;

public class DownloadedPresenter extends CommonPresenter implements DownloadedContract.Presenter {

    private ApiService mApiService = MyApplication.getInstance().getApiService();
    private Box<Resource> mResourceBeanBox = MyApplication.getInstance().getBoxStore().boxFor(Resource.class);
    @NonNull
    private final DownloadedContract.View mDownloadedView;
    @NonNull
    private final BaseSchedulerProvider mSchedulerProvider;

    DownloadedPresenter(DownloadedFragment downloadedFragment, BaseSchedulerProvider schedulerProvider) {
        mDownloadedView = checkNotNull(downloadedFragment);
        mDownloadedView.setPresenter(this);
        mSchedulerProvider = checkNotNull(schedulerProvider);
    }

    @Override
    public void subscribe() {
    }

    @Override
    public void unsubscribe() {
    }

    @Override
    public void removeResource(List<Long> resourceIdList, CallbackUnit callbackUnit) {

    }
}
