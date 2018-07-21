import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginLeft: 0
  },
  input: {
    display: 'none',
  },
  card: {
    minWidth: 275,
    marginTop: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
});

class Simple extends Component {
  render() {
    const { classes, toggleCard } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    const cardDOM = toggleCard ? <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Word of the Day
          </Typography>
          <Typography variant="headline" component="h2">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card> : null;

    if (!this.props) {
      return null;
    } else {
      return (
        <div className="example simple">
          <h3>1. Send and cancel request</h3>

          <div classname="button-group">
            <Button variant="contained" color="primary" className={classes.button}>
              Get user
            </Button>
            <Button variant="contained" color="secondary" className={classes.button}>
              Cancel request
            </Button>
          </div>

          { cardDOM }
        </div>
      );
    }
  }
}

Simple.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleCard: PropTypes.bool
};

export default withStyles(styles)(Simple);