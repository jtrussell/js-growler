(function(win) {

	var opts
		, growler

	// -----------------------------------------------------------
	// Setup default options
	// -----------------------------------------------------------
	opts = {
		"hide_button_image": "../img/hide.png"
		, "hide_function": false
		, "show_function": false
	}

	growler = (function( opts ) {

		return new function() {
			var that = this
			
			this.init = function( args ) {
				// -----------------------------------------------------------
				// Initializing with just defaults is fine
				// -----------------------------------------------------------
				args = args || {}

				var optKeys = Object.keys( opts )
					, prepGrowler
					, showGrowler
					, ix 

				// -----------------------------------------------------------
				// Merge the user defined options with the default options
				// -----------------------------------------------------------
				for( ix in optKeys ) {
					opts[optKeys[ix]] = args[optKeys[ix]] || opts[optKeys[ix]]
				}

				// -----------------------------------------------------------
				// Creates a new growler dom node and returns it to be inserted 
				// -----------------------------------------------------------
				prepGrowler = function() {
				}

				// -----------------------------------------------------------
				// Places a growler node in the dom. If a method of displaying growlers
				// was passed that is used, otherwise we do something defaulty
				// -----------------------------------------------------------
				showGrowler = function( growler ) {
				}

				// -----------------------------------------------------------
				// Win gets a full fledged growler
				// -----------------------------------------------------------
				win.growler = new function() {
					this.init = that.init
					this.inform = function() {}
					this.warn = function() {}
					this.err = function() {}

					// -----------------------------------------------------------
					// Hides a clicked on growler, typicaly invoked by the
					// onclick event in a growler close button.
					// -----------------------------------------------------------
					this.hide = function( el ) {
						// -----------------------------------------------------------
						// Usually el will the be click on link. Traverse the
						// dom to find the actual growler element we want to
						// hide
						// -----------------------------------------------------------
						while( "growler" != el.className ) {
							el = el.parentNode
							if( !el ) {
								console.log( "Error attemtping to find a growler to hide" )
								return
							}
						}

						// -----------------------------------------------------------
						// We've got a growler to hide, use the user defined
						// hide function if one was provided - otherwise just
						// remove the node itself from the dom
						// -----------------------------------------------------------
						if( opts.hide_function ) {
							opts.hide_function( el )
						} else {
							el.parentNode.removeChild( el )
						}
					}
				}

				// -----------------------------------------------------------
				// Why not be chainable?
				// -----------------------------------------------------------
				return win.growler
			}
		}

	})( opts )

	// -----------------------------------------------------------
	// Attach growler to the passed object (pesumably the window itself)
	//
	// Initialize growler with default options. User can call init again to
	// override defaults
	// -----------------------------------------------------------
	win.growler = growler.init()

})( window );
