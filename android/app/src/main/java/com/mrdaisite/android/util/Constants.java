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

import com.mrdaisite.android.R;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Constants {

    private static Constants INSTANCES;

    private Constants() {
    }

    public static Constants getInstances() {
        if (INSTANCES == null) INSTANCES = new Constants();
        return INSTANCES;
    }

    // API服务器 base url
    public static final String BASE_URL = "http://api.mrdaisite.com/";

    // 转换单元
    public static final int CONVERT_UTIL = 1024;

    // 上传大文件切片的容量大小
    public static final long CHUNK_SIZE = 2097152;

    // Intent request code
    public static final int REQUEST_CODE_UPLOAD_START = 1;
    public static final int REQUEST_CODE_MOVE_START = 2;
    public static final int REQUEST_CODE_MOVE_DONE = 3;
    public static final int REQUEST_CODE_READ_EXTERNAL_STORAGE = 4;

    // API错误代码友好提示
    public static final HashMap<String, String> ERROR_CODES = new HashMap<String, String>() {
        {
            put("400000", "参数缺失");
            put("400001", "参数字符过短");
            put("400002", "参数字符过长");
            put("400003", "请求参数存在非法字符");
            put("400004", "请求参数格式错误");
            put("400005", "请求参数不存在于数据库");
            put("400006", "请求参数已存在于数据库");
            put("401000", "密码错误");
            put("401001", "无效的的access_token");
            put("401002", "无效的的refresh_token");
            put("403000", "权限不足");
            put("409000", "上传的资源已存在于服务器");
            put("409001", "请求的资源不存在");
            put("409002", "此用户的存储容量不足");
            put("500000", "服务器错误");
            put("500001", "服务器资源保存失败");
        }
    };

    // 文件后缀与icon图标的映射
    public static final HashMap<String, Integer> EXT_ICON_MAP = new HashMap<String, Integer>() {
        {
            put("3gp", R.drawable.ic_3gp);
            put("7z", R.drawable.ic_7z);
            put("avi", R.drawable.ic_avi);
            put("bmp", R.drawable.ic_bmp);
            put("css", R.drawable.ic_css);
            put("doc", R.drawable.ic_doc);
            put("docx", R.drawable.ic_doc);
            put("xlsx", R.drawable.ic_excel);
            put("xls", R.drawable.ic_excel);
            put("exe", R.drawable.ic_exe);
            put("msi", R.drawable.ic_exe);
            put("gif", R.drawable.ic_gif);
            put("html", R.drawable.ic_html);
            put("htm", R.drawable.ic_html);
            put("jar", R.drawable.ic_jar);
            put("jpg", R.drawable.ic_jpg);
            put("js", R.drawable.ic_js);
            put("md", R.drawable.ic_md);
            put("mp4", R.drawable.ic_mp4);
            put("mpeg", R.drawable.ic_mpeg);
            put("pdf", R.drawable.ic_pdf);
            put("php", R.drawable.ic_php);
            put("png", R.drawable.ic_png);
            put("ppt", R.drawable.ic_ppt);
            put("rar", R.drawable.ic_rar);
            put("sql", R.drawable.ic_sql);
            put("svg", R.drawable.ic_svg);
            put("txt", R.drawable.ic_txt);
            put("text", R.drawable.ic_txt);
            put("vue", R.drawable.ic_vuejs);
        }
    };

    // 可上传的资源mine type
    public static final String[] MINE_TYPES = {
            // 文本
            "text/*",
            // 数据
            "application/*",
            // 图片
            "image/*",
            // 音乐
            "audio/*",
            // 视频
            "video/*"
    };
}
