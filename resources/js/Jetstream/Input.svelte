<script>
  export let value;

  let input = null;

  let classes = 'border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm';

  if ($$restProps.class) {
    classes = `${classes} ${$$restProps.class}`;
  }
</script>

<input
  ref="input"
  {...$$restProps}
  class={classes}
  bind:value />
