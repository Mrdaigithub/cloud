/*
 * MIT License
 *
 * Copyright (c) 2017 Mrdai
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const styles = theme => ({
    root: {
        height: '100%',
    },
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
    resourceList: {
        overflowY: 'scroll',
        height: '100%',
        padding: 0,
    },
    resourceListBlank: {
        minHeight: '85vh',
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
        maxWidth: '85vw',
        backgroundColor: '#ededed',
        height: '100vh',
        boxShadow: 'none',
    },
    ResourceDetailCardTitle: {
        fontSize: '20px',
        fontWeight: 300,
    },
    ResourceDetailCardContentText: {
        fontSize: '14px',
    },
    ResourceDetailCardContentRightText: {
        extend: 'ResourceDetailCardContentText',
        color: '#7d7d7d',
        marginLeft: '20px',
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
        maxWidth: '90vw',
        maxHeight: '70vh',
    },
    textPreview: {
        marginTop: '8vh',
        width: '95vw',
        height: '85vh',
        backgroundColor: '#fafafa',
    },
    videoPreview: {},
    unablePreviewText: {
        color: '#fff',
    },
});

export default styles;
