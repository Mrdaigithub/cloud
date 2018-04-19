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

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.mobsandgeeks.saripaar.annotation.NotEmpty;
import com.mrdaisite.android.R;
import com.mrdaisite.android.adapter.ResourceAdapter;
import com.mrdaisite.android.data.model.ResourceBean;
import com.mrdaisite.android.util.ResourceUtil;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import butterknife.Unbinder;

import static com.google.common.base.Preconditions.checkNotNull;

public class DriveFragment extends Fragment implements DriveContract.View {

    public static String path = "0";
    private List<ResourceBean> resourceBeanList;

    // UI references.
    @NotEmpty
    @BindView(R.id.resourceRecyclerView)
    RecyclerView mRecyclerView;
    @NotEmpty
    private NavigationView mNavigationView;
    @NotEmpty
    private View mProfileView;
    @NotEmpty
    private TextView mProfileUsernameView;
    @NotEmpty
    private TextView mProfileEmailView;

    private Unbinder unbinder;
    private DriveContract.Presenter mPresenter;

    public static DriveFragment newInstance() {

        Bundle args = new Bundle();

        DriveFragment fragment = new DriveFragment();
        fragment.setArguments(args);
        return fragment;
    }

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
        View root = inflater.inflate(R.layout.drive_frag, container, false);
        unbinder = ButterKnife.bind(this, root);

        // Set up resources view
        mNavigationView = (NavigationView) getActivity().findViewById(R.id.nav_view);
        mProfileView = mNavigationView.getHeaderView(0);
        mProfileUsernameView = (TextView) mProfileView.findViewById(R.id.profileUsernameView);
        mProfileEmailView = (TextView) mProfileView.findViewById(R.id.profileEmailView);

        mRecyclerView.setHasFixedSize(true);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(getActivity());
        mRecyclerView.setLayoutManager(mLayoutManager);
        resourceBeanList = mPresenter.getResourceBeanList(path);

        ResourceAdapter resourceAdapter = new ResourceAdapter(R.layout.resource_item, resourceBeanList);
        resourceAdapter.openLoadAnimation();
        resourceAdapter.isFirstOnly(false);
        resourceAdapter.setUpFetchEnable(true);
        resourceAdapter.setOnItemClickListener(new BaseQuickAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(BaseQuickAdapter adapter, View view, int position) {
                List<ResourceBean> data = adapter.getData();
                ResourceBean item = data.get(position);
                if (!item.isFile()) {
                    path = ResourceUtil.getINSTANCE().pushPath(path, item.getId());
                    resourceBeanList = mPresenter.getResourceBeanList(path);
                    adapter.notifyDataSetChanged();
                }
            }
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
}
