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


import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import com.orhanobut.logger.Logger;

import java.text.ParsePosition;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.text.SimpleDateFormat;

public class ResourceUtil {
    private static ResourceUtil INSTANCE;

    private ResourceUtil() {
    }

    public static ResourceUtil getINSTANCE() {
        if (INSTANCE == null) INSTANCE = new ResourceUtil();
        return INSTANCE;
    }

    /**
     * 转化文件大小添加合适单位
     *
     * @param resourceSize
     * @return
     */
    public String computeFileSize(Long resourceSize) {
        if (resourceSize < Math.pow(Constants.CONVERT_UTIL, 1)) {
            return String.valueOf(resourceSize) + "B";
        } else if (resourceSize < Math.pow(Constants.CONVERT_UTIL, 2)) {
            return String.valueOf(Math.round(resourceSize / Math.pow(Constants.CONVERT_UTIL, 1))) + "KB";
        } else if (resourceSize < Math.pow(Constants.CONVERT_UTIL, 3)) {
            return String.valueOf(Math.round(resourceSize / Math.pow(Constants.CONVERT_UTIL, 2))) + "MB";
        } else if (resourceSize < Math.pow(Constants.CONVERT_UTIL, 4)) {
            return String.valueOf(Math.round(resourceSize / Math.pow(Constants.CONVERT_UTIL, 3))) + "GB";
        } else if (resourceSize < Math.pow(Constants.CONVERT_UTIL, 5)) {
            return String.valueOf(Math.round(resourceSize / Math.pow(Constants.CONVERT_UTIL, 4))) + "TB";
        } else {
            return String.valueOf(Math.round(resourceSize / Math.pow(Constants.CONVERT_UTIL, 5))) + "PB";
        }
    }

    /**
     * 转化ISO8601时间格式至用户友好的格式
     *
     * @param iso8601
     * @return
     */
    public String formatISO8601(String iso8601) {
        Date sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss")
                .parse(iso8601, new ParsePosition(0));
        return (1900 + sdf.getYear()) + "/" + (sdf.getMonth() + 1) + "/" + sdf.getDate() + "," + sdf.getHours() + ":" + sdf.getMinutes();
    }

    /**
     * 获取资源后缀名
     *
     * @param resourceName
     * @return
     */
    public String getExt(String resourceName) {
        List<String> type = Splitter.on(".")
                .trimResults()
                .omitEmptyStrings()
                .splitToList(resourceName);
        return type.get(type.size() - 1).toLowerCase();
    }

    /**
     * 获取下一级路径
     *
     * @param path
     * @param id
     * @return
     */
    public String pushPath(String path, long id) {
        return path + "." + id;
    }

    /**
     * 获取上一级路径
     *
     * @param path
     * @return
     */
    public String popPath(String path) {
        List<String> pathList = new ArrayList<>(Splitter.on(".")
                .trimResults()
                .omitEmptyStrings()
                .splitToList(path));
        pathList.remove(pathList.size() - 1);
        return Joiner.on(".")
                .skipNulls()
                .join(pathList);
    }
}
