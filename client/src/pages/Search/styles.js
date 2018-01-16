import logo from '../../static/logo.svg';

const styles = theme => ({
    normal: {
        background: `url(${logo}) no-repeat center #eeeeef`,
        backgroundSize: '80px',
    },
    nowrap: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        verticalAlign: 'middle',
    },
    iconColor: {
        color: 'rgba(0, 0, 0, 0.54)',
    },
    searchInput: {
        alignItems: 'center',
        borderBottom: '1px solid #c1c1c1',
    },
    searchItem: {
        backgroundColor: '#fff',
    },
    rightDrawer: {
        backgroundColor: '#ededed',
        height: '100vh',
    },
    rightDrawerCard: {
        boxShadow: 'none',
    },
    rightDrawerCardTitle: {
        extend: 'nowrap',
        width: '20vw',
        maxWidth: '55vw',
        fontSize: '20px',
        paddingRight: '30px',
    },
    rightDrawerCardContentText: {
        extend: 'nowrap',
        fontSize: '12px',
        padding: '6px 0',

    },
    rightDrawerCardContentRightText: {
        extend: 'rightDrawerCardContentText',
        paddingLeft: '50px',
        color: '#7d7d7d',
    },
});

export default styles;
