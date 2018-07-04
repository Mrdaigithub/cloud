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

import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const TorrentIcon = props => (
    <SvgIcon {...props} viewBox="0 0 1024 1024">
        <path d="M1024 512.318937c0-282.737542-229.262458-511.946844-512-511.946844C229.209302 0.372093 0 229.634551 0 512.318937c0 217.940199 136.451827 403.614618 328.345515 477.448505l-96.637874-449.169435-27.322259-126.936877-48.372093-224.531562 187.375415-40.345515 69.262459 322.07309c18.710963 86.963455 58.152824 133.634551 123.109634 119.601329 51.401993-11.056478 73.196013-52.890365 79.04319-84.890366 2.604651-12.119601 0.69103-27.109635-2.498339-41.780731L535.601329 107.375415l187.322259-40.239202 87.495017 406.697674c35.189369 163.561462 130.445183 188.598007 130.445182 188.598007l-182.485049 39.229236c-53.79402 11.641196-90.046512-84.571429-90.046512-84.571429l-3.72093 0.797342c-15.30897 41.727575-32.584718 109.501661-166.219269 138.312293a282.578073 282.578073 0 0 1-28.810632 4.41196l56.55814 263.016611c276.093023-7.495017 497.860465-233.355482 497.860465-511.30897z"/>
    </SvgIcon>
);

export default TorrentIcon;
