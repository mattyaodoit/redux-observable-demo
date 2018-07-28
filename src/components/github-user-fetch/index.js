import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginLeft: 0
  },
  input: {
    display: 'none',
  },
  card: {
    maxWidth: 345,
    marginTop: 10
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  progressBar: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    zIndex: 999
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.unit
  }
});

class Simple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    }
  }

  checkEmptyObject = obj => {
    return obj === undefined ||
      obj === null ||
      Object.keys(obj).length === 0;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.sendRequest(this.state.name);
  }

  render() {
    const { 
      classes,
      user,
      userError,
      sendRequest,
      cancelRequest,
      isFetching
    } = this.props;

    // TODO: create a component for this card
    const cardDOM = !this.checkEmptyObject(user) ?
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={user.avatar_url}
          title={user.login}
        />

        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {user.name}
          </Typography>
          <Typography component="p">
            {user.bio}
          </Typography>
        </CardContent>

        <CardActions>
          <IconButton aria-label="Follow him">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card> : null;

    const progressDOM = isFetching ?
      <div className={classes.progressBar}>
        <LinearProgress />
      </div>: null;

    if (!this.props) {
      return null;
    } else {
      return (
        <div className="example simple">
          <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField
              id="name"
              label="Search by username"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
          </form>

          <div className="button-group">
            <Button variant="contained" color="primary" className={classes.button} onClick={sendRequest.bind(this, this.state.name)}>
              Get user
            </Button>
            <Button variant="contained" color="secondary" className={classes.button} onClick={cancelRequest}>
              Cancel request
            </Button>
          </div>
          { progressDOM }
          { cardDOM }

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={!this.checkEmptyObject(this.props.userError)}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
          >
            <SnackbarContent
              className={classes.error}
              aria-describedby="client-snackbar"
              message={<span id="client-snackbar" className={classes.message}>
                  <ErrorIcon className={classes.icon}/>
                  {this.checkEmptyObject(userError) ? '' : userError.message}
                </span>
              }
            />
          </Snackbar>
        </div>
      );
    }
  }
}

Simple.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  userError: PropTypes.object,
  sendRequest: PropTypes.func,
  cancelRequest: PropTypes.func,
  isFetching: PropTypes.bool
};

export default withStyles(styles)(Simple);