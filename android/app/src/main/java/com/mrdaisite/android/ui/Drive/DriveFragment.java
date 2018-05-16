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

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.design.widget.NavigationView;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.PopupMenu;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.github.ybq.android.spinkit.animation.interpolator.Ease;
import com.google.common.primitives.Longs;
import com.mobsandgeeks.saripaar.ValidationError;
import com.mobsandgeeks.saripaar.Validator;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;
import com.mrdaisite.android.R;
import com.mrdaisite.android.adapter.ResourceAdapter;
import com.mrdaisite.android.data.model.Resource;
import com.mrdaisite.android.ui.BaseFragment;
import com.mrdaisite.android.ui.Move.MoveActivity;
import com.mrdaisite.android.util.Constants;
import com.mrdaisite.android.util.ResourceUtil;
import com.orhanobut.logger.Logger;


import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.Unbinder;
import pub.devrel.easypermissions.AppSettingsDialog;
import pub.devrel.easypermissions.EasyPermissions;

import static android.Manifest.permission.READ_EXTERNAL_STORAGE;
import static com.google.common.base.Preconditions.checkNotNull;
import static com.mrdaisite.android.util.Constants.REQUEST_CODE_READ_EXTERNAL_STORAGE;

public class DriveFragment extends BaseFragment implements DriveContract.View, Validator.ValidationListener {

    // UI references.
    @BindView(R.id.resourceRecyclerView)
    RecyclerView mRecyclerView;
    private Toolbar mToolbar;
    private TextView mProfileUsernameView;
    private TextView mProfileEmailView;
    @NotEmpty
    private EditText dialogTextView;

    public static String path = "0";
    private static DriveContract.Presenter mPresenter;
    public static ResourceAdapter resourceAdapter;
    private Unbinder unbinder;
    private Validator mValidator;
    private Resource mResource;

    private List<Integer> removeResourcePositionList = new ArrayList<>();
    private List<Integer> moveResourcePositionList = new ArrayList<>();

    public static Boolean selectMode = false;
    private List<Integer> selectedList = new ArrayList<>();
    private List<Long> moveIdList = new ArrayList<>();


    // Setup

    public static DriveFragment newInstance() {

        Bundle args = new Bundle();

        DriveFragment fragment = new DriveFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void setPresenter(DriveContract.Presenter presenter) {
        mPresenter = checkNotNull(presenter);
    }


    // Lifecycle

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mValidator = new Validator(this);
        mValidator.setValidationListener(this);
    }

    @Override
    public void onResume() {
        super.onResume();
        mPresenter.subscribe();
        if (resourceAdapter != null) {
            resourceViewRefresh(false, false);
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        mPresenter.unsubscribe();
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.drive_frag, container, false);
        unbinder = ButterKnife.bind(this, root);

        // Set up resources view
        NavigationView navigationView = getActivity().findViewById(R.id.nav_view);
        View profileView = navigationView.getHeaderView(0);
        mProfileUsernameView = profileView.findViewById(R.id.profileUsernameView);
        mProfileEmailView = profileView.findViewById(R.id.profileEmailView);

        mRecyclerView.setHasFixedSize(true);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);


        // Add toolbar menu listener
        mToolbar = getActivity().findViewById(R.id.toolbar);
        mToolbar.setTitle(ResourceUtil.getINSTANCE().formatPath(path));
        mToolbar.setOnMenuItemClickListener(item -> {
            switch (item.getItemId()) {
                case R.id.upload:
                    mPresenter.requestReadExternalStoragePermission(getActivity(), getContext());
                    break;
                case R.id.mkdir:
                    showMkdirDialog();
                    break;
                case R.id.fragmentMenuRemove:
                    removeResourcePositionList = selectedList;

                    if (removeResourcePositionList.size() > 0) {
                        showRemoveDialog();
                    }
                    break;
                case R.id.fragmentMenuMove:
                    moveResourcePositionList = selectedList;
                    moveIdList.clear();
                    for (int moveResourcePosition : moveResourcePositionList) {
                        moveIdList.add(resourceAdapter.getData().get(moveResourcePosition).getId());
                    }
                    Intent moveIntent = new Intent(getActivity(), MoveActivity.class);
                    moveIntent.putExtra("moveIdArray", Longs.toArray(moveIdList));
                    exitSelectMode();
                    startActivityForResult(moveIntent, Constants.REQUEST_CODE_MOVE_START);
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


        resourceAdapter = new ResourceAdapter(R.layout.resource_item, DrivePresenter.fetchLocalResources(path));
        resourceAdapter.openLoadAnimation();
        resourceAdapter.isFirstOnly(false);
        resourceAdapter.setUpFetchEnable(true);
        resourceAdapter.setEmptyView(R.layout.empty_view, mRecyclerView);
        resourceAdapter.setOnItemClickListener((adapter, view, position) -> {
            if (selectMode) {
                CheckBox mCheckbox = view.findViewById(R.id.resourceCheckBox);
                if (mCheckbox.isChecked()) {
                    mCheckbox.setChecked(false);
                    for (int i = 0; i < selectedList.size(); i++) {
                        if (selectedList.get(i) == position) {
                            selectedList.remove(i);
                            break;
                        }
                    }
                } else {
                    mCheckbox.setChecked(true);
                    selectedList.add(position);
                }
                return;
            }
            Resource item = ((List<Resource>) adapter.getData()).get(position);
            if (!item.isFile()) {
                path = ResourceUtil.getINSTANCE().pushPath(path, item.getId());
                mToolbar.setTitle(ResourceUtil.getINSTANCE().formatPath(path));
                resourceViewRefresh(false, true);
            }
        });
        resourceAdapter.setOnItemLongClickListener((adapter, view, position) -> {
            selectMode = true;
            resourceViewRefresh(false, false);

            return true;
        });
        resourceAdapter.setOnItemChildClickListener((BaseQuickAdapter adapter, View view, int position) -> {
            PopupMenu popupMenu = new PopupMenu(getActivity(), view);
            popupMenu.inflate(R.menu.drive_resource_item_menu);
            popupMenu.setOnMenuItemClickListener(menuItem -> {
                switch (menuItem.getItemId()) {
                    case R.id.resourceItemMenuRename:
                        showRenameDialog(position);
                        break;
                    case R.id.resourceItemMenuRemove:
                        removeResourcePositionList.add(position);
                        showRemoveDialog();
                        break;
                    case R.id.resourceItemMenuMove:
                        moveIdList.clear();
                        moveIdList.add(((Resource) Objects.requireNonNull(adapter.getItem(position))).getId());
                        Intent moveIntent = new Intent(getActivity(), MoveActivity.class);
                        moveIntent.putExtra("moveIdArray", Longs.toArray(moveIdList));
                        startActivityForResult(moveIntent, Constants.REQUEST_CODE_MOVE_START);
                        break;
                    case R.id.fragmentMenuResourceDetail:
                        showResourceDetailDialog(resourceAdapter.getItem(position));
                        break;
                }
                return false;
            });
            popupMenu.show();
        });
        mRecyclerView.setAdapter(resourceAdapter);

        resourceViewRefresh(true, true);

        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        unbinder.unbind();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (data == null) return;
        switch (requestCode) {
            case Constants.REQUEST_CODE_UPLOAD_START:
                mPresenter.handleUpload(ResourceUtil.getINSTANCE().getFilePathByUri(getActivity(), data.getData()));
                break;

            case Constants.REQUEST_CODE_MOVE_START:
                path = data.getStringExtra("path");
                resourceViewRefresh(true, true);
                break;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        // Forward results to EasyPermissions
        EasyPermissions.onRequestPermissionsResult(requestCode, permissions, grantResults, this);
    }


    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    public boolean onBackPressed() {
        if (selectMode) return exitSelectMode();
        if (!path.equals("0")) {
            path = ResourceUtil.getINSTANCE().popPath(path);
            mToolbar.setTitle(ResourceUtil.getINSTANCE().formatPath(path));
            resourceViewRefresh(true, false);
            return true;
        }
        return super.onBackPressed();
    }


    // Show Dialog

    @Override
    public void showRenameDialog(int position) {
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        assert inflater != null;
        @SuppressLint("InflateParams") View dialogView = inflater.inflate(R.layout.dialog_text, null);
        dialogTextView = dialogView.findViewById(R.id.dialogTextView);
        mResource = DrivePresenter.fetchLocalResources(path).get(position);
        dialogTextView.setHint(R.string.rename);
        dialogTextView.setText(mResource.getResourceName());
        new AlertDialog.Builder(getActivity())
                .setTitle(R.string.rename)
                .setView(dialogView)
                .setNegativeButton(R.string.cancel, null)
                .setPositiveButton(R.string.ok, (dialogInterface, i) -> mValidator.validate())
                .setCancelable(false)
                .create()
                .show();
    }

    public void showRemoveDialog() {
        new AlertDialog.Builder(getActivity())
                .setTitle("确认移至回收站?")
                .setNegativeButton(R.string.cancel, null)
                .setPositiveButton(R.string.ok, (dialogInterface, i) -> {
                    List<Long> resourceIdList = new ArrayList<>();
                    List<Resource> resourceList = DrivePresenter.fetchLocalResources(path);
                    for (Integer removeResourcePosition : removeResourcePositionList) {
                        resourceIdList.add(resourceList.get(removeResourcePosition).getId());
                    }
                    mPresenter.removeResources(resourceIdList, o -> {
                        removeResourcePositionList.clear();
                        if (DriveFragment.selectMode) {
                            selectMode = false;
                            selectedList.clear();
                        }
                        resourceViewRefresh(false, true);
                    });
                })
                .create()
                .show();
    }

    public void showMkdirDialog() {
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        assert inflater != null;
        @SuppressLint("InflateParams") View dialogView = inflater.inflate(R.layout.dialog_text, null);
        dialogTextView = dialogView.findViewById(R.id.dialogTextView);
        dialogTextView.setHint(R.string.mkdir);
        new AlertDialog.Builder(getActivity())
                .setTitle(R.string.mkdir)
                .setView(dialogView)
                .setNegativeButton(R.string.cancel, null)
                .setPositiveButton(R.string.ok, (dialogInterface, i) -> {
                    if (dialogTextView.getText().toString().equals("")) return;
                    mPresenter.mkdir(dialogTextView.getText().toString(),
                            o -> resourceViewRefresh(true, false));
                })
                .setCancelable(false)
                .create()
                .show();
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    public void showResourceDetailDialog(Resource resource) {
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        assert inflater != null;
        @SuppressLint("InflateParams") View dialogView = inflater.inflate(R.layout.resource_detail_dialog, null);
        TextView resourceSize = dialogView.findViewById(R.id.resourceSize);
        TextView resourcePath = dialogView.findViewById(R.id.resourcePath);
        TextView resourceCreatedDate = dialogView.findViewById(R.id.resourceCreatedDate);
        TextView resourceUpdateDate = dialogView.findViewById(R.id.resourceUpdateDate);
        resourceSize.setText(ResourceUtil.getINSTANCE().computeFileSize(resource.getSize()));
        resourcePath.setText(ResourceUtil.getINSTANCE().formatPath(resource.getPath()));
        resourceCreatedDate.setText(ResourceUtil.getINSTANCE().formatISO8601(resource.getCreatedAt()));
        resourceUpdateDate.setText(ResourceUtil.getINSTANCE().formatISO8601(resource.getUpdatedAt()));
        new AlertDialog.Builder(getActivity())
                .setTitle(resource.getResourceName())
                .setView(dialogView)
                .setPositiveButton(R.string.ok, (dialogInterface, i) -> {
                })
                .create()
                .show();
    }


    // UI operate

    @Override
    public void resourceViewRefresh(Boolean remote, Boolean animate) {
        if (animate) resourceAdapter.openLoadAnimation();
        else resourceAdapter.closeLoadAnimation();
        if (path == null) path = "0";
        if (remote) {
            DrivePresenter.fetchRemoteResources(resourceList -> {
                resourceAdapter.setNewData((List<Resource>) resourceList);
                resourceAdapter.setNewData(DrivePresenter.fetchLocalResources(path));
            });
        } else {
            resourceAdapter.setNewData(DrivePresenter.fetchLocalResources(path));
        }
    }

    @Override
    public void setProfileUsername(String username) {
        mProfileUsernameView.setText(username);
    }

    @Override
    public void setProfileEmail(String email) {
        mProfileEmailView.setText(email);
    }


    public boolean exitSelectMode() {
        selectMode = false;
        resourceViewRefresh(false, false);
        selectedList.clear();
        return true;
    }

    public void toSystemFileExplorer() {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*");
        intent.putExtra(Intent.EXTRA_MIME_TYPES, Constants.MINE_TYPES);
        startActivityForResult(intent, Constants.REQUEST_CODE_UPLOAD_START);
    }


    // Data validation

    @Override
    public void onValidationSucceeded() {
        mPresenter.renameResource(mResource.getId(),
                dialogTextView.getText().toString(),
                o -> resourceViewRefresh(false, false));
    }

    @Override
    public void onValidationFailed(List<ValidationError> errors) {
        for (ValidationError error : errors) {
            String message = error.getCollatedErrorMessage(getContext());
            showMessage(message);
        }
    }
}
