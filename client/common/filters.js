angular.module('app.filters', [])

.filter('spacetoslash', function() {
	return function(text) {
		if(text) {
			return text.replace(new RegExp(' ', 'g'), '_')
		}
	}
})