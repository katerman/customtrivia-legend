var Legend = require('react-legend');

module.exports = function(){

	Legend.NewQuest(
		{'name': 'AddNewTeam'},
		[
			{'type': 'HideAnswer'},
			{'type': 'CheckLocalStorage'},
			{'type': 'NewTeamPrompt'},
			{'type': 'Render'}
		]
	);

	Legend.NewQuest(
		{'name': 'ResetTeams'},
		[
			{'type': 'HideAnswer'},
			{'type': 'CheckLocalStorage'},
			{'type': 'ResetTeams'},
			{'type': 'Render'}
		]
	);

	Legend.NewQuest(
		{'name': 'ChangeTeamColor'},
		[
			{'type': 'CheckLocalStorage'},
			{'type': 'ChangeTeamColor'},
			{'type': 'Render'}
		]
	);

	Legend.NewQuest(
		{'name': 'ChangeTeamPoints'},
		[
			{'type': 'CheckLocalStorage'},
			{'type': 'ChangeTeamPoints'},
			{'type': 'Render'}
		]
	);

	Legend.NewQuest(
		{'name': 'ShowAnswer'},
		[
			{'type': 'CheckLocalStorage'},
			{'type': 'ShowAnswer'},
			{'type': 'Render'}
		]
	);

	Legend.NewQuest(
		{'name': 'ChangeQuestion'},
		[
			{'type': 'checkQuestionChangePending'},
			{'type': 'PendingQuestionChange', 'action': true},
			{'type': 'CheckLocalStorage'},
			{'type': 'ClearVanish'},
			{'type': 'AddVanishOut'},
			{'type': 'Render'},
			{'type': 'Wait', 'action': {'time': 1000}},
			{'type': 'HideAnswer'},
			{'type': 'ChangeQuestion'},
			{'type': 'ClearVanish'},
			{'type': 'AddVanishIn'},
			{'type': 'Render'},
			{'type': 'Wait', 'action': {'time': 1000}},
			{'type': 'ClearVanish'},
			{'type': 'Render'},
			{'type': 'PendingQuestionChange', 'action': false}
		]
	);

}();
