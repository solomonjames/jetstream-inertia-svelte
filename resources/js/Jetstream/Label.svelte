<script>
  export let
    value,
    forInput;

  let classes = 'block font-medium text-sm text-gray-700';

  if ($$restProps.class) {
    classes = `${classes} ${$$restProps.class}`;
  }
</script>

<label class={classes} for={forInput} {...$$restProps}>
  {#if value}
    <span>{ value }</span>
  {:else}
    <span><slot/></span>
  {/if}
</label>
