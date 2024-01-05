const jsdoc2md = require('jsdoc-to-markdown')

const docs = jsdoc2md.renderSync({ configure: './jsdoc.conf.json', source: 'src/components/charts' })
