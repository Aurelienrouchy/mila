export const LOGGED_IN = `LOGGED_IN`;
export const LOGGED_OUT = `LOGGED_OUT`;
export const MERGE_USER = `MERGE_USER`;

export const  initialState = {
    isLoggedIn: false,
    user: {
        guid: '',
        picture: [],
        age: null,
        fname: '',
        lname: '',
        desc: '',
        gender: null,
        prefer: null,
        provider: {},
        device: {},
        localisation : {
            latitude: null,
            longitude: null
        },
    }
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN:{
            let { user } = action;

            return {...state, isLoggedIn: true, user};
        }

        case LOGGED_OUT:{
            return {...state, ...initialState};
        }

        case MERGE_USER:{
            let { user } = action;
            const insert_user = {...state.user, ...user};

            return {...state, user: insert_user};
        }

        default:
            return state;
    }
};

export default authReducer;