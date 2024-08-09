import axios from 'axios';

axios.defaults.baseURL = 'https://fasteasy-jvqis72guq-lm.a.run.app/tz-front';

const username = 'renesandro';
const password = 'qwerty1234';

export const generateFormats = async requestBody => {
  try {
    const { data } = await axios.post('/generate_formats', requestBody, {
      auth: {
        username,
        password,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const generateImages = async requestBody => {
  try {
    const { data } = await axios.post('/generate_images', requestBody, {
      auth: {
        username,
        password,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
