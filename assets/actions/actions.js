var Legend = require('react-legend');
var RandomColor = require('randomcolor');
var http = require('browser-http');
var helpers = require('../helpers/helpers');

module.exports = function(component) {

    var Storage = window.localStorage;

    // Show a prompt() and ask the user what name they want to add
    Legend.ActionType('NewTeamPrompt', function(quest, questData) {
        var newTeam = prompt('Team Name.');

        var LocalStorageParsed = Object.assign({}, helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime) : Storage.TriviaTime);

        // if the player isn't new
        if (newTeam && newTeam.length > 0) {
            LocalStorageParsed.teams.push({
                teamName: newTeam,
                score: 0,
                borderColor: RandomColor(),
                id: LocalStorageParsed.teams.length === 0 ? 0 : parseInt(LocalStorageParsed.teams.length),
            });

            Storage.TriviaTime = JSON.stringify(LocalStorageParsed);

            quest.next({
                TriviaTime: LocalStorageParsed
            });


        } else {
            alert('Not a valid team name, try again.');
            quest.reject('Not a valid team name, try again.');
        }

    });

    // checks to make sure storage has a TriviaTime object and creates one if its missing
    Legend.ActionType('CheckLocalStorage', function(quest, questData) {
        http.request('/public/trivia.json', {
            type: 'GET'
        }, function(response, err) {
            if (!err) {
				var teams = Storage.TriviaTime && helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime).teams : [];
                var currentQuestion = Storage.TriviaTime && helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime).currentQuestion : null;
                var isHidden = Storage.TriviaTime && helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime).questionHidden : true;
                var PendingQChange = Storage.TriviaTime && helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime).PendingQuestionChange : false;
                Storage.TriviaTime = JSON.stringify({
                    teams: teams,
                    triviaData: response.data,
					currentQuestion: currentQuestion,
                    questionHidden: isHidden,
                    PendingQuestionChange: PendingQChange
                });
                quest.next();
            } else {
                quest.reject();
                throw err; //error
            }
        });
    });

    // resets the game back to the newGameObject
    Legend.ActionType('ResetTeams', function(quest, questData) {

        var reset = confirm('Are you sure you want to reset the game, all data will be lost.');

        if(reset){
            Storage.TriviaTime = JSON.stringify({
                teams: [],
                triviaData: helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime).triviaData : Storage.TriviaTime.triviaData,
                currentQuestion: null,
                questionHidden: true
            });

            quest.next({
                TriviaTime: helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime) : Storage.TriviaTime
            });
        }else{
            quest.next();
        }
    });

    Legend.ActionType('ChangeTeamColor', function(quest, questData) {
        var LocalStorageParsed = Object.assign({}, helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime) : Storage.TriviaTime);

        LocalStorageParsed.teams[questData.data.id].borderColor = require('randomcolor')();

        Storage.TriviaTime = JSON.stringify(LocalStorageParsed);

        quest.next({
            TriviaTime: LocalStorageParsed
        });

    });

    Legend.ActionType('ChangeTeamPoints', function(quest, questData) {
        var LocalStorageParsed = Object.assign({}, helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime) : Storage.TriviaTime);

        if (questData.data && questData.data.type && questData.data.type === 'add') {
            LocalStorageParsed.teams[questData.data.id].score = LocalStorageParsed.teams[questData.data.id].score + 1;
        } else if(questData.data && questData.data.type && questData.data.type === 'subtract') {
			LocalStorageParsed.teams[questData.data.id].score = LocalStorageParsed.teams[questData.data.id].score - 1;
        }

        Storage.TriviaTime = JSON.stringify(LocalStorageParsed);

        quest.next({
            TriviaTime: LocalStorageParsed
        });

    });

	Legend.ActionType('ChangeQuestion', function(quest, questData) {

        var LocalStorageParsed = Object.assign({}, helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime) : Storage.TriviaTime);

		if(questData.data && questData.data.type && questData.data.type === 'next'){

			if(LocalStorageParsed.currentQuestion && typeof LocalStorageParsed.currentQuestion === 'number'){
				var amountQuestions = LocalStorageParsed.triviaData.questions.length;
                var currentQuestion = LocalStorageParsed.currentQuestion;
                if( (currentQuestion+1) <= amountQuestions ){
                    LocalStorageParsed.currentQuestion = parseInt(LocalStorageParsed.currentQuestion + 1);
                }else {
                    LocalStorageParsed.currentQuestion = 1;
                }
			}else{
				LocalStorageParsed.currentQuestion = 1;
			}

		}else if(questData.data && questData.data.type && questData.data.type === 'prev'){
            if(LocalStorageParsed.currentQuestion && typeof LocalStorageParsed.currentQuestion === 'number'){
				var amountQuestions = LocalStorageParsed.triviaData.questions.length;
                var currentQuestion = LocalStorageParsed.currentQuestion;
                if( (currentQuestion-1) > 0){
                    LocalStorageParsed.currentQuestion = parseInt(LocalStorageParsed.currentQuestion - 1);
                }else {
                    LocalStorageParsed.currentQuestion = amountQuestions;
                }
			}else{
				LocalStorageParsed.currentQuestion = 1;
			}
    	}

        Storage.TriviaTime = JSON.stringify(LocalStorageParsed);

        quest.next({
            TriviaTime: LocalStorageParsed
        });

    });

    Legend.ActionType('ShowAnswer', function(quest, questData) {
        var LocalStorageParsed = Object.assign({}, helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime) : Storage.TriviaTime);

        LocalStorageParsed.questionHidden = false;

        Storage.TriviaTime = JSON.stringify(LocalStorageParsed);

        quest.next({
            TriviaTime: LocalStorageParsed
        });
    });

    Legend.ActionType('HideAnswer', function(quest, questData) {
        var LocalStorageParsed = Object.assign({}, helpers.isJson(Storage.TriviaTime) ? JSON.parse(Storage.TriviaTime) : Storage.TriviaTime);

        LocalStorageParsed.questionHidden = true;

        Storage.TriviaTime = JSON.stringify(LocalStorageParsed);

        quest.next({
            TriviaTime: LocalStorageParsed
        });
    });

    Legend.ActionType('AddVanishOut', function(quest, questData) {
        quest.next({
            VanishOut: true
        });
    });

    Legend.ActionType('AddVanishIn', function(quest, questData) {
        quest.next({
            VanishIn: true
        });
    });

    Legend.ActionType('ClearVanish', function(quest, questData) {
        quest.next({
            VanishOut: false,
            VanishIn: false
        });
    });

    Legend.ActionType('Wait', function(quest, questData) {
        setTimeout(function () {
            quest.next();
        }, questData.actions.time || 1000);
    });

    Legend.ActionType('PendingQuestionChange', function(quest, questData) {
        quest.next({
            PendingQuestionChange: questData.actions,
        });
        quest.next();
    });

    Legend.ActionType('checkQuestionChangePending', function(quest, questData) {
        var store = Legend.GetStore();

        if( store && typeof store.PendingQuestionChange !== 'undefined' && store.PendingQuestionChange === true){
            return quest.reject('Already changing question');
        }
        quest.next();
    });

    // does a forceupdate to rerender react
    Legend.ActionType('Render', function(quest, questData) {
        component.forceUpdate();
        quest.next();
    });

}
