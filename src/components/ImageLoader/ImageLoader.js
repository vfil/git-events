import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import joinClasses from 'react/lib/joinClasses';

class ImageLoader extends Component {

    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }

    onImageLoad() {
        this.setState({loaded: true});
    }

    componentDidMount() {
        var imgTag = ReactDOM.findDOMNode(this.refs.img);
        var imgSrc = imgTag.getAttribute('src');
        var img = new window.Image();
        img.onload = ::this.onImageLoad;
        img.src = imgSrc;
    }

    render() {
        let imgClasses = 'ImageLoader-transparent';
        let {className, ...props} = this.props;
        if (this.state.loaded) {
            imgClasses = joinClasses(imgClasses, 'ImageLoader-loaded');
        }

        return (
            <img ref="img" src={props.src} className={joinClasses(className, imgClasses)} />
        );
    }
}

export default ImageLoader