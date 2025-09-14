const baseUrl = "http://localhost:5000/api";

export const LOGIN_API = `${baseUrl}/auth/login`;
export const LOGOUT_API = `${baseUrl}/auth/logout`;
export const REGISTER_API = `${baseUrl}/auth/register`;

export const createPostAPI = `${baseUrl}/posts/create-post`;
export const getAllPostsAPI = `${baseUrl}/posts/all-posts`;
export const editPostAPI = (id) => `${baseUrl}/posts/edit-post/${id}`;
export const deletePostAPI = (id) => `${baseUrl}/posts/delete-post/${id}`;
