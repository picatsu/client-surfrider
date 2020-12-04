import config from 'config';
import { authHeader } from '../_helpers';

export const courseService = {
    getAll,
    getById,
    getBySlug,
    postCourse,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/courses`, requestOptions).then(handleResponse);
}

function getBySlug(slug) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/courses/${slug}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/courses/${id}`, requestOptions).then(handleResponse);
}

function postCourse(course) {

    const headersVar = Object.assign({ 'Content-Type': 'application/json' }, authHeader());

    const requestOptions = {
        method: 'POST',
        headers: headersVar,
        body: JSON.stringify(course)
    };

    return fetch(`${config.apiUrl}/courses`, requestOptions).then(handleResponse);
}

function update(course) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(course)
    };

    return fetch(`${config.apiUrl}/courses/${course.id_course}`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/courses/${id}`, requestOptions).then(handleResponse);
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
