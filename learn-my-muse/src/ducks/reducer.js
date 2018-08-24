const initialState = {
    searchParams: {
        instrument: '',
        area: '',
        inHome: true,
        studio: true
    },
    searchResults: [],
    reviews: {},
    user: {},
}

const UPDATE_PARAMS = 'UPDATE_PARAMS'
const UPDATE_SEARCH = 'UPDATE_SEARCH'
const UPDATE_INHOME = 'UPDATE_INHOME'
const UPDATE_REVIEWS = 'UPDATE_REVIEWS'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export default function reducer( state = initialState, action ){ 
    switch( action.type ){
        
        case UPDATE_PARAMS:
        return Object.assign( {}, state, { searchParams: action.payload })

        case UPDATE_SEARCH:
        return Object.assign( {}, state, { searchResults: action.payload })

        case UPDATE_INHOME:
        return Object.assign( {}, state, {  inHome: action.payload })

        case UPDATE_REVIEWS:
        return Object.assign( {}, state, {  reviews: action.payload })

        case LOGIN_USER:
        return Object.assign( {}, state, {  user: action.payload })

        case LOGOUT_USER:
        return Object.assign( {}, state, {  user: {} })

        default:
        return state;
    }
}

export function updateParams ( instrument, area, inHome, studio) {
    return {
        type: UPDATE_PARAMS,
        payload: {
            instrument,
            area,
            inHome,
            studio
        }
    }
}

export function updateSearchResults ( results ) {
    return {
        type: UPDATE_SEARCH,
        payload: results
    }
}

export function updateInHome ( val ) {
    return {
        type: UPDATE_INHOME,
        payload: val
    }
}

export function updateReviews ( obj ) {
    return {
        type: UPDATE_REVIEWS,
        payload: obj
    }
}

export function loginUser ( obj ) {
    return {
        type: LOGIN_USER,
        payload: obj
    }
}

export function logoutUser () {
    return {
        type: LOGOUT_USER,
    }
}