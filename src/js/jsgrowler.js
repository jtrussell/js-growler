var opts
	, optKeys
	, args = {}
	, i

// -----------------------------------------------------------
// Setup default options
// -----------------------------------------------------------
opts = {
	"hide-button-image": "../img/hide.png"
	, "hide-function": false
	, "show-function": false
}

// -----------------------------------------------------------
// Merge the user defined options with the default options
// -----------------------------------------------------------
optKeys = Object.keys( opts )
for( i in optKeys ) {
	opts[optKeys[i]] = args[optKeys[i]] || otps[optKeys[i]];
}
