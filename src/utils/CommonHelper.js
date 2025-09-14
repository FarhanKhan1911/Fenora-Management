import { mediaType } from "../redux/redux.type";

export const getRandomId = () => {
  return crypto.randomUUID();
};

export const getMediaType = (item) => {
  const url = item.mediaPath || (typeof item.mediaURL === "string" ? item.mediaURL : null);
  if (!url) return mediaType.unknown;

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
