import { mediaType } from "../redux/redux.type";

export const getRandomId = () => {
  return crypto.randomUUID();
};

export const getMediaType = (item) => {
  let url = item.mediaPath || (typeof item.mediaURL === "string" ? item.mediaURL : null);
  if (!url) {
    url = item.name || item;
  }

  const extension = url.split(".").pop().toLowerCase();

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
  const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi"];

  if (imageExtensions.includes(extension)) {
    return mediaType.image;
  } else if (videoExtensions.includes(extension)) {
    return mediaType.video;
  } else {
    return mediaType.unknown;
  }
};
