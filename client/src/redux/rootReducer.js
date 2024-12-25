const initialState = {
    users: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE_USERS':
            return { users: action.payload };
        case 'DELETE_USER':
            return {
                ...state,
                users: state.users.filter((user) => user._id !== action.payload),
            };
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map((user) =>
                    user._id === action.payload._id ? action.payload : user
                ),
            };
        default:
            return state;
    }
};

export default usersReducer;
