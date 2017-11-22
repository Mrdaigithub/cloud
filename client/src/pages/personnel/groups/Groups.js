import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles'
import styles from './styles'
import {Link} from 'react-router-dom'
import Grid from 'material-ui/Grid'
import List, {ListItem, ListItemText} from 'material-ui/List'
import Person from 'material-ui-icons/Person'
import Group from 'material-ui-icons/Group'
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';

function TabContainer({ children, dir }) {
    return (
        <div dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

class Groups extends Component {
    render() {
        const {classes, theme} = this.props;
        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={'Item One'}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth>
                        <Tab label="Item One"/>
                        <Tab label="Item Two"/>
                        <Tab label="Item Three"/>
                    </Tabs>
                </AppBar>
                {/*<SwipeableViews*/}
                    {/*axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}*/}
                    {/*index={'Item One'}>*/}
                    {/*<TabContainer dir={theme.direction}>Item One</TabContainer>*/}
                    {/*<TabContainer dir={theme.direction}>Item Two</TabContainer>*/}
                    {/*<TabContainer dir={theme.direction}>Item Three</TabContainer>*/}
                {/*</SwipeableViews>*/}
            </div>
        )
    }
}

export default withStyles(styles)(Groups)
