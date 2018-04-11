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

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;

import com.mrdaisite.android.MyApplication;
import com.mrdaisite.android.R;
import com.mrdaisite.android.ui.Drive.DriveActivity;
import com.mrdaisite.android.ui.Login.LoginActivity;
import com.mrdaisite.android.util.CallBackWrapper;
import com.mrdaisite.android.util.schedulers.BaseSchedulerProvider;

import java.util.logging.Logger;

import io.reactivex.disposables.Disposable;

/**
 * Created by dai on 2018/3/26.
 */
public class MainActivity extends AppCompatActivity {

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        SharedPreferences sharedPref = MyApplication.getSharedPreferences();
//        String defaultValue = getResources().getString(R.string.token_default);
//        String token = sharedPref.getString("token", defaultValue);

        startActivity(new Intent(this, LoginActivity.class));
//        if (token.isEmpty() || token.equals(defaultValue)) {
//            startActivity(new Intent(this, LoginActivity.class));
//        } else {
//            ApiService mApiService = MyApplication.getInstance().getApiService();
//            mApiService.getUser()
//                    .subscribe(new CallBackWrapper<User>() {
//                        @Override
//                        public void onBegin(Disposable d) {
//                        }
//
//                        @Override
//                        public void onSuccess(User user) {
//                            com.orhanobut.logger.Logger.e(String.valueOf(user));
//                        }
//
//                        @Override
//                        public void onError(String msg) {
//                            com.orhanobut.logger.Logger.e(msg);
//                        }
//                    });
//            startActivity(new Intent(this, DriveActivity.class));
//        }
        finish();
    }
}
