import request from '../../utils/requester';

export const FETCH_RESOURCES = 'resource/FETCH_RESOURCES';

const initialState = {
    resources: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESOURCES:
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
            type: FETCH_RESOURCES,
            payload: {
                resources,
            },
        });
        return cb();
    };
};
