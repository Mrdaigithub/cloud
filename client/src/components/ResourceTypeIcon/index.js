import React from 'react';
import { withStyles } from 'material-ui/styles';
import styles from './styles';
import {
    FileIcon,
    TextIcon,
    PdfIcon,
    ZipIcon,
} from '../../components/file-type-icon';


const ResourceTypeIcon = ({ style, classes, ext }) => (
    <div className={classes.normal}>
        {(() => {
            switch (ext) {
                case 'txt':
                    return <TextIcon style={style}/>;
                case 'zip':
                    return <ZipIcon style={style}/>;
                case 'rar':
                    return <ZipIcon style={style}/>;
                case '7z':
                    return <ZipIcon style={style}/>;
                case 'pdf':
                    return <PdfIcon style={style}/>;
                default :
                    return <FileIcon style={style}/>;
            }
        })()}
    </div>
);

export default withStyles(styles)(ResourceTypeIcon);
