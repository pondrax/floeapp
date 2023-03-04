<script lang="ts">
  import type { LayoutData } from "./$types";
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { groupBy } from "$lib/utils";
  import { config } from "$lib/config";
  import { loading } from "$lib/store";

  export let data: LayoutData;

  $: lang = data.lang;
  $: page = data.page;
  $: pages = Object.entries(
    groupBy(data.pages, (i: { head: string }) => i.head)
  );
  let sidebar = false;
  beforeNavigate(() => {
    $loading = true;
  });
  afterNavigate(() => {
    setTimeout(() => ($loading = false), 500);
  });
</script>

<svelte:head>
  <title>{page?.name} | {config.name}</title>
  <meta name="description" content={page?.description} />
</svelte:head>

{#if data.session}
  <div flex h-screen bg-base overflow-hidden z-0>
    <aside
      md:w-80
      class={sidebar ? "w-80" : "w-0"}
      flex
      flex-col
      h-full
      sticky
      top-0
      transition-width
      duration-200
      aria-label="Sidebar"
    >
      <div
        flex
        flex-col
        h-screen
        class={sidebar ? "visible" : "invisible md:visible"}
      >
        <ul menu flex-shrink-0>
          <li menu-title p-1>
            <div flex-col gap-1 p-0>
              <img src="/favicon.png" alt="icon" w-20 m-auto />
              <h3 text="xl center">{config.name}</h3>
              <div flex>
                <div w-15>
                  <img src={data.session.user?.image} alt="avatar" />
                </div>
                <div>
                  <span>
                    {data.session.user?.name}
                  </span>
                  <span text-xs>
                    {data.session.user?.email}
                  </span>
                </div>
              </div>
              <div group-x justify-center>
                <a href="/app/profile" btn="~ xs">Profile</a>
                <a href="/auth/signout" btn="~ xs secondary">Sign Out</a>
              </div>
            </div>
          </li>
        </ul>
        <ul menu overflow-auto bg-base>
          {#each pages as [head, links]}
            <li />
            <li menu-heading uppercase>{head}</li>
            {#each links as link}
              <li>
                <a
                  href={link.uri.replace("[lang]", lang.id)}
                  class:bg-primary={page?.uri == link.uri}
                  capitalize
                >
                  {link.name}
                </a>
              </li>
            {/each}
          {/each}
          <li />
        </ul>
      </div>
    </aside>

    <main min-w-0 w-full p-2 aria-label="Main Content">
      <div flex flex-col bg-base-a h-full rounded-3xl overflow-auto>
        <div p-3>
          <div flex gap-1>
            <button
              md:hidden
              btn="~ sm outline"
              border-transparent
              on:click={() => (sidebar = !sidebar)}
            >
              <i i-bx-menu />
            </button>
            <div dropdown>
              <button btn="~ sm outline" uppercase>{lang.id}</button>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <ul tabindex="0" menu bg-base rounded-box>
                <li><a href={page?.uri.replace("[lang]", "en")}>EN</a></li>
                <li><a href={page?.uri.replace("[lang]", "id")}>ID</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div p-4 flex-grow>
          <slot />
        </div>
        <div sticky bottom-0 text-center text-sm p-2>
          &copy; Copyright Drax 2023
        </div>
      </div>
    </main>
  </div>
{:else}
  <h1>Access Denied</h1>
  <p>
    <a href="/auth/signin"> You must be signed in to view this page </a>
  </p>
{/if}
