import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import DownloadAudioPanel from '../DownloadAudioPanel/DownloadAudioPanel';
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


const FetchVideoPanel = () => {
    const [link, setLink] = useState('')
    const [resultView, setResultView] = useState(false)
    const [loaderView, setLoaderView] = useState(false)
    const [videoInfo, setVideoInfo] = useState([])
    const [formats, setFormats] = useState([])
    const fetchVideo = () => {
        setLoaderView(true)
        axios.get(`http://localhost:8000/fetch?link=${link}`)
            .then(response => {
                for (let i = 0; i < response.data.formatOptions.length; i++)
                    if (response.data.formatOptions[i].hasVideo && response.data.formatOptions[i].hasAudio)
                        setFormats(prev => [...prev, response.data.formatOptions[i]])
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
                {!resultView ?
                    <Button
                        variant="contained"
                        onClick={fetchVideo}
                        className={classes.button}
                        color="primary">
                        Fetch link
                    </Button>
                    :
                    <Button
                        variant="contained"
                        className={classes.button}
                        color="primary"
                        disabled>
                        Fetch link
                    </Button>
                }
            </div>
            {resultView ?
                <div>
                    <Divider variant="middle" className={classes.divider} />
                    <DownloadAudioPanel videoInfo={videoInfo} formats={formats} link={link} />
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

export default FetchVideoPanel;