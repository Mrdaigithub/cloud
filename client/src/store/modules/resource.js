export const GO_PATH = 'resource/GO_PATH';
export const BACK_PATH = 'resource/BACK_PATH';

const initialState = {
    currentPath: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GO_PATH:
            state.currentPath.push(action.payload.dirName);
            return {
                ...state,
                currentPath: state.currentPath,
            };
        case BACK_PATH:
            return {
                ...state,
                currentPath: state.currentPath.pop(),
            };

        default:
            return state;
    }
};

export const goPath = (dirName) => {
    return (dispatch) => {
        dispatch({
            type: GO_PATH,
            payload: {
                dirName,
            },
        });
    };
};

export const backPath = () => {
    return (dispatch) => {
        dispatch({
            type: BACK_PATH,
        });
    };
};
