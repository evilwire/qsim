/**
 * A component for modelling WIP
 *
 * Created by knightfu on 1/6/17.
 */
import React, { Component } from 'react';
import uuidV4 from 'uuid';
import Column from './column.js';
import Heading from './heading.js'
import {linear} from '../math/scaling.js';

class Task {
    constructor(loe) {
        this._loe = loe;
    }

    get loe() {
        return this._loe;
    }
}


/**
 *
 */
class QueueSlot extends Component {
    constructor(props) {
        super(props);
        this.style = {
            borderRadius: "4px",
            height: "6px",
            width: "6px",
            border: "1px solid #bbb",
            display: "inline-block",
            margin: "0 .5vw"
        };

        this.state = {
            task: props.task
        };
    }

    getLoEColor(loe) {
        var rInit = 150,
            gInit = 230,
            bInit = 60;

        var rFin = 50,
            gFin = 170,
            bFin = 230;

        if (0 <= loe && loe < 21) {
            var ratio = loe / 10,
                r = Math.round(linear(rInit, rFin, ratio)),
                g = Math.round(linear(gInit, gFin, ratio)),
                b = Math.round(linear(bInit, bFin, ratio));

            return `RGB(${r}, ${g}, ${b})`;
        }

        return `RGB(0, 0, 0)`;
    }

    render() {
        if (this.state.task) {
            var color = this.getLoEColor(this.state.task.loe);
            this.style.border = `1px solid ${color}`;
            this.style.background = color;
        } else {
            this.style.border = "1px solid #bbb";
        }
        return (
            <div className="qslot"
                 style={this.style}
                 key={this.key}
            />
        );
    }
}

function group(arr, n) {
    var grouped = new Array(Math.ceil(arr.length / n)).fill(null);
    var index = 0;
    var groupIndex = 0;
    while (index < arr.length) {
        grouped[groupIndex] = arr.slice(index, index + n);
        index = (groupIndex += 1) * n;
    }
    return grouped;
}

function xrange(n) {
    var arr = new Array(n);
    var i = 0;

    while (i < n) {
        arr[i] = i; i++;
    }
    return arr
}


/**
 *
 */
class Queue extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tasks: [
                new Task(10),
                new Task(1),
                new Task(2),
                new Task(3),
                new Task(8)
            ]
        };
    }

    push(tasks) {
        this.setState({
            tasks: this.state.tasks.concat(tasks)
        })
    }

    pop() {
        var first = this.state.tasks[0];
        this.setState({
            tasks: this.state.tasks.splice(1)
        });

        return first;
    }

    render() {
        var tasks = this.state.tasks,
            taskCount = tasks.length;

        var queueSlotCount = Math.max(20, Math.ceil((taskCount + 1)/ 10) * 10);
        var slots = [...xrange(queueSlotCount)].map((i) => {
            if (i < taskCount) {
                return <QueueSlot key={uuidV4()} task={tasks[i]} />
            }
            return <QueueSlot task={null} key={uuidV4()}/>
        });

        var slotRows = group(slots, 10);
        return (
            <div className="queue" onClick={this.handleClick}>
                {
                    [...slotRows].map((row, rowNum) => {
                        return (
                            <div className="qslot-row" key={rowNum}>
                                {row}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}


class WIPColumn extends Column {
    constructor(props) {
        super(props);
        this.heading = (
            <Heading icon="circle-o-notch" spin="true" title="WIP" />
        );
        this.content = (
            <Queue size="20" />
        );
    }
}

export {WIPColumn, Task}
