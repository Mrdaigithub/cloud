const styles = theme => ({
    root: {},
    fullScreen: {
        width: '100vw',
        height: '100vh',
        margin: 0,
    },
    normal: {
        paddingTop: '5px',
    },
    textCenter: {
        textAlign: 'center',
    },
    resourceListIcon: {
        marginRight: 0,
    },
    container: {
        height: '90vh',
    },
    resourceItem: {
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#eee',
        },
    },
    resourceName: {
        fontSize: '21px',
        margin: 0,
        fontWeight: 'normal',
    },
    resourceDes: {
        fontWeight: 400,
        color: '#333',
    },
    modalHeader: {
        backgroundColor: theme.palette.secondary.light,
    },
    modalHeaderFlex: {
        flex: 1,
    },
    ResourceDetail: {
        backgroundColor: '#ededed',
        height: '100vh',
    },
    ResourceDetailCard: {
        boxShadow: 'none',
    },
    ResourceDetailCardTitle: {
        extend: 'nowrap',
        width: '30vw',
        fontSize: '20px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    ResourceDetailCardContentText: {
        extend: 'nowrap',
        fontSize: '12px',
        padding: '6px 0',

    },
    ResourceDetailCardContentRightText: {
        extend: 'ResourceDetailCardContentText',
        paddingLeft: '50px',
        color: '#7d7d7d',
    },
    preview: {
        position: 'absolute',
        width: '90vw',
        height: '87vh',
        boxSizing: 'border-box',
        top: '70px',
        left: '5vw',
        border: '1px solid #e5e5e5',
        backgroundColor: '#fff',
        boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
        padding: 8 * 4,
    },
    imgPreview: {
        '& img': {
            maxWidth: '90vw',
            maxHeight: '70vh',
        },
    },
});

export default styles;
