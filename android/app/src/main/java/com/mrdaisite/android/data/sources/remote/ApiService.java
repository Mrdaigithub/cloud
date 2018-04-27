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

package com.mrdaisite.android.data.sources.remote;

import com.mrdaisite.android.data.model.ResourceBean;
import com.mrdaisite.android.data.model.Resources;
import com.mrdaisite.android.data.model.Token;
import com.mrdaisite.android.data.model.User;

import io.reactivex.Observable;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface ApiService {

    /**
     * 获取用户认证的token
     *
     * @param username
     * @param password
     * @return
     */
    @FormUrlEncoded
    @POST("/api/v1/login/password")
    Observable<Token> getToken(
            @Field("username") String username,
            @Field("password") String password
    );

    /**
     * 刷新已过期的token
     *
     * @param refresh_token
     * @return
     */
    @FormUrlEncoded
    @POST("/api/v1/token/refresh")
    Observable<Token> refreshToken(
            @Field("refresh_token") String refresh_token
    );

    /**
     * 获取当前用户信息
     *
     * @return
     */
    @GET("/api/v1/users/0")
    Observable<User> getUser();

    /**
     * 获取用户的资源列表
     *
     * @return
     */
    @GET("/api/v1/resources")
    Observable<Resources> getResources();

    /**
     * 创建文件夹
     *
     * @return
     */
    @FormUrlEncoded
    @POST("/api/v1/resources")
    Observable<ResourceBean> mkdir(@Field("path") String path, @Field("resource_name") String newResourceName);

    /**
     * 重命名资源
     *
     * @return
     */
    @FormUrlEncoded
    @PATCH("/api/v1/resources/{id}")
    Observable<ResourceBean> renameResource(@Path("id") long resourceId, @Field("resource_name") String newResourceName);

    /**
     * 重命名资源
     *
     * @return
     */
    @PATCH("/api/v1/resources/{id}/trash")
    Observable<ResourceBean> trashedResource(@Path("id") long resourceId);
}
