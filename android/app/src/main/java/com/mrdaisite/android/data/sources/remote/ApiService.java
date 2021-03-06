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

import com.mrdaisite.android.data.model.Preprocess;
import com.mrdaisite.android.data.model.Resource;
import com.mrdaisite.android.data.model.Token;
import com.mrdaisite.android.data.model.Uploading;
import com.mrdaisite.android.data.model.User;

import java.util.List;
import java.util.Map;

import io.reactivex.Observable;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Response;
import retrofit2.http.DELETE;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.PATCH;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.PartMap;
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
    Observable<List<Resource>> getResources();

    /**
     * 创建文件夹
     *
     * @return
     */
    @FormUrlEncoded
    @POST("/api/v1/resources")
    Observable<Resource> mkdir(@Field("path") String path, @Field("resource_name") String newResourceName);

    /**
     * 重命名资源
     *
     * @return
     */
    @FormUrlEncoded
    @PATCH("/api/v1/resources/{id}")
    Observable<Resource> renameResource(@Path("id") long resourceId, @Field("resource_name") String newResourceName);

    /**
     * 移动资源
     *
     * @return
     */
    @FormUrlEncoded
    @PATCH("/api/v1/resources/{id}/move")
    Observable<Resource> moveResource(@Path("id") long resourceId, @Field("path") String path);

    /**
     * 将资源移至回收站
     *
     * @return
     */
    @PATCH("/api/v1/resources/{id}/trash")
    Observable<Resource> trashedResource(@Path("id") long resourceId);

    /**
     * 还原回收站中的资源
     *
     * @return
     */
    @PATCH("/api/v1/resources/{id}/restore")
    Observable<Resource> restoreResource(@Path("id") long resourceId);

    /**
     * 永久删除回收站的资源
     *
     * @return
     */
    @DELETE("/api/v1/resources/{id}")
    Observable<Response<Void>> removeResource(@Path("id") long resourceId);

    /**
     * 文件上传预处理（判断秒传）
     *
     * @return
     */
    @FormUrlEncoded
    @POST("/aetherupload/preprocess")
    Observable<Preprocess> preprocess(@Field("file_name") String filename,
                                      @Field("file_size") long fileSize,
                                      @Field("file_hash") String fileHash,
                                      @Field("locale") String locale,
                                      @Field("group") String group,
                                      @Field("path") String path);

    /**
     * 上传文件
     *
     * @param file
     * @param partMap
     * @return
     */
    @Multipart
    @POST("/aetherupload/uploading")
    Observable<Uploading> uploading(
            @Part MultipartBody.Part file,
            @PartMap Map<String, RequestBody> partMap);


    /**
     * 获取资源下载的secret
     *
     * @param resourceId
     * @return
     */
    @GET("/resources/secret/{id}")
    Observable<String> getDownload(@Path("id") long resourceId);
}
