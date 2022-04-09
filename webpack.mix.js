const mix = require('laravel-mix');
const cssImport = require('postcss-import');
const cssNesting = require('postcss-nesting');
const purgecss = require('@fullhuman/postcss-purgecss');
const tailwindcss = require('tailwindcss');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

require('laravel-mix-svelte');

mix.js('resources/js/app.js', 'public/js')
    .svelte({
      dev: !mix.inProduction()
    })
    // .postCss('resources/css/app.css', 'public/css', [
    //     require('postcss-import'),
    //     require('tailwindcss'),
    // ])
  .postCss('resources/css/app.css', 'public/css/app.css')
  .options({
    postCss: [
      cssImport(),
      cssNesting(),
      tailwindcss('tailwind.config.js'),
      ...(mix.inProduction()
        ? [
          purgecss({
            content: [
              './resources/views/**/*.blade.php',
              './resources/js/**/*.svelte'
            ],
            defaultExtractor: content =>
              content.match(/[\w-/:.]+(?<!:)/g) || [],
            whitelistPatternsChildren: [/nprogress/]
          })
        ]
        : [])
    ]
  })
  .alias({
    ziggy: path.resolve('vendor/tightenco/ziggy/dist'),
  })
  .webpackConfig({
    output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },
  })
  .alias({
      '@': 'resources/js',
  })
  .sourceMaps()
  .browserSync({
      proxy: 'laravel.test'
  });

if (mix.inProduction()) {
    mix.version();
}
