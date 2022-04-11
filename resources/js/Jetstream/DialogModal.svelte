<script>
  import Modal from './Modal.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let
    show = false,
    maxWidth = '2xl',
    closeable = true;

  const close = () => {
    dispatch('close');
  };
</script>

<Modal
  {show}
  {maxWidth}
  {closeable}
  on:close={close}
>
  <div class="px-6 py-4">
    <div class="text-lg">
      <slot name="title"/>
    </div>

    <div class="mt-4">
      <slot name="content"/>
    </div>
  </div>

  <div class="flex flex-row justify-end px-6 py-4 bg-gray-100 text-right">
    <slot name="footer"/>
  </div>
</Modal>
