package com.mrdaisite.android.splash;

import android.support.annotation.NonNull;

/**
 * Created by dai on 2018/3/22.
 */

public class SplashPresenter implements SplashContract.Presenter {

    private final SplashContract.View mSplashView;

    public SplashPresenter(@NonNull SplashContract.View splashView){
        mSplashView = splashView;
        mSplashView.setPresenter(this);
    }

    @Override
    public void start() {

    }
}
