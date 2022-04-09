<script>
  import JetAuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo.svelte';

  export let policy;
</script>

<svelte:head>
  <title>Privacy Policy</title>
</svelte:head>

<div class="font-sans text-gray-900 antialiased">
  <div class="pt-4 bg-gray-100">
    <div class="min-h-screen flex flex-col items-center pt-6 sm:pt-0">
      <div>
        <JetAuthenticationCardLogo />
      </div>

      <div class="w-full sm:max-w-2xl mt-6 p-6 bg-white shadow-md overflow-hidden sm:rounded-lg prose">
        {@html policy}
      </div>
    </div>
  </div>
</div>
