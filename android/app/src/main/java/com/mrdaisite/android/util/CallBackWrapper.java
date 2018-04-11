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


import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import com.google.gson.stream.MalformedJsonException;
import com.mrdaisite.android.data.model.Error;

import org.json.JSONException;

import java.io.IOException;
import java.net.ConnectException;
import java.net.SocketException;
import java.text.ParseException;
import java.util.Objects;

import io.reactivex.Observer;
import io.reactivex.disposables.Disposable;
import retrofit2.HttpException;

public abstract class CallBackWrapper<T> implements Observer<T> {
    @Override
    public void onSubscribe(Disposable d) {
        TokenUtil tokenUtil = TokenUtil.getInstance();
        if (tokenUtil.isExpired()) {
            tokenUtil.refreshToken();
        }
        onBegin(d);
    }

    @Override
    public void onNext(T t) {
        onSuccess(t);
    }

    @Override
    public void onError(Throwable e) {
        com.orhanobut.logger.Logger.e(String.valueOf(e));

        if (e instanceof HttpException) {
            // HTTP错误
            HttpException httpException = (HttpException) e;
            String responseBody = null;
            try {
                responseBody = Objects.requireNonNull(httpException.response().errorBody()).string();
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            Error res = new Gson().fromJson(responseBody, Error.class);
            onError(Constants.ERROR_CODES.get(res.getErrors()));
        } else if (e instanceof JsonParseException
                || e instanceof JSONException
                || e instanceof ParseException
                || e instanceof MalformedJsonException) {
            // 解析数据错误
            onError("数据解析错误");
        } else if (e instanceof ConnectException) {
            // 连接网络错误
            onError("连接失败");
        } else if (e instanceof SocketException) {
            // 网络超时
            onError("网络连接超时");
        } else {
            // 未知错误
            onError("未知错误");
        }
    }

    @Override
    public void onComplete() {

    }

    public abstract void onBegin(Disposable d);

    public abstract void onSuccess(T t);

    public abstract void onError(String msg);
}
