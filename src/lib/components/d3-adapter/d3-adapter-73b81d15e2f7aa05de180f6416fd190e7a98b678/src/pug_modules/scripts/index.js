const fs = require('fs')
const html = require('../../../.tmp/html.js')
const settings = require('../../../.tmp/settings.js')

fs.writeFileSync('docs/index.html', html(settings))

