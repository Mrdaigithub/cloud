package com.mrdaisite.android.Login;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;

import com.mrdaisite.android.R;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by dai on 2018/3/29.
 * <p>
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class LoginFragment extends Fragment implements LoginContract.View {

    // UI references.
    private AutoCompleteTextView mUsernameView;
    private EditText mPasswordView;
    private Button mloginButton;

    private LoginContract.Presenter mPersenter;

    public static LoginFragment newInstance() {

        Bundle args = new Bundle();

        LoginFragment fragment = new LoginFragment();
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
        mPersenter.subscribe();
    }

    @Override
    public void onPause() {
        super.onPause();
        mPersenter.unsubscribe();
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.login_frag, container, false);

        // Set up login view
        mUsernameView = root.findViewById(R.id.username);
        mPasswordView = root.findViewById(R.id.password);
        mloginButton = root.findViewById(R.id.login_button);
        mloginButton.setOnClickListener(__ -> mPersenter.attemptLogin(
                mUsernameView.getText().toString(),
                mPasswordView.getText().toString()));

        return root;
    }

    @Override
    public void toLoginActivity() {
        Intent intent = new Intent(getContext(), LoginActivity.class);
        startActivity(intent);
    }

    @Override
    public void setPresenter(LoginContract.Presenter presenter) {
        mPersenter = checkNotNull(presenter);
    }
}
