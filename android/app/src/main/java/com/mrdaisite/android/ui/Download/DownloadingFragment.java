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
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.mrdaisite.android.R;
import com.mrdaisite.android.adapter.DownloadManagerAdapter;
import com.mrdaisite.android.adapter.ResourceAdapter;
import com.mrdaisite.android.ui.BaseFragment;
import com.mrdaisite.android.ui.Trash.TrashPresenter;

import static com.google.common.base.Preconditions.checkNotNull;

public class DownloadingFragment extends BaseFragment implements DownloadingContract.View {

    private static DownloadingContract.Presenter mDownloadingPresenter;
    private DownloadManagerAdapter mDownloadManagerAdapter;


    // Setup

    public static DownloadingFragment newInstance() {

        Bundle args = new Bundle();

        DownloadingFragment fragment = new DownloadingFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void setPresenter(DownloadingContract.Presenter presenter) {
        mDownloadingPresenter = checkNotNull(presenter);
    }


    // Lifecycle

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.downloading_frag, container, false);

        RecyclerView mRecyclerView = root.findViewById(R.id.downloadRecyclerView);
        mRecyclerView.setHasFixedSize(true);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);

        mDownloadManagerAdapter = new DownloadManagerAdapter(R.layout.download_item, TrashPresenter.fetchLocalTrashedResources());
        mDownloadManagerAdapter.isFirstOnly(false);
        mDownloadManagerAdapter.setUpFetchEnable(true);
        mDownloadManagerAdapter.setEmptyView(R.layout.empty_view, mRecyclerView);
        mRecyclerView.setAdapter(mDownloadManagerAdapter);

        return root;
    }

    @Override
    public void onResume() {
        super.onResume();
        mDownloadingPresenter.subscribe();
    }

    @Override
    public void onPause() {
        super.onPause();
        mDownloadingPresenter.unsubscribe();
    }


    // UI operate

    @Override
    public void resourceViewRefresh(Boolean openAnimation, Boolean remote) {

    }
}
