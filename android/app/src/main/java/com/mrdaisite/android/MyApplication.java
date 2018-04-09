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

package com.mrdaisite.android;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;

import com.helper.loadviewhelper.load.LoadViewHelper;
import com.mrdaisite.android.data.model.MyObjectBox;
import com.mrdaisite.android.data.sources.remote.ApiService;
import com.mrdaisite.android.util.Constants;
import com.orhanobut.logger.AndroidLogAdapter;
import com.orhanobut.logger.FormatStrategy;
import com.orhanobut.logger.Logger;
import com.orhanobut.logger.PrettyFormatStrategy;

import java.util.concurrent.TimeUnit;

import io.objectbox.android.AndroidObjectBrowser;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

import io.objectbox.BoxStore;


public class MyApplication extends Application {

    private static SharedPreferences sharedPreferences;
    private static MyApplication mMyApplication;
    private ApiService mApiService;
    private BoxStore boxStore;

    @Override
    public void onCreate() {
        super.onCreate();
        mMyApplication = this;

        initLogger();
        initSharedPreferences();
        initLoadingHelper();
        initBoxStore();
        initRetrofit();
    }

    public static MyApplication getInstance() {
        return mMyApplication;
    }

    public ApiService getApiService() {
        return mApiService;
    }

    /**
     * 初始化网络请求
     */
    private void initRetrofit() {
        OkHttpClient.Builder builder = new OkHttpClient.Builder();
        builder.addInterceptor(chain -> {
            Request original = chain.request();

            SharedPreferences sharedPref = MyApplication.getSharedPreferences();
            String defaultValue = getResources().getString(R.string.token_default);
            String token = sharedPref.getString("token", defaultValue);

            Request.Builder requestBuilder = original.newBuilder();
            requestBuilder.header("Content-Type", "application/x-www-form-urlencoded");
            if (token.length() > 0 && !token.equals("null")) {
                requestBuilder.header("Authorization", "Bearer " + token);
            }
            requestBuilder.method(original.method(), original.body());

            Request request = requestBuilder.build();
            return chain.proceed(request);
        });

        HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor(Logger::d);
        loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.HEADERS);
        builder.addInterceptor(loggingInterceptor);
        builder.readTimeout(5, TimeUnit.SECONDS);
        builder.writeTimeout(5, TimeUnit.SECONDS);
        builder.connectTimeout(10, TimeUnit.SECONDS);

        Retrofit retrofit = new Retrofit.Builder()
                .client(builder.build())
                .baseUrl(Constants.BASE_URL)
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        mApiService = retrofit.create(ApiService.class);
    }

    /**
     * 初始化日志工具
     */
    private void initLogger() {
        FormatStrategy formatStrategy = PrettyFormatStrategy.newBuilder()
                // (Optional) Whether to show thread info or not. Default true
                .showThreadInfo(false)
                // (Optional) How many method line to show. Default 2
                .methodCount(0)
                // (Optional) Hides internal method calls up to offset. Default 5
                .methodOffset(7)
                // .logStrategy(customLog) // (Optional) Changes the log strategy to print out. Default LogCat
                // .tag("My custom tag")   // (Optional) Global tag for every log. Default PRETTY_LOGGER
                .build();

        Logger.addLogAdapter(new AndroidLogAdapter(formatStrategy) {
            @Override
            public boolean isLoggable(int priority, String tag) {
                return BuildConfig.DEBUG;
            }
        });
    }

    /**
     * 初始化 SharedPreferences
     */
    private void initSharedPreferences() {
        sharedPreferences = getApplicationContext().getSharedPreferences(
                getString(R.string.preference_file_key), Context.MODE_PRIVATE);
    }

    /**
     * 初始化加载界面
     */
    private void initLoadingHelper() {
        LoadViewHelper.getBuilder()
                .setLoadIng(R.layout.loading_view);
    }

    private void initBoxStore() {
        boxStore = MyObjectBox.builder().androidContext(MyApplication.this).build();
        if (BuildConfig.DEBUG) {
            new AndroidObjectBrowser(boxStore).start(this);
        }
    }

    /**
     * 获取boxtore
     *
     * @return box
     */
    public BoxStore getBoxStore() {
        return boxStore;
    }

    public static SharedPreferences getSharedPreferences() {
        return sharedPreferences;
    }
}
