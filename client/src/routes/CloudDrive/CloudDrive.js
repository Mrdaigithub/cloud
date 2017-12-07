import React, { Component } from 'react';
import { connect } from 'dva';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FileIcon from '../../components/file-type-icon/FileIcon';
import FolderIcon from '../../components/file-type-icon/FolderIcon';
import TextIcon from '../../components/file-type-icon/TextIcon';
import PdfIcon from '../../components/file-type-icon/PdfIcon';
import RarIcon from '../../components/file-type-icon/ZipIcon';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './CloudDrive.css';

class CloudDrive extends Component {
  render() {
    return (
      <PageHeaderLayout>
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
        <div className={styles['bottom-bar']}>
          <Grid container
                direction={'row'}
                justify={'space-around'}
                alignItems={'center'}>
            <Grid item xs={2} className={styles['bottom-bar-btn']}>
              <IconButton className={styles['bottom-bar-btn-icon']}
                          aria-label="Delete">
                <DeleteIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={2} className={styles['bottom-bar-btn']}>
              <IconButton className={styles['bottom-bar-btn-icon']}
                          aria-label="Delete">
                <DeleteIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={2} className={styles['bottom-bar-btn']}>
              <IconButton className={styles['bottom-bar-btn-icon']}
                          aria-label="Delete">
                <DeleteIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={2} className={styles['bottom-bar-btn']}>
              <IconButton className={styles['bottom-bar-btn-icon']}
                          aria-label="Delete">
                <DeleteIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={2} className={styles['bottom-bar-btn']}>
              <IconButton className={styles['bottom-bar-btn-icon']}
                          aria-label="Delete">
                <DeleteIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={2} className={styles['bottom-bar-btn']}>
              <IconButton
                className={styles['bottom-bar-btn-icon']}
                aria-label="Delete">
                <DeleteIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </PageHeaderLayout>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(CloudDrive);
