export function getData(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        let error = new Error(xhr.statusText);
        error.code = xhr.status;
        reject(error);
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error("json error"));
    });

    xhr.send();
  });
}
