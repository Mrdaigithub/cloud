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
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.PopupMenu;
import android.widget.Toast;

import com.mrdaisite.android.R;
import com.mrdaisite.android.adapter.DownloadManagerAdapter;
import com.mrdaisite.android.adapter.ResourceAdapter;
import com.mrdaisite.android.ui.BaseFragment;

import static com.google.common.base.Preconditions.checkNotNull;

public class DownloadFragment extends BaseFragment implements DownloadContract.View {

    private SwipeRefreshLayout mSwipeRefreshLayout;
    private static DownloadContract.Presenter mPresenter;
    private DownloadManagerAdapter mDownloadManagerAdapter;


    // Setup

    public static DownloadFragment newInstance() {

        Bundle args = new Bundle();

        DownloadFragment fragment = new DownloadFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void setPresenter(DownloadContract.Presenter presenter) {
        mPresenter = checkNotNull(presenter);
    }


    // Lifecycle

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onResume() {
        super.onResume();
        mPresenter.subscribe();
    }

    @Override
    public void onPause() {
        super.onPause();
        mPresenter.unsubscribe();
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.download_frag, container, false);

        mSwipeRefreshLayout = root.findViewById(R.id.swipeRefreshView);
        mSwipeRefreshLayout.setRefreshing(false);
        mSwipeRefreshLayout.setEnabled(false);

        RecyclerView mRecyclerView = root.findViewById(R.id.resourceRecyclerView);
        mRecyclerView.setHasFixedSize(true);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);

        mDownloadManagerAdapter = new DownloadManagerAdapter(R.layout.download_item, DownloadPresenter.fetchLocalTrashedResources());
        mDownloadManagerAdapter.openLoadAnimation();
        mDownloadManagerAdapter.isFirstOnly(false);
        mDownloadManagerAdapter.setUpFetchEnable(true);
        mDownloadManagerAdapter.setEmptyView(R.layout.empty_view, mRecyclerView);
        mDownloadManagerAdapter.setOnItemChildClickListener((adapter, view, position) -> {
            PopupMenu popupMenu = new PopupMenu(getActivity(), view);
            popupMenu.inflate(R.menu.trash_resource_item_menu);
            popupMenu.setOnMenuItemClickListener(menuItem -> {
                switch (menuItem.getItemId()) {
                    case R.id.restore:
                        break;
                    case R.id.removePermanently:
                        break;
                }
                return false;
            });
            popupMenu.show();
        });
        mRecyclerView.setAdapter(mDownloadManagerAdapter);

        return root;
    }


    // Show Dialog

    @Override
    public void showMessage(String msg) {
        Toast.makeText(getContext(), msg, Toast.LENGTH_SHORT).show();
    }


    // UI operate

    @Override
    public void resourceViewRefresh(Boolean openAnimation, Boolean remote) {
        if (openAnimation) mDownloadManagerAdapter.openLoadAnimation();
        else mDownloadManagerAdapter.closeLoadAnimation();
        if (remote) {
            DownloadPresenter.fetchRemoteResources(o ->
                    mDownloadManagerAdapter.setNewData(DownloadPresenter.fetchLocalTrashedResources())
            );
        } else {
            mDownloadManagerAdapter.setNewData(DownloadPresenter.fetchLocalTrashedResources());
        }
    }
}
