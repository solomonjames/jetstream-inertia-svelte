require('./bootstrap');

import { createInertiaApp } from '@inertiajs/inertia-svelte';
import { InertiaProgress } from '@inertiajs/progress';

const appName = 'JamesTest';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => require(`./Pages/${name}.svelte`),
  setup({ el, App, props }) {
    new App({ target: el, props });
  },
});

InertiaProgress.init({ color: '#4B5563' });
