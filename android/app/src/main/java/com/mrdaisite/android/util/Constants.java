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

package com.mrdaisite.android.util;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import okhttp3.internal.http2.ErrorCode;

public class Constants {

    // API服务器 base url
    public static final String BASE_URL = "http://api.mrdaisite.com/";

    // API错误代码友好提示
    public static final HashMap<String, String> ERROR_CODES = new HashMap<String, String>() {
        {
            put("400000", "请求参数缺失");
            put("400001", "请求参数存在非法字符");
            put("400002", "请求参数格式错误");
            put("400003", "用户不存在");
            put("400004", "用户已存在");
            put("401000", "密码错误");
            put("401001", "用户未携带有效的access token");
            put("401002", "未授权");
            put("403000", "权限不足");
            put("409000", "上传的资源已存在于服务器");
            put("409001", "此用户的存储容量不足");
            put("500000", "网络错误");
            put("500001", "保存失败");
        }
    };

}
