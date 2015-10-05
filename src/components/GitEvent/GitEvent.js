import React, { Component } from 'react';
import ImageLoader from '../ImageLoader';

class GitEvent extends Component {

    constructor() {
        super();
        this.state = {hover: false}
    }

    mouseOver() {
        this.setState({hover: true});
    }

    mouseOut() {
        this.setState({hover: false});
    }


    render() {
        const event = this.props.dataEvent;
        const className = 'GitEvent-event ' + 'GitEvent-event--' + event.type;
        const tooltipClass = '_GitEventTooltip GitEvent-description' + (this.state.hover ? ' GitEvent-description--visible' : '');
        //console.log(JSON.stringify(event));
        return (
            <li className="GitEvent">
                <ul className="GitEvent-item">
                    <li>
                        <div className="GitEvent-avatar-wrapper" onMouseOver={::this.mouseOver} onMouseOut={::this.mouseOut} ref="item">
                            <ImageLoader
                                src={event.actor.avatar_url}
                                className="GitEvent-avatar" />
                            <span className={className}>{event.type}</span>
                            <span className="GitEvent-avatar-title">{event.actor.login}</span>
                            <span ref="tooltip" className={tooltipClass}>{event.repo.name}</span>
                        </div>
                    </li>
                </ul>
            </li>
        );
    }
}

export default GitEvent;