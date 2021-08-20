import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: '30px',
    },
    textField: {
        width: '50%',
    }
}));


const DownloadPanel = () => {
    const [link, setLink] = useState('')
    const fetchVideo = () => {
        axios.post("http://localhost:8000/download", {link: link})
    }
    const classes = useStyles();
    return (
        <>
            <div>
                <TextField id="ytLink" className={classes.textField} label="YouTube Video Link" variant="outlined" onChange={(e) => { setLink(e.target.value) }} />
            </div>
            <div>
                <Button variant="contained" onClick={fetchVideo} className={classes.button} color="primary">
                    Fetch video
                </Button>
            </div>
        </>
    )
}

export default DownloadPanel;