export const LOADING_TOGGLE = 'loading/LOADING_TOGGLE';

const initialState = {
    loading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING_TOGGLE:
            return {
                ...state,
                loading: !state.loading
            };

        default:
            return state
    }
}

export const toggleLoading = () => {
    return dispatch => {
        dispatch({
            type: LOADING_TOGGLE
        })
        return setTimeout(() => {
            dispatch({
                type: LOADING_TOGGLE
            })
        }, 1000)
    }
};
