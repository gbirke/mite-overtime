var expect = require( 'chai' ).expect,
	DataConverter = require( '../js/data_converter' );

describe( 'DataConverter', function () {

	describe( '#convert', function () {

		var testData = {
			year: 2015,
			month: 9,
			total: 140,
			weeks: {
				42: {
					total: 90,
					days: {
						13: { total: 120 },
						14: { total: -30 }
					}
				},
				43: {
					total: 50,
					days: {
						21: { total: 50 }
					}
				}
			}
		};

		it( 'copies total, year and month info', function () {
			var converter = new DataConverter(),
				result = converter.convert( testData );
			expect( result.length ).to.equal( 1 );
			result = result[ 0 ];
			expect( result.total ).to.equal( 140 );
			expect( result.year ).to.equal( 2015 );
			expect( result.month ).to.equal( 9 );
		} );

		it( 'converts weeks into arrays', function () {
			var converter = new DataConverter(),
				result = converter.convert( testData );
			result = result[ 0 ];
			expect( result.weeks.length ).to.equal( 2 );
			expect( result.weeks[ 0 ].week ).to.equal( '42' );
			expect( result.weeks[ 0 ].total ).to.equal( 90 );
			expect( result.weeks[ 1 ].week ).to.equal( '43' );
			expect( result.weeks[ 1 ].total ).to.equal( 50 );
		} );

		it( 'converts days into arrays', function () {
			var converter = new DataConverter(),
				result = converter.convert( testData ),
				firstWeek = result[ 0 ].weeks[ 0 ],
				secondWeek = result[ 0 ].weeks[ 1 ];
			expect( firstWeek.days.length ).to.equal( 2 );
			expect( secondWeek.days.length ).to.equal( 1 );

			expect( firstWeek.days[ 0 ].total ).to.equal( 120 );
			expect( firstWeek.days[ 1 ].total ).to.equal( -30 );
			expect( secondWeek.days[ 0 ].total ).to.equal( 50 );

			expect( firstWeek.days[ 0 ].day ).to.equal( '13' );
			expect( firstWeek.days[ 1 ].day ).to.equal( '14' );
			expect( secondWeek.days[ 0 ].day ).to.equal( '21' );			
		} );

		it( 'adds date information to days', function () {
			var converter = new DataConverter(),
				result = converter.convert( testData ),
				firstWeek = result[ 0 ].weeks[ 0 ],
				secondWeek = result[ 0 ].weeks[ 1 ];
			
			expect( firstWeek.days[ 0 ].date ).to.equal( '2015-10-13' );
			expect( firstWeek.days[ 1 ].date ).to.equal( '2015-10-14' );
			expect( secondWeek.days[ 0 ].date ).to.equal( '2015-10-21' );
			
		} );


	} );

} );
