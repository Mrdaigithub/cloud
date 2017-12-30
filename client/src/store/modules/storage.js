export const CHANGE_FOLDER = 'oneself/CHANGE_FOLDER';

const initialState = {
    currentDir: '/',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_FOLDER:
            return {
                ...state,
                currentDir: action.payload.currentDir,
            };

        default:
            return state;
    }
};
