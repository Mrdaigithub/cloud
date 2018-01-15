import logo from '../../static/logo.svg';

const styles = theme => ({
    normal: {
        height: '100vh',
        boxSizing: 'border-box',
        background: `url(${logo}) no-repeat center #eeeeef`,
        backgroundSize: '80px',
    },
    searchInput: {
        alignItems: 'center',
        borderBottom: '1px solid #c1c1c1',
    },
    searchList: {},
    searchItem: {
        backgroundColor: '#fff',
    },
});

export default styles;
