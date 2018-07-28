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

import {
    SET_RESOURCE_LIST, GET_SELECTED_RESOURCE, CLEAR_SELECTED_RESOURCE,
    SET_CHECKED_RESOURCE_ID_LIST, CLEAR_CHECKED_RESOURCE_ID_LIST,
} from '../actions/resourceActions';

const initialState = {
    resources: null,
    selectedResource: {
        resourceID: null,
        resourceName: '',
        resourceMime: '',
        resourcePath: '0',
        resourceCreatedAt: '',
        resourceUpdatedAt: '',
    },
    checkedResourceIdList: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_RESOURCE_LIST:
            return {
                ...state,
                resources: action.payload.resources,
            };
        case GET_SELECTED_RESOURCE:
            return {
                ...state,
                selectedResource: action.payload.selectedResource,
            };
        case CLEAR_SELECTED_RESOURCE:
            return {
                ...state,
                selectedResource: {
                    resourceID: null,
                    resourceName: '',
                    resourceMime: '',
                    resourcePath: '0',
                    resourceCreatedAt: '',
                    resourceUpdatedAt: '',
                },
            };
        case SET_CHECKED_RESOURCE_ID_LIST:
            return {
                ...state,
                checkedResourceIdList: action.payload.checkedResourceIdList,
            };
        case CLEAR_CHECKED_RESOURCE_ID_LIST:
            return {
                ...state,
                checkedResourceIdList: null,
            };

        default:
            return state;
    }
};
