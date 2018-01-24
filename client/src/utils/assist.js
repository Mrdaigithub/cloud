import mime from 'mime';


/**
 * 获取文件后缀
 *
 * @param resourceName
 * @returns {string}
 */
export const getResourceExt = resourceName => mime.getExtension(mime.getType(resourceName));

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

