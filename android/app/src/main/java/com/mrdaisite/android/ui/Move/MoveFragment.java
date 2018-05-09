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

package com.mrdaisite.android.ui.Move;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import com.mrdaisite.android.R;
import com.mrdaisite.android.adapter.ResourceAdapter;
import com.mrdaisite.android.data.model.Resource;
import com.mrdaisite.android.ui.BaseFragment;
import com.mrdaisite.android.util.CallbackUnit;
import com.mrdaisite.android.util.ResourceUtil;
import com.orhanobut.logger.Logger;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.google.common.base.Preconditions.checkNotNull;

public class MoveFragment extends BaseFragment implements MoveContract.View {

    private static MoveContract.Presenter mPresenter;
    private ResourceAdapter mResourceAdapter;
    private List<Long> moveIdList = new ArrayList<>();
    private String path = "0";


    // Setup

    public static MoveFragment newInstance() {

        Bundle args = new Bundle();

        MoveFragment fragment = new MoveFragment();
        fragment.setArguments(args);
        return fragment;
    }


    @Override
    public void setPresenter(MoveContract.Presenter presenter) {
        mPresenter = checkNotNull(presenter);
    }


    // Lifecycle

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = getActivity().getIntent();
        long[] moveIdArray = intent.getLongArrayExtra("moveIdArray");
        for (long id : moveIdArray) {
            moveIdList.add(id);
        }
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
        View root = inflater.inflate(R.layout.move_frag, container, false);

        RecyclerView mRecyclerView = root.findViewById(R.id.resourceRecyclerView);
        mRecyclerView.setHasFixedSize(true);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);

        // Add toolbar menu listener
        Toolbar toolbar = getActivity().findViewById(R.id.toolbar);
        toolbar.setOnMenuItemClickListener(item -> {
            switch (item.getItemId()) {
                case R.id.move:
                    List<String> pathList = new ArrayList<>(Splitter.on(".")
                            .trimResults()
                            .omitEmptyStrings()
                            .splitToList(path));
                    if (pathList.containsAll(Lists.transform(moveIdList, String::valueOf))) {
                        showMessage("移动失败");
                        return true;
                    }
                    mPresenter.moveResourceList(moveIdList, path,
                            o -> resourceViewRefresh(true, false));
                    break;
            }
            return true;
        });

        // Setup drop down refresh
        SwipeRefreshLayout swipeRefreshLayout = root.findViewById(R.id.swipeRefreshView);
        swipeRefreshLayout.setOnRefreshListener(() -> {
            swipeRefreshLayout.setRefreshing(false);
            resourceViewRefresh(true, true);
        });

        mResourceAdapter = new ResourceAdapter(R.layout.resource_item, MovePresenter.fetchLocalResources(path));
        mResourceAdapter.openLoadAnimation();
        mResourceAdapter.isFirstOnly(false);
        mResourceAdapter.setUpFetchEnable(true);
        mResourceAdapter.setEmptyView(R.layout.empty_view, mRecyclerView);
        mResourceAdapter.setOnItemClickListener((adapter, view, position) -> {
            Resource item = ((List<Resource>) adapter.getData()).get(position);
            if (!item.isFile()) {
                path = ResourceUtil.getINSTANCE().pushPath(path, item.getId());
                resourceViewRefresh(false, true);
            }
        });
        mRecyclerView.setAdapter(mResourceAdapter);

        return root;
    }

    @Override
    public boolean onBackPressed() {
        if (!path.equals("0")) {
            path = ResourceUtil.getINSTANCE().popPath(path);
            resourceViewRefresh(true, false);
            return true;
        }
        return super.onBackPressed();
    }

    // UI operate

    @Override
    public void resourceViewRefresh(Boolean openAnimation, Boolean remote) {
        if (openAnimation) mResourceAdapter.openLoadAnimation();
        else mResourceAdapter.closeLoadAnimation();
        if (remote) {
            MovePresenter.fetchRemoteResources(resources -> {
                mResourceAdapter.setNewData(MovePresenter.fetchLocalResources(path));
            });
        } else {
            mResourceAdapter.setNewData(MovePresenter.fetchLocalResources(path));
        }
    }
}
