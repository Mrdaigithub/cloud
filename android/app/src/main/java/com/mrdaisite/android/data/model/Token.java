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

package com.mrdaisite.android.data.model;

import com.google.common.base.Objects;

import io.objectbox.annotation.Entity;
import io.objectbox.annotation.Id;
import io.objectbox.annotation.Transient;

public class Token {

    /**
     * token_type : Bearer
     * expires_in : 1799
     * access_token : eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE4MjFkMWY3M2I4YWQ2NDE3MWY4ODNhN2Q3MWM3YjQxYjZiNmJlYTc2ZTk3ZDcwMGUyOWJkM2VhZmUyODc2YTZmODlmZDQwNmFjNDZhZTQ5In0.eyJhdWQiOiIxIiwianRpIjoiYTgyMWQxZjczYjhhZDY0MTcxZjg4M2E3ZDcxYzdiNDFiNmI2YmVhNzZlOTdkNzAwZTI5YmQzZWFmZTI4NzZhNmY4OWZkNDA2YWM0NmFlNDkiLCJpYXQiOjE1MjM0MTQ0NjcsIm5iZiI6MTUyMzQxNDQ2NywiZXhwIjoxNTIzNDE2MjY3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.vFLYQVhfhB0owk119j4CkFj7NtQh1J4z9Ny_1OvBRu-Zhv6uhwue-RWk8iIaa_wovga-znapYCX_vyJvPq72JVllFqQE81XVdY7fPbxBzda4xlOpB7Ctm4WuZDlmDfmxIDbu2K5aCNIsSaMI7ZGQX5XREyMyOy0YVsWDYMqxfp2-NAON7gudQ7AyUl68Nibl3IKD02z-ulTiUgb7xh8MrC89IAuLkgSVo8d_F6PoH2QXPPJ1EOin7DfMOz5oAcwy2PRfLLWjI5RucP54jnRB91OOzhImKUvFrkvGiqfSDJQsofnHjrNOnRzmu7lii5xdyV0lSaklBnX3MalNTIEet90Lv1natXxJKJOQU9fST98CYke7ZRSOcpV1cMNnFJNS2SlxJht3v2QzsW0sSJJAiOcz-rJazeAaJ8KX315yKvfOMvY8bRSOJUr8GQNY3JfNFn6lahfhuVn7mMV59JOxAodZnjR6VLLp_Zx1OzSUfdUfu0lde6EgbMxjlEH7Frgedi8rWMpJJEPeJwjFsnCLI1usHGLTQ1qWO6MRqROuIlAV65DZwYaeqwBs7kpIK27vz-utFlj6GcxiPOrKPkK589hre69qyEBbs8ng5OtFzXkE72VNBwiyO3G8sVy6JWnKW9Vp0-RSeAxOVbwY7u2JFkz8hhXAVOiL-wBtCpuMnBo
     * refresh_token : def50200259b9aa162fc20a303b254721ead2f5daffc2cc1b9481a522c64a6d7267963743a3217df914e922622a9be670fa291cfed8c158e559193460016ddd8603d5b50f7212293d5ff77817d980702b75e42dccae217fb85af244eca533e6e54bfe09bf72192725c525c04f3fefbd34401db5e3c461266e8f89cc1387662add80339e5248f1b25e4e07a81fdf35c7a8e87e4153f1a7fdb73a1896ce1f05d6ed613015c774268a095ab3a4059b5b7af2099c83ab61a8f70b0b6b34d6db11957321d9c473c6467bee0a364572f08d7875bfa66a1114d1a8c5c8696487686257d963bbf4194d28ac8d5af8e4d8889df3251f92d3db8a50ccb2d8ecedbd3b944f12e1d6e7bb1d95c98643c3b4a588a50a8deb0a5b97026e5d6a6f298012d8db1abe0810a3d9668455d93c0c5c31e5f8ce4061a308e3a7cccfee37a9efed9ac461c99adbda0fbee0f0a11b353df974544f304169d63b66e181b4d1c0068adb8a0c9f8
     */

    private String token_type;
    private int expires_in;
    private String access_token;
    private String refresh_token;

    public String getToken_type() {
        return token_type;
    }

    public void setToken_type(String token_type) {
        this.token_type = token_type;
    }

    public int getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(int expires_in) {
        this.expires_in = expires_in;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getRefresh_token() {
        return refresh_token;
    }

    public void setRefresh_token(String refresh_token) {
        this.refresh_token = refresh_token;
    }

    @Override
    public String toString() {
        return "Token{" +
                "token_type='" + token_type + '\'' +
                ", expires_in=" + expires_in +
                ", access_token='" + access_token + '\'' +
                ", refresh_token='" + refresh_token + '\'' +
                '}';
    }
}
