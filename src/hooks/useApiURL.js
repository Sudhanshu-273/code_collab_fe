const useApiURL = (BACKEND_URL) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/';
  } else {
    return BACKEND_URL;
  }
};

export default useApiURL;