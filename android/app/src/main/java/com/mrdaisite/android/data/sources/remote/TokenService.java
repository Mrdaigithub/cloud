package com.mrdaisite.android.data.sources.remote;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.POST;

/**
 * Created by dai on 2018/3/30.
 */
public interface TokenService {
    @POST("api/v1/login/password")
    Call<TokenService> getToken();
}
