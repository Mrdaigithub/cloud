import React from 'react';
import { withStyles } from 'material-ui/styles';
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
        <div className={props.classes.rightDrawer}>
            <Card
                className={props.classes.rightDrawerCard}
                tabIndex={0}
                role="button">
                <CardHeader
                    avatar={props.resourceExt === '文件夹' ? <FolderIcon className={props.classes.iconColor}/> : <ResourceTypeIcon ext={props.resourceExt}/>}
                    title={
                        <Grid item xs={12}>
                            <h2 className={props.classes.rightDrawerCardTitle}>{props.resourceName}</h2>
                        </Grid>
                    }/>
                <Divider/>
                <CardContent>
                    <Typography
                        component="p"
                        className={props.classes.rightDrawerCardContentText}>
                        类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={props.classes.rightDrawerCardContentRightText}>
                            {props.resourceExt.toUpperCase()}
                        </span>
                    </Typography>
                    <Typography
                        component="p"
                        className={props.classes.rightDrawerCardContentText}>
                        路径&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={props.classes.rightDrawerCardContentRightText}>
                            {props.resourcePath}
                        </span>
                    </Typography>
                    <Typography
                        component="p"
                        className={props.classes.rightDrawerCardContentText}>
                        创建时间
                        <span className={props.classes.rightDrawerCardContentRightText}>
                            {props.resoruceCreatedAt}
                        </span>
                    </Typography>
                    <Typography
                        component="p"
                        className={props.classes.rightDrawerCardContentText}>
                        修改时间
                        <span className={props.classes.rightDrawerCardContentRightText}>
                            {props.resourceUpdatedAt}
                        </span>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </Drawer>
);


export default withStyles(styles)(ResourceDetail);
