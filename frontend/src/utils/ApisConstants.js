const baseUrl = "http://localhost:5000/api";

export const LOGIN_API = `${baseUrl}/auth/login`;
export const LOGOUT_API = `${baseUrl}/auth/logout`;
export const REGISTER_API = `${baseUrl}/auth/register`;
export const FORGET_PASSWORD_API = `${baseUrl}/auth/forget-password`;
export const RESET_PASSWORD_API = (id, token) => `${baseUrl}/auth/reset-password/${id}/${token}`;
export const GET_PROFILE_API = (id) => `${baseUrl}/auth/get-profile/${id}`;
export const UPDATE_PROFILE_API = (id) => `${baseUrl}/auth/update-profile/${id}`;

export const CREATE_POST_API = `${baseUrl}/posts/create-post`;
export const GET_ALL_POSTS_API = `${baseUrl}/posts/all-posts`;
export const EDIT_POST_API = (id) => `${baseUrl}/posts/edit-post/${id}`;
export const DELETE_POST_API = (id) => `${baseUrl}/posts/delete-post/${id}`;

export const GET_CHATS_API = `${baseUrl}/chat`;
export const CREATE_CHAT_API = `${baseUrl}/chat`;
export const GET_MESSAGES_API = (chatId) => `${baseUrl}/chat/${chatId}/messages`;
export const SEND_MESSAGE_API = (chatId) => `${baseUrl}/chat/${chatId}/messages`;
