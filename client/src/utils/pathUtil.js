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

/**
 * 回退url /cloud-drive/0/1/2/3 => /cloud-drive/0/1/2
 *
 * @param url
 * @returns {string}
 */
export const movePath = {
    go: (url, path) => {
        const newMoveUrl = url.toString()
            .split('/')
            .filter(item => !!item);
        if (newMoveUrl[0] !== '0') {
            newMoveUrl.unshift('0');
        }
        newMoveUrl.push(path.toString()
            .trim());
        return newMoveUrl.join('/');
    },
    back: (url) => {
        const newMoveUrl = url.toString()
            .split('/')
            .filter(item => !!item);
        if (newMoveUrl[0] !== '0') {
            newMoveUrl.unshift('0');
        }
        if (newMoveUrl.length > 1) {
            newMoveUrl.pop();
        }
        return newMoveUrl.join('/');
    },
};
