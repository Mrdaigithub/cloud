const styles = theme => ({
    root: {},
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
        backgroundColor: '#7d7d7d',
    },
    modalHeaderFlex: {
        flex: 1,
    },
    modal: {
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
    ResourceDetailOpen: {
        backgroundColor: '#ededed',
        height: '100vh',
    },
    rightDrawerCard: {
        boxShadow: 'none',
    },
    rightDrawerCardTitle: {
        extend: 'nowrap',
        width: '20vw',
        maxWidth: '55vw',
        fontSize: '20px',
        paddingRight: '30px',
    },
    rightDrawerCardContentText: {
        extend: 'nowrap',
        fontSize: '12px',
        padding: '6px 0',

    },
    rightDrawerCardContentRightText: {
        extend: 'rightDrawerCardContentText',
        paddingLeft: '50px',
        color: '#7d7d7d',
    },
});

export default styles;
