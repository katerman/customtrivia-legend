var React = require('react');

var TeamCard = function(props) {
    return (
        <div className="card col-md-3" style={{
            borderColor: props.borderColor
        }}>
            <div className="row">
                <div className="col-md-9">
                    <div className="row" onDoubleClick={props.changeTeamColor.bind(null, props.teamId)}>
                        <h3
                            className="text-center">
                            {props.teamName}
                        </h3>
                    </div>
                    <div className="row" onDoubleClick={props.changeTeamColor.bind(null, props.teamId)}>
                        <div className="text-center">
                            <span className="text-primary text-primary score">{props.score}</span>
                        </div>
                        <h6 className="text-center">SCORE</h6>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="row">
                        <button className="btn btn-block btn-success btn-lg" onClick={props.changeTeamPoints.bind(null, props.teamId, 'add')}>
                            <span className="fa fa-plus"></span>
                        </button>
                    </div>
                    <div className="row">
                        <button className="btn btn-block btn-danger btn-lg" onClick={props.changeTeamPoints.bind(null, props.teamId, 'subtract')}>
                            <span className="fa fa-minus"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

var Navbar = function(props) {

    var createTeamCards = null;

    if (props.trivia && props.trivia.teams && props.trivia.teams.length > 0) {
        createTeamCards = props.trivia.teams.map(function(data, key) {
            return (
                <TeamCard
                    teamId={data.id}
                    changeTeamColor={props.changeTeamColor}
                    changeTeamPoints={props.changeTeamPoints}
                    key={key} borderColor={data.borderColor}
                    teamName={data.teamName}
                    score={data.score}
                />
            );
        });
    }

    return (
        <div className="navbar" ref={(ref) => props.container.navbar = ref}>
            <div className="container-fluid">

                <div className="row">
                    <div className="col-sm-11 col-md-11 teamCards">
                        {createTeamCards}
                    </div>

                    <div className="col-sm-1 col-md-1">
                        <button className="btn btn-default newTeamBtn btn-block" onClick={props.addNewTeam}>
                            <span className="fa fa-plus"></span>
                        </button>
                        <button className={props.trivia && props.trivia.teams && props.trivia.teams.length > 0 ? "btn btn-danger resetBtn btn-block" : "hidden"} onClick={props.resetTeams}>
                            <span className="fa fa-trash"></span>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );

};

module.exports = Navbar;
