import React from 'react';
import mime from 'mime-types';
import ImgPreview from '../components/ResourceList/ImgPreview';
import TextPreview from '../components/ResourceList/TextPreview';


export const getPreview = (resourceName) => {
    const mimeType = mime.lookup(resourceName);
    console.log(mimeType);
    if (/image/.test(mimeType)) return <ImgPreview/>;
    // if (/text/.test(mimeType) ||
    //     /javascript/.test(mimeType) ||
    //     /php/.test(mimeType) ||) {
    //     return <TextPreview/>;
    // }
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
