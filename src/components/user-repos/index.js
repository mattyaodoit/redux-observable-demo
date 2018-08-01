import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `0 0 ${theme.spacing.unit * 2}px`,
  }
});

class UserRepos extends Component {
  handleClick = (url) => {
    window.open(url, '_blank');
  };

  generateList(repos) {
    let repoRows = [];
    for(const repo of repos) {
      repoRows.push(
        <ListItem button key={repo.id} onClick={this.handleClick.bind(this, repo.html_url)}>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={repo.name} />
        </ListItem>
      )
    }

    return repoRows.length === 0 ? null : repoRows;
  }

  render() {
    const {
      classes,
      repos,
      isFetching
    } = this.props;

    if (!this.props || repos === undefined) {
      return null;
    } else {
      const spinner = isFetching ?
        <CircularProgress className={classes.progress} size={80} /> : null;

      const title = !isFetching ?
        <Typography variant="title" className={classes.title}>
          Repositories {repos.length}
        </Typography> : null;

      return (
        <div className={classes.root}>
          {spinner}
          {title}
          <List component="nav">
            {this.generateList(repos)}
          </List>
        </div>
      );
    }
  }
}

UserRepos.propTypes = {
  classes: PropTypes.object.isRequired,
  repos: PropTypes.array,
  isFetching: PropTypes.bool
};

export default withStyles(styles)(UserRepos);