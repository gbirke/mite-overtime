var $ = jQuery = require( 'jQuery' ),
	SettingsController = require( './settings_controller' ),
	entriesStore = require( './stores/entries' ),
	EntryView = require('./views/entry_view'),
	Bootstrap = require( 'bootstrap' );

$( function () {
	EntryView.createAndInit( entriesStore );
	new SettingsController();
} );
