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
    "topbar-btn": {
        color: '#fff'
    },
    'content':{
        paddingTop:'50px'
    }
});

export default styles
