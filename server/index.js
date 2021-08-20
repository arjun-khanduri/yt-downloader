const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const ytdl = require('ytdl-core');

const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.post('/download', (req, res) => {
    const link = req.body.link;
    ytdl(`${link}`)
        .pipe(fs.createWriteStream('video.mp4'))
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
});