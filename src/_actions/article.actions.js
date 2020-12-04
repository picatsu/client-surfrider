import {articleConstants} from '../_constants';
import {articleService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

export const articleActions = {
    getAll,
    getById,
    postArticle,
    putArticle,
    completeArticle,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        articleService.getAll()
            .then(
                articles => dispatch(success(articles)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: articleConstants.GET_ALL_REQUEST } }
    function success(articles) { return { type: articleConstants.GET_ALL_SUCCESS, articles } }
    function failure(error) { return { type: articleConstants.GET_ALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            articleService.getById(id)
                .then(
                    article => resolve(dispatch(success(article))),
                    error => reject(dispatch(failure(error.toString())))
                );
        });
    };

    function request() { return { type: articleConstants.GET_BY_ID_REQUEST } }
    function success(article) { return { type: articleConstants.GET_BY_ID_SUCCESS, article } }
    function failure(error) { return { type: articleConstants.GET_BY_ID_FAILURE, error } }
}


function postArticle(article) {
    return dispatch => {
        dispatch(request(article));

        articleService.postArticle(article)
            .then(
                article => {
                    dispatch(success(article));
                    dispatch(alertActions.success('Cours crée avec succès'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(article) { return { type: articleConstants.POST_ARTICLE_REQUEST, article } }
    function success(article) { return { type: articleConstants.POST_ARTICLE_SUCCESS, article } }
    function failure(error) { return { type: articleConstants.POST_ARTICLE_FAILURE, error } }
}

function putArticle(article) {
    return dispatch => {
        dispatch(request(article));

        articleService.update(article)
            .then(
                article => {
                    dispatch(success(article));
                    dispatch(alertActions.success('Article mis à jour'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(article) { return { type: articleConstants.PUT_ARTICLE_REQUEST, article } }
    function success(article) { return { type: articleConstants.PUT_ARTICLE_SUCCESS, article } }
    function failure(error) { return { type: articleConstants.PUT_ARTICLE_FAILURE, error } }
}

function completeArticle(articleId, userId) {
    return dispatch => {
        dispatch(request(articleId));

        articleService.complete(articleId, userId)
            .then(
                article => {
                    dispatch(success(article));
                    dispatch(alertActions.success('Article complété'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(articleId) { return { type: articleConstants.COMPLETE_ARTICLE_REQUEST, articleId } }
    function success(article) { return { type: articleConstants.COMPLETE_ARTICLE_SUCCESS, article } }
    function failure(error) { return { type: articleConstants.COMPLETE_ARTICLE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request(id));

            articleService.delete(id)
                .then(
                    id => resolve(dispatch(success(id))),
                    error => reject(dispatch(failure(id, error.toString())))
                );
        });
    };

    function request(id) { return { type: articleConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: articleConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: articleConstants.DELETE_FAILURE, id, error } }
}
