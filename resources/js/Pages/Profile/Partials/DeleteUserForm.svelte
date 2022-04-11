<script>
  import { useForm } from '@inertiajs/inertia-svelte';
  import route from 'ziggy';
  import JetActionSection from '@/Jetstream/ActionSection.svelte';
  import JetDialogModal from '@/Jetstream/DialogModal.svelte';
  import JetDangerButton from '@/Jetstream/DangerButton.svelte';
  import JetInput from '@/Jetstream/Input.svelte';
  import JetInputError from '@/Jetstream/InputError.svelte';
  import JetSecondaryButton from '@/Jetstream/SecondaryButton.svelte';

  let confirmingUserDeletion = false;
  let passwordInput;

  const form = useForm({
    password: '',
  });

  const confirmUserDeletion = () => {
    confirmingUserDeletion = true;

    setTimeout(() => passwordInput.focus(), 250);
  };

  const deleteUser = (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    $form.delete(route('current-user.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.focus(),
      onFinish: () => $form.reset(),
    });
  };

  const closeModal = () => {
    confirmingUserDeletion = false;
    $form.reset();
  };
</script>

<JetActionSection>
  <svelte:fragment slot="title">
    Delete Account
  </svelte:fragment>

  <svelte:fragment slot="description">
    Permanently delete your account.
  </svelte:fragment>

  <svelte:fragment slot="content">
    <div class="max-w-xl text-sm text-gray-600">
      Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your
      account, please download any data or information that you wish to retain.
    </div>

    <div class="mt-5">
      <JetDangerButton on:click={confirmUserDeletion}>
        Delete Account
      </JetDangerButton>
    </div>

    <!-- Delete Account Confirmation Modal -->
    {#if confirmingUserDeletion}
    <JetDialogModal close={closeModal}>
      <svelte:fragment slot="title">
        Delete Account
      </svelte:fragment>

      <svelte:fragment slot="content">
        Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will
        be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.

        <div class="mt-4">
          <JetInput
            bind:this={passwordInput}
            bind:value={$form.password}
            type="password"
            class="mt-1 block w-3/4"
            placeholder="Password"
            on:keyup={deleteUser}
          />

          <JetInputError message={$form.errors.password} class="mt-2"/>
        </div>
      </svelte:fragment>

      <svelte:fragment slot="footer">
        <JetSecondaryButton on:click={closeModal}>
          Cancel
        </JetSecondaryButton>

        <JetDangerButton
          class="ml-3"
          disabled={$form.processing}
          on:click={deleteUser}
        >
          Delete Account
        </JetDangerButton>
      </svelte:fragment>
    </JetDialogModal>
    {/if}
  </svelte:fragment>
</JetActionSection>
