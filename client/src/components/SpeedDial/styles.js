const styles = theme => ({
    cover: {
        position: 'fixed',
        bottom: '40px',
        right: '20px',
        zIndex: 999,
        opacity: 1,
        transition: 'opacity 0.2s ease-in-out',
        width: '56px',
        textAlign: 'center',
    },
    floatButton: {
        '& svg': {
            transition: 'transform 0.2s ease-in-out',
        },
    },
    action: {
        margin: 0,
        transition: '0.2s ease-in-out',
        padding: 0,
        '& li': {
            listStyle: 'none',
            transition: '0.2s ease-in-out',
        },
        '& button': {
            backgroundColor: '#fff',
            '& a': {
                display: 'inline-flex',
                color: '#5f6161',
            },
        },
    },
    opened: {
        '& $floatButton svg': {
            transform: 'rotate(135deg)',
        },
        '& $action': {
            marginBottom: '25px',
            visibility: 'visible',
            opacity: 1,
            '& li': {
                height: '40px',
                marginBottom: '15px',
            },
        },
    },
    closed: {
        '& $floatButton svg': {
            transform: 'rotate(0)',
        },
        '& $action': {
            marginBottom: 0,
            visibility: 'hidden',
            opacity: 0,
            '& li': {
                height: 0,
                marginBottom: '0',
            },
        },
    },
});

export default styles;
