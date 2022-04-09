require('./bootstrap');

import { App, createInertiaApp } from '@inertiajs/inertia-svelte';
import { InertiaProgress } from '@inertiajs/progress';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => require(`./Pages/${name}.svelte`),
  setup({ el, props }) {
    new App({ target: el, props });
  },
});

InertiaProgress.init({ color: '#4B5563' });
