package com.mrdaisite.anative;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.os.Handler;
import android.view.MotionEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 */
public class WelcomeActivity extends AppCompatActivity {
    private static final int PAUSE_TIME = 1000;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        new Thread() {
            @Override
            public void run() {
                super.run();
                try {
                    Thread.sleep(PAUSE_TIME);
                    loadingNext();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }.start();
    }

    private void loadingNext() {
        finish();
        startActivity(new Intent(this, LoginActivity.class));
    }
}
