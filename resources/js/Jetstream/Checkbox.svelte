<script>
  export let
    checked = false,
    value = null;

  let classes = 'rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50';

  if ($$restProps.class) {
    classes = `${classes} ${$$restProps.class}`;
  }
</script>


<input
  {...$$restProps}
  type="checkbox"
  {value}
  bind:checked
  class={classes}
>
