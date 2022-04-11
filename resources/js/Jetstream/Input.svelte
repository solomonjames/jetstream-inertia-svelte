<script>
  import { onMount, createEventDispatcher } from 'svelte';

  export let value;
  let input;
  let classes = 'border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm';

  const dispatch = createEventDispatcher();

  const dispatchKeyup = (e) => {
    dispatch('keyup', e);
  };

  if ($$restProps.class) {
    classes = `${classes} ${$$restProps.class}`;
  }

  onMount(() => {
    if (input.hasAttribute('autofocus')) {
      input.focus();
    }
  });
</script>

<input
  {...$$restProps}
  class={classes}
  on:keyup|preventDefault={dispatchKeyup}
  bind:this={input}
  bind:value />
