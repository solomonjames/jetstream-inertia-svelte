<script>
  import { Link, useForm } from '@inertiajs/inertia-svelte';
  import route from 'ziggy';
  import JetAuthenticationCard from '@/Jetstream/AuthenticationCard.svelte';
  import JetAuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo.svelte';
  import JetButton from '@/Jetstream/Button.svelte';
  import JetInput from '@/Jetstream/Input.svelte';
  import JetCheckbox from '@/Jetstream/Checkbox.svelte';
  import JetLabel from '@/Jetstream/Label.svelte';
  import JetValidationErrors from '@/Jetstream/ValidationErrors.svelte';

  export let
    canResetPassword,
    status;

  const form = useForm({
    email: '',
    password: '',
    remember: false,
  });

  $: {
    console.log($form.remember);
  }

  const handleChecked = ({ detail }) => $form.remember = detail;

  const submit = () => {
    $form.transform(data => ({
      ...data,
      remember: $form.remember ? 'on' : '',
    })).post(route('login'), {
      onFinish: () => $form.reset('password'),
    });
  };
</script>

<svelte:head>
  <title>Log In</title>
</svelte:head>

<JetAuthenticationCard>
  <JetAuthenticationCardLogo slot="logo"/>

  <JetValidationErrors class="mb-4"/>

  {#if status}
    <div class="mb-4 font-medium text-sm text-green-600">
      { status }
    </div>
  {/if}

  <form on:submit|preventDefault={submit}>
    <div>
      <JetLabel for="email" value="Email"/>
      <JetInput
        id="email"
        bind:value={$form.email}
        type="email"
        class="mt-1 block w-full"
        required
        autofocus
      />
    </div>

    <div class="mt-4">
      <JetLabel for="password" value="Password"/>
      <JetInput
        id="password"
        v-model="form.password"
        bind:value={$form.password}
        type="password"
        class="mt-1 block w-full"
        required
        autocomplete="current-password"
      />
    </div>

    <div class="block mt-4">
      <label class="flex items-center" for="remember">
        <JetCheckbox checked={$form.remember} on:checked={handleChecked} id="remember" name="remember"/>
        <span class="ml-2 text-sm text-gray-600">Remember me</span>
      </label>
    </div>

    <div class="flex items-center justify-end mt-4">
      {#if canResetPassword}
        <Link href={route('password.request')} class="underline text-sm text-gray-600 hover:text-gray-900">
          Forgot your password?
        </Link>
      {/if}

      <JetButton class="ml-4" disabled={$form.processing}>
        Log in
      </JetButton>
    </div>
  </form>
</JetAuthenticationCard>
