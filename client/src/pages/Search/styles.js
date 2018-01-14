import logo from '../../static/logo.svg';

const styles = theme => ({
    normal: {},
    searchInput: {
        alignItems: 'center',
    },
    searchList: {
        background: `url(${logo}) no-repeat center #eeeeef`,
        backgroundSize: '80px',
        padding: '5px',
    },
    searchItem: {
        backgroundColor: '#fff',
    },
});

export default styles;
