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
