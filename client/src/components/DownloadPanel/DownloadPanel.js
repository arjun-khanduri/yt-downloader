import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    formatSelection: {
        width: '40%',
        marginTop: '30px'
    },
    downloadBtn: {
        marginTop: '30px'
    },
    root: {
        display: 'flex',
        margin: '0 auto',
        marginTop: '30px',
        width: "40%",
    },
    cover: {
        width: 151,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    channel: {
        fontSize: 14,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    pos: {
        marginBottom: 12,
    },
}));



const DownloadPanel = (props) => {

    const [format, setFormat] = useState(0)

    const downloadVideo = () => {
        axios.get(`http://localhost:8000/download?itag=${format}`)
    }

    const chooseFormat = (e) => {
        setFormat(e.target.value)
    }

    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title}>
                        {props.videoInfo.title}
                    </Typography>
                    <Typography className={classes.channel} color="textSecondary" gutterBottom>
                        {props.videoInfo.channel}
                    </Typography>
                </CardContent>
                <CardActions>
                    <a href={props.link} target="_blank" rel="noreferrer">
                    <img
                        src={props.videoInfo.thumbnail}
                        alt="Video Thumbnail"
                        width="250px" />
                    </a>
                </CardActions>
            </Card>
            <TextField
                select
                label="Select Format"
                id="selectFormat"
                defaultValue=""
                className={classes.formatSelection}
                onChange={chooseFormat}>
                {props.formats.map((format) => (
                    <MenuItem
                        key={format.itag}
                        value={format.itag}>
                        {format.container.toUpperCase()} - {format.qualityLabel}
                    </MenuItem>
                ))}
            </TextField>
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={downloadVideo}
                className={classes.downloadBtn}>
                Download video
            </Button>
        </>
    )
}

export default DownloadPanel;