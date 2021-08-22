import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import ViewResultPanel from '../ViewResultPanel/ViewResultPanel';
import Loader from '../Loader/Loader';

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
    const [resultView, setResultView] = useState(false)
    const [loaderView, setLoaderView] = useState(false)
    // const [progress, setProgress] = useState(0)
    const [videoInfo, setVideoInfo] = useState([])
    const [formats, setFormats] = useState([])
    const fetchVideo = () => {
        setLoaderView(true)
        axios.get(`http://localhost:8000/fetch?link=${link}`)
            .then(response => {
                for (let i = 0; i < response.data.formatOptions.length; i++) {
                    if (response.data.formatOptions[i].hasVideo && response.data.formatOptions[i].hasAudio) {
                        //console.log(response.data.formatOptions[i].qualityLabel)
                        // setFormats([...response.data.formatOptions[i].qualityLabel])
                        console.log(response.data.formatOptions[i])
                        setFormats(prev => [...prev, response.data.formatOptions[i]])
                        // formats.push(response.data.formatOptions[i])
                    }
                }
                console.log(formats);
                setVideoInfo(response.data)
                setResultView(true)
                setLoaderView(false)
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
            {resultView ?
                <div>
                    <Divider variant="middle" className={classes.divider} />
                    <ViewResultPanel videoInfo={videoInfo} formats={formats} />
                </div>
                :
                null
            }
            {loaderView ?
                <div>
                    <Divider variant="middle" className={classes.divider} />
                    <Loader />
                </div>
                :
                null
            }
        </>
    )
}

export default DownloadPanel;