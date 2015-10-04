import React, { Component } from 'react';
import GitEvent from '../GitEvent';
import Select from 'react-select';
import Cache from '../../utils/Cache';
import withStyles from '../../decorators/withStyles';
import styles from './GitEvents.css';

@withStyles(styles)
class GitEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {filter: [], data: props.data};
    }

    loadEvents() {
        this.setState({
            filter: this.state.filter,
            data: Cache.get('events').concat(this.state.data)
        });
    }

    randomEvents() {
        this.setState({
            filter: this.state.filter,
            data: this.shuffle(this.state.data)
        });
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
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
        this.setState({
            filter: filter[0] === '' ? [] : filter,
            data: this.state.data
        });
    }

    componentDidMount() {
        //setInterval(::this.loadEvents, 500);
        //setInterval(::this.randomEvents, 1000);
    }

    render() {

        let eventNodes = this.state.data.filter(::this.filterEvents).map(function(event, index) {
            return (
                <GitEvent key={index} dataEvent={event} />
            );
        });

        let eventTypesOptions = this.getEventsTypes(this.state.data).map(function(type) {
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