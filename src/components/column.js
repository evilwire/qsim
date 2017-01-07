/**
 * Created by knightfu on 1/6/17.
 */

import React, { Component } from 'react';

class Column extends Component {
    constructor(props) {
        super(props);
        this.heading = props.heading;
        this.content = props.content;
    }

    render() {
        return (<div className="column">
            <div className="column-content">
                {this.heading}
                {this.content}
            </div>
        </div>);
    }
}

export default Column;
