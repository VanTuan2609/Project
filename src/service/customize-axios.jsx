import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});


instance.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    let res = {}
    if (error.response) {
      res.data = error.response.data
      res.status = error.response.status
      res.headers = error.response.headers
    }
    else if (res.request) {
      console.log(res.request);
    }
    else {
      console.log("Error", error.message)
    }
    return res;
    // return Promise.reject(error);
  });

export default instance