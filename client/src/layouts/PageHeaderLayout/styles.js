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
    normal: {
        height: '100vh',
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    searchLink: {
        display: 'inherit',
        color: 'inherit',
    },
    drawer: {
        width: 250,
    },
    avatarContainer: {
        backgroundColor: theme.palette.secondary.light,
        color: '#fff',
    },
    avatarImg: {
        backgroundColor: '#fff',
        color: theme.palette.secondary.light,
    },
    avatarUsername: {
        fontSize: 16,
        margin: '15px 0 0 0',
    },
    avatarEmail: {
        fontSize: 16,
        margin: '0',
        color: 'rgba(255,255,255,.8)',
    },
    sidebarLink: {
        display: 'inherit',
        textDecoration: 'none',
    },
    imgResponsive: {
        width: '100%',
    },
    topbarBtn: {
        color: '#fff',
    },
    content: {
        paddingTop: 66,
        boxSizing: 'border-box',
        height: '100vh',
        overflow: 'hidden',
    },
});

export default styles;
