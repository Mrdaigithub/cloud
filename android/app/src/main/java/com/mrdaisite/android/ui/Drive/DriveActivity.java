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

package com.mrdaisite.android.ui.Drive;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBar;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;

import com.mrdaisite.android.R;
import com.mrdaisite.android.data.Injection;
import com.mrdaisite.android.ui.BaseActivity;
import com.mrdaisite.android.ui.Download.DownloadActivity;
import com.mrdaisite.android.ui.Trash.TrashActivity;
import com.mrdaisite.android.util.ActivityUtils;
import com.orhanobut.logger.Logger;

import java.util.List;

import pub.devrel.easypermissions.AppSettingsDialog;
import pub.devrel.easypermissions.EasyPermissions;


public class DriveActivity extends BaseActivity {

    private DrawerLayout mDrawerLayout;

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.drive_act);

        setupToolbar();

        setupNavigationDrawer();

        DriveFragment driveFragment = findOrCreateViewFragment();

        // Create the presenter
        new DrivePresenter(
                driveFragment,
                Injection.provideSchedulerProvider()
        );
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.drive_fragment_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                // Open the navigation drawer when the home icon is selected from the toolbar.
                mDrawerLayout.openDrawer(GravityCompat.START);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void setupDrawerContent(NavigationView navigationView) {
        navigationView.setNavigationItemSelectedListener(
                menuItem -> {
                    switch (menuItem.getItemId()) {
                        case R.id.trash_navigation_menu_item:
                            startActivity(new Intent(this, TrashActivity.class));
                            break;
                        case R.id.download_manager_navigation_menu_item:
                            startActivity(new Intent(this, DownloadActivity.class));
                            break;
                        case R.id.settings_navigation_menu_item:
                            break;
                        case R.id.share_navigation_menu_item:
                            break;
                        case R.id.github_navigation_menu_item:
                            break;
                    }
                    menuItem.setChecked(true);
                    mDrawerLayout.closeDrawers();
                    return true;
                }
        );
    }

    // Set up the toolbar.
    public void setupToolbar() {
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        ActionBar ab = getSupportActionBar();
        toolbar.setTitle("/");
        ab.setHomeAsUpIndicator(R.drawable.ic_menu);
        ab.setDisplayHomeAsUpEnabled(true);
    }

    // Set up the navigation drawer.
    public void setupNavigationDrawer() {
        mDrawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
        mDrawerLayout.setStatusBarBackground(R.color.colorPrimary);
        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        if (navigationView != null) {
            setupDrawerContent(navigationView);
        }
    }

    public DriveFragment findOrCreateViewFragment() {
        DriveFragment driveFragment =
                (DriveFragment) getSupportFragmentManager().findFragmentById(R.id.contentFrame);
        if (driveFragment == null) {
            // Create the fragment
            driveFragment = DriveFragment.newInstance();
            ActivityUtils.addFragmentToActivity(
                    getSupportFragmentManager(), driveFragment, R.id.contentFrame);
        }
        return driveFragment;
    }
}
