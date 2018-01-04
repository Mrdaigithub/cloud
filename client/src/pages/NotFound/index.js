import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './styles';

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes, changePage } = this.props;
        return (
            <PageHeaderLayout>
                <Grid className={classes.normal} container direction={'row'} justify={'center'} alignItems={'center'}>
                    <Grid item sm={7} xs={12} className={classes.left}>
                        404img
                    </Grid>
                    <Grid item sm={5} xs={12} className={classes.right}>
                        <h3>404</h3>
                        <p>页面不存在</p>
                        <Button raised color="primary" onClick={changePage.bind(this, '/cloud-drive/0')}>返回</Button>
                    </Grid>
                </Grid>
            </PageHeaderLayout>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: url => (push(url)),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withStyles(styles)(NotFound));
