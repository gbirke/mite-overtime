'use strict';
var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	SettingsView = require( '../../js/views/settings_view' ),
	expect = chai.expect
	;

chai.use(sinonChai);

describe( 'SettingsView', function () {

    describe( '#init', function () {

        it( 'registers as a listener for the submit button', function () {
            var handler = sinon.spy(),
                jquery = sinon.stub().returns( { on: handler } ),
                view = SettingsView.createAndInit( jquery, {}, {} );
            expect( handler ).to.have.been.calledWith( 'click', view.handleSubmit );
        } );
    } );

    describe( '#handleSubmit', function () {
        it( 'calls the appropriate actions with data', function () {
            var jquery = sinon.stub(),
                commands = { showEntriesForMonth: sinon.spy() },
                actions = { changeCredentials: sinon.spy(), changeHoursPerWeek: sinon.spy() },
                view;
            jquery.withArgs( '#api_key' ).returns( { val: function () { return 'test_key'; } } );
            jquery.withArgs( '#account' ).returns( { val: function () { return 'test_account'; } } );
            jquery.withArgs( '#hours_per_week' ).returns( { val: function () { return '40'; } } );
            view =  SettingsView.create( jquery, actions, commands );
            view.handleSubmit();
            expect( actions.changeCredentials ).to.have.been.calledWith( { apiKey: 'test_key', account: 'test_account' } );
            expect( actions.changeHoursPerWeek ).to.have.been.calledWith( 40 );
            expect( commands.showEntriesForMonth ).to.have.been.called;
    	} );
    } );
} );
