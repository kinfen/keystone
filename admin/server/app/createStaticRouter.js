/**
 * Returns an Express Router with bindings for the Admin UI static resources,
 * i.e files, less and browserified scripts.
 *
 * Should be included before other middleware (e.g. session management,
 * logging, etc) for reduced overhead.
 */
var express = require('express');
var less = require('less-middleware');
var path = require('path');

module.exports = function createStaticRouter (keystone) {

	var router = express.Router();

	// TODO: 处理react-select的样式问题
	/* Prepare LESS options */
	var elementalPath = path.join(path.dirname(require.resolve('elemental')), '..');
	var reactSelectPath = path.join(path.dirname(require.resolve('react-select')), '..');
	var keystoneTinymcePath = path.dirname(require.resolve('keystone-tinymce'));
	var customStylesPath = keystone.getPath('adminui custom styles') || '';

	var lessOptions = {
		render: {
			javascriptEnabled: true,
			modifyVars: {
				elementalPath: JSON.stringify(elementalPath),
				reactSelectPath: JSON.stringify(reactSelectPath),
				keystoneTinymcePath: JSON.stringify(keystoneTinymcePath),
				customStylesPath: JSON.stringify(customStylesPath),
				adminPath: JSON.stringify(keystone.get('admin path')),
			},
		},
	};
	/* Configure router */
	router.use('/styles', less(path.resolve(__dirname + '/../../public/styles'), lessOptions));
	router.use('/styles/fonts', express.static(`${keystoneTinymcePath}/skin/fonts`));
	router.use(express.static(path.resolve(__dirname + '/../../public')));

	return router;
};
