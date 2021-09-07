import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

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
    channel: {
        fontSize: 14,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    refresh: {
        marginTop: '30px'
    }
}));



const DownloadPanel = (props) => {
    const [downloadClicked, setDownloadClicked] = useState(false)

    const downloadVideo = () => {
        setDownloadClicked(true)
        axios.get(`http://localhost:8000/audio/download`)
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
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={downloadVideo}
                className={classes.downloadBtn}>
                Download MP3
            </Button>
            <br />
            {downloadClicked ?
                <Typography className={classes.refresh}>
                    <Link href= "/" variant="body2">
                        Download from another link
                    </Link>
                </Typography>
                :
                null
            }
        </>
    )
}

export default DownloadPanel;