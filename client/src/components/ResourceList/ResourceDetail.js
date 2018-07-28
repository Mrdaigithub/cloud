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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ResourceTypeIcon from '../ResourceTypeIconSwitcher/index';
import { FolderIcon } from '../Icons';
import styles from './styles';
import { _directory, _filePath, _fileType, _unknownFilePath, _unknownFileType } from '../../res/values/string';
import { friendlyPath } from '../../utils/assist';
import { DATE_FORMAT } from '../../constants';


const ResourceDetail = props => (
    <Drawer
        anchor="right"
        open={props.open}
        onClose={props.onClose}>
        <Card
            className={props.classes.ResourceDetail}
            tabIndex={0}
            role="button">
            <CardHeader
                avatar={props.selectedResource.resourceMime === _directory ?
                    <FolderIcon className={props.classes.iconColor}/> :
                    <ResourceTypeIcon ext={props.selectedResource.resourceMime}/>}
                title={
                    <Grid item xs={12}>
                        <h2 className={props.classes.ResourceDetailCardTitle}>{props.selectedResource.resourceName}</h2>
                    </Grid>
                }/>
            <Divider/>
            <CardContent>
                <Typography
                    component="p"
                    noWrap
                    className={props.classes.ResourceDetailCardContentText}>
                    {_filePath}:
                    <span className={props.classes.ResourceDetailCardContentRightText}>
                        {friendlyPath(props.selectedResource.resourcePath) || _unknownFilePath}
                    </span>
                </Typography>
                <Typography
                    component="p"
                    noWrap
                    className={props.classes.ResourceDetailCardContentText}>
                    {_fileType}:
                    <span className={props.classes.ResourceDetailCardContentRightText}>
                        {props.selectedResource.resourceMime ? props.selectedResource.resourceMime : _unknownFileType}
                    </span>
                </Typography>
                <Typography
                    component="p"
                    noWrap
                    className={props.classes.ResourceDetailCardContentText}>
                    创建时间:
                    <span className={props.classes.ResourceDetailCardContentRightText}>
                        {moment(new Date(props.selectedResource.resourceCreatedAt))
                            .format(DATE_FORMAT)}
                    </span>
                </Typography>
                <Typography
                    component="p"
                    noWrap
                    className={props.classes.ResourceDetailCardContentText}>
                    修改时间:
                    <span className={props.classes.ResourceDetailCardContentRightText}>
                        {moment(new Date(props.selectedResource.resourceUpdatedAt))
                            .format(DATE_FORMAT)}
                    </span>
                </Typography>
            </CardContent>
        </Card>
    </Drawer>
);

ResourceDetail.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedResource: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    selectedResource: state.resource.selectedResource,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(ResourceDetail));
