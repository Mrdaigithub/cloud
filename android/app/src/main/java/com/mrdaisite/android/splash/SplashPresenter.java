package com.mrdaisite.android.splash;

import android.support.annotation.NonNull;
import android.util.Log;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by dai on 2018/3/26.
 */

public class SplashPresenter implements SplashContract.Presenter {

    @NonNull
    private final SplashContract.View mSplashView;

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
}
