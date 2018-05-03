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

package com.mrdaisite.android.ui.Trash;

import android.app.AlertDialog;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import com.mrdaisite.android.R;
import com.mrdaisite.android.adapter.ResourceAdapter;
import com.mrdaisite.android.data.model.ResourceBean;
import com.mrdaisite.android.ui.BaseFragment;
import com.mrdaisite.android.util.CallbackUnit;
import com.orhanobut.logger.Logger;

import java.util.ArrayList;
import java.util.List;

import static com.google.common.base.Preconditions.checkNotNull;

public class TrashFragment extends BaseFragment implements TrashContract.View {

    // UI references.
    private RecyclerView mRecyclerView;

    private static TrashContract.Presenter mPresenter;
    private ResourceAdapter mResourceAdapter;
    private ResourceBean mResourceBean;
    private Boolean selectMode = false;
    private List<Integer> selectedList = new ArrayList<>();
    private List<Integer> removeResourcePositionList = new ArrayList<>();


    // Setup

    public static TrashFragment newInstance() {

        Bundle args = new Bundle();

        TrashFragment fragment = new TrashFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void setPresenter(TrashContract.Presenter presenter) {
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
        View root = inflater.inflate(R.layout.trash_frag, container, false);

        mRecyclerView = root.findViewById(R.id.resourceRecyclerView);
        mRecyclerView.setHasFixedSize(true);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);

        // Add toolbar menu listener
        Toolbar toolbar = getActivity().findViewById(R.id.toolbar);
        toolbar.setOnMenuItemClickListener(item -> {
            switch (item.getItemId()) {
                case R.id.clearTrash:
                    removeResourcePositionList = selectedList;

                    if (removeResourcePositionList.size() > 0) {
                        showRemoveDialog();
                    }
                    break;
            }
            return true;
        });
        Logger.e(String.valueOf(1));

        mResourceAdapter = new ResourceAdapter(R.layout.resource_item, mPresenter.fetchLocalTrashedResources());
        mResourceAdapter.openLoadAnimation();
        mResourceAdapter.isFirstOnly(false);
        mResourceAdapter.setUpFetchEnable(true);
        mResourceAdapter.setEmptyView(R.layout.empty_view, mRecyclerView);
        mResourceAdapter.setOnItemChildClickListener((adapter, view, position) -> {
            PopupMenu popupMenu = new PopupMenu(getActivity(), view);
            popupMenu.inflate(R.menu.trash_resource_item_menu);
            popupMenu.setOnMenuItemClickListener(menuItem -> {
                switch (menuItem.getItemId()) {
                    case R.id.restore:
                        showRestoreDialog(position);
                        break;
                    case R.id.removePermanently:
//                        removeResourcePositionList.add(position);
//                        showRemoveDialog();
                        break;
                }
                return false;
            });
            popupMenu.show();
        });
        mRecyclerView.setAdapter(mResourceAdapter);

        return root;
    }

    @Override
    public boolean onBackPressed() {
        if (selectMode) return exitSelectMode();
        return super.onBackPressed();
    }

    // Show Dialog

    @Override
    public void showMessage(String msg) {
        Toast.makeText(getContext(), msg, Toast.LENGTH_SHORT).show();
    }

    public void showRemoveDialog() {
        new AlertDialog.Builder(getActivity())
                .setTitle("彻底删除文件?")
                .setNegativeButton(R.string.cancel, null)
                .setPositiveButton(R.string.ok, (dialogInterface, i) -> {
                })
                .create()
                .show();
    }

    public void showRestoreDialog(int position) {
        new AlertDialog.Builder(getActivity())
                .setTitle("恢复此资源?")
                .setNegativeButton(R.string.cancel, null)
                .setPositiveButton(R.string.ok,
                        (dialogInterface, i) -> mPresenter.RestoreResource(mResourceAdapter.getData().get(position).getId(),
                                o -> resourceViewRefresh(true, false)))
                .create()
                .show();
    }


    // UI operate

    public Boolean exitSelectMode() {
        selectMode = false;
//        resourceViewRefresh(false, false);
        selectedList.clear();
        return true;
    }

    @Override
    public void resourceViewRefresh(Boolean openAnimation, Boolean remote) {
        if (openAnimation) mResourceAdapter.openLoadAnimation();
        else mResourceAdapter.closeLoadAnimation();
        if (remote) {
            mPresenter.fetchRemoteResources(resources -> {
                Logger.e(resources.toString());
//                Map<String, List<ResourceBean>> resourcesData = ((Resources) resources).getData();
//                for (List<ResourceBean> rList : resourcesData.values()) {
//                    for (ResourceBean rItem : rList) {
//                        mPresenter.appendResourceItem(rItem);
//                    }
//                }
//                resourceAdapter.setNewData(mPresenter.fetchLocalResources(path));
            });
        } else {
            mResourceAdapter.setNewData(mPresenter.fetchLocalTrashedResources());
        }
    }
}
