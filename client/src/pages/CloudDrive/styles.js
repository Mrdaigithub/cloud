import avatarBg from '../../static/avatar-bg.png';

const styles = theme => ({
    'drawer': {
        width: '250px',
    },

    'avatarContainer': {
        background: `url(${avatarBg}) center`,
        backgroundSize: 'cover',
    },
    'avatarImg': {
        padding: '5px',
        backgroundColor: '#7d7d7d',
        borderRadius: '50%',
        overflow: 'hidden',
    },

    'avatarUsername': {
        color: '#000',
        fontSize: '20px',
        margin: '10px 0 0 0',
    },
    'sidebarLink': {
        display: 'inherit',
        textDecoration: 'none',
    },
    'imgResponsive': {
        width: '100%',
    },
    'topbarBtn': {
        color: '#fff',
    },

    'bottomBar': {
        backgroundColor: 'rgba(0, 0, 0, .9)',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
    },

    'bottomBarBtn': {
        textAlign: 'center',
    },

    'bottomBarBtnIcon': {
        color: '#fff',
    },
    'SpeedDialItemInput': {
        display: 'none',
    },
    'SpeedDialItemButton': {
        display: 'inline',
    },

});

export default styles;
