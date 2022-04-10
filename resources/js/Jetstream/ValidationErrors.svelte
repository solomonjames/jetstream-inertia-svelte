<script>
  import { page } from '@inertiajs/inertia-svelte';

  const hasErrors = () => Object.keys($page.props?.errors).length > 0;
</script>

{#if hasErrors()}
  <div {...$$restProps}>
    <div class="font-medium text-red-600">
      Whoops! Something went wrong.
    </div>

    <ul class="mt-3 list-disc list-inside text-sm text-red-600">
      {#each $page.props?.errors as error, key (key)}
        <li>{ error }</li>
      {/each}
    </ul>
  </div>
{/if}
