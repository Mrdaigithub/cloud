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
import android.support.annotation.NavigationRes;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.mobsandgeeks.saripaar.annotation.NotEmpty;
import com.mrdaisite.android.R;
import com.mrdaisite.android.adapter.ResourceAdapter;
import com.orhanobut.logger.Logger;

import org.w3c.dom.Text;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import butterknife.Unbinder;

import static com.google.common.base.Preconditions.checkNotNull;

public class DriveFragment extends Fragment implements DriveContract.View {

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

        ResourceAdapter resourceAdapter = new ResourceAdapter(new String[]{"world", "hello", "world"});
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

    @OnClick(R.id.testButton)
    public void testHandle() {
        mPresenter.test();
    }

    @Override
    public void showMessage(String msg) {

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
