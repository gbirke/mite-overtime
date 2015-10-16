var d3 = require( 'd3' ),
	moment = require( 'moment' );

require( 'moment-duration-format' );

function DurationFormatter( localeName ) {
	this.positiveFormat = 'h:mm [overtime]';
	this.negativeFormat = 'h:mm [missing]';
}

DurationFormatter.prototype.format = function ( duration ) {
	var fmt = duration > 0 ? this.positiveFormat : this.negativeFormat;
	console.log( fmt );
	return moment.duration( duration, 'minutes' )
		.format( fmt );
};

function HtmlRenderer( overtimeData ) {
	this.overtimeData = overtimeData;
}

HtmlRenderer.prototype.render = function () {
	var formatter = new DurationFormatter( 'de' ),
		displayContainer, total, weeks;
	displayContainer = d3.select( '#displayContainer' );
	displayContainer.selectAll( 'div' ).remove();
	total = displayContainer.append( 'div' );
	total.attr( { id: 'totalOvertime' } )
		.text( formatter.format( this.overtimeData.total ) );
	weeks = displayContainer.append( 'div' ).attr( { id: 'weeks' } );
	weeks.selectAll( 'div' )
		.data( this.overtimeData.weeks )
		.enter()
		.append( 'div' )
		.attr( { 'class': 'week' } )
		.append( 'div' )
		.attr( { 'class': 'total' } )
		.text( function ( d ) {
			return formatter.format( d.total );
		} );
};

module.exports = HtmlRenderer;
