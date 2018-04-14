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

package com.mrdaisite.android.util;

import android.content.SharedPreferences;
import android.support.annotation.NonNull;

import com.mrdaisite.android.MyApplication;
import com.mrdaisite.android.data.model.Token;
import com.mrdaisite.android.data.sources.remote.ApiService;
import com.mrdaisite.android.util.schedulers.BaseSchedulerProvider;
import com.orhanobut.logger.Logger;

import io.reactivex.disposables.Disposable;

public class TokenUtil {
    private static TokenUtil INSTANCE;
    private SharedPreferences sharedPref = MyApplication.getInstance().getSharedPreferences();
    private ApiService mApiService = MyApplication.getInstance().getApiService();

    public static TokenUtil getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new TokenUtil();
        }
        return INSTANCE;
    }

    public void saveToken(Token token) {
        long expiresTime = System.currentTimeMillis() + (long) ((double) token.getExpiresIn() * 1000 * 0.9);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("token_type", token.getTokenType()).apply();
        editor.putLong("expires_time", expiresTime).apply();
        editor.putString("access_token", token.getAccessToken()).apply();
        editor.putString("refresh_token", token.getRefreshToken()).apply();
    }

    public void refreshToken() {
        String refreshToken = sharedPref.getString("refresh_token", "");
        if (refreshToken.equals("")) return;
        mApiService.refreshToken(refreshToken)
                .subscribe(new CallBackWrapper<Token>() {
                    @Override
                    public void onBegin(Disposable d) {
                    }

                    @Override
                    public void onSuccess(Token token) {
                        saveToken(token);
                    }

                    @Override
                    public void onError(String msg) {
                    }
                });
    }

    public Boolean isExpired() {
        long expires_time = sharedPref.getLong("expires_time", 0);
        return expires_time != 0 && System.currentTimeMillis() >= expires_time;
    }
}
