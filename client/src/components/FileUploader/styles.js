const styles = theme => ({
    dialog: {
        overflowX: 'hidden',
    },
    media: {
        display: 'table',
        '& svg': {
            display: 'table-cell',
            verticalAlign: 'middle',
            paddingRight: '5px',
        },
        '& span': {
            width: '100%',
            display: 'table-cell',
            verticalAlign: 'middle',
            '& i': {
                display: 'block',
                fontStyle: 'normal',
                width: '85%',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
            },
        },
    },
});

export default styles;
