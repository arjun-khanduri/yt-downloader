import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '30px',
  },
  choicePanel: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <h1>YT Downloader</h1>
      <div className={classes.choicePanel}>
        <Link to="/video" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            className={classes.button}
            color="primary">
            Download Video
          </Button>
        </Link>
        <br />
        <Link to="/audio" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            className={classes.button}
            color="primary">
            Download Audio
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default App;
