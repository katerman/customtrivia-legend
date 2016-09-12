var React = require('react');

var QuestionHeaderText = function(props){
    if(!props.trivia || !props.trivia.triviaData){
        return null;
    }
    return (
        <span>
            {"Question #" + props.trivia.currentQuestion}
            <span className="small-text">{" of " + props.trivia.triviaData.questions.length} </span>
        </span>
    );
};

var Question = function(props){
    var currentQuestionNumber = props.trivia.currentQuestion;
    var questions = props.trivia.triviaData.questions;
    var currentQuestion = questions[parseInt(currentQuestionNumber - 1)];
    if(!currentQuestion || !currentQuestion.question){
        return null;
    }
    return (
        <h2 className="text-center text-info">
            {currentQuestion.question}
        </h2>
    )
};

var Answer = function(props){
    var currentQuestionNumber = props.trivia.currentQuestion;
    var questions = props.trivia.triviaData.questions;
    var currentQuestion = questions[parseInt(currentQuestionNumber - 1)];
    if(!currentQuestion || !currentQuestion.answer || !props.trivia || props.trivia.questionHidden === true){
        return null;
    }
    return (
        <h2 className="text-center text-primary">
            {currentQuestion.answer}
        </h2>
    )
};



var HostInfo = function(props){
    if(!props.trivia || !props.trivia.triviaData || !props.trivia.triviaData.host || !props.trivia.triviaData.host.length === 0){
        return null;
    }
    return (
        <h2 className="text-info text-center">
            {"With your host " + props.trivia.triviaData.host}
        </h2>
    )
};

var TriviaContainer = function(props) {

    if(!props.trivia){
        return null;
    }

    var divClass = 'col-md-12';
    if(props.store.VanishIn){
        divClass += ' vanishIn magictime';
    }
    if(props.store.VanishOut){
        divClass += ' vanishOut magictime';
    }

    if(props.trivia && typeof props.trivia.currentQuestion === 'undefined' || props.trivia.currentQuestion === null){
        return (
            <div className={divClass}>
                <div className="row">

                    <h1 className="text-primary text-center">Welcome to {props.trivia.triviaData && props.trivia.triviaData.triviaName ? props.trivia.triviaData.triviaName : 'Trivia'}!</h1>

                    <HostInfo
                        trivia={props.trivia}
                        />

                    <p className="lead text-center">Create some teams using the button in the upper right-hand corner.</p>
                    <button className={props.trivia.teams && props.trivia.teams.length > 0 ? "btn btn-lg btn-primary center-btn" : "hidden"} onClick={props.handleQustionChange.bind(null, 'next')}>Start</button>

                </div>
            </div>
        );
    }else {

        return (
            <div className={divClass}>
                <div className="row">
                    <h1 className="text-primary text-center question-header">
                        <QuestionHeaderText
                            trivia={props.trivia}
                            />
                    </h1>
                </div>
                <div className="row">

                    <div className="col-md-12">
                        <Question
                            trivia={props.trivia}
                            />

                        <Answer
                            trivia={props.trivia}
                            />
                    </div>

                    <div className="col-md-12">
                        <button className={props.trivia && props.trivia.questionHidden ? "btn btn-lg btn-primary center-btn" : "hidden"} onClick={props.handleShowAnswer}>Show Answer</button>
                    </div>


                </div>
            </div>
        );
    }

};

module.exports = TriviaContainer;
