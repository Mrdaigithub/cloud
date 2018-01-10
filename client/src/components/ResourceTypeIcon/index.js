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
    ExeIcon,
    SqlIcon,
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
                    return <ZipIcon style={style}/>;
                case '7z':
                    return <ZipIcon style={style}/>;
                case 'bz':
                    return <ZipIcon style={style}/>;
                case 'bz2':
                    return <ZipIcon style={style}/>;
                case 'deb':
                    return <ZipIcon style={style}/>;
                case 'gz':
                    return <ZipIcon style={style}/>;
                case 'gzip':
                    return <ZipIcon style={style}/>;
                case 'ipk':
                    return <ZipIcon style={style}/>;
                case 'jar':
                    return <ZipIcon style={style}/>;
                case 'kz':
                    return <ZipIcon style={style}/>;
                case 'piz':
                    return <ZipIcon style={style}/>;
                case 'tar':
                    return <ZipIcon style={style}/>;
                /**  图片 **/
                case 'jpg':
                    return <Panorama style={style}/>;
                case 'png':
                    return <Panorama style={style}/>;
                case 'gif':
                    return <Panorama style={style}/>;
                case 'bmp':
                    return <Panorama style={style}/>;
                /**  音乐 **/
                case 'mp３':
                    return <MusicNote style={style}/>;
                /**  视频 **/
                case 'mp4':
                    return <Movie style={style}/>;
                case '3gp':
                    return <Movie style={style}/>;
                case 'avi':
                    return <Movie style={style}/>;
                case 'mpeg':
                    return <Movie style={style}/>;
                case 'mov':
                    return <Movie style={style}/>;
                case 'mgp':
                    return <Movie style={style}/>;
                case 'mpe':
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
                /**  可执行文件 **/
                case 'exe':
                    return <ExeIcon style={style}/>;
                default :
                    return <FileIcon style={style}/>;
            }
        })()}
    </div>
);

export default withStyles(styles)(ResourceTypeIcon);
