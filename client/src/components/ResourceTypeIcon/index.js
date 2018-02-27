import React from 'react';
import { withStyles } from 'material-ui/styles';
import {
    Movie,
    MusicNote,
    Panorama,
} from 'material-ui-icons';
import styles from './styles';
import {
    FileIcon,
    TextIcon,
    PdfIcon,
    ZipIcon,
    RarIcon,
    Z7zIcon,
    TarIcon,
    JarIcon,
    ExeIcon,
    JpgIcon,
    PngIcon,
    GifIcon,
    BmpIcon,
    Mp4Icon,
    V3gpIcon,
    AviIcon,
    MpegIcon,
    MsiIcon,
    IsvgIcon,
    SqlIcon,
    HtmlIcon,
    CssIcon,
    JsIcon,
    TsIcon,
    VueIcon,
    PhpIcon,
    PyIcon,
    MdIcon,
    JsonIcon,
    FontIcon,
    DocIcon,
    ExcelIcon,
    PptIcon,
} from '../../components/file-type-icon';


const ResourceTypeIcon = ({ style, classes, ext }) => (
    <div className={classes.normal}>
        {(() => {
            switch (ext) {
                /**  文本 **/
                case 'text/plain':
                    return <TextIcon style={style}/>;
                case 'application/pdf':
                    return <PdfIcon style={style}/>;
                /**  数据 **/
                case 'application/sql':
                    return <SqlIcon style={style}/>;
                /**  压缩档 **/
                case 'application/zip':
                    return <ZipIcon style={style}/>;
                case 'application/x-rar-compressed':
                    return <RarIcon style={style}/>;
                case 'application/x-7z-compressed':
                    return <Z7zIcon style={style}/>;
                case 'application/x-bzip2':
                    return <ZipIcon style={style}/>;
                case 'application/x-debian-package':
                    return <ZipIcon style={style}/>;
                case 'application/gzip':
                    return <ZipIcon style={style}/>;
                case 'application/java-archive':
                    return <JarIcon style={style}/>;
                case 'application/x-tar':
                    return <TarIcon style={style}/>;
                /**  图片 **/
                case 'image/jpeg':
                    return <JpgIcon style={style}/>;
                case 'image/png':
                    return <PngIcon style={style}/>;
                case 'image/gif':
                    return <GifIcon style={style}/>;
                case 'image/bmp':
                    return <BmpIcon style={style}/>;
                case 'image/svg+xml':
                    return <IsvgIcon style={style}/>;
                case 'image/x-icon':
                    return <Panorama style={style}/>;
                /**  音乐 **/
                case 'audio/mp3':
                    return <MusicNote style={style}/>;
                /**  视频 **/
                case 'video/mp4':
                    return <Mp4Icon style={style}/>;
                case 'video/3gpp':
                    return <V3gpIcon style={style}/>;
                case 'video/x-msvideo':
                    return <AviIcon style={style}/>;
                case 'video/mpeg':
                    return <MpegIcon style={style}/>;
                case 'video/quicktime':
                    return <Movie style={style}/>;
                case 'application/vnd.osgeo.mapguide.package':
                    return <Movie style={style}/>;
                case 'video/x-ms-wmv':
                    return <Movie style={style}/>;
                case 'application/vnd.rn-realmedia-vbr':
                    return <Movie style={style}/>;
                case 'video/x-flv':
                    return <Movie style={style}/>;
                case 'video/x-matroska':
                    return <Movie style={style}/>;
                /**  office **/
                case 'application/msword':
                    return <DocIcon style={style}/>;
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    return <DocIcon style={style}/>;
                case 'application/vnd.oasis.opendocument.text':
                    return <DocIcon style={style}/>;
                case 'application/vnd.oasis.opendocument.spreadsheet':
                    return <ExcelIcon style={style}/>;
                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    return <ExcelIcon style={style}/>;
                case 'application/vnd.oasis.opendocument.presentation':
                    return <PptIcon style={style}/>;
                case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                    return <PptIcon style={style}/>;
                /**  字体 **/
                case 'application/vnd.ms-fontobject':
                    return <FontIcon style={style}/>;
                case 'application/x-font-ttf':
                    return <FontIcon style={style}/>;
                case 'application/font-woff':
                    return <FontIcon style={style}/>;
                case 'application/font-woff2':
                    return <FontIcon style={style}/>;
                /**  代码 **/
                case 'text/html':
                    return <HtmlIcon style={style}/>;
                case 'text/css':
                    return <CssIcon style={style}/>;
                case 'text/x-scss':
                    return <CssIcon style={style}/>;
                case 'text/x-sass':
                    return <CssIcon style={style}/>;
                case 'application/javascript':
                    return <JsIcon style={style}/>;
                case 'video/mp2t':
                    return <TsIcon style={style}/>;
                case 'vue':
                    return <VueIcon style={style}/>;
                case 'application/x-httpd-php':
                    return <PhpIcon style={style}/>;
                case 'py':
                    return <PyIcon style={style}/>;
                case 'text/markdown':
                    return <MdIcon style={style}/>;
                case 'application/json':
                    return <JsonIcon style={style}/>;
                /**  可执行文件 **/
                case 'application/x-msdos-program':
                    return <ExeIcon style={style}/>;
                case 'application/x-msdownload':
                    return <MsiIcon style={style}/>;
                default :
                    return <FileIcon style={style}/>;
            }
        })()}
    </div>
);

export default withStyles(styles)(ResourceTypeIcon);
