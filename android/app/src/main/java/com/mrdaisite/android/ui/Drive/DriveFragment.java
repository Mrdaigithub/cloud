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

import android.app.AlertDialog;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import com.mobsandgeeks.saripaar.ValidationError;
import com.mobsandgeeks.saripaar.Validator;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;
import com.mrdaisite.android.R;
import com.mrdaisite.android.adapter.ResourceAdapter;
import com.mrdaisite.android.data.model.ResourceBean;
import com.mrdaisite.android.ui.BaseFragment;
import com.mrdaisite.android.util.ResourceUtil;
import com.orhanobut.logger.Logger;


import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.Unbinder;
import io.reactivex.Observable;
import io.reactivex.ObservableSource;
import io.reactivex.Observer;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;
import io.reactivex.functions.Function;
import io.reactivex.schedulers.Schedulers;

import static com.google.common.base.Preconditions.checkNotNull;

public class DriveFragment extends BaseFragment implements DriveContract.View, Validator.ValidationListener {

    // UI references.
    @BindView(R.id.resourceRecyclerView)
    RecyclerView mRecyclerView;
    private TextView mProfileUsernameView;
    private TextView mProfileEmailView;
    @NotEmpty
    private EditText dialogTextView;

    public static String path = "0";
    private static DriveContract.Presenter mPresenter;
    public static ResourceAdapter resourceAdapter;
    private Unbinder unbinder;
    private Validator mValidator;
    private ResourceBean mResourceBean;

    private List<Integer> removeResourcesList = new ArrayList<>();

    public static Boolean selectMode = false;
    private List<Integer> selectList = new ArrayList<>();


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
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        inflater.inflate(R.menu.menu_main, menu);
        super.onCreateOptionsMenu(menu, inflater);
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
        Toolbar toolbar = getActivity().findViewById(R.id.toolbar);
        toolbar.setOnMenuItemClickListener(item -> {
            switch (item.getItemId()) {
                case R.id.mkdir:
                    showMkdirDialog();
                    break;
                case R.id.fragmentMenuRemove:
                    break;
            }
            return true;
        });


        // Setup drop down refresh
        SwipeRefreshLayout swipeRefreshLayout = root.findViewById(R.id.swipeRefreshView);
        swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                Logger.e("refresh");
                resourceViewRefresh(mPresenter.getResourceBeanList(path));
                swipeRefreshLayout.setRefreshing(false);
            }
        });


        Button mButton = root.findViewById(R.id.test);
        mButton.setOnClickListener(view -> {
            Observable mObservable = Observable.just(1, 2, 3, 4)
                    .subscribeOn(Schedulers.newThread())
                    .observeOn(Schedulers.io())
                    .map(integer -> integer + 1000)
                    .flatMap((Function<Integer, ObservableSource<?>>) integer -> Observable.just(integer + 1, integer + 2, integer + 3))
                    .observeOn(AndroidSchedulers.mainThread());

            Observer mObserver = new Observer<Integer>() {
                @Override
                public void onSubscribe(Disposable d) {

                }

                @Override
                public void onNext(Integer o) {
                    Logger.e(String.valueOf(o));
                }

                @Override
                public void onError(Throwable e) {

                }

                @Override
                public void onComplete() {

                }
            };

            mObservable.subscribe(mObserver);

        });


        resourceAdapter = new ResourceAdapter(R.layout.resource_item, mPresenter.getResourceBeanList(path));
        resourceAdapter.openLoadAnimation();
        resourceAdapter.isFirstOnly(false);
        resourceAdapter.setUpFetchEnable(true);
        resourceAdapter.setOnItemClickListener((adapter, view, position) -> {
            if (selectMode) {
                CheckBox mCheckbox = view.findViewById(R.id.resourceCheckBox);
                if (mCheckbox.isChecked()) {
                    mCheckbox.setChecked(false);
                    for (int i = 0; i < selectList.size(); i++) {
                        if (selectList.get(i) == position) {
                            selectList.remove(i);
                            break;
                        }
                    }
                } else {
                    mCheckbox.setChecked(true);
                    selectList.add(position);
                }
                Logger.e(String.valueOf(selectList));
                return;
            }
            List<ResourceBean> data = adapter.getData();
            ResourceBean item = data.get(position);
            if (!item.isFile()) {
                path = ResourceUtil.getINSTANCE().pushPath(path, item.getId());
                resourceViewRefresh(mPresenter.getResourceBeanList(path));
            }
        });
        resourceAdapter.setOnItemLongClickListener((adapter, view, position) -> {
            selectMode = true;
            resourceAdapter.closeLoadAnimation();
            resourceViewRefresh(mPresenter.getResourceBeanList(path));

            return true;
        });
        resourceAdapter.setOnItemChildClickListener((adapter, view, position) -> {
            PopupMenu popupMenu = new PopupMenu(getActivity(), view);
            popupMenu.inflate(R.menu.resource_item_menu);
            popupMenu.setOnMenuItemClickListener(menuItem -> {
                switch (menuItem.getItemId()) {
                    case R.id.resourceItemMenuRename:
                        showRenameDialog(position);
                        break;
                    case R.id.resourceItemMenuRemove:
                        showRemoveDialog(position);
                        break;
                    case R.id.resourceItemMenuMove:
                        // handle menu3 click
                        break;
                }
                return false;
            });
            popupMenu.show();
        });
        mRecyclerView.setAdapter(resourceAdapter);

        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        unbinder.unbind();
    }

    @Override
    public boolean onBackPressed() {
        if (selectMode) {
            selectMode = false;
            resourceViewRefresh(mPresenter.getResourceBeanList(path));
            selectList.clear();
            return true;
        } else if (!path.equals("0")) {
            path = ResourceUtil.getINSTANCE().popPath(path);
            resourceViewRefresh(mPresenter.getResourceBeanList(path));
            return true;
        }
        return super.onBackPressed();
    }


    // Show Dialog

    @Override
    public void showRenameDialog(int position) {
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View dialogView = inflater.inflate(R.layout.dialog_text, null);
        dialogTextView = dialogView.findViewById(R.id.dialogTextView);
        mResourceBean = mPresenter.getResourceBeanList(path).get(position);
        dialogTextView.setHint(R.string.rename);
        dialogTextView.setText(mResourceBean.getResourceName());
        new AlertDialog.Builder(getActivity())
                .setTitle(R.string.rename)
                .setView(dialogView)
                .setNegativeButton(R.string.cancel, null)
                .setPositiveButton(R.string.ok, (dialogInterface, i) -> {
                    mValidator.validate();
                })
                .setCancelable(false)
                .create()
                .show();
    }

    public void showRemoveDialog(int position) {
        removeResourcesList.add(position);
        new AlertDialog.Builder(getActivity())
                .setTitle("确认移至回收站?")
                .setNegativeButton(R.string.cancel, null)
                .setPositiveButton(R.string.ok, (dialogInterface, i) -> {
                })
                .create()
                .show();
    }

    public void showMkdirDialog() {
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View dialogView = inflater.inflate(R.layout.dialog_text, null);
        dialogTextView = dialogView.findViewById(R.id.dialogTextView);
        dialogTextView.setHint(R.string.mkdir);
        new AlertDialog.Builder(getActivity())
                .setTitle(R.string.mkdir)
                .setView(dialogView)
                .setNegativeButton(R.string.cancel, null)
                .setPositiveButton(R.string.ok, (dialogInterface, i) -> {
                    if (dialogTextView.getText().toString().equals("")) return;
                    mPresenter.mkdir(dialogTextView.getText().toString());
                })
                .setCancelable(false)
                .create()
                .show();
    }


    // UI operate

    @Override
    public void showMessage(String msg) {
        Toast.makeText(getContext(), msg, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void setProfileUsername(String username) {
        mProfileUsernameView.setText(username);
    }

    @Override
    public void setProfileEmail(String email) {
        mProfileEmailView.setText(email);
    }

    @Override
    public void resourceViewRefresh(List<ResourceBean> currentResourceList) {
        resourceAdapter.setNewData(currentResourceList);
        resourceAdapter.notifyDataSetChanged();
    }


    // Data validation

    @Override
    public void onValidationSucceeded() {
        mPresenter.renameResource(mResourceBean.getId(), dialogTextView.getText().toString());
    }

    @Override
    public void onValidationFailed(List<ValidationError> errors) {
        for (ValidationError error : errors) {
            View view = error.getView();
            String message = error.getCollatedErrorMessage(getContext());
            showMessage(message);
        }
    }
}
