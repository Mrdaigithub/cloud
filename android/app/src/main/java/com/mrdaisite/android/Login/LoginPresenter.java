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

package com.mrdaisite.android.Login;

import android.support.annotation.NonNull;
import android.util.Log;

import com.mrdaisite.android.data.model.Token;
import com.mrdaisite.android.data.sources.remote.RetrofitProvider;
import com.mrdaisite.android.data.sources.remote.TokenService;
import com.mrdaisite.android.util.schedulers.BaseSchedulerProvider;

import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by dai on 2018/3/26.
 */
public class LoginPresenter implements LoginContract.Presenter {

    private TokenService mtokenService;

    @NonNull
    private final LoginContract.View mLoginView;

    @NonNull
    private final BaseSchedulerProvider mSchedulerProvider;

    public LoginPresenter(@NonNull LoginContract.View loginView,
                          @NonNull BaseSchedulerProvider schedulerProvider) {
        mLoginView = checkNotNull(loginView, "splashView cannot be null!");
        mLoginView.setPresenter(this);
        mSchedulerProvider = checkNotNull(schedulerProvider, "schedulerProvider cannot be null");
    }

    @Override
    public void subscribe() {

    }

    @Override
    public void unsubscribe() {

    }

    @Override
    public void attemptLogin(String username, String password) {
        checkNotNull(username, "parameter username is not exists");
        checkNotNull(password, "parameter username is not exists");

        RetrofitProvider.getInstance()
                .create(TokenService.class)
                .getToken(username, password)
                .subscribeOn(mSchedulerProvider.io())
                .observeOn(mSchedulerProvider.ui())
                .subscribe(new Observer<Token>() {
                    @Override
                    public void onSubscribe(Disposable d) {
                        Log.e("debug", "onSubscribe");
                    }

                    @Override
                    public void onNext(Token token) {
                        Log.e("debug", String.valueOf(token));
                    }

                    @Override
                    public void onError(Throwable e) {
                        Log.e("debug", e.getMessage());
                    }

                    @Override
                    public void onComplete() {
                        Log.e("debug", "onComplete");
                    }
                });
    }
}
