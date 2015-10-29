var expect = require( 'chai' ).expect,
	DataConverter = require( '../js/data_converter' );

describe( 'DataConverter', function () {

	describe( '#convert', function () {

		var testData = {
			year: 2015,
			month: 9,
			total: 2600,
			timeDelta: 140,
			weeks: {
				42: {
					total: 1050,
					timeDelta: 90,
					days: {
						13: { total: 600, timeDelta: 120 },
						14: { total: 450, timeDelta: -30 }
					}
				},
				43: {
					timeDelta: 50,
					total: 530,
					days: {
						21: { total: 530, timeDelta: 50 }
					}
				}
			}
		};

		it( 'copies total, timeDelta, year and month info', function () {
			var converter = new DataConverter(),
				result = converter.convert( testData );
			expect( result.length ).to.equal( 1 );
			result = result[ 0 ];
			expect( result.total ).to.equal( 2600 );
			expect( result.timeDelta ).to.equal( 140 );
			expect( result.year ).to.equal( 2015 );
			expect( result.month ).to.equal( 9 );
		} );

		it( 'converts weeks into arrays', function () {
			var converter = new DataConverter(),
				result = converter.convert( testData );
			result = result[ 0 ];
			expect( result.weeks.length ).to.equal( 2 );
			expect( result.weeks[ 0 ].week ).to.equal( '42' );
			expect( result.weeks[ 0 ].total ).to.equal( 1050 );
			expect( result.weeks[ 0 ].timeDelta ).to.equal( 90 );
			expect( result.weeks[ 1 ].week ).to.equal( '43' );
			expect( result.weeks[ 1 ].total ).to.equal( 530 );
			expect( result.weeks[ 1 ].timeDelta ).to.equal( 50 );
		} );

		it( 'converts days into arrays', function () {
			var converter = new DataConverter(),
				result = converter.convert( testData ),
				firstWeek = result[ 0 ].weeks[ 0 ],
				secondWeek = result[ 0 ].weeks[ 1 ];
			expect( firstWeek.days.length ).to.equal( 2 );
			expect( secondWeek.days.length ).to.equal( 1 );

			expect( firstWeek.days[ 0 ].total ).to.equal( 600 );
			expect( firstWeek.days[ 1 ].total ).to.equal( 450 );
			expect( secondWeek.days[ 0 ].total ).to.equal( 530 );

			expect( firstWeek.days[ 0 ].timeDelta ).to.equal( 120 );
			expect( firstWeek.days[ 1 ].timeDelta ).to.equal( -30 );
			expect( secondWeek.days[ 0 ].timeDelta ).to.equal( 50 );

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
