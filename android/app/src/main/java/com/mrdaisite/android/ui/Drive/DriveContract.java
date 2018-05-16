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

package com.mrdaisite.android.ui.Drive;

import android.content.Context;
import android.support.v4.app.FragmentActivity;

import com.mrdaisite.android.ui.BasePresenter;
import com.mrdaisite.android.ui.BaseView;
import com.mrdaisite.android.util.CallbackUnit;

import java.io.FileNotFoundException;
import java.util.List;

public interface DriveContract {
    interface View extends BaseView<Presenter> {
        void resourceViewRefresh(Boolean remote, Boolean animate);

        void setProfileUsername(String username);

        void setProfileEmail(String email);

        /**
         * 展示重命名的dialog
         *
         * @param position 资源的index
         */
        void showRenameDialog(int position);

        /**
         * 退出选择模式
         *
         * @return null
         */
        boolean exitSelectMode();

        /**
         * 进入系统文件管理器
         */
        void toSystemFileExplorer();
    }

    interface Presenter extends BasePresenter {
        void mkdir(String newDirName, CallbackUnit callbackUnit);

        void renameResource(long resourceId, String newResourceName, CallbackUnit callbackUnit);

        void removeResources(List<Long> resourceIdList, CallbackUnit callbackUnit);

        void handleUpload(String filepath);

        void requestReadExternalStoragePermission(FragmentActivity fragmentActivity, Context context);
    }
}
