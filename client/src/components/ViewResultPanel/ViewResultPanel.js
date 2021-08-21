import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const ViewResultPanel = (props) => {
    const downloadVideo = () => {
        axios.get('http://localhost:8000/download', {link: props.link})
    }
    return (
        <>
            <h4>{props.videoInfo.title}</h4>
            <h4>{props.videoInfo.channel}</h4>
            {/* <img src={props.videoInfo.thumbnail} alt="Video Thumbnail" /> */}
            <Button
                variant="contained"
                color="primary"
                onClick={downloadVideo}>
                Download video
            </Button>
        </>
    )
}

export default ViewResultPanel;