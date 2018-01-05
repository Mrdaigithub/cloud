const styles = theme => ({
    settingTopBar: {
        position: 'relative',
    },
    listSection: {
        background: '#fff',
    },
    listItemTextChild: {
        '& h4': {
            fontSize: '15px',
            fontWeight: 'normal',
            margin: 0,
        },
        '& p': {
            fontSize: '14px',
            margin: 0,
        },
        '& a': {
            display: 'block',
            textDecoration: 'none',
            color: 'rgba(0, 0, 0, 0.87)',
        },
    },
});

export default styles;
