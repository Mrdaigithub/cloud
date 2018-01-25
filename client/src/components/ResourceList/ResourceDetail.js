import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
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
                            {props.selectedResource.resourceMime.toUpperCase()}
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
