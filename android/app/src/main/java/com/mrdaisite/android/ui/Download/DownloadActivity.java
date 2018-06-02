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

package com.mrdaisite.android.ui.Download;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.view.ViewPager;
import android.support.v7.app.ActionBar;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.support.design.widget.TabLayout;

import com.mrdaisite.android.R;
import com.mrdaisite.android.adapter.DownloadManagerAdapter;
import com.mrdaisite.android.adapter.DownloadManagerViewPagerAdapter;
import com.mrdaisite.android.data.Injection;
import com.mrdaisite.android.ui.BaseActivity;
import com.mrdaisite.android.util.ActivityUtils;

public class DownloadActivity extends BaseActivity {

    private DownloadingFragment mDownloadingFragment;
    private DownloadedFragment mDownloadedFragment;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.download_act);
        setupToolbar();

        TabLayout tableLayout = findViewById(R.id.downloadManagerTabs);
        ViewPager viewPager = findViewById(R.id.contentFrame);
        tableLayout.setupWithViewPager(viewPager);

        mDownloadingFragment = new DownloadingFragment();
        mDownloadedFragment = new DownloadedFragment();

        setupViewPager(viewPager);

        // Create the presenter

        new DownloadingPresenter(
                mDownloadingFragment,
                Injection.provideSchedulerProvider()
        );

        new DownloadedPresenter(
                mDownloadedFragment,
                Injection.provideSchedulerProvider()
        );
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                finish();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    // Set up the toolbar.
    public void setupToolbar() {
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        ActionBar ab = getSupportActionBar();
        toolbar.setTitle(R.string.download_manager);
        ab.setHomeAsUpIndicator(R.drawable.ic_arrow_back);
        ab.setDisplayHomeAsUpEnabled(true);
    }

    private void setupViewPager(ViewPager viewPager) {
        DownloadManagerViewPagerAdapter adapter = new DownloadManagerViewPagerAdapter(getSupportFragmentManager());
        adapter.addFragment(mDownloadingFragment, "下载中");
        adapter.addFragment(mDownloadedFragment, "已完成");
        viewPager.setAdapter(adapter);
    }
}
