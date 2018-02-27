import React from 'react';
import ImgPreview from '../components/ResourceList/ImgPreview';
import TextPreview from '../components/ResourceList/TextPreview';


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
