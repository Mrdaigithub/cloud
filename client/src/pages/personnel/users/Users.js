import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles'
import styles from './styles'
import {Link} from 'react-router-dom'
import Grid from 'material-ui/Grid'
import List, {ListItem, ListItemText} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import BottomNavigation, {BottomNavigationButton} from 'material-ui/BottomNavigation'
import Person from 'material-ui-icons/Person'

class Users extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                group
            </div>
        )
    }
}

export default withStyles(styles)(Users)
