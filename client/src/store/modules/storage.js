export const CHANGE_FOLDER = 'oneself/CHANGE_FOLDER';

const initialState = {
    currentPath: ['1', '2'],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_FOLDER:
            return {
                ...state,
                currentPath: action.payload.currentPath,
            };

        default:
            return state;
    }
};
