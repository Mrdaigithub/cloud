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

import React from 'react';
import ImgPreview from '../components/ResourceList/ImgPreview';
import TextPreview from '../components/ResourceList/TextPreview';
import VideoPreview from '../components/ResourceList/VideoPreview';
import { _unknowPath } from '../res/values/string';


/* Resource Util*/

/**
 * 获取文件对应的预览组件
 *
 * @param resourceMime
 * @returns {*}
 */
export const getPreview = ({ resourceMime }) => {
    if (/image/.test(resourceMime)) return <ImgPreview/>;
    if (resourceMime === 'text/plain' ||
        resourceMime === 'application/pdf' ||
        resourceMime === 'application/msword' ||
        resourceMime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        resourceMime === 'application/vnd.oasis.opendocument.text' ||
        resourceMime === 'application/vnd.oasis.opendocument.spreadsheet' ||
        resourceMime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        resourceMime === 'application/vnd.oasis.opendocument.presentation' ||
        resourceMime === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
        resourceMime === 'application/vnd.oasis.opendocument.presentation' ||
        resourceMime === 'text/html' ||
        resourceMime === 'text/css' ||
        resourceMime === 'text/x-scss' ||
        resourceMime === 'text/x-sass' ||
        resourceMime === 'application/javascript' ||
        resourceMime === 'video/mp2t' ||
        resourceMime === 'vue' ||
        resourceMime === 'application/x-httpd-php' ||
        resourceMime === 'py' ||
        resourceMime === 'text/markdown' ||
        resourceMime === 'application/x-sql' ||
        resourceMime === 'application/json') {
        return <TextPreview/>;
    }
    if (resourceMime === 'video/mp4' ||
        resourceMime === 'video/x-flv' ||
        resourceMime === 'video/mpeg' ||
        resourceMime === 'application/vnd.osgeo.mapguide.package' ||
        resourceMime === 'application/vnd.rn-realmedia-vbr' ||
        resourceMime === 'video/x-matroska') {
        return <VideoPreview/>;
    }
    return null;
};

/**
 * 获取指定路径的资源列表
 *
 * @param resourceList
 * @param path
 * @returns {*[]}
 */
export const getResourceListWithPath = (resourceList = [], path = '0') => {
    return resourceList
        .filter(r => r.path === path);
};


/**
 * 将文件容量单位转换之合适的单位
 *
 * @param fileByte
 * @returns {string}
 */
export const conversionCapacityUtil = (fileByte) => {
    const capacityUtilName = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let fileSizeMsg = '';
    for (let i = 0; i < capacityUtilName.length; i += 1) {
        if (fileByte >= (1024 ** i) && fileByte < (1024 ** (i + 1))) {
            fileSizeMsg = i === 0 ?
                `${fileByte}${capacityUtilName[i]}` :
                `${(fileByte / (1024 ** i)).toFixed(2)}${capacityUtilName[i]}`;
            return fileSizeMsg;
        }
    }
    return '∞';
};


/* Path Util*/

/**
 * 前进url /cloud-drive/0/1/2/ => /cloud-drive/0/1/2/3
 * 回退url /cloud-drive/0/1/2/3 => /cloud-drive/0/1/2
 *
 * @param url
 * @returns {string}
 */
export const changePath = {
    go: (url, path) => {
        const newMoveUrl = url.toString()
            .split('/')
            .filter(item => !!item);
        if (newMoveUrl[0] !== '0') {
            newMoveUrl.unshift('0');
        }
        newMoveUrl.push(path.toString()
            .trim());
        return newMoveUrl.join('/');
    },
    back: (url) => {
        const newMoveUrl = url.toString()
            .split('/')
            .filter(item => !!item);
        if (newMoveUrl[0] !== '0') {
            newMoveUrl.unshift('0');
        }
        if (newMoveUrl.length > 1) {
            newMoveUrl.pop();
        }
        return newMoveUrl.join('/');
    },
};

/**
 * 将url转化成上传的路径字符串/cloud-drive/0/1/2/3 => '0.1.2.3'
 *
 * @param url
 * @returns {string}
 */
export const url2path = (url) => {
    return url.split('/')
        .filter(item => !!item && item !== 'cloud-drive')
        .map(item => item.trim()
            .replace(/(^\.+|\.+$)/, ''))
        .join('.');
};

/**
 * 0.1.2.3 => 0/1/2/3
 *
 * @param path
 * @returns {string}
 */
export const path2url = (path) => {
    return path.split('.')
        .map(item => item.trim())
        .filter(item => item)
        .join('/');
};

/**
 * 返回友好的资源路径  0.1.2 => /path1/path2
 *
 * @param path
 * @returns {*}
 */
export const friendlyPath = (path) => {
    if (!window.store) return false;
    const resources = window.store.getState().resource.resources;

    return path.toString() === '0' ?
        '/' :
        path.split('.')
            .map((i) => {
                if (i === '0') return '';
                return resources.filter(item => item.id.toString() === i).length ?
                    resources.filter(item => item.id.toString() === i)[0].resource_name :
                    _unknowPath;
            })
            .join('/');
};
