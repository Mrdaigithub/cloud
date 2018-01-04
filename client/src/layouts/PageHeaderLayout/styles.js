import avatarBg from '../../static/avatar-bg.png';


const styles = theme => ({
    normal: {
        height: '100vh',
    },
    drawer: {
        width: '250px',
    },

    avatarContainer: {
        background: `url(${avatarBg}) center`,
        backgroundSize: 'cover',
    },

    avatarImg: {
        padding: '5px',
        backgroundColor: '#7d7d7d',
        borderRadius: '50%',
        overflow: 'hidden',
    },

    avatarUsername: {
        color: '#000',
        fontSize: '20px',
        margin: '10px 0 0 0',
    },

    sidebarLink: {
        display: 'inherit',
        textDecoration: 'none',
    },

    imgResponsive: {
        width: '100%',
    },

    topbarBtn: {
        color: '#fff',
    },

    content: {
        height: '100vh',
        boxSizing: 'border-box',
        padding: '60px 0 5px 0',
    },
});

export default styles;
