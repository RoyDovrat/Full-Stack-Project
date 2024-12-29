const initialState = {
    users: [],
    currUser: {},
    movies: [],
    members: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZE_USERS':
            return {
                ...state,
                users: action.payload,
            };

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

        case 'INITIALIZE_MOVIES':
            return {
                ...state,
                movies: action.payload,
            };

        case 'DELETE_MOVIE':
            return {
                ...state,
                movies: state.movies.filter((movie) => movie._id !== action.payload),
            };

        case 'ADD_MOVIE':
            return {
                ...state,
                movies: [...state.movies, action.payload],
            };

        case 'UPDATE_MOVIE':
            return {
                ...state,
                movies: state.movies.map((movie) =>
                    movie._id === action.payload._id ? action.payload : movie
                ),
            };

        case 'INITIALIZE_MEMBERS':
            return {
                ...state,
                members: action.payload,
            };

        case 'DELETE_MEMBER':
            return {
                ...state,
                members: state.members.filter((member) => member._id !== action.payload),
            };

        case 'UPDATE_MEMBER':
            return {
                ...state,
                members: state.members.map((member) =>
                    member._id === action.payload._id
                        ? { ...member, ...action.payload }
                        : member
                ),
            };

        case 'ADD_MEMBER':
            return {
                ...state,
                members: [...state.members, action.payload],
            };

        case 'ADD_SUBSCRIPTIONS':
            const updatedMembers = state.members.map((member) =>
                member._id === action.payload.memberId
                    ? {
                        ...member,
                        moviesWatched: [
                            ...member.moviesWatched,
                            ...action.payload.movies, 
                        ],
                    }
                    : member
            ); 
            return {
                ...state,
                members: updatedMembers,
            };




        default:
            return state;
    }
};

export default usersReducer;
