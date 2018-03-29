package com.mrdaisite.android.splash;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import com.mrdaisite.android.R;
import com.mrdaisite.android.util.ActivityUtils;

/**
 * Created by dai on 2018/3/26.
 */
public class SplashActivity extends AppCompatActivity {
    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.splash_act);
        SplashFragment splashFragment = (SplashFragment) getSupportFragmentManager().findFragmentById(R.id.contentFrame);
        if (splashFragment == null) {
            splashFragment = SplashFragment.newInstance();
            ActivityUtils.addFragmentToActivity(getSupportFragmentManager(),
                    splashFragment, R.id.contentFrame);
        }

        // Create the presenter
        new SplashPresenter(splashFragment);
    }
}
