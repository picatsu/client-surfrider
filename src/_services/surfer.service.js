import config from 'config';
import { authHeader } from '../_helpers';

export const surferService = {
    getAll,
    getById,
    postSurfer,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/surfers/all`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/surfers/${id}`, requestOptions).then(handleResponse);
}

function postSurfer(surfer) {

    const headersVar = Object.assign({ 'Content-Type': 'application/json' }, authHeader());

    const requestOptions = {
        method: 'POST',
        headers: headersVar,
        body: JSON.stringify(surfer)
    };

    return fetch(`${config.apiUrl}/surfers/add`, requestOptions).then(handleResponse);
}

function update(surfer) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(surfer)
    };

    return fetch(`${config.apiUrl}/surfers/update`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/surfers/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}