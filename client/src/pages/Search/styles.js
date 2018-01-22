import logo from '../../static/logo.svg';

const styles = theme => ({
    normal: {
        background: `url(${logo}) no-repeat center #eeeeef`,
        backgroundSize: '80px',
        height: '100vh',
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
});

export default styles;
