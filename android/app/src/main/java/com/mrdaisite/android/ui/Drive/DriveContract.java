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

import com.mrdaisite.android.data.model.Resource;
import com.mrdaisite.android.ui.BasePresenter;
import com.mrdaisite.android.ui.BaseView;
import com.mrdaisite.android.util.CallbackUnit;

import java.util.List;

public interface DriveContract {
    interface View extends BaseView<Presenter> {
        void setProfileUsername(String username);

        void setProfileEmail(String email);

        /**
         * 展示重命名的dialog
         *
         * @param position 资源的index
         */
        void showRenameDialog(int position);

        /**
         * 刷新可见资源的视图
         *
         * @param openAnimation 刷新的开启动画
         * @param remote        请求远程数据更新资源
         */
        void resourceViewRefresh(Boolean openAnimation, Boolean remote);

        /**
         * 退出选择模式
         *
         * @return null
         */
        Boolean exitSelectMode();
    }

    interface Presenter extends BasePresenter {
        void fetchRemoteResources(CallbackUnit callbackUnit);

        List<Resource> fetchLocalResources(String path);

        void mkdir(String newDirName);

        void renameResource(long resourceId, String newResourceName);

        void removeResources(List<Long> resourceIdList, CallbackUnit callbackUnit);
    }
}
