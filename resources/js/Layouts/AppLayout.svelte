<script>
  import { Inertia } from '@inertiajs/inertia';
  import route from 'ziggy';
  import { Link, page } from '@inertiajs/inertia-svelte';
  import JetApplicationMark from '@/Jetstream/ApplicationMark.svelte';
  import JetBanner from '@/Jetstream/Banner.svelte';
  import JetDropdown from '@/Jetstream/Dropdown.svelte';
  import JetDropdownLink from '@/Jetstream/DropdownLink.svelte';
  import JetNavLink from '@/Jetstream/NavLink.svelte';
  import JetResponsiveNavLink from '@/Jetstream/ResponsiveNavLink.svelte';

  export let title;

  let showingNavigationDropdown = false;

  const switchToTeam = (team) => {
    Inertia.put(route('current-team.update'), {
      team_id: team.id,
    }, {
      preserveState: false,
    });
  };

  const logout = () => {
    Inertia.post(route('logout'));
  };
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div>
  <JetBanner/>

  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white border-b border-gray-100">
      <!-- Primary Navigation Menu -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <!-- Logo -->
            <div class="shrink-0 flex items-center">
              <Link href="{route('dashboard')}">
                <JetApplicationMark class="block h-9 w-auto"/>
              </Link>
            </div>

            <!-- Navigation Links -->
            <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <JetNavLink href="{route('dashboard')}" active={route().current('dashboard')}>
                Dashboard
              </JetNavLink>
            </div>
          </div>

          <div class="hidden sm:flex sm:items-center sm:ml-6">
            <div class="ml-3 relative">
              <!-- Teams Dropdown -->
              {#if $page.props.jetstream.hasTeamFeatures}
                <JetDropdown align="right" width="60">
                  <svelte:fragment slot="trigger">
                    <span class="inline-flex rounded-md">
                      <button type="button"
                              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition">
                          { $page.props.user.current_team.name }

                        <svg
                          class="ml-2 -mr-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                              <path fill-rule="evenodd"
                                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                    clip-rule="evenodd"/>
                          </svg>
                      </button>
                    </span>
                  </svelte:fragment>

                  <svelte:fragment slot="content">
                    <div class="w-60">
                      <!-- Team Management -->
                      {#if $page.props.jetstream.hasTeamFeatures}
                        <div class="block px-4 py-2 text-xs text-gray-400">
                          Manage Team
                        </div>

                        <!-- Team Settings -->
                        <JetDropdownLink href="{route('teams.show', $page.props.user.current_team)}">
                          Team Settings
                        </JetDropdownLink>

                        {#if $page.props.jetstream.canCreateTeams}
                          <JetDropdownLink href="{route('teams.create')}">
                            Create New Team
                          </JetDropdownLink>
                        {/if}

                        <div class="border-t border-gray-100"/>

                        <!-- Team Switcher -->
                        <div class="block px-4 py-2 text-xs text-gray-400">
                          Switch Teams
                        </div>

                        {#each $page.props.user.all_teams as team (team.id)}
                          <form on:submit|preventDefault={() => switchToTeam(team)}>
                            <JetDropdownLink as="button">
                              <div class="flex items-center">
                                {#if team.id === $page.props.user.current_team_id}
                                  <svg
                                    class="mr-2 h-5 w-5 text-green-400"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                  </svg>
                                {/if}
                                <div>{ team.name }</div>
                              </div>
                            </JetDropdownLink>
                          </form>
                        {/each}
                      {/if}
                    </div>
                  </svelte:fragment>
                </JetDropdown>
              {/if}
            </div>

            <!-- Settings Dropdown -->
            <div class="ml-3 relative">
              <JetDropdown align="right" width="48">
                <svelte:fragment slot="trigger">
                  {#if $page.props.jetstream.managesProfilePhotos}
                    <button
                      class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                      <img class="h-8 w-8 rounded-full object-cover" src="{$page.props.user.profile_photo_url}"
                           alt="{$page.props.user.name}">
                    </button>
                  {:else}
                    <span class="inline-flex rounded-md">
                        <button type="button"
                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition">
                            { $page.props.user.name }

                          <svg
                            class="ml-2 -mr-0.5 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                                <path fill-rule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </span>
                  {/if}
                </svelte:fragment>

                <svelte:fragment slot="content">
                  <!-- Account Management -->
                  <div class="block px-4 py-2 text-xs text-gray-400">
                    Manage Account
                  </div>

                  <JetDropdownLink href="{route('profile.show')}">
                    Profile
                  </JetDropdownLink>

                  {#if $page.props.jetstream.hasApiFeatures}
                    <JetDropdownLink href="{route('api-tokens.index')}">
                      API Tokens
                    </JetDropdownLink>
                  {/if}

                  <div class="border-t border-gray-100"/>

                  <!-- Authentication -->
                  <form on:submit|preventDefault={logout}>
                    <JetDropdownLink as="button">
                      Log Out
                    </JetDropdownLink>
                  </form>
                </svelte:fragment>
              </JetDropdown>
            </div>
          </div>

          <!-- Hamburger -->
          <div class="-mr-2 flex items-center sm:hidden">
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition"
              on:click={() => showingNavigationDropdown = !showingNavigationDropdown}>
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  class:hidden={showingNavigationDropdown}
                  class:inline-flex={!showingNavigationDropdown}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  class:hidden={!showingNavigationDropdown}
                  class:inline-flex={showingNavigationDropdown}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Responsive Navigation Menu -->
      <div class:block={showingNavigationDropdown} class:hidden={!showingNavigationDropdown} class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <JetResponsiveNavLink href="{route('dashboard')}" active={route().current('dashboard')}>
            Dashboard
          </JetResponsiveNavLink>
        </div>

        <!-- Responsive Settings Options -->
        <div class="pt-4 pb-1 border-t border-gray-200">
          <div class="flex items-center px-4">
            {#if $page.props.jetstream.managesProfilePhotos}
              <div class="shrink-0 mr-3">
                <img class="h-10 w-10 rounded-full object-cover" src={$page.props.user.profile_photo_url}
                     alt={$page.props.user.name}>
              </div>
            {/if}

            <div>
              <div class="font-medium text-base text-gray-800">
                { $page.props.user.name }
              </div>
              <div class="font-medium text-sm text-gray-500">
                { $page.props.user.email }
              </div>
            </div>
          </div>

          <div class="mt-3 space-y-1">
            <JetResponsiveNavLink href="{route('profile.show')}" active={route().current('profile.show')}>
              Profile
            </JetResponsiveNavLink>

            {#if $page.props.jetstream.hasApiFeatures}
              <JetResponsiveNavLink href="{route('api-tokens.index')}"
                                    active={route().current('api-tokens.index')}>
                API Tokens
              </JetResponsiveNavLink>
            {/if}

            <!-- Authentication -->
            <form method="POST" on:submit|preventDefault={logout}>
              <JetResponsiveNavLink as="button">
                Log Out
              </JetResponsiveNavLink>
            </form>

            <!-- Team Management -->
            {#if $page.props.jetstream.hasTeamFeatures}
              <div class="border-t border-gray-200"/>

              <div class="block px-4 py-2 text-xs text-gray-400">
                Manage Team
              </div>

              <!-- Team Settings -->
              <JetResponsiveNavLink href="{route('teams.show', $page.props.user.current_team)}"
                                    active={route().current('teams.show')}>
                Team Settings
              </JetResponsiveNavLink>

              {#if $page.props.jetstream.canCreateTeams}
                <JetResponsiveNavLink href="{route('teams.create')}"
                                      active={route().current('teams.create')}>
                  Create New Team
                </JetResponsiveNavLink>
              {/if}

              <div class="border-t border-gray-200"/>

              <!-- Team Switcher -->
              <div class="block px-4 py-2 text-xs text-gray-400">
                Switch Teams
              </div>

              {#each $page.props.user.all_teams as team (team.id)}
                <form on:submit|preventDefault={() => switchToTeam(team)}>
                  <JetResponsiveNavLink as="button">
                    <div class="flex items-center">
                      {#if team.id === $page.props.user.current_team_id}
                        <svg
                          class="mr-2 h-5 w-5 text-green-400"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      {/if}
                      <div>{ team.name }</div>
                    </div>
                  </JetResponsiveNavLink>
                </form>
              {/each}
            {/if}
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Heading -->
    {#if $$slots.header}
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <slot name="header"/>
        </div>
      </header>
    {/if}

    <!-- Page Content -->
    <main>
      <slot />
    </main>
  </div>
</div>
