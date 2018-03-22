package com.mrdaisite.android.splash;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;

import com.mrdaisite.android.LoginActivity;

import io.reactivex.Flowable;
import io.reactivex.functions.Consumer;

/**
 * Created by dai on 2018/3/22.
 */

public class SplashFragment extends Fragment implements SplashContract.View {

    private SplashContract.Presenter mPresenter;

    public static SplashFragment newInstance() {
        return new SplashFragment();
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.delayIntoLogin(3000);
    }

    @Override
    public void setPresenter(SplashContract.Presenter presenter) {
        mPresenter = presenter;
    }

    @Override
    public void showLogin() {
        startActivity(new Intent(getContext(), LoginActivity.class));
    }

    @Override
    public void delayIntoLogin(int delayTime) {
        Flowable.just("hello world")
                .subscribe(new Consumer<String>() {
                    @Override
                    public void accept(String s) throws Exception {
                        Log.e("debug", "error");
                        showLogin();
                    }
                });
    }
}
