import { surferConstants } from '../_constants';
import { surferService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const surferActions = {
    getAll,
    getById,
    postSurfer,
    update,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        surferService.getAll()
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: surferConstants.GET_ALL_REQUEST } }
    function success(courses) { return { type: surferConstants.GET_ALL_SUCCESS, courses } }
    function failure(error) { return { type: surferConstants.GET_ALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request());

            surferService.getById(id)
                .then(
                    surfer => resolve(dispatch(success(surfer))),
                    error => reject(dispatch(failure(error.toString())))
                );
        });
    };

    function request() { return { type: surferConstants.GET_BY_ID_REQUEST } }
    function success(surfer) { return { type: surferConstants.GET_BY_ID_SUCCESS, surfer } }
    function failure(error) { return { type: surferConstants.GET_BY_ID_FAILURE, error } }
}


function postSurfer(surfer, from) {
    return dispatch => {
        dispatch(request(surfer));

        surferService.postSurfer(surfer)
            .then(
                surfer => {
                    dispatch(success(surfer));
                    history.push(from);
                    dispatch(alertActions.success('Surfer crée avec succès'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(surfer) { return { type: surferConstants.POST_SURFER_REQUEST, surfer } }
    function success(surfer) { return { type: surferConstants.POST_SURFER_SUCCESS, surfer } }
    function failure(error) { return { type: surferConstants.POST_SURFER_FAILURE, error } }
}

function update(surfer) {
    return dispatch => {
        dispatch(request(surfer));

        surferService.update(surfer)
            .then(
                surfer => {
                    dispatch(success(surfer));
                    dispatch(alertActions.success('Surfer mis à jour'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(surfer) { return { type: surferConstants.PUT_SURFER_REQUEST, surfer } }
    function success(surfer) { return { type: surferConstants.PUT_SURFER_SUCCESS, surfer } }
    function failure(error) { return { type: surferConstants.PUT_SURFER_SUCCESS, error } }
}

function _delete(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(request(id));

            surferService.delete(id)
                .then(
                    id => resolve(dispatch(success(id))),
                    error => reject(dispatch(failure(id, error.toString())))
                );
        });
    };

    function request(id) { return { type: surferConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: surferConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: surferConstants.DELETE_FAILURE, id, error } }
}