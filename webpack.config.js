var path = require('path');

module.exports = {
	entry: './app/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test:/\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'env',
								{
									'targets': {
										'chrome': 51
									}
								}
							]
						]
					}
				}
			}
		]
	}
};