import { articleConstants } from '../_constants';

export function articles(state = {}, action) {
    switch (action.type) {
        case articleConstants.GET_ALL_REQUEST:
            return {
                loading: true
            };
        case articleConstants.GET_ALL_SUCCESS:
            return {
                items: action.articles
            };
        case articleConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            };

        case articleConstants.GET_BY_ID_REQUEST:
            return {
                loading: true
            };
        case articleConstants.GET_BY_ID_SUCCESS:
            return {
                currentArticle: action.article
            };
        case articleConstants.GET_BY_ID_FAILURE:
            return {
                error: action.error
            };

        case articleConstants.PUT_ARTICLE_REQUEST:
            return {
                articleUpdate: true
            };
        case articleConstants.PUT_ARTICLE_SUCCESS:
            return {};
        case articleConstants.PUT_ARTICLE_FAILURE:
            return {
                error: action.error
            };

        case articleConstants.POST_ARTICLE_REQUEST:
            return {
                articleCreation: true
            };
        case articleConstants.POST_ARTICLE_SUCCESS:
            return {};
        case articleConstants.POST_ARTICLE_FAILURE:
            return {
                error: action.error
            };

        case articleConstants.COMPLETE_ARTICLE_REQUEST:
            return {
                ...state,
                articleCompletion: true
            };
        case articleConstants.COMPLETE_ARTICLE_SUCCESS:
            return Object.assign({}, state, {
                completedArticle: action.article
            });
        case articleConstants.COMPLETE_ARTICLE_FAILURE:
            return {
                error: action.error
            };

        case articleConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case articleConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case articleConstants.DELETE_FAILURE:
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
