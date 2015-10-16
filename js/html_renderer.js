var d3 = require( 'd3' ),
	moment = require( 'moment' ),
	longFormatter, shortFormatter;

require( 'moment-duration-format' );

function DurationFormatter( positiveFormat, negativeFormat  ) {
	this.positiveFormat = positiveFormat;
	this.negativeFormat = negativeFormat;
}

DurationFormatter.prototype.format = function ( duration ) {
	var fmt = duration > 0 ? this.positiveFormat : this.negativeFormat;
	return moment.duration( duration, 'minutes' )
		.format( fmt );
};

longFormatter = new DurationFormatter( 'h:mm [overtime]', 'h:mm [missing]' );
shortFormatter = new DurationFormatter( 'h:mm', '[-] h:mm' );

function renderTotal( displayContainer ) {
	var data = displayContainer.data(),
		currentTime = moment(),
		total;
	currentTime.month( data.month );
	currentTime.year( data.year );
	displayContainer.append( 'h1' ).text( 'Total for ' + currentTime.format( 'MMMM YYYY' ) );
	total = displayContainer.append( 'div' )
		.attr( { id: 'totalOvertime' } )
		.text( function ( d ) {
			return longFormatter.format( d.total );
		} );
	return total;
}

function renderWeeks( displayContainer ) {
	var weekContainer = displayContainer.append( 'div' ).classed( 'weeks', true ),
		weeks = weekContainer.selectAll( '.week' )
		.data( function ( d ) { return d.weeks; } )
		.enter()
		.append( 'div' )
		.classed( 'week', true );

	weeks.append( 'h2' )
		.text( function ( d ) {
			return 'Week ' + d.week;
		} );

	weeks.append( 'div' )
		.classed( 'total', true )
		.text( function ( d ) {
			return longFormatter.format( d.total );
		} );
	return weeks;
}

function HtmlRenderer() {}

HtmlRenderer.prototype.render = function ( overtimeData ) {
	var	displayContainer, total, weekContainers, weeks;

	displayContainer = d3.select( '#displayContainer' ).data( overtimeData );
	displayContainer.selectAll( 'div' )
		.remove();

	total = renderTotal( displayContainer );
	weeks = renderWeeks( displayContainer );
};

module.exports = HtmlRenderer;
