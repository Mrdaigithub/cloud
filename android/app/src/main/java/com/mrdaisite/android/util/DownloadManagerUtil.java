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

import android.content.Context;
import android.os.Environment;
import android.support.annotation.NonNull;
import android.widget.ProgressBar;

import java.io.File;

public class DownloadManagerUtil {
    public static final String URL = "https://cdn.llscdn.com/yy/files/tkzpx40x-lls-LLS-5.7-785-20171108-111118.apk";

    public static void calcProgressToView(ProgressBar progressBar, long offset, long total) {
        final float percent = (float) offset / total;
        progressBar.setProgress((int) (percent * progressBar.getMax()));
    }

    public static File getParentFile() {
        final File externalSaveDir = new File(Environment.getExternalStorageDirectory() + "/Download");
        if (!externalSaveDir.exists()) externalSaveDir.mkdir();
        return externalSaveDir;
    }
}
