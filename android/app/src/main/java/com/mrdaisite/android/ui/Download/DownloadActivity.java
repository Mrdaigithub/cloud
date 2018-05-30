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

package com.mrdaisite.android.ui.Download;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.liulishuo.okdownload.DownloadTask;
import com.liulishuo.okdownload.SpeedCalculator;
import com.liulishuo.okdownload.StatusUtil;
import com.liulishuo.okdownload.core.Util;
import com.liulishuo.okdownload.core.breakpoint.BlockInfo;
import com.liulishuo.okdownload.core.breakpoint.BreakpointInfo;
import com.liulishuo.okdownload.core.cause.EndCause;
import com.liulishuo.okdownload.core.listener.DownloadListener4WithSpeed;
import com.liulishuo.okdownload.core.listener.assist.Listener4SpeedAssistExtend;
import com.mrdaisite.android.R;
import com.mrdaisite.android.ui.BaseActivity;
import com.mrdaisite.android.util.DownloadManagerUtil;
import com.orhanobut.logger.Logger;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.MessageDigest;
import java.util.List;
import java.util.Map;

public class DownloadActivity extends BaseActivity {

    private static final String TAG = "SingleActivity";
    private DownloadTask task;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.download_act);
        initSingleDownload(
                (TextView) findViewById(R.id.statusTv),
                (ProgressBar) findViewById(R.id.progressBar),
                findViewById(R.id.actionView),
                (TextView) findViewById(R.id.actionTv));
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (task != null) task.cancel();
    }

    private void initSingleDownload(TextView statusTv, ProgressBar progressBar, View actionView,
                                    TextView actionTv) {
        initTask();
        initStatus(statusTv, progressBar);
        initAction(actionView, actionTv, statusTv, progressBar);
    }

    private void initTask() {
        final String filename = "single-test";
        final String url =
                "https://cdn.llscdn.com/yy/files/xs8qmxn8-lls-LLS-5.8-800-20171207-111607.apk";
        final File parentFile = DownloadManagerUtil.getParentFile();
        task = new DownloadTask.Builder(url, parentFile)
                // the minimal interval millisecond for callback progress
                .setMinIntervalMillisCallbackProcess(16)
                // ignore the same task has already completed in the past.
                .setPassIfAlreadyCompleted(false)
                .build();
    }

    private void initStatus(TextView statusTv, ProgressBar progressBar) {
        final StatusUtil.Status status = StatusUtil.getStatus(task);
        if (status == StatusUtil.Status.COMPLETED) {
            progressBar.setProgress(progressBar.getMax());
        }

        statusTv.setText(status.toString());
        final BreakpointInfo info = StatusUtil.getCurrentInfo(task);
        if (info != null) {
            Logger.e("init status with: " + info.toString());

            DownloadManagerUtil.calcProgressToView(progressBar, info.getTotalOffset(), info.getTotalLength());
        }
    }

    private void initAction(final View actionView, final TextView actionTv, final TextView statusTv,
                            final ProgressBar progressBar) {
        actionTv.setText("start");
        actionView.setOnClickListener(v -> {
            final boolean started = task.getTag() != null;

            if (started) {
                // to cancel
                task.cancel();
            } else {
                actionTv.setText(R.string.cancel);

                // to start
                startTask(statusTv, progressBar, actionTv);
                // mark
                task.setTag("mark-task-started");
            }
        });
    }

    private void startTask(final TextView statusTv, final ProgressBar progressBar,
                           final TextView actionTv) {

        task.enqueue(new DownloadListener4WithSpeed() {
            private long totalLength;
            private String readableTotalLength;

            @Override
            public void taskStart(@NonNull DownloadTask task) {
                Logger.e("task start");
                statusTv.setText("task start");
            }

            @Override
            public void connectStart(@NonNull DownloadTask task, int blockIndex, @NonNull Map<String, List<String>> requestHeaderFields) {
                Logger.e("connectStart");
                final String status = "Connect Start " + blockIndex;
                statusTv.setText(status);
            }

            @Override
            public void connectEnd(@NonNull DownloadTask task, int blockIndex, int responseCode, @NonNull Map<String, List<String>> responseHeaderFields) {
                Logger.e("connectEnd");
                final String status = "Connect End " + blockIndex;
                statusTv.setText(status);
            }

            @Override
            public void infoReady(@NonNull DownloadTask task, @NonNull BreakpointInfo info, boolean fromBreakpoint, @NonNull Listener4SpeedAssistExtend.Listener4SpeedModel model) {
                Logger.e("info ready");
                statusTv.setText("info ready");

                totalLength = info.getTotalLength();
                readableTotalLength = Util.humanReadableBytes(totalLength, true);
                DownloadManagerUtil.calcProgressToView(progressBar, info.getTotalOffset(), totalLength);
            }

            @Override
            public void progressBlock(@NonNull DownloadTask task, int blockIndex, long currentBlockOffset, @NonNull SpeedCalculator blockSpeed) {
                Logger.e("progressBlock");
            }

            @Override
            public void progress(@NonNull DownloadTask task, long currentOffset, @NonNull SpeedCalculator taskSpeed) {
                Logger.e("progress");
                final String readableOffset = Util.humanReadableBytes(currentOffset, true);
                final String progressStatus = readableOffset + "/" + readableTotalLength;
                final String speed = taskSpeed.speed();
                final String progressStatusWithSpeed = progressStatus + "(" + speed + ")";

                statusTv.setText(progressStatusWithSpeed);
                DownloadManagerUtil.calcProgressToView(progressBar, currentOffset, totalLength);
            }

            @Override
            public void blockEnd(@NonNull DownloadTask task, int blockIndex, BlockInfo info, @NonNull SpeedCalculator blockSpeed) {
                Logger.e("blockEnd");
            }

            @Override
            public void taskEnd(@NonNull DownloadTask task, @NonNull EndCause cause, @Nullable Exception realCause, @NonNull SpeedCalculator taskSpeed) {
                Logger.e("taskEnd");
                final String statusWithSpeed = cause.toString() + " " + taskSpeed.averageSpeed();
                statusTv.setText(statusWithSpeed);

                actionTv.setText("start");
                // mark
                task.setTag(null);
                if (cause == EndCause.COMPLETED) {
                    final String realMd5 = fileToMD5(task.getFile().getAbsolutePath());
                    if (!realMd5.equalsIgnoreCase("f836a37a5eee5dec0611ce15a76e8fd5")) {
                        Logger.e("file is wrong because of md5 is wrong " + realMd5);
                    }
                }
            }
        });
    }

    public static String fileToMD5(String filePath) {
        InputStream inputStream = null;
        try {
            inputStream = new FileInputStream(filePath);
            byte[] buffer = new byte[1024];
            MessageDigest digest = MessageDigest.getInstance("MD5");
            int numRead = 0;
            while (numRead != -1) {
                numRead = inputStream.read(buffer);
                if (numRead > 0) {
                    digest.update(buffer, 0, numRead);
                }
            }
            byte[] md5Bytes = digest.digest();
            return convertHashToString(md5Bytes);
        } catch (Exception ignored) {
            return null;
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (Exception e) {
                    Logger.e("file to md5 failed");
                }
            }
        }
    }

    private static String convertHashToString(byte[] md5Bytes) {
        StringBuffer buf = new StringBuffer();
        for (int i = 0; i < md5Bytes.length; i++) {
            buf.append(Integer.toString((md5Bytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        return buf.toString().toUpperCase();
    }

    private boolean isTaskRunning() {
        final StatusUtil.Status status = StatusUtil.getStatus(task);
        return status == StatusUtil.Status.PENDING || status == StatusUtil.Status.RUNNING;
    }
}
