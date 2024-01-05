var copy = require('recursive-copy')

const nm = 'node_modules'
const bsDistr = `${nm}/bootstrap/dist`

const options = {
    filter: [
        'css/bootstrap.min.*',
        'js/bootstrap.bundle.min.*'
    ]
}

copy(bsDistr, 'docs/vendors', options, function(error, results) {
	if (error) {
		console.error('Copy failed: ' + error);
	} else {
		console.info('Copied ' + results.length + ' files');
	}
});
