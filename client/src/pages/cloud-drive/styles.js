import avatarBg from '../../static/avatar-bg.png'

const styles = theme => ({
    drawer: {
        width: '250px'
    },
    'avatar-container': {
        background: `url(${avatarBg}) center`,
        backgroundSize: 'cover',
    },
    'avatar-img': {
        padding: '5px',
        backgroundColor: '#7d7d7d',
        borderRadius: '50%',
        overflow: 'hidden'
    },
    'avatar-username': {
        color: '#000',
        fontSize: '20px',
        margin: '10px 0 0 0'
    },
    'sidebar-link': {
        display: 'inherit',
        textDecoration: 'none'
    },
    'img-responsive': {
        width: '100%'
    },
    'topbar-btn': {
        color: '#fff'
    },
    'bottom-bar': {
        backgroundColor: 'rgba(0,0,0,.9)',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0
    },
    'bottom-bar-btn': {
        textAlign: 'center'
    },
    'bottom-bar-btn-icon': {
        color: '#fff'
    }
});

export default styles
