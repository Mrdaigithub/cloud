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
