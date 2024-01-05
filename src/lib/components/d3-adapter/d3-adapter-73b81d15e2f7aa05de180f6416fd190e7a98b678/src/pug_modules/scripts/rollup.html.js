import pug  from 'rollup-plugin-pug'

export default {
    input: './src/pug_modules/scripts/templates/html.js',
    output: {
        dir: '.tmp',
        format: 'cjs',
        exports: 'default'
    },
    plugins: [
        pug({pretty: true}),
    ]
}

