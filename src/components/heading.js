/**
 * A UI component for heading
 *
 * Created by knightfu on 1/6/17.
 */

import React, { Component } from 'react';

class Heading extends Component {
    constructor(props) {
        super(props);
        this.icon = "fa-" + props.icon + (props.spin? " fa-spin" : "");
        this.title = props.title;
    }
    render() {
        return (<div className="column-heading">
            <div className={"fa " + this.icon} aria-hidden="true" />
            <div>{this.title}</div>
        </div>);
    }
}


export default Heading;