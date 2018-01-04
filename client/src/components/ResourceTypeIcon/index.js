import React from 'react';
import { withStyles } from 'material-ui/styles';
import styles from './styles';
import {
    FileIcon,
    TextIcon,
    PdfIcon,
    ZipIcon,
} from '../../components/file-type-icon';


const ResourceTypeIcon = ({ classes, ext }) => (
    <div className={classes.normal}>
        {(() => {
            switch (ext) {
                case 'txt':
                    return <TextIcon/>;
                case 'zip':
                    return <ZipIcon/>;
                case 'rar':
                    return <ZipIcon/>;
                case '7z':
                    return <ZipIcon/>;
                case 'pdf':
                    return <PdfIcon/>;
                default :
                    return <FileIcon/>;
            }
        })()}
    </div>
);

export default withStyles(styles)(ResourceTypeIcon);
