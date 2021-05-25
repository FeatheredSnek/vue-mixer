# vueMixer

Demo of a mobile-first linear alchemy app.
Concoct your own potions and try to make something powerful!
See it working at [my website](http://dorianm.com/demos/vue-mixer).

## Background and purpose
While I bear fuming hatred towards Figma and the soulless uniformity it induces all over the web, I still wanted to make something mobile, sleek and contemporary looking in Vue.
The linear structure was initially designed for a food-ordering app, but I decided that alchemical apparatus simulator is far more fun. And instead of a boring checkout backend I could do some potion generating stuff (check out the absolute mess in src/scripts/mix.js).
Responsive in general, but optimized primarily for mobile portrait.

## How it's made
App made with Vue 3, styled with SCSS. SVGs made with Inkscape. Images from CC0 search.

## Concluding remarks
Althought there is surely quite a lot of refactoring to be done, the current version works and I like it that way.
For movement/animations I use the tools provided by the browser (css anims with transform, window scrolling methods) so it may run slightly choppy if these are not optimized on your end.
Feel free to use and improve the potion mixing concept/script - I feel like after some number crunching it might actually become a good subsystem for a game.
Code & assets licensed MIT.
