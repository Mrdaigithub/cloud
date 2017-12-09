export const TOGGLE_LOADING = 'assist/TOGGLE_LOADING';
export const TOGGLE_MSG = 'assist/TOGGLE_MSG';
export const CHANGE_MSG = 'assist/CHANGE_MSG';

const initialState = {
    loading: false,
    msgShow: false,
    msgText: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading,
            };
        case TOGGLE_MSG:
            return {
                ...state,
                msgShow: !state.msgShow,
            };
        case CHANGE_MSG:
            return {
                ...state,
                msgText: action.payload.msgText,
            };

        default:
            return state;
    }
};

export const toggleLoading = () => {
    return (dispatch) => {
        return dispatch({
            type: TOGGLE_LOADING,
        });
    };
};

export const alert = (msgText = '', time = 3000) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MSG,
        });
        dispatch({
            type: CHANGE_MSG,
            payload: {
                msgText,
            },
        });

        return setTimeout(() => {
            dispatch({
                type: TOGGLE_MSG,
            });
            dispatch({
                type: CHANGE_MSG,
                payload: {
                    msgText: '',
                },
            });
        }, time);
    };
};
