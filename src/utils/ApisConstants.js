export const baseUrl = "http://localhost:5000";
const baseApiUrl = `${baseUrl}/api`;

export const LOGIN_API = `${baseApiUrl}/auth/login`;
export const LOGOUT_API = `${baseApiUrl}/auth/logout`;
export const REGISTER_API = `${baseApiUrl}/auth/register`;
export const FORGET_PASSWORD_API = `${baseApiUrl}/auth/forget-password`;
export const RESET_PASSWORD_API = (id, token) => `${baseApiUrl}/auth/reset-password/${id}/${token}`;
export const GET_PROFILE_API = (id) => `${baseApiUrl}/auth/get-profile/${id}`;
export const UPDATE_PROFILE_API = (id) => `${baseApiUrl}/auth/update-profile/${id}`;

export const CREATE_POST_API = `${baseApiUrl}/posts/create-post`;
export const GET_ALL_POSTS_API = `${baseApiUrl}/posts/all-posts`;
export const EDIT_POST_API = (id) => `${baseApiUrl}/posts/edit-post/${id}`;
export const DELETE_POST_API = (id) => `${baseApiUrl}/posts/delete-post/${id}`;

export const GET_CHATS_API = `${baseApiUrl}/chat`;
export const CREATE_CHAT_API = `${baseApiUrl}/chat`;
export const GET_MESSAGES_API = (chatId) => `${baseApiUrl}/chat/${chatId}/messages`;
export const SEND_MESSAGE_API = (chatId) => `${baseApiUrl}/chat/${chatId}/messages`;
