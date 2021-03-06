const EnumHelper = {
	REQUESTS:{
		'HOME':{
			'url':'./html/home.html',
			'type':'GET',
			'dataType':'html'
		},
		'GAME':{
			'url':'./html/game.html',
			'type':'GET',
			'dataType':'html'
		},
		'SETTINGS':{
			'url':'./html/settings.html',
			'type':'GET',
			'dataType':'html'
		},
		'HELP':{
			'url':'./html/help.html',
			'type':'GET',
			'dataType':'html'
		},
		'GAMEMODE':{
			'url':'./html/gamemode.html',
			'type':'GET',
			'dataType':'html'
		},
		'GAMERULESET':{
			'url':'./html/gameruleset.html',
			'type':'GET',
			'dataType':'html'
		},
		'GAMESTATE':{
			'url':'http://localhost:8080/LibreDragon/api/gamestate',
			'type':'GET',
			'dataType':'text'
		},
		'APPLYRULE':{
			'url':'http://localhost:8080/LibreDragon/api/rule',
			'type':'GET',
			'dataType':'text'
		},
		'START':{
			'url':'http://localhost:8080/LibreDragon/api/start',
			'type':'GET',
			'dataType':'text'
		},
		'RESUME':{
			'url':'http://localhost:8080/LibreDragon/api/resume',
			'type':'GET',
			'dataType':'text'
		},
		'CREATETHEOREM':{
			'url':'http://localhost:8080/LibreDragon/api/createtheorem',
			'type':'GET',
			'dataType':'text'
		},
		'PREVIOUS':{
			'url':'http://localhost:8080/LibreDragon/api/previous',
			'type':'GET',
			'dataType':'text'
		},
		'NEXT':{
			'url':'http://localhost:8080/LibreDragon/api/next',
			'type':'GET',
			'dataType':'text'
		},
		'TIMELINE':{
			'url':'http://localhost:8080/LibreDragon/api/timeline',
			'type':'GET',
			'dataType':'text'
		},
		'RULESLIST':{
			'url':'http://localhost:8080/LibreDragon/api/ruleslist',
			'type':'GET',
			'dataType':'text'
		},
		'SERVERSTATUS':{
			'url':'http://localhost:8080/LibreDragon/api/status',
			'type':'GET',
			'dataType':'text'
		},
		'DELETE':{
			'url':'http://localhost:8080/LibreDragon/api/delete',
			'type':'GET',
			'dataType':'text'
		},
		'FORMULALIST':{
			'url':'http://localhost:8080/LibreDragon/api/formula',
			'type':'GET',
			'dataType':'text'
		}
	},
	TABS:{
		'HOME':{
			'name':'HOME',
			'handler':'homeHandler'
		},
		'SETTINGS':{
			'name':'SETTINGS',
			'handler':'settingsHandler'
		},
		'GAME':{
			'name':'GAME',
			'handler':'gameHandler'
		},
		'GAMEMODE':{
			'name':'GAMEMODE',
			'handler':'gameModeHandler'
		},
		'GAMERULESET':{
			'name':'GAMERULESET',
			'handler':'gameRuleSetHandler'
		},
		'HELP':{
			'name':'HELP',
			'handler':'helpHandler'
		}
	}
}

/**
 * EnumHelper module.
 * Enumerations needed to run the Application. Contains the differents request
 * and the handlers for the different tab.
 * @module enumHelper
 * @enum {String}
 */
module.exports = EnumHelper
