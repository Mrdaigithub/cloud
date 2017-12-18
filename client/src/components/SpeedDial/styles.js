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
        position: 'relative',
        marginBottom: '12px',
        transition: '0.2s ease-in-out',
        '& button': {
            margin: '8px 0',
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
            top: '-5px',
            opacity: 1,
        },
    },
    closed: {
        '& $floatButton svg': {
            transform: 'rotate(0)',
        },
        '& $action': {
            top: '0',
            opacity: 0,
        },
    },
});

export default styles;
