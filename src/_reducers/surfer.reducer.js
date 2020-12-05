import { surferConstants } from '../_constants';

export function surfers(state = {}, action) {
    switch (action.type) {
        case surferConstants.GET_WEATHER:
            return {
                weather: action.weather
            };
        case surferConstants.GET_ALL_REQUEST:
            return {
                loading: true
            };
        case surferConstants.GET_ALL_SUCCESS:
            return {
                allSurf: action.courses
            };
        case surferConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            };

        case surferConstants.GET_BY_ID_REQUEST:
            return {
                loading: true
            };
        case surferConstants.GET_BY_ID_SUCCESS:
            return {
                currentSurf: action.surfer
            };
        case surferConstants.GET_BY_ID_FAILURE:
            return {
                error: action.error
            };

        case surferConstants.POST_SURFER_REQUEST:
            return {
                surferCreation: true
            };
        case surferConstants.POST_SURFER_SUCCESS:
            return {};
        case surferConstants.POST_SURFER_FAILURE:
            return {
                error: action.error
            };

        case surferConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case surferConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case surferConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}