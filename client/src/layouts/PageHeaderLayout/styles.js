const styles = theme => ({
    normal: {
        height: '100vh',
    },
    drawer: {
        width: '250px',
    },

    avatarContainer: {
        backgroundColor: '#1ca7b5',
        color: '#fff',
    },
    avatarImg: {
        backgroundColor: '#fff',
        color: '#1ca7b5',
    },
    'avatarUsername': {
        fontSize: '16px',
        margin: '15px 0 0 0',
    },
    'avatarEmail': {
        fontSize: '16px',
        margin: '0',
        color: 'rgba(255,255,255,.8)',
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
