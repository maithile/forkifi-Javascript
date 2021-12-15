import { TIME_OUT } from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const data = await Promise.race([fetPro, timeout(TIME_OUT)]);
    const getData = await data.json();
    // handle error
    if (!data.ok) throw new Error(`${getData.message} and ${data.status}`);
    return getData;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};
// export const getJson = async function (url) {
//   try {
//     const fetPro = fetch(url);
//     const data = await Promise.race([fetPro, timeout(TIME_OUT)]);
//     const getData = await data.json();
//     // handle error
//     if (!data.ok) throw new Error(`${getData.message} and ${data.status}`);
//     return getData;
//   } catch (error) {
//     // console.log(error);
//     throw error;
//   }
// };
// export const sendJson = async function (url, uploadData) {
//   try {
//     const fetPro = fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(uploadData),
//     });
//     const data = await Promise.race([fetPro, timeout(TIME_OUT)]);
//     const getData = await data.json();
//     // handle error
//     if (!data.ok) throw new Error(`${getData.message} and ${data.status}`);
//     return getData;
//   } catch (error) {
//     // console.log(error);
//     throw error;
//   }
// };
