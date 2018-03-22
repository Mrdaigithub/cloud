package com.mrdaisite.android.splash;

import android.location.SettingInjectorService;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;

import com.mrdaisite.android.R;
import com.mrdaisite.android.util.ActivityUtils;

/**
 * Created by dai on 2018/3/22.
 */

public class SplashActivity extends AppCompatActivity {

    private SplashPresenter mSplashPresenter;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.splash_act);

        SplashFragment splashFragment =
                (SplashFragment) getSupportFragmentManager().findFragmentById(R.id.splashContainer);
        if (splashFragment == null) {
            splashFragment = SplashFragment.newInstance();
            ActivityUtils.addFragmentToActivity(getSupportFragmentManager(), splashFragment, R.id.splashContainer);
        }

        mSplashPresenter = new SplashPresenter(splashFragment);
    }
}
