const axios = require('axios').default
const FormData = require('form-data');
const dotenv = require('dotenv');
// const got = require('got');

dotenv.config();

module.exports = async (url) => {
    const form = new FormData();
    form.append('api_token', process.env.AUDD_TOKEN);
    form.append('url', url);
    form.append('return', 'deezer');

    const response = await axios.post('https://api.audd.io/',
    { 
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    },
    {
        body: form,
        responseType: 'json',
        resolveBodyOnly: true,
    });

    console.log(response);
    if (response && response.result) {
        return {
            artist: response.result.artist,
            title: response.result.title,
            album: response.result.album,
            deezer: {
                picture: response.result.deezer && response.result.deezer.artist ? response.result.deezer.artist.picture_medium : undefined,
                preview: response.result.deezer ? response.result.deezer.preview : undefined,
            },
        };
    }
};