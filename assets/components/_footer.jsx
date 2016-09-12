var React = require('react');

var Footer = function(props) {
    if(!props.trivia || !props.trivia.currentQuestion){
        return null;
    }
    return (
        <footer className="footer">
            <button className="btn btn-primary btn-lg pull-left" onClick={props.handleQustionChange.bind(null, 'prev')}>
                <span className="fa fa-arrow-left"></span>
            </button>
            <button className="btn btn-primary btn-lg pull-right" onClick={props.handleQustionChange.bind(null, 'next')}>
                <span className="fa fa-arrow-right"></span>
            </button>
        </footer>
    );

};

module.exports = Footer;
