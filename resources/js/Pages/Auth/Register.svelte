<script>
  import { Link, useForm, page } from '@inertiajs/inertia-svelte';
  import route from 'ziggy';
  import JetAuthenticationCard from '@/Jetstream/AuthenticationCard.svelte';
  import JetAuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo.svelte';
  import JetButton from '@/Jetstream/Button.svelte';
  import JetInput from '@/Jetstream/Input.svelte';
  import JetCheckbox from '@/Jetstream/Checkbox.svelte';
  import JetLabel from '@/Jetstream/Label.svelte';
  import JetValidationErrors from '@/Jetstream/ValidationErrors.svelte';

  let form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  const submit = () => {
    $form.post(route('register'), {
      onFinish: () => $form.reset('password', 'password_confirmation'),
    });
  };
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<JetAuthenticationCard>
  <JetAuthenticationCardLogo slot="logo"/>

  <JetValidationErrors class="mb-4"/>

  <form on:submit|preventDefault={submit}>
    <div>
      <JetLabel forInput="name" value="Name"/>
      <JetInput
        id="name"
        bind:value={$form.name}
        type="text"
        class="mt-1 block w-full"
        required
        autofocus
        autocomplete="name"
      />
    </div>

    <div class="mt-4">
      <JetLabel forInput="email" value="Email"/>
      <JetInput
        id="email"
        bind:value={$form.email}
        type="email"
        class="mt-1 block w-full"
        required
      />
    </div>

    <div class="mt-4">
      <JetLabel forInput="password" value="Password"/>
      <JetInput
        id="password"
        bind:value={$form.password}
        type="password"
        class="mt-1 block w-full"
        required
        autocomplete="new-password"
      />
    </div>

    <div class="mt-4">
      <JetLabel forInput="password_confirmation" value="Confirm Password"/>
      <JetInput
        id="password_confirmation"
        bind:value={$form.password_confirmation}
        type="password"
        class="mt-1 block w-full"
        required
        autocomplete="new-password"
      />
    </div>

    {#if $page.props.jetstream.hasTermsAndPrivacyPolicyFeature}
      <div class="mt-4">
        <JetLabel forInput="terms">
          <div class="flex items-center">
            <JetCheckbox id="terms" checked={$form.terms} name="terms"/>

            <div class="ml-2">
              I agree to the <a target="_blank" href={route('terms.show')}
                                class="underline text-sm text-gray-600 hover:text-gray-900">Terms of Service</a> and <a
              target="_blank" href={route('policy.show')} class="underline text-sm text-gray-600 hover:text-gray-900">Privacy
              Policy</a>
            </div>
          </div>
        </JetLabel>
      </div>
    {/if}

    <div class="flex items-center justify-end mt-4">
      <Link href={route('login')} class="underline text-sm text-gray-600 hover:text-gray-900">
        Already registered?
      </Link>

      <JetButton class="ml-4" disabled={$form.processing}>
        Register
      </JetButton>
    </div>
  </form>
</JetAuthenticationCard>
