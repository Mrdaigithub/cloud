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
