import React, { useEffect } from 'react';
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

    useEffect(() => {
        // props.formats.map((format) => console.log(format.itag));
        // console.log()
    })

    const downloadVideo = () => {
        axios.get('http://localhost:8000/download')
    }
    const classes = useStyles();
    return (
        <>
            <h4>{props.videoInfo.title}</h4>
            <h4>{props.videoInfo.channel}</h4>
            {/* <img src={props.videoInfo.thumbnail} alt="Video Thumbnail" /> */}
            <TextField
                select
                value="Options"
                label="Select Format"
                className={classes.formatSelection}
            >
                {props.formats.map((option) => (
                    <MenuItem value={option.itag}>
                        {option.container.toUpperCase()} - {option.qualityLabel}
                    </MenuItem>
                ))}
            </TextField>
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={downloadVideo}
                className={classes.downloadBtn}
            >
                Download video
            </Button>
        </>
    )
}

export default ViewResultPanel;