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
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AutoCompleteTextView;
import android.widget.EditText;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import com.mobsandgeeks.saripaar.ValidationError;
import com.mobsandgeeks.saripaar.Validator;
import com.mobsandgeeks.saripaar.annotation.Email;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;
import com.mrdaisite.android.R;
import com.mrdaisite.android.adapter.ResourceAdapter;
import com.mrdaisite.android.data.model.ResourceBean;
import com.mrdaisite.android.ui.BaseFragment;
import com.mrdaisite.android.util.ResourceUtil;
import com.orhanobut.logger.Logger;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.Unbinder;

import static com.google.common.base.Preconditions.checkNotNull;

public class DriveFragment extends BaseFragment implements DriveContract.View, Validator.ValidationListener {

    public static String path = "0";

    // UI references.
    @BindView(R.id.resourceRecyclerView)
    RecyclerView mRecyclerView;
    private TextView mProfileUsernameView;
    private TextView mProfileEmailView;
    @NotEmpty
    @Email
    private EditText renameResourceView;

    private ResourceAdapter resourceAdapter;
    private Unbinder unbinder;
    private static DriveContract.Presenter mPresenter;
    private Validator mValidator;
    private ResourceBean mResourceBean;

    public static DriveFragment newInstance() {

        Bundle args = new Bundle();

        DriveFragment fragment = new DriveFragment();
        fragment.setArguments(args);
        return fragment;
    }

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

        resourceAdapter = new ResourceAdapter(R.layout.resource_item, mPresenter.getResourceBeanList(path));
        resourceAdapter.openLoadAnimation();
        resourceAdapter.isFirstOnly(false);
        resourceAdapter.setUpFetchEnable(true);
        resourceAdapter.setOnItemClickListener((adapter, view, position) -> {
            List<ResourceBean> data = adapter.getData();
            ResourceBean item = data.get(position);
            if (!item.isFile()) {
                path = ResourceUtil.getINSTANCE().pushPath(path, item.getId());
                resourceViewRefresh(resourceAdapter, mPresenter.getResourceBeanList(path));
            }
        });
        resourceAdapter.setOnItemLongClickListener((adapter, view, position) -> {
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
                        // handle menu2 click
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
        if (!path.equals("0")) {
            path = ResourceUtil.getINSTANCE().popPath(path);
            resourceViewRefresh(resourceAdapter, mPresenter.getResourceBeanList(path));
            return true;
        }
        return super.onBackPressed();
    }

    @Override
    public void setPresenter(DriveContract.Presenter presenter) {
        mPresenter = checkNotNull(presenter);
    }

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
    public void showRenameDialog(int position) {
        LayoutInflater inflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View mRenameView = inflater.inflate(R.layout.dialog_rename, null);
        renameResourceView = mRenameView.findViewById(R.id.newResourceName);
        mResourceBean = mPresenter.getResourceBeanList(path).get(position);
        renameResourceView.setText(mResourceBean.getResourceName());
        new AlertDialog.Builder(getActivity())
                .setTitle(R.string.rename)
                .setView(mRenameView)
                .setNegativeButton(R.string.cancel, null)
                .setPositiveButton(R.string.ok, (dialogInterface, i) -> {
                    Logger.e(renameResourceView.getText().toString());
                    mValidator.validate();
                })
                .setCancelable(false)
                .create()
                .show();
    }

    @Override
    public void resourceViewRefresh(ResourceAdapter resourceAdapter, List<ResourceBean> currentResourceList) {
        resourceAdapter.setNewData(currentResourceList);
        resourceAdapter.notifyDataSetChanged();
    }

    @Override
    public void onValidationSucceeded() {
        mPresenter.renameResource(resourceAdapter, mResourceBean.getId(), renameResourceView.getText().toString());
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
