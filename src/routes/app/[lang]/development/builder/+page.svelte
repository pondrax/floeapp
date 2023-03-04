<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  import { enhance } from "$app/forms";
  import fnModal from "floeui/directives/modal";
  import { breadcrumb } from "$lib/breadcrumb";

  export let data: PageData;
  export let form: ActionData;
  $: page = data.page;

  console.log(form);

  let modal: any = false;
  let modalDel: any = false;
  let selections: any[] = [];
</script>

<div flex flex-col gap-3 py-10>
  <!-- Header -->
  <div flex flex-wrap items-center gap-3>
    {@html breadcrumb(page?.uri)}
    <button btn="~ outline" border-transparent p-1>
      <i i-bx-cog />
    </button>
    <button btn="~ outline" border-transparent p-1 mr-auto>
      <i i-bx-refresh />
    </button>
    <button btn on:click={() => (modal = { uri: "/app" })}>
      <i i-bx-plus /> New
    </button>
  </div>

  <!-- Description -->
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div tabindex="0" collapse p-0>
    <div collapse-title capitalize>{page?.name}</div>
    <div>
      <p>
        {page?.description}
      </p>
    </div>
  </div>

  <!-- Filterbox -->
  <div>
    <textarea
      input
      placeholder="Search filter, ex: created_at > 2023"
      rows="1"
    />
  </div>
  {#if selections.length}
    <div alert="~ base">
      Selected {selections.length}
      <button btn="~ sm outline" on:click={() => (selections = [])}>
        Reset
      </button>
      <button
        ml-auto
        btn="~ sm outline-error"
        on:click={() => (modalDel = selections)}
      >
        Delete
      </button>
    </div>
  {/if}

  <div bg-base p-2 rounded-box z-10>
    <!-- Main Table -->
    <div overflow-x-auto min-h-50vh>
      <table table w-full lowercase>
        <thead>
          <tr children-bg-base-a>
            <th sticky left-0 bg-base-a rounded-tl-xl w-1>
              <input
                type="checkbox"
                checkbox
                checked={selections.length == data.pages.length}
                on:click={() =>
                  selections.length == data.pages.length
                    ? (selections = [])
                    : (selections = data.pages)}
              />
            </th>
            <th>Uri</th>
            <th>Group</th>
            <th>Actions</th>
            <th rounded-tr-xl w-1 sticky right-0 class="!z-20">
              <div dropdown="~ end">
                <button btn="~ outline" border-0>
                  <i i-bx-dots-horizontal />
                </button>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <ul tabindex="0" menu w-48 bg-base rounded-box shadow>
                  <li menu-title>Column</li>
                  {#each Object.keys(data.page || {}) as key}
                    <li>
                      <label>
                        <input type="checkbox" checkbox mr-2 />
                        {key}
                      </label>
                    </li>
                  {/each}
                </ul>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {#each data.pages as link}
            <tr>
              <th sticky left-0 bg-base>
                <label>
                  <input
                    type="checkbox"
                    checkbox
                    bind:group={selections}
                    value={link}
                  />
                </label>
              </th>
              <td>{link.uri}</td>
              <td>{link.head}</td>
              <td>
                {#each link.actions as action}
                  <span badge="~ accent" mr-1>{action}</span>
                {/each}
              </td>
              <th bg-base sticky right-0>
                <button btn="~ secondary" on:click={() => (modal = link)}>
                  <i i-bx-pencil />
                </button>
              </th>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Paginator -->
    <div flex flex-wrap justify-center sm:justify-between gap-5 p-1>
      <div flex items-center gap-3>
        <div>Showing</div>
        <div dropdown="~ top end">
          <button btn="~ sm outline">1 of 10 rows</button>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <ul tabindex="0" menu w-48 bg-base rounded-box shadow>
            <li><button>Item 1</button></li>
            <li><button>Item 2</button></li>
          </ul>
        </div>
      </div>
      <div>
        <div group-x>
          <button btn active>1</button>
          <button btn>2</button>
          <button btn>3</button>
          <button btn>4</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modals -->
{#if modal}
  <div modal use:fnModal={modal} on:close={() => (modal = false)}>
    <div w-full>
      <button modal-close on:click={() => (modal = false)}> &times; </button>
      <h1 text-lg mb-3>Endpoints</h1>
      <form method="post" action="?/make" use:enhance>
        {JSON.stringify(modal)}
        <div form-control>
          Uri *
          <input input name="uri" placeholder="Uri" bind:value={modal.uri} />
        </div>
        <div form-control>
          Head
          <input input readonly value={modal.uri?.split("/")[1]} />
        </div>
        <div form-control>
          Name
          <input input readonly value={modal.uri?.split("/")[2]} />
        </div>
        <button btn="~ primary" mt-3>Save</button>
      </form>
    </div>
  </div>
{/if}

{#if modalDel}
  <div modal use:fnModal={modalDel} on:close={() => (modalDel = false)}>
    <div>
      <button modal-close on:click={() => (modalDel = false)}> &times; </button>
      <h1 text-lg mb-3>Delete Endpoints</h1>
      <form method="post" action="?/delete" use:enhance>
        <p>Are you sure to remove?</p>
        {#each modalDel as sel}
          <p text-base-content:70>
            {sel?.uri}
          </p>
        {/each}
        <button btn="~ error" mt-3>
          <i i-bx-trash /> Delete
        </button>
      </form>
    </div>
  </div>
{/if}
