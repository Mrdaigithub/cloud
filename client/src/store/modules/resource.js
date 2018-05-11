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

import request from '../../utils/requester';

export const GET_RESOURCES = 'resource/GET_RESOURCES';
export const GET_SELECTED_RESOURCE = 'resource/GET_SELECTED_RESOURCE';
export const CLEAR_SELECTED_RESOURCE = 'resource/CLEAR_SELECTED_RESOURCE';

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
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_RESOURCES:
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

        default:
            return state;
    }
};

export const fetchResources = (cb) => {
    return async (dispatch) => {
        const resources = await request.get('resources');
        dispatch({
            type: GET_RESOURCES,
            payload: {
                resources,
            },
        });
        return cb(resources);
    };
};

export const getSelectedResource = (resourceID, resourceName, resourceMime, resourcePath, resourceCreatedAt, resourceUpdatedAt) => {
    return async (dispatch) => {
        return dispatch({
            type: GET_SELECTED_RESOURCE,
            payload: {
                selectedResource: {
                    resourceID,
                    resourceName,
                    resourceMime,
                    resourcePath,
                    resourceCreatedAt,
                    resourceUpdatedAt,
                },
            },
        });
    };
};

export const clearSelectedResource = () => {
    return async (dispatch) => {
        return dispatch({
            type: CLEAR_SELECTED_RESOURCE,
        });
    };
};

export const changeResourceListWithPath = (path, resourceList) => {
    return async (dispatch, state) => {
        const resources = state().resource.resources;
        resources[path] = resourceList;
        return dispatch({
            type: GET_RESOURCES,
            payload: {
                resources,
            },
        });
    };
};
