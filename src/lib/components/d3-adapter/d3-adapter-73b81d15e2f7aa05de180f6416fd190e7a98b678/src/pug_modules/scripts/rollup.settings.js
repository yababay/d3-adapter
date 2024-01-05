import json from '@rollup/plugin-json'

export default {
    input: './src/pug_modules/scripts/templates/settings.js',
    output: {
        dir: '.tmp',
        format: 'cjs',
        exports: 'default'
    },
    plugins: [
        json(),
    ]
}

