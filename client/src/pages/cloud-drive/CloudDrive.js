import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid'
import List, {ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import FileIcon from '../../components/file-type-icon/FileIcon'
import FolderIcon from '../../components/file-type-icon/FolderIcon'
import TextIcon from '../../components/file-type-icon/TextIcon'
import PdfIcon from '../../components/file-type-icon/PdfIcon'
import RarIcon from '../../components/file-type-icon/ZipIcon'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import styles from './styles'

class CloudDrive extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <List>
                    <ListItem button>
                        <ListItemIcon><FolderIcon/></ListItemIcon>
                        <ListItemText primary={`folder`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><FileIcon/></ListItemIcon>
                        <ListItemText primary={`file`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><TextIcon/></ListItemIcon>
                        <ListItemText primary={`text`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><PdfIcon/></ListItemIcon>
                        <ListItemText primary={`pdf`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RarIcon/></ListItemIcon>
                        <ListItemText primary={`zip`}/>
                        <ListItemSecondaryAction><Checkbox/></ListItemSecondaryAction>
                    </ListItem>
                </List>
                <div className={classes['bottom-bar']}>
                    <Grid container
                          direction={'row'}
                          justify={'space-around'}
                          alignItems={'center'}>
                        <Grid item xs={2} className={classes['bottom-bar-btn']}>
                            <IconButton className={classes['bottom-bar-btn-icon']}
                                        aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={2} className={classes['bottom-bar-btn']}>
                            <IconButton className={classes['bottom-bar-btn-icon']}
                                        aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={2} className={classes['bottom-bar-btn']}>
                            <IconButton className={classes['bottom-bar-btn-icon']}
                                        aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={2} className={classes['bottom-bar-btn']}>
                            <IconButton className={classes['bottom-bar-btn-icon']}
                                        aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={2} className={classes['bottom-bar-btn']}>
                            <IconButton className={classes['bottom-bar-btn-icon']}
                                        aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={2} className={classes['bottom-bar-btn']}>
                            <IconButton className={classes['bottom-bar-btn-icon']}
                                        aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(CloudDrive)