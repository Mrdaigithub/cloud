package com.mrdaisite.android.Login;

import android.support.annotation.NonNull;
import android.util.Log;

import com.mrdaisite.android.data.sources.remote.TokenService;
import com.mrdaisite.android.util.ApiUtils;

import java.io.IOException;
import java.util.List;

import io.reactivex.Flowable;
import okhttp3.Request;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.http.GET;
import retrofit2.http.Path;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by dai on 2018/3/26.
 */
public class LoginPresenter implements LoginContract.Presenter {

    private TokenService mtokenService;

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

    @Override
    public void attemptLogin(String username, String password) {
        checkNotNull(username, "parameter username is not exists");
        checkNotNull(password, "parameter username is not exists");
    }

    public void getToken() {
        mtokenService = ApiUtils.getTokenService();
        mtokenService.getToken().enqueue(new Call<TokenService>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
            }
        });
    }
}
