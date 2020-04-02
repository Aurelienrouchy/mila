export const LOGGED_IN = `LOGGED_IN`;
export const LOGGED_OUT = `LOGGED_OUT`;
export const MERGE_USER = `MERGE_USER`;

export const device = {
    uid: undefined,
    brand: undefined,
    deviceType: undefined,
    systemName: undefined,
    deviceId: undefined,
    systemVersion: undefined
};

export const  initialState = {
    isLoggedIn: false,
    user: {
        uuid: '',
        phone: '',
        picture: [],
        age: null,
        fname: '',
        lname: '',
        desc: '',
        gender: null,
        prefer: null,
        provider: {},
        premium: false,
        language: '',
        region: '',
        device,
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