const validatePostData = (data) => {
  const { mediaURL, title, description, price } = data;
  if (!mediaURL || !title || !description || !price) {
    return "All fields (mediaURL, title, description, price) are required.";
  }
  if (price <= 0) {
    return "Price must be a valid positive number.";
  }
  return null;
};

module.exports = validatePostData;
