const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const ytdl = require('ytdl-core');

const PORT = process.env.PORT || 8000;

let progress = 0;
let video;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/fetch', async (req, res) => {
    let link = req.query.link;
    video = ytdl(link);
    let videoTitle = '';
    let videoThumbnail = '';
    await ytdl.getInfo(ytdl.getURLVideoID(link)).then(info => {
        videoTitle = info.videoDetails.title;
        videoThumbnail = info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;
    });
    res.send({title: videoTitle, thumbnail: videoThumbnail});
})


app.post('/download', async (req, res) => {
    const video = ytdl(link);
    ytdl.getInfo(ytdl.getURLVideoID(link)).then(info => {
        videoTitle = info.videoDetails.title
        // console.log('rating:', info.player_response.videoDetails.averageRating);
        // console.log('uploaded by:', info.videoDetails.author.name);
    });
    video.pipe(fs.createWriteStream('videoTitle.mp4'));
    video.on('progress', async (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        progress = (percent * 100).toFixed(2)
        console.log(progress);
    });
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
});