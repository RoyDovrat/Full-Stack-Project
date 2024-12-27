const initialState = {
    users: [],
    currUser: {}
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE_USERS':
            return { users: action.payload };

        case 'ADD_USER':
            return {
                ...state,
                users: [...state.users, action.payload],
            };

        case 'DELETE_USER':
            if (state.currUser && state.currUser.id === action.payload) {
                console.warn('Error deleting user.');
                return state;
            }
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
                currUser: state.currUser && state.currUser.id === action.payload.id
                    ? action.payload
                    : state.currUser,
            };

        case 'SET_CURR_USER':
            return {
                ...state,
                currUser: action.payload,
            };

        default:
            return state;
    }
};

export default usersReducer;
