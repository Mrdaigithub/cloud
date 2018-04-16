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
import com.mrdaisite.android.data.model.Resources;
import com.mrdaisite.android.data.model.User;
import com.mrdaisite.android.data.sources.remote.ApiService;
import com.mrdaisite.android.util.CallBackWrapper;
import com.mrdaisite.android.util.schedulers.BaseSchedulerProvider;
import com.orhanobut.logger.Logger;

import io.objectbox.Box;
import io.reactivex.disposables.Disposable;

import static com.google.common.base.Preconditions.checkNotNull;

public class DrivePresenter implements DriveContract.Presenter {

    private ApiService mApiService = MyApplication.getInstance().getApiService();
    private Box<User> userBox = MyApplication.getInstance().getBoxStore().boxFor(User.class);

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
        mApiService.getUser()
                .subscribeOn(mSchedulerProvider.io())
                .observeOn(mSchedulerProvider.ui())
                .subscribe(new CallBackWrapper<User>() {
                    @Override
                    public void onBegin(Disposable d) {
                    }

                    @Override
                    public void onSuccess(User user) {
                        long id = userBox.put(user);
                        User localUserData = userBox.get(id);
                        mDriveView.setProfileUsername(localUserData.getUsername());
                        mDriveView.setProfileEmail(localUserData.getEmail());
                    }

                    @Override
                    public void onError(String msg) {
                        com.orhanobut.logger.Logger.e(msg);
                    }
                });
    }

    @Override
    public void unsubscribe() {

    }

    @Override
    public void test() {
        mApiService.getResources()
                .subscribeOn(mSchedulerProvider.io())
                .observeOn(mSchedulerProvider.ui())
                .subscribe(new CallBackWrapper<Resources>() {
                    @Override
                    public void onBegin(Disposable d) {
                    }

                    @Override
                    public void onSuccess(Resources resources) {
                        
                    }

                    @Override
                    public void onError(String msg) {
                        com.orhanobut.logger.Logger.e(msg);
                    }
                });
    }
}
