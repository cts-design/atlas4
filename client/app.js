angular.module('app', ['app.filters', 'app.directives', 'froala', 'page', 'user', 'template'])

.value('froalaConfig', {
	inlineMode : false,
	minHeight : 300
})