import request from '../../utils/requester';

export const GET_RESOURCES = 'resource/GET_RESOURCES';

const initialState = {
    resources: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_RESOURCES:
            return {
                ...state,
                resources: action.payload.resources,
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
        return cb();
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
