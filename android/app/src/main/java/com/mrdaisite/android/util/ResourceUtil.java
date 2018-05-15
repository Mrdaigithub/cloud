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


import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.Context;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.support.annotation.RequiresApi;
import android.support.v4.app.FragmentActivity;

import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import com.mrdaisite.android.MyApplication;
import com.mrdaisite.android.data.model.Resource;

import java.text.ParsePosition;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.text.SimpleDateFormat;

import io.objectbox.Box;

import static android.Manifest.permission.READ_EXTERNAL_STORAGE;
import static android.support.v4.app.ActivityCompat.requestPermissions;
import static android.support.v4.app.ActivityCompat.shouldShowRequestPermissionRationale;
import static android.support.v4.content.ContextCompat.checkSelfPermission;
import static com.mrdaisite.android.util.Constants.CONVERT_UTIL;
import static com.mrdaisite.android.util.Constants.REQUEST_CODE_READ_EXTERNAL_STORAGE;

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
        if (resourceSize < Math.pow(CONVERT_UTIL, 1)) {
            return String.valueOf(resourceSize) + "B";
        } else if (resourceSize < Math.pow(CONVERT_UTIL, 2)) {
            return String.valueOf(Math.round(resourceSize / Math.pow(CONVERT_UTIL, 1))) + "KB";
        } else if (resourceSize < Math.pow(CONVERT_UTIL, 3)) {
            return String.valueOf(Math.round(resourceSize / Math.pow(CONVERT_UTIL, 2))) + "MB";
        } else if (resourceSize < Math.pow(CONVERT_UTIL, 4)) {
            return String.valueOf(Math.round(resourceSize / Math.pow(CONVERT_UTIL, 3))) + "GB";
        } else if (resourceSize < Math.pow(CONVERT_UTIL, 5)) {
            return String.valueOf(Math.round(resourceSize / Math.pow(CONVERT_UTIL, 4))) + "TB";
        } else {
            return String.valueOf(Math.round(resourceSize / Math.pow(CONVERT_UTIL, 5))) + "PB";
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

    /**
     * {id1}.{id3}.{id3} => {name1}/{name2}/{name3}
     *
     * @param path
     * @return
     */
    @RequiresApi(api = Build.VERSION_CODES.N)
    public String formatPath(String path) {
        StringBuilder resultPath = new StringBuilder();
        Box<Resource> mResourceBeanBox = MyApplication.getInstance().getBoxStore().boxFor(Resource.class);
        List<String> pathList = new ArrayList<>(Splitter.on(".")
                .trimResults()
                .omitEmptyStrings()
                .splitToList(path));
        for (String pItem : pathList) {
            if (Long.parseLong(pItem) == 0) {
                resultPath.append("/");
                continue;
            }
            resultPath.append(mResourceBeanBox.get(Long.parseLong(pItem)).getResourceName()).append("/");
        }
        return resultPath.toString().length() <= 1 ?
                resultPath.toString() :
                resultPath.toString().substring(0, resultPath.length() - 1);
    }

    /**
     * 获取文件路径通过uri
     *
     * @param context
     * @param uri
     * @return
     */
    public String getFilePathByUri(Context context, Uri uri) {
        String path = null;
        // 以 file:// 开头的
        if (ContentResolver.SCHEME_FILE.equals(uri.getScheme())) {
            path = uri.getPath();
            return path;
        }
        // 以 content:// 开头的，比如 content://media/extenral/images/media/17766
        if (ContentResolver.SCHEME_CONTENT.equals(uri.getScheme()) && Build.VERSION.SDK_INT < Build.VERSION_CODES.KITKAT) {
            Cursor cursor = context.getContentResolver().query(uri, new String[]{MediaStore.Images.Media.DATA}, null, null, null);
            if (cursor != null) {
                if (cursor.moveToFirst()) {
                    int columnIndex = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
                    if (columnIndex > -1) {
                        path = cursor.getString(columnIndex);
                    }
                }
                cursor.close();
            }
            return path;
        }
        // 4.4及之后的 是以 content:// 开头的，比如 content://com.android.providers.media.documents/document/image%3A235700
        if (ContentResolver.SCHEME_CONTENT.equals(uri.getScheme()) && Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            if (DocumentsContract.isDocumentUri(context, uri)) {
                if (isExternalStorageDocument(uri)) {
                    // ExternalStorageProvider
                    final String docId = DocumentsContract.getDocumentId(uri);
                    final String[] split = docId.split(":");
                    final String type = split[0];
                    if ("primary".equalsIgnoreCase(type)) {
                        path = Environment.getExternalStorageDirectory() + "/" + split[1];
                        return path;
                    }
                } else if (isDownloadsDocument(uri)) {
                    // DownloadsProvider
                    final String id = DocumentsContract.getDocumentId(uri);
                    final Uri contentUri = ContentUris.withAppendedId(Uri.parse("content://downloads/public_downloads"),
                            Long.valueOf(id));
                    path = getDataColumn(context, contentUri, null, null);
                    return path;
                } else if (isMediaDocument(uri)) {
                    // MediaProvider
                    final String docId = DocumentsContract.getDocumentId(uri);
                    final String[] split = docId.split(":");
                    final String type = split[0];
                    Uri contentUri = null;
                    if ("image".equals(type)) {
                        contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                    } else if ("video".equals(type)) {
                        contentUri = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                    } else if ("audio".equals(type)) {
                        contentUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                    }
                    final String selection = "_id=?";
                    final String[] selectionArgs = new String[]{split[1]};
                    path = getDataColumn(context, contentUri, selection, selectionArgs);
                    return path;
                }
            }
        }
        return null;
    }

    private String getDataColumn(Context context, Uri uri, String selection, String[] selectionArgs) {
        Cursor cursor = null;
        final String column = "_data";
        final String[] projection = {column};
        try {
            cursor = context.getContentResolver().query(uri, projection, selection, selectionArgs, null);
            if (cursor != null && cursor.moveToFirst()) {
                final int column_index = cursor.getColumnIndexOrThrow(column);
                return cursor.getString(column_index);
            }
        } finally {
            if (cursor != null)
                cursor.close();
        }
        return null;
    }

    private boolean isExternalStorageDocument(Uri uri) {
        return "com.android.externalstorage.documents".equals(uri.getAuthority());
    }

    private boolean isDownloadsDocument(Uri uri) {
        return "com.android.providers.downloads.documents".equals(uri.getAuthority());
    }

    private boolean isMediaDocument(Uri uri) {
        return "com.android.providers.media.documents".equals(uri.getAuthority());
    }

    public boolean mayRequestReadEeternalStoragePermission(FragmentActivity fragmentActivity, Context context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            return true;
        }
        if (checkSelfPermission(context, READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
            return true;
        }
        if (shouldShowRequestPermissionRationale(fragmentActivity, READ_EXTERNAL_STORAGE)) {
            requestPermissions(fragmentActivity, new String[]{READ_EXTERNAL_STORAGE}, REQUEST_CODE_READ_EXTERNAL_STORAGE);
        } else {
            requestPermissions(fragmentActivity, new String[]{READ_EXTERNAL_STORAGE}, REQUEST_CODE_READ_EXTERNAL_STORAGE);
        }
        return false;
    }
}
