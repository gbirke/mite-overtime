var d3 = require( 'd3' ),
	moment = require( 'moment' ),
	longFormatter, shortFormatter;

require( 'moment-duration-format' );

function DurationFormatter( positiveFormat, negativeFormat, absoluteValue ) {
	this.positiveFormat = positiveFormat;
	this.negativeFormat = negativeFormat;
	this.absoluteValue = absoluteValue;
}

DurationFormatter.prototype.format = function ( duration ) {
	var fmt = duration > 0 ? this.positiveFormat : this.negativeFormat;
	if ( this.absoluteValue ) {
		duration = Math.abs( duration );
	}
	return moment.duration( duration, 'minutes' )
		.format( fmt, { trim: false } );
};

longFormatter = new DurationFormatter( 'h:mm [overtime]', 'h:mm [missing]', true );
shortFormatter = new DurationFormatter( 'h:mm', 'h:mm', false );


function HtmlRenderer() {
	this.overtimeData = {};
}

HtmlRenderer.prototype.render = function ( calendarData, overtimeData ) {
	var	displayContainer, total, weekContainers, weeks;

	this.overtimeData = overtimeData;
	displayContainer = d3.select( '#displayContainer' ).data( [ calendarData ] );
	displayContainer.selectAll( 'div, h1' )
		.remove();

	total = this._renderTotal( displayContainer );
	weeks = this._renderWeeks( displayContainer );
};

HtmlRenderer.prototype._renderTotal = function ( displayContainer ) {
	var data = displayContainer.data(),
		currentTime = moment(),
		self = this,
		total;
	currentTime.month( data.month );
	currentTime.year( data.year );
	displayContainer.append( 'h1' ).text( 'Total for ' + currentTime.format( 'MMMM YYYY' ) );
	total = displayContainer.append( 'div' )
		.attr( { id: 'totalOvertime' } )
		.text( function ( ) {
			if ( self.overtimeData.timeDelta ) {
				return longFormatter.format( self.overtimeData.timeDelta );
			}
		} );
	return total;
}


HtmlRenderer.prototype._renderWeeks = function ( displayContainer ) {
	var weekContainer = displayContainer.append( 'div' ).classed( 'weeks', true ),
		self = this,
		weeks = weekContainer.selectAll( '.week' )
			.data( function ( d ) {
				return d3.values( d.weeks );
			} )
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
			var timeDelta = 0;
			if ( typeof self.overtimeData.weeks !== "undefined" && d.week in self.overtimeData.weeks ) {
				timeDelta = self.overtimeData.weeks[ d.week ].timeDelta;
			}
			return longFormatter.format( timeDelta );
		} );
	return weeks;
}


module.exports = HtmlRenderer;
