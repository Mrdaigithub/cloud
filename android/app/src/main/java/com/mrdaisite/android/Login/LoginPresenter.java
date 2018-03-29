package com.mrdaisite.android.Login;

import android.support.annotation.NonNull;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by dai on 2018/3/26.
 */
public class LoginPresenter implements LoginContract.Presenter {

    @NonNull
    private final LoginContract.View mLoginView;

    public LoginPresenter(LoginFragment loginFragment) {
        mLoginView = checkNotNull(loginFragment, "splashView cannot be null!");
        mLoginView.setPresenter(this);
    }

    @Override
    public void subscribe() {

    }

    @Override
    public void unsubscribe() {

    }
}
