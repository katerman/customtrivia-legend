var React = require('react');
var Legend = require('react-legend');

var LegendActions = require('../actions/actions');
var LegendQuests = require('../quests/quests');

var http = require('browser-http');

// used in component did mount
var Storage = window.localStorage;

var Navbar = require('../components/_navbar.jsx');
var Footer = require('../components/_footer.jsx');
var TriviaContainer = require('../components/_triviaContainer.jsx');

var helpers = require('../helpers/helpers');

var App = React.createClass({

    componentWillMount: function() {
        var _this = this;
        LegendActions(_this);
    },

    componentDidMount: function() {
        var _this = this;
        http.request('/public/trivia.json', {
            type: 'GET'
        }, function(response, err) {
            if (!err) {
                if (Storage.TriviaTime) {
                    var LocalStorageParsed = Object.assign({}, helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime) : Storage.TriviaTime);
                    LocalStorageParsed.questionHidden = true;
                    LocalStorageParsed.PendingQuestionChange = false;
                    Legend.UpdateStore({
                        TriviaTime: LocalStorageParsed,
                        VanishIn: true,
                        VanishOut: false
                    });
                    _this.forceUpdate();
                } else {

                    var updateTo = {
                                    teams: [],
                                    triviaData: response.data,
                                    currentQuestion: null,
                                    questionHidden: true,
                                    LocalStorageParsed: false
                                };

                    Legend.UpdateStore({
                        TriviaTime: updateTo,
                        VanishOut: false,
                        VanishIn: true
                    });

                    Storage.TriviaTime = JSON.stringify(updateTo);

                    _this.forceUpdate();
                }
            } else {
                throw err; //error
            }
        });
    },

    _AddNewTeam: function() {
        Legend.Quest('AddNewTeam');
        return false;
    },

    _resetTeams: function() {
        Legend.Quest('ResetTeams');
        return false;
    },

    _changeTeamColor: function(id) {
        Legend.Quest('ChangeTeamColor', {id: id});
        return false;
    },

    _changeTeamPoints: function(id, type){
        Legend.Quest('ChangeTeamPoints', {id: id, type: type});
        return false;
    },

    _handleQustionChange: function(type){
        Legend.Quest('ChangeQuestion', {type: type});
        return false;
    },

    _handleShowAnswer: function(){
        Legend.Quest('ShowAnswer');
        return false;
    },

    render: function() {
        var store = Legend.GetStore();
        var trivia;

        //check if TriviaTime is json and parse it, or not
        if (store && store.TriviaTime && helpers.isJson(store.TriviaTime)) {
            trivia = JSON.parse(store.TriviaTime);
        } else {
            trivia = store.TriviaTime;
        }

        return (
            <div>
                <Navbar
                    changeTeamPoints={this._changeTeamPoints}
                    addNewTeam={this._AddNewTeam}
                    changeTeamColor={this._changeTeamColor}
                    resetTeams={this._resetTeams}
                    trivia={trivia}
                    container={this}
                    />

                <div className="trivia-container">
                    <div className="container">
                        <TriviaContainer
                            store={store}
                            container={this}
                            trivia={trivia}
                            handleQustionChange={this._handleQustionChange}
                            handleShowAnswer={this._handleShowAnswer}
                            />
                    </div>
                </div>

            <Footer
                trivia={trivia}
                handleQustionChange={this._handleQustionChange}
                />

            </div>
        );
    }

});

module.exports = App;
