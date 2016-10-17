import request from 'request';

module.exports = url => new Promise((resolve, reject) => {
  request(url, (error, response, body) => {
    if (!error && response.statusCode >= 200 && response.statusCode <= 400) {
      resolve(response.statusCode);
    } else {
      reject(error || response.statusCode);
    }
  });
});
