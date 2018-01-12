const styles = theme => ({
    normal: {
        height: '100vh',
        padding: '60px 0 5px 0',
        boxSizing: 'border-box',
    },
    root: {
        paddingRight: 2,
        marginTop: theme.spacing.unit * 2,
    },
    table: {
        minWidth: 800,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.A700,
                backgroundColor: theme.palette.secondary.A100,
            }
            : {
                color: theme.palette.secondary.A100,
                backgroundColor: theme.palette.secondary.A700,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    SpeedDialItemButton: {
        display: 'inline',
    },
});

export default styles;
