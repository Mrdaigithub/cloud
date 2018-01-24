import React from 'react';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

const ImgPreview = props => (
    <div id="ImagePreview" className={props.classes.imgPreview}>
        <div>
            <div>
                <img src={props.src} alt="" className={props.classes.img}/>
            </div>
        </div>
    </div>
);

export default withStyles(styles)(ImgPreview);
