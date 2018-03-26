package com.mrdaisite.android.splash;


import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.mrdaisite.android.MainActivity;
import com.mrdaisite.android.R;

import static com.google.common.base.Preconditions.checkNotNull;


/**
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class SplashFragment extends Fragment implements SplashContract.View {

    private static final short SPLASH_SHOW_SECONDS = 2;
    private SplashContract.Presenter mPersenter;

    public static SplashFragment newInstance() {

        Bundle args = new Bundle();

        SplashFragment fragment = new SplashFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onResume() {
        super.onResume();
        mPersenter.subscribe();
    }

    @Override
    public void onPause() {
        super.onPause();
        mPersenter.unsubscribe();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.splash_frag, container, false);
    }

    @Override
    public void setPresenter(SplashContract.Presenter presenter) {
        mPersenter = checkNotNull(presenter);
    }

    @Override
    public void toMainActivity() {
        Intent intent = new Intent(getContext(), MainActivity.class);
        startActivity(intent);
    }
}
