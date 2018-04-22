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

package com.mrdaisite.android.adapter;

import android.content.Context;
import android.support.annotation.Nullable;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.mrdaisite.android.R;
import com.mrdaisite.android.data.model.ResourceBean;
import com.mrdaisite.android.util.Constants;
import com.mrdaisite.android.util.ResourceUtil;
import com.orhanobut.logger.Logger;

import java.util.List;

public class ResourceAdapter extends BaseQuickAdapter<ResourceBean, BaseViewHolder> {

    public ResourceAdapter(int layoutResId, @Nullable List<ResourceBean> data) {
        super(layoutResId, data);
    }

    @Override
    protected void convert(BaseViewHolder helper, ResourceBean item) {

        // 设置resource item的title,时间,icon
        helper = helper.setText(R.id.resourceTitle, item.getResourceName())
                .setText(R.id.resourceCreatedDate, ResourceUtil.getINSTANCE().formatISO8601(item.getCreatedAt()));
        if (item.isFile()) {
            helper.setGone(R.id.resourceSize, true);
            helper.setText(R.id.resourceSize, ResourceUtil.getINSTANCE().computeFileSize(item.getSize()));
            String ext = ResourceUtil.getINSTANCE().getExt(item.getResourceName());
            if (Constants.EXT_ICON_MAP.containsKey(ext)) {
                helper.setImageResource(R.id.resourceIcon, Constants.EXT_ICON_MAP.get(ext));
            } else {
                helper.setImageResource(R.id.resourceIcon, R.drawable.ic_file);
            }
        } else {
            helper.setGone(R.id.resourceSize, false);
            helper.setImageResource(R.id.resourceIcon, R.drawable.ic_folder);
        }

        // 设置singleItemMenuButton子控件
        helper.addOnClickListener(R.id.singleItemMenuButton);
    }
}
