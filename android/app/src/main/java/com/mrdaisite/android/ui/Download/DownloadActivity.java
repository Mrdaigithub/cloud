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
import android.os.Environment;
import android.support.annotation.Nullable;
import android.support.design.widget.TabLayout;
import android.support.v4.view.ViewPager;
import android.support.v7.app.ActionBar;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;

import com.liulishuo.filedownloader.BaseDownloadTask;
import com.liulishuo.filedownloader.FileDownloadListener;
import com.liulishuo.filedownloader.util.FileDownloadUtils;
import com.mrdaisite.android.R;
import com.mrdaisite.android.adapter.DownloadManagerViewPagerAdapter;
import com.mrdaisite.android.data.Injection;
import com.mrdaisite.android.ui.BaseActivity;

import butterknife.BindView;
import butterknife.ButterKnife;

public class DownloadActivity extends BaseActivity {

    @BindView(R.id.contentFrame)
    ViewPager viewPager;
    @BindView(R.id.downloadManagerTabs)
    TabLayout tableLayout;
    @BindView(R.id.toolbar)
    Toolbar toolbar;

    private DownloadingFragment mDownloadingFragment;
    private DownloadedFragment mDownloadedFragment;


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.download_act);
        ButterKnife.bind(this);

        setupToolbar();

        tableLayout.setupWithViewPager(viewPager);

        mDownloadingFragment = DownloadingFragment.newInstance();
        mDownloadedFragment = DownloadedFragment.newInstance();

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
        setSupportActionBar(toolbar);
        ActionBar ab = getSupportActionBar();
        toolbar.setTitle(R.string.download_manager);
        ab.setHomeAsUpIndicator(R.drawable.ic_arrow_back);
        ab.setDisplayHomeAsUpEnabled(true);
    }

    private void setupViewPager(ViewPager viewPager) {
        DownloadManagerViewPagerAdapter adapter = new DownloadManagerViewPagerAdapter(getSupportFragmentManager());
        adapter.addFragment(mDownloadedFragment, "已下载");
        adapter.addFragment(mDownloadingFragment, "下载中");
        viewPager.setAdapter(adapter);
    }
}
