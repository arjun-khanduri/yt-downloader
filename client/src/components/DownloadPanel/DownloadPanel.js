import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: '30px',
    },
    textField: {
        width: '50%',
    }
  }));

function DownloadPanel() {
    const classes = useStyles();
    return (
        <>
            <div>
                <TextField id="outlined-basic" className={classes.textField} label="YouTube Video Link" variant="outlined"/>
            </div>
            <div>
                <Button variant="contained" className={classes.button} color="primary">
                    Fetch video
                </Button>
            </div>
        </>
    )
}

export default DownloadPanel;