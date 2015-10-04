import React, { Component } from 'react';
import GitEvent from '../GitEvent';
import Select from 'react-select';
import Toggle from 'material-ui/lib/toggle';
import Cache from '../../utils/Cache';
import withStyles from '../../decorators/withStyles';
import styles from './GitEvents.css';

@withStyles(styles)
class GitEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {filter: [], data: props.data, load: false};
        this.loadInterval = null;
    }

    loadEvents() {
        this.setState({
            //filter: this.state.filter,
            data: Cache.get('events').concat(this.state.data)
        });
    }

    setLoad(bool) {
        if(bool && !this.loadInterval)
            this.loadInterval = setInterval(::this.loadEvents, 50);
        else {
            clearInterval(this.loadInterval)
            this.loadInterval = null;
        }
    }

    randomEvents() {
        this.setState({
            //filter: this.state.filter,
            data: this.shuffle(this.state.data)
        });
    }

    setRandom(bool) {
        if(bool && !this.randomInterval)
            this.randomInterval = setInterval(::this.randomEvents, 50);
    else {
            clearInterval(this.randomInterval)
            this.randomInterval = null;
        }
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
        var result = events.reduce(function(acc, next) {
            if(acc.indexOf(next.type) === -1) {
                acc.push(next.type)
            }

            return acc;
        }, []);
        result.sort();
        return result;
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
            //data: this.state.data
        });
    }

    toggleLoad(event, toggled) {
        this.setLoad(toggled);
    }

    toggleRandom(event, toggled) {
        this.setRandom(toggled);
    }

    componentDidcomponentWillUnmountUnMount() {
        clearInterval(this.loadInterval);
        clearInterval(this.randomInterval);
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
                <div className="GitEvents-load">
                    <Toggle
                        name="toggleName1"
                        value="toggleValue1"
                        label="Load"
                        onToggle={::this.toggleLoad}
                        />
                    <span>{this.state.data.length}</span>
                </div>
                <div className="GitEvents-random">
                    <Toggle
                        name="toggleName2"
                        value="toggleValue2"
                        label="Randomize"
                        onToggle={::this.toggleRandom}
                        />
                </div>
                <ul className="GitEvents-list">{eventNodes}</ul>
            </div>
        );
    }
}

export default GitEvents;