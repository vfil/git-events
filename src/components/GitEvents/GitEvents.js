import React, { Component } from 'react';
import GitEvent from '../GitEvent';
import Select from 'react-select';
import withStyles from '../../decorators/withStyles';
import styles from './GitEvents.css';
import selectStyles from 'react-select/dist/default.css';

@withStyles(selectStyles)
@withStyles(styles)
class GitEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {filter: []};
    }


    getEventsTypes(events) {
        return events.reduce(function(acc, next) {
            if(acc.indexOf(next.type) === -1) {
                acc.push(next.type)
            }

            return acc;
        }, []);
    }

    filterEvents(event) {
        if(this.state.filter.length === 0)
            return true;
        return this.state.filter.indexOf(event.type) !== -1;
    }

    handleSortChange(val) {
        let filter = val.split(',');
        this.setState({filter: filter[0] === '' ? [] : filter });
    }

    render() {

        let eventNodes = this.props.data.filter(::this.filterEvents).map(function(event, index) {
            return (
                <GitEvent key={event.id} dataEvent={event} />
            );
        });

        let eventTypesOptions = this.getEventsTypes(this.props.data).map(function(type) {
            return (
                { value: type, label: type }
            );
        });
        let selectedTypes = this.state.filter.join();
        return (
            <div className="GitEvents">
                <Select
                    name="form-field-name"
                    value={selectedTypes}
                    options={eventTypesOptions}
                    onChange={::this.handleSortChange}
                    multi={true}
                    />
                <ul className="GitEvents-list">{eventNodes}</ul>
            </div>
        );
    }
}

export default GitEvents;