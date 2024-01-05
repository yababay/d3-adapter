import jsdoc from 'rollup-plugin-jsdoc';
 
export default {
  input: './src/index.js',
  plugins: [
    jsdoc({
      args: ['-d', 'docs/content'],  // Command-line options passed to JSDoc, Note: use "config" to indicate configuration file, do not use "-c" or "--configure" in "args"
      config: 'jsdoc.config.json',  // Path to the configuration file for JSDoc. Default: jsdoc.json
    })
  ]
};
