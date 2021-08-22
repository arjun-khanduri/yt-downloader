const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const ytdl = require('ytdl-core');

const PORT = process.env.PORT || 8000;

let link = '';
let formatOptions = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/fetch', async (req, res) => {
    link = req.query.link;
    let videoTitle = '';
    let videoThumbnail = '';
    let videoYoutubeChannel = '';
    await ytdl.getInfo(ytdl.getURLVideoID(link)).then(info => {
        videoTitle = info.videoDetails.title;
        videoThumbnail = info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;
        videoYoutubeChannel = info.videoDetails.author.name;
        formatOptions = info.formats;
    });
    // console.log(formatOptions);
    res.send({ title: videoTitle, thumbnail: videoThumbnail, channel: videoYoutubeChannel, formatOptions: formatOptions });
})


app.get('/download', (req, res) => {
    const itag = req.query.itag
    res.header("Content-Disposition",'attachment;\ filename="video.'+"mp4"+'"');
    ytdl(link, {
        filter: formatOptions => formatOptions.itag == itag
    }).pipe(res);;
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
});