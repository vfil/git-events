import React, { Component } from 'react';
import ImageLoader from '../ImageLoader';
import withStyles from '../../decorators/withStyles';
import styles from './GitEvent.css';

@withStyles(styles)
class GitEvent extends Component {

    render() {
        const event = this.props.dataEvent;
        //console.log(event);
        return (
            <li className="GitEvent">
                <ul className="GitEvent-item">
                    <li>
                        <div className="GitEvent-avatar-wrapper">
                            <ImageLoader
                                src={event.actor.avatar_url}
                                className="GitEvent-avatar" />
                            <span className="GitEvent-event">{event.type}</span>
                            <span className="GitEvent-avatar-title">{event.actor.login}</span>
                        </div>
                    </li>
                </ul>
            </li>
        );
    }
}

export default GitEvent;