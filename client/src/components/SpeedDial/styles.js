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
