<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import toggleDisplay from '@/lib/svelte/style/toggleDisplay';
  import classes from '../lib/svelte/transitions/classes';

  export let
    show = false,
    maxWidth = '2xl',
    closeable = true;

  const dispatch = createEventDispatcher();

  $: {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = null;
    }
  }

  const close = () => {
    if (closeable) {
      dispatch('close');
    }
  };

  const closeOnEscape = (e) => {
    if (e.key === 'Escape' && show) {
      close();
    }
  };

  onMount(() => document.addEventListener('keydown', closeOnEscape));

  onDestroy(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = null;
  });

  $: maxWidthClass = (() => {
    return {
      'sm': 'sm:max-w-sm',
      'md': 'sm:max-w-md',
      'lg': 'sm:max-w-lg',
      'xl': 'sm:max-w-xl',
      '2xl': 'sm:max-w-2xl',
    }[maxWidth];
  })();
</script>

<teleport to="body">
  <transition leave-active-class="duration-200">
    <div use:toggleDisplay={show} class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50" scroll-region>
      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div use:toggleDisplay={show} class="fixed inset-0 transform transition-all" on:click={close}>
          <div class="absolute inset-0 bg-gray-500 opacity-75"/>
        </div>
      </transition>

      <transition
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div use:toggleDisplay={show}
             class="mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto {maxWidthClass}">
          {#if show}
            <slot />
          {/if}
        </div>
      </transition>
    </div>
  </transition>
</teleport>
