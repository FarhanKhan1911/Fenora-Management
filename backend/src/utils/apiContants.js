const baseUrl = "http://localhost:3000/";

const resetPasswordUrl = (id, token) => `${baseUrl}reset-password/${id}/${token}`;

module.exports = { resetPasswordUrl };
