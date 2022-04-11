<script>
  import { onMount, onDestroy } from 'svelte';
  import transitionClasses from '@/lib/svelte/transitions/classes';

  export let
    align = 'right',
    width = '48',
    contentClasses = 'py-1 bg-white';

  let open = false;

  const closeOnEscape = (e) => {
    if (open && e.key === 'Escape') {
      open = false;
    }
  };

  onMount(() => document.addEventListener('keydown', closeOnEscape));
  onDestroy(() => document.removeEventListener('keydown', closeOnEscape));

  const toggleOpen = () => {
    open = !open;
  };

  const close = () => {
    open = false;
  }

  $: alignmentClasses = (() => {
    if (align === 'left') {
      return 'origin-top-left left-0';
    }

    if (align === 'right') {
      return 'origin-top-right right-0';
    }

    return 'origin-top';
  })();

  let classes = 'relative';

  if ($$restProps.class) {
    classes = `${classes} ${$$restProps.class}`;
  }

  const transitionInClasses = {
    duration: 100,
    base: 'transition ease-out duration-200',
    from: 'transform opacity-0 scale-95',
    to: 'transform opacity-100 scale-100'
  };

  const transitionOutClasses = {
    duration: 75,
    base: 'transition ease-in duration-75',
    from: 'transform opacity-100 scale-100',
    to: 'transform opacity-0 scale-95'
  };
</script>

<div class={classes} {...$$restProps}>
  <div on:click={toggleOpen}>
    <slot name="trigger"/>
  </div>

  <!-- Full Screen Dropdown Overlay -->
  <div style:display={open ? '' : 'none'} class="fixed inset-0 z-40" on:click={close}/>

  <div
    in:transitionClasses={transitionInClasses}
    out:transitionClasses={transitionOutClasses}
  >
    <div
      class="absolute z-50 mt-2 rounded-md shadow-lg {alignmentClasses} w-{width}"
      style:display={open ? '' : 'none'}
      on:click={close}
    >
      <div class="rounded-md ring-1 ring-black ring-opacity-5 {contentClasses}">
        <slot name="content" />
      </div>
    </div>
  </div>
</div>
