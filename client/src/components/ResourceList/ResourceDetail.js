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
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ResourceTypeIcon from '../ResourceTypeIcon/index';
import { FolderIcon } from '../../components/file-type-icon';
import styles from './styles';


const ResourceDetail = props => (
    <Drawer
        anchor="right"
        open={props.open}
        onClose={props.onClose}>
        <div className={props.classes.ResourceDetail}>
            <Card
                className={props.classes.ResourceDetailCard}
                tabIndex={0}
                role="button">
                <CardHeader
                    avatar={props.selectedResource.resourceMime === '文件夹' ? <FolderIcon className={props.classes.iconColor}/> : <ResourceTypeIcon ext={props.selectedResource.resourceMime}/>}
                    title={
                        <Grid item xs={12}>
                            <h2 className={props.classes.ResourceDetailCardTitle}>{props.selectedResource.resourceName}</h2>
                        </Grid>
                    }/>
                <Divider/>
                <CardContent>
                    <Typography
                        component="p"
                        className={props.classes.ResourceDetailCardContentText}>
                        类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={props.classes.ResourceDetailCardContentRightText}>
                            {props.selectedResource.resourceMime ? props.selectedResource.resourceMime.toUpperCase() : '未识别文件类型'}
                        </span>
                    </Typography>
                    <Typography
                        component="p"
                        className={props.classes.ResourceDetailCardContentText}>
                        路径&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={props.classes.ResourceDetailCardContentRightText}>
                            {props.selectedResource.resourcePath}
                        </span>
                    </Typography>
                    <Typography
                        component="p"
                        className={props.classes.ResourceDetailCardContentText}>
                        创建时间
                        <span className={props.classes.ResourceDetailCardContentRightText}>
                            {props.selectedResource.resourceCreatedAt}
                        </span>
                    </Typography>
                    <Typography
                        component="p"
                        className={props.classes.ResourceDetailCardContentText}>
                        修改时间
                        <span className={props.classes.ResourceDetailCardContentRightText}>
                            {props.selectedResource.resourceUpdatedAt}
                        </span>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </Drawer>
);


const mapStateToProps = state => ({
    selectedResource: state.resource.selectedResource,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(ResourceDetail));
