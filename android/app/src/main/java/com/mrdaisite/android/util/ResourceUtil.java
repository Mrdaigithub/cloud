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

import java.io.File;
import java.util.logging.Logger;

public class ResourceUtil {
    private static ResourceUtil INSTANCE;

    public static ResourceUtil getINSTANCE() {
        if (INSTANCE == null) {
            INSTANCE = new ResourceUtil();
        }
        return INSTANCE;
    }

    ResourceUtil() {
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
     * 获取资源mime
     *
     * @param resourceName
     */
    public String getMimeType(String resourceName) {
        File f = new File(resourceName);
        return new MimetypesFileTypeMap();
    }
}
