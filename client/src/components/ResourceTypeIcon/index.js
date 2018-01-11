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
                case 'txt':
                    return <TextIcon style={style}/>;
                case 'pdf':
                    return <PdfIcon style={style}/>;
                /**  数据 **/
                case 'sql':
                    return <SqlIcon style={style}/>;
                /**  压缩档 **/
                case 'zip':
                    return <ZipIcon style={style}/>;
                case 'rar':
                    return <RarIcon style={style}/>;
                case '7z':
                    return <Z7zIcon style={style}/>;
                case 'bz2':
                    return <ZipIcon style={style}/>;
                case 'deb':
                    return <ZipIcon style={style}/>;
                case 'gzip':
                    return <ZipIcon style={style}/>;
                case 'jar':
                    return <JarIcon style={style}/>;
                case 'piz':
                    return <ZipIcon style={style}/>;
                case 'tar':
                    return <TarIcon style={style}/>;
                /**  图片 **/
                case 'jpg':
                    return <JpgIcon style={style}/>;
                case 'jpeg':
                    return <JpgIcon style={style}/>;
                case 'png':
                    return <PngIcon style={style}/>;
                case 'gif':
                    return <GifIcon style={style}/>;
                case 'bmp':
                    return <BmpIcon style={style}/>;
                case 'svg':
                    return <IsvgIcon style={style}/>;
                case 'ico':
                    return <Panorama style={style}/>;
                /**  音乐 **/
                case 'mp3':
                    return <MusicNote style={style}/>;
                /**  视频 **/
                case 'mp4':
                    return <Mp4Icon style={style}/>;
                case '3gp':
                    return <V3gpIcon style={style}/>;
                case 'avi':
                    return <AviIcon style={style}/>;
                case 'mpe':
                    return <MpegIcon style={style}/>;
                case 'mpeg':
                    return <MpegIcon style={style}/>;
                case 'mov':
                    return <Movie style={style}/>;
                case 'mgp':
                    return <Movie style={style}/>;
                case 'dat':
                    return <Movie style={style}/>;
                case 'vob':
                    return <Movie style={style}/>;
                case 'asf':
                    return <Movie style={style}/>;
                case 'wmv':
                    return <Movie style={style}/>;
                case 'rmvb':
                    return <Movie style={style}/>;
                case 'flv':
                    return <Movie style={style}/>;
                case 'mkv':
                    return <Movie style={style}/>;
                /**  office **/
                case 'doc':
                    return <DocIcon style={style}/>;
                case 'docx':
                    return <DocIcon style={style}/>;
                case 'odt':
                    return <DocIcon style={style}/>;
                case 'ods':
                    return <ExcelIcon style={style}/>;
                case 'xlsx':
                    return <ExcelIcon style={style}/>;
                case 'odp':
                    return <PptIcon style={style}/>;
                case 'pptx':
                    return <PptIcon style={style}/>;
                /**  字体 **/
                case 'eot':
                    return <FontIcon style={style}/>;
                case 'ttf':
                    return <FontIcon style={style}/>;
                case 'woff':
                    return <FontIcon style={style}/>;
                /**  代码 **/
                case 'html':
                    return <HtmlIcon style={style}/>;
                case 'css':
                    return <CssIcon style={style}/>;
                case 'scss':
                    return <CssIcon style={style}/>;
                case 'sass':
                    return <CssIcon style={style}/>;
                case 'js':
                    return <JsIcon style={style}/>;
                case 'ts':
                    return <TsIcon style={style}/>;
                case 'vue':
                    return <VueIcon style={style}/>;
                case 'php':
                    return <PhpIcon style={style}/>;
                case 'py':
                    return <PyIcon style={style}/>;
                case 'md':
                    return <MdIcon style={style}/>;
                case 'json':
                    return <JsonIcon style={style}/>;
                /**  可执行文件 **/
                case 'exe':
                    return <ExeIcon style={style}/>;
                case 'msi':
                    return <MsiIcon style={style}/>;
                default :
                    return <FileIcon style={style}/>;
            }
        })()}
    </div>
);

export default withStyles(styles)(ResourceTypeIcon);
