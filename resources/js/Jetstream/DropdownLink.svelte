<script>
import { Link } from '@inertiajs/inertia-svelte';

export let
  href,
  as;
</script>

<div {...$$restProps}>
    {#if as === 'button'}
    <button type="submit" class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition">
        <slot />
    </button>
    {:else if as === 'a'}
    <a {href} class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition">
        <slot />
    </a>
    {:else}
    <Link {href} class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition">
        <slot />
    </Link>
    {/if}
</div>
