import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import ViewResultPanel from '../ViewResultPanel/ViewResultPanel';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: '30px',
    },
    textField: {
        width: '50%',
    },
    divider: {
        marginTop: '30px',
        marginLeft: '20%',
        marginRight: '20%',
    }
}));


const DownloadPanel = () => {
    const [link, setLink] = useState('')
    const [progress, setProgress] = useState(0)
    const [videoInfo, setVideoInfo] = useState([])
    const fetchVideo = () => {
        axios.get(`http://localhost:8000/fetch?link=${link}`)
        .then(response => {
            setVideoInfo(response.data)
        });
    }
    const classes = useStyles();
    return (
        <>
            <div>
                <TextField
                    id="ytLink"
                    className={classes.textField}
                    label="YouTube Video Link"
                    variant="outlined"
                    onChange={(e) => { setLink(e.target.value) }} />
            </div>
            <div>
                <Button
                    variant="contained"
                    onClick={fetchVideo}
                    className={classes.button}
                    color="primary">
                    Fetch video
                </Button>
            </div>
            <div>
                <Divider variant="middle" className={classes.divider} />
                <ViewResultPanel />
                <h1>{videoInfo.title}</h1>
                <img src={videoInfo.thumbnail} alt="Video Thumbnail"/>
            </div>
        </>
    )
}

export default DownloadPanel;