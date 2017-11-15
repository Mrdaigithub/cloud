import React from 'react';
import PropTypes from 'prop-types';
import {Link, Route} from 'dva/router';
import DocumentTitle from 'react-document-title';
import {Icon} from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';

const links = [{
  title: 'GITHUB',
  href: 'https://github.com/Mrdaigithub/cloud',
}, {
  title: 'README',
  href: 'https://github.com/Mrdaigithub/cloud/blob/master/README.md',
}, {
  title: 'LICENSE',
  href: 'https://github.com/Mrdaigithub/cloud/blob/master/LICENSE',
}];

const copyright = <div>Copyright <Icon type="copyright"/> 2017 Mrdai</div>;

class UserLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
  }

  getChildContext() {
    const {location} = this.props;
    return {location};
  }

  getPageTitle() {
    const {getRouteData, location} = this.props;
    const {pathname} = location;
    let title = 'Cloud';
    getRouteData('UserLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name} - Cloud`;
      }
    });
    return title;
  }

  render() {
    const {getRouteData} = this.props;

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="" className={styles.logo}
                     src="https://raw.githubusercontent.com/Mrdaigithub/cloud/master/logos/logo.png"/>
                <span className={styles.title}>Cloud</span>
              </Link>
            </div>
            <div className={styles.desc}>A simple cloud project</div>
          </div>
          {
            getRouteData('UserLayout').map(item =>
              (
                <Route
                  exact={item.exact}
                  key={item.path}
                  path={item.path}
                  component={item.component}
                />
              )
            )
          }
          <GlobalFooter className={styles.footer} links={links} copyright={copyright}/>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
