import React, { Component } from 'react';
import SimpleExample from './../../components/examples/simple';

class Home extends Component {
    render() {
        if (!this.props) {
            return null;
        } else {
            return (
                <div className="page home">
                    <div className="container">
                        <SimpleExample toggleCard={false} />
                    </div>
                </div>
            );
        }
    }
}

export default Home;