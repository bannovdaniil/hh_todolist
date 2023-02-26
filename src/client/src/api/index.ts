import urlCreator from 'common/url-creator';
import _ from 'lodash';

const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://localhost' : 'http://localhost:3000';
const VERSION = 'api/v1';
const GET_ALL = `${VERSION}/getAll`;
const GET = `${VERSION}/get`;
const ADD = `${VERSION}/add`;
const UPDATE = `${VERSION}/update`;
const DELETE = `${VERSION}/delete`;

const apiUrl = urlCreator(BASE_URL);
const getAllUrl = apiUrl(GET_ALL, null);
const getByIdUrl = apiUrl(GET, _, null);
const addUrl = apiUrl(ADD, null, null);
const updateUrl = apiUrl(UPDATE, _, null);
const deleteUrl = apiUrl(DELETE, _, null);

export { BASE_URL, VERSION, GET_ALL, GET, DELETE, UPDATE, apiUrl, addUrl, getAllUrl, getByIdUrl, updateUrl, deleteUrl };
