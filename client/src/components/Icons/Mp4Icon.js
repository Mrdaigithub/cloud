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

const Mp4Icon = props => (
    <SvgIcon {...props} viewBox="0 0 1024 1024">
        <path
            d="M356.693333 317.44h-27.306666c-8.533333 0-13.653333 6.826667-13.653334 13.653333V358.4c0 8.533333 6.826667 13.653333 13.653334 13.653333h27.306666c8.533333 0 13.653333-6.826667 13.653334-13.653333v-27.306667c0-8.533333-6.826667-13.653333-13.653334-13.653333z m0 107.52h-27.306666c-8.533333 0-13.653333 6.826667-13.653334 13.653333v27.306667c0 8.533333 6.826667 13.653333 13.653334 13.653333h27.306666c8.533333 0 13.653333-6.826667 13.653334-13.653333v-27.306667c0-6.826667-6.826667-13.653333-13.653334-13.653333z m0 107.52h-27.306666c-8.533333 0-13.653333 6.826667-13.653334 13.653333v27.306667c0 8.533333 6.826667 13.653333 13.653334 13.653333h27.306666c8.533333 0 13.653333-6.826667 13.653334-13.653333V546.133333c0-6.826667-6.826667-13.653333-13.653334-13.653333z m184.32 266.24c-3.413333 0-8.533333-1.706667-15.36-1.706667H494.933333v44.373334h32.426667c10.24 0 17.066667-1.706667 22.186667-5.12 5.12-3.413333 6.826667-8.533333 6.826666-17.066667 0-5.12-1.706667-10.24-3.413333-13.653333-3.413333-3.413333-6.826667-5.12-11.946667-6.826667z m98.986667 64.853333v-54.613333l-37.546667 54.613333h37.546667zM747.52 0h-17.066667l17.066667 17.066667v93.866666c0 40.96 34.133333 75.093333 75.093333 75.093334h93.866667l17.066667 17.066666v-17.066666L747.52 0z m-17.066667 119.466667V0h-546.133333c-47.786667 0-85.333333 37.546667-85.333333 85.333333v853.333334c0 47.786667 37.546667 85.333333 85.333333 85.333333h665.6c47.786667 0 85.333333-37.546667 85.333333-85.333333V204.8h-119.466666c-46.08 0-85.333333-37.546667-85.333334-85.333333zM459.093333 906.24H443.733333v-102.4l-35.84 102.4H392.533333L358.4 802.133333v104.106667h-17.066667v-122.88h23.893334l29.013333 87.04c3.413333 8.533333 5.12 13.653333 5.12 18.773333 1.706667-5.12 3.413333-10.24 6.826667-18.773333l29.013333-85.333333h22.186667v121.173333z m102.4-61.44c-6.826667 6.826667-18.773333 10.24-35.84 10.24H494.933333V904.533333h-15.36v-122.88h46.08c8.533333 0 13.653333 0 18.773334 1.706667 6.826667 1.706667 10.24 3.413333 15.36 5.12 3.413333 3.413333 6.826667 6.826667 10.24 11.946667 1.706667 5.12 3.413333 10.24 3.413333 17.066666-1.706667 11.946667-5.12 20.48-11.946667 27.306667z m110.933334 32.426667h-17.066667v29.013333h-15.36v-29.013333h-52.906667v-13.653334l56.32-78.506666h11.946667v78.506666h17.066667v13.653334z m58.026666-303.786667c0 22.186667-18.773333 40.96-40.96 40.96H329.386667c-22.186667 0-40.96-18.773333-40.96-40.96V331.093333c0-22.186667 18.773333-40.96 40.96-40.96h360.106666c22.186667 0 40.96 18.773333 40.96 40.96v242.346667z m-40.96-256h-27.306666c-8.533333 0-13.653333 6.826667-13.653334 13.653333V358.4c0 8.533333 6.826667 13.653333 13.653334 13.653333h27.306666c8.533333 0 13.653333-6.826667 13.653334-13.653333v-27.306667c0-8.533333-6.826667-13.653333-13.653334-13.653333z m0 107.52h-27.306666c-8.533333 0-13.653333 6.826667-13.653334 13.653333v27.306667c0 8.533333 6.826667 13.653333 13.653334 13.653333h27.306666c8.533333 0 13.653333-6.826667 13.653334-13.653333v-27.306667c0-6.826667-6.826667-13.653333-13.653334-13.653333z m-291.84 162.133333h221.866667V317.44h-221.866667v269.653333z m42.666667-189.44c0-10.24 10.24-17.066667 20.48-11.946666l110.933333 54.613333c10.24 5.12 10.24 18.773333 0 23.893333L460.8 518.826667c-8.533333 5.12-20.48-1.706667-20.48-11.946667v-109.226667z m249.173333 134.826667h-27.306666c-8.533333 0-13.653333 6.826667-13.653334 13.653333v27.306667c0 8.533333 6.826667 13.653333 13.653334 13.653333h27.306666c8.533333 0 13.653333-6.826667 13.653334-13.653333V546.133333c0-6.826667-6.826667-13.653333-13.653334-13.653333z"/>
    </SvgIcon>
);

export default Mp4Icon;