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

package com.mrdaisite.android.splash;

import android.support.annotation.NonNull;
import android.util.Log;

import com.mrdaisite.android.util.schedulers.BaseSchedulerProvider;
import com.mrdaisite.android.util.schedulers.SchedulerProvider;

import java.util.concurrent.TimeUnit;

import io.reactivex.Flowable;
import io.reactivex.schedulers.Schedulers;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by dai on 2018/3/26.
 */
public class SplashPresenter implements SplashContract.Presenter {

    private static final short SPLASH_SHOW_SECONDS = 2;

    @NonNull
    private final SplashContract.View mSplashView;

    @NonNull
    private BaseSchedulerProvider mSchedulerProvider;

    public SplashPresenter(@NonNull SplashContract.View splashView) {
        mSplashView = checkNotNull(splashView, "splashView cannot be null!");
        mSplashView.setPresenter(this);
    }

    @Override
    public void subscribe() {
    }

    @Override
    public void unsubscribe() {
    }

    @Override
    public void initData() {
        Flowable.timer(SPLASH_SHOW_SECONDS, TimeUnit.SECONDS)
                .subscribe(s -> {
                    mSplashView.toLoginActivity();
                });
    }
}
