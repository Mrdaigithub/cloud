package com.mrdaisite.android.util;

import com.mrdaisite.android.data.sources.remote.RetrofitClient;
import com.mrdaisite.android.data.sources.remote.TokenService;

import retrofit2.Retrofit;

/**
 * Created by dai on 2018/3/30.
 */
public class ApiUtils {
    public static final String BASE_URL = "http://api.mrdaisite.com/";

    public static TokenService getTokenService() {
        return RetrofitClient.getClient(BASE_URL).create(TokenService.class);
    }
}
