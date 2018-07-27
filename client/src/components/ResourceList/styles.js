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
    flex: {
        flexGrow: 1,
    },
    dark: {
        backgroundColor: '#212121',
    },
    white: {
        color: '#f5f5f5',
    },
    fullScreen: {
        width: '100vw',
        height: '100vh',
        margin: 0,
    },
    normal: {
        paddingTop: 5,
    },
    textCenter: {
        textAlign: 'center',
    },
    checkedTopBarTitle: {
        extend: 'white',
        flexGrow: 1,
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
        backgroundColor: '#f5f5f5',
        '&:hover': {
            backgroundColor: '#eee',
        },
    },
    resourceName: {
        fontSize: 21,
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
        fontSize: 20,
        fontWeight: 300,
    },
    ResourceDetailCardContentText: {
        fontSize: 14,
        marginBottom: 4,
    },
    ResourceDetailCardContentRightText: {
        extend: 'ResourceDetailCardContentText',
        color: '#7d7d7d',
        marginLeft: 15,
    },
    preview: {
        position: 'absolute',
        width: '90vw',
        height: '87vh',
        boxSizing: 'border-box',
        top: 70,
        left: '5vw',
        border: '1px solid #e5e5e5',
        backgroundColor: '#f5f5f5',
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
});

export default styles;
