import notFoundImg from '../../static/404.svg';

const styles = theme => ({
    normal: {
        height: '90vh',
        boxSizing: 'border-box',
    },
    left: {
        height: '40vh',
        background: `url(${notFoundImg}) no-repeat center`,
        backgroundSize: 'contain',
        fontSize: 0,
        textIndent: '-99999px',
    },
    right: {
        textAlign: 'center',
        '& h3': {
            color: '#434e59',
            fontSize: '30px',
            fontWeight: 'bold',
        },
        '& p': {
            color: '#434e59',
            fontSize: '20px',
        },
    },
});

export default styles;
