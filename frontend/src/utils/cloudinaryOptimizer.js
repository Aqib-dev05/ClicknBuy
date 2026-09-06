const optimizeImage = (url) => {
  return url.replace(
    "/upload/",
    "/upload/w_500,h_500,c_fill,g_auto,f_auto,q_auto/"
  );
};

export default optimizeImage;