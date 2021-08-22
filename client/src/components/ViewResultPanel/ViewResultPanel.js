import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    formatSelection: {
        width: '40%'
    },
    downloadBtn: {
        marginTop: '30px'
    }
}));



const ViewResultPanel = (props) => {

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
            <h4>{props.videoInfo.title}</h4>
            <h4>{props.videoInfo.channel}</h4>
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

export default ViewResultPanel;