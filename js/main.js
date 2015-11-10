var $ = jQuery = require( 'jQuery' ),
	SettingsController = require( './settings_controller' ),
	entryView = require('./views/entry_view'),
	Bootstrap = require( 'bootstrap' );

$( function () {
	entryView.init();
	new SettingsController();
} );
