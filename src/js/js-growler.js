(function(win) {

	var opts
		, growler

	// -----------------------------------------------------------
	// Setup default options
	// -----------------------------------------------------------
	opts = {
		// -----------------------------------------------------
		// Function used to hide a growler alert - takes in a single parameter
		// the growler dom element to hide
		// -----------------------------------------------------
		"hideFunction": false

		// -----------------------------------------------------
		// Function used to show a growler alert - takes in two parameters, the
		// growler dom element to show and the growler zone dom element where
		// growler elements are placed (i.e. the parent of growler elements in
		// the dom)
		// -----------------------------------------------------
		, "showFunction": false

		// -----------------------------------------------------
		// True to use a hide, or close, button. False to leave it out
		// -----------------------------------------------------
		, "useHideButton": true

		// -----------------------------------------------------
		// Image to use for a hide button
		// -----------------------------------------------------
		, "hideButtonImage": "lib/img/hide.png"
		
		// -----------------------------------------------------
		// ID of parent element of growler alerts
		// -----------------------------------------------------
		, "growlerZoneID": "growler-zone"
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
					, hasClassName
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
				prepGrowler = function( klass, body, title ) {
					var growler = document.createElement("div")
						, innerHTML = ""

					title = title || ""

					growler.className = "growler " + klass

					if( title.length > 0 ) {
						innerHTML += '<h3 class="growl-title">' + title + '</h3>'
					}

					innerHTML += '<div class="growl-text">' + body + '</div>'

					if( opts.useHideButton ) {
						var imgSrc = opts.hideButtonImage
						innerHTML += '<a href="javascript:void(0)" onclick="growler.hide(this)" class="growl-close"><img src="'+imgSrc+'" alt="close" /></a>'
					}

					growler.innerHTML = innerHTML

					return growler
				}

				// -----------------------------------------------------------
				// Places a growler node in the dom. If a method of displaying growlers
				// was passed that is used, otherwise we do something defaulty
				// -----------------------------------------------------------
				showGrowler = function( growler, growlerZone ) {
					growlerZone = growlerZone || document.getElementById( opts.growlerZoneID )
					if( opts.showFunction ) {
						opts.showFunction( growler, growlerZone )
					} else {
						growlerZone.appendChild( growler )
					}
				}

				// -----------------------------------------------------
				// Utility function to check if a pass element has a given class
				// name
				// -----------------------------------------------------
				hasClassName = function( element, className ) {
					var regexp = new RegExp( "\\b" + className + "\\b" )
					return regexp.test( element.className )
				}

				// -----------------------------------------------------------
				// Win gets a full fledged growler
				// -----------------------------------------------------------
				win.growler = new function() {
					this.init = that.init

					this.inform = function( body, title ) {
						showGrowler( prepGrowler( "inform", body, title ) )
					}

					this.warn = function( body, title ) {
						showGrowler( prepGrowler( "warn", body, title ) )
					}

					this.err = function( body, title ) {
						showGrowler( prepGrowler( "err", body, title ) )
					}

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
						while( !hasClassName(el, "growler") ) {
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
						if( opts.hideFunction ) {
							opts.hideFunction( el )
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
