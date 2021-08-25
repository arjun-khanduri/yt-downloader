import './App.css';
import FetchVideoPanel from './components/FetchVideoPanel/FetchVideoPanel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
      margin: '30px',
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <h1>YouTube Downloader</h1>
      <h4>Choose one of the following options:</h4>
      <Button
        variant="contained"
        className={classes.button}
        color="primary">
        Download Video
      </Button>
      <br />
      <Button
        variant="contained"
        className={classes.button}
        color="primary">
        Download Audio
      </Button>
      {/* <FetchVideoPanel /> */}
    </div>
  );
}

export default App;
