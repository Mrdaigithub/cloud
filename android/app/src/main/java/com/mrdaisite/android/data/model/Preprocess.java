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

package com.mrdaisite.android.data.model;

import com.google.gson.annotations.SerializedName;

public class Preprocess {

    /**
     * error : 0
     * chunkSize : 1000000
     * subDir : md5_files
     * uploadBaseName : 1526519534203
     * uploadExt : sql
     * savedPath :
     */

    @SerializedName("error")
    private int error;
    @SerializedName("chunkSize")
    private long chunkSize;
    @SerializedName("subDir")
    private String subDir;
    @SerializedName("uploadBaseName")
    private String uploadBaseName;
    @SerializedName("uploadExt")
    private String uploadExt;
    @SerializedName("savedPath")
    private String savedPath;

    public int getError() {
        return error;
    }

    public void setError(int error) {
        this.error = error;
    }

    public long getChunkSize() {
        return chunkSize;
    }

    public void setChunkSize(int chunkSize) {
        this.chunkSize = chunkSize;
    }

    public String getSubDir() {
        return subDir;
    }

    public void setSubDir(String subDir) {
        this.subDir = subDir;
    }

    public String getUploadBaseName() {
        return uploadBaseName;
    }

    public void setUploadBaseName(String uploadBaseName) {
        this.uploadBaseName = uploadBaseName;
    }

    public String getUploadExt() {
        return uploadExt;
    }

    public void setUploadExt(String uploadExt) {
        this.uploadExt = uploadExt;
    }

    public String getSavedPath() {
        return savedPath;
    }

    public void setSavedPath(String savedPath) {
        this.savedPath = savedPath;
    }

    @Override
    public String toString() {
        return "Preprocess{" +
                "error=" + error +
                ", chunkSize=" + chunkSize +
                ", subDir='" + subDir + '\'' +
                ", uploadBaseName='" + uploadBaseName + '\'' +
                ", uploadExt='" + uploadExt + '\'' +
                ", savedPath='" + savedPath + '\'' +
                '}';
    }
}
