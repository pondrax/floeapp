<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  import { enhance } from "$app/forms";
  import { fnModal } from "$lib/utils";
  import { t, loading, autofocus } from "$lib/common";

  export let data: PageData;
  export let form: ActionData;

  $: page = data.page;
  $: options = data.options;
  $: table = data.table;
  $: meta = data.meta;

  let column = ["uri", "head", "actions"];
  let modal: any = false;
  let modalDel: any = false;
  let selections: any[] = [];
</script>

<div flex flex-col gap-3>
  <!-- Header -->
  <div flex flex-wrap items-center gap-3>
    <!-- {@html breadcrumb(page.uri)} -->
    <div breadcrumb>
      {#each page.uri
        .split("/")
        .filter((u) => !["[lang]", ""].includes(u)) as uri, i}
        <a
          href={"/" +
            page.uri
              .replace("[lang]", data.lang.id)
              .split("/")
              .slice(1, i + 3)
              .join("/")}
          capitalize
        >
          {uri}
        </a>
      {/each}
    </div>
    <button btn="~ outline" border-transparent p-1>
      <i i-bx-cog />
    </button>
    <form mr-auto>
      <button
        name="filter"
        value={meta.filter}
        btn="~ outline"
        border-transparent
        p-1
        mr-auto
      >
        <i i-bx-refresh class={$loading ? "animate-spin" : ""} />
      </button>
    </form>
    <button
      btn
      on:click={() =>
        (modal = {
          name: "",
          email: "",
          role: {
            name: "",
          },
        })}
    >
      <i i-bx-plus />
      {$t`form.add.button`}
    </button>
  </div>

  <!-- Description -->
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div tabindex="0" collapse p-0>
    <div collapse-title capitalize>{$t`page.name`}</div>
    <div>
      <p>
        {$t`page.description`}
      </p>
    </div>
  </div>

  <!-- Filterbox -->
  <form>
    {JSON.stringify({ meta, form })}
    <div flex relative>
      <div flex absolute z-10 p-2>
        <i i-bx-search w-5 />
      </div>

      <!-- svelte-ignore a11y-autofocus -->
      <input
        input
        pl-8
        value={meta.filter}
        name="filter"
        placeholder={$t(`form.filter`, { field: column[0], value: "app" })}
        autocomplete="off"
        autofocus
      />
    </div>
  </form>

  <!-- Selections -->
  {#if selections.length}
    <div alert="~ base">
      {$t`form.selected`}
      {selections.length}
      <button btn="~ sm outline" on:click={() => (selections = [])}>
        {$t`form.reset.button`}
      </button>
      <button
        ml-auto
        btn="~ sm outline-error"
        on:click={() => (modalDel = selections)}
      >
        {$t`form.delete.button`}
      </button>
    </div>
  {/if}

  <div bg-base p-2 rounded-box z-10>
    <!-- Main Table -->
    <div overflow-x-auto min-h-50vh>
      <table table w-full class={$loading ? "opacity-50" : ""}>
        <thead>
          <tr children-bg-base-a>
            <th sticky left-0 rounded-tl-xl w-1>
              <input
                type="checkbox"
                checkbox
                checked={selections.length == table.length}
                on:click={() =>
                  selections.length == table.length
                    ? (selections = [])
                    : (selections = table)}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th rounded-tr-xl w-1 sticky right-0 class="!z-20">
              <div dropdown="~ end">
                <button btn="~ outline" border-0>
                  <i i-bx-dots-horizontal />
                </button>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <ul tabindex="0" menu w-48 bg-base rounded-box shadow>
                  <li menu-title>{$t`form.toggle.label`}</li>
                  {#each column as key}
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
          {#if table.length == 0}
            <tr>
              <th colspan="10">
                {$t`form.page.empty`}
                <form inline mx-5>
                  <button btn="~ sm outline">{$t`form.reset.button`}</button>
                </form>
              </th>
            </tr>
          {/if}
          {#each table as row}
            <tr children-bg-base>
              <th sticky left-0>
                <input
                  type="checkbox"
                  checkbox
                  bind:group={selections}
                  value={row}
                />
              </th>
              <td>
                <span data-filter={`name=${row.name}`}>{row.name}</span>
              </td>
              <td>{row.email}</td>
              <td>{row.role?.name}</td>
              <th sticky right-0>
                <button
                  btn="~ secondary"
                  on:click={() => (modal = { ...row, role: row.role || {} })}
                >
                  <i i-bx-pencil />
                </button>
              </th>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Paginator -->
    {#if table.length > 0}
      <form flex flex-wrap justify-center sm:justify-between gap-5 mt-5>
        <input type="hidden" name="filter" value={meta.filter} />
        <input type="hidden" name="expand" value={meta.expand} />
        <div flex items-center gap-3>
          <div dropdown="~ top">
            <button type="button" btn="~ outline" border-base-content:20>
              {$t(`form.page.rows`, meta)}
            </button>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <ul tabindex="0" menu bg-base rounded-box shadow w-full>
              <li>
                <button bg-transparent name="limit" value="10">10</button>
              </li>
              <li>
                <button bg-transparent name="limit" value="25">25</button>
              </li>
              <li>
                <button bg-transparent name="limit" value="null">All</button>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div group-x>
            <button
              btn
              name="page"
              value={meta.prevPage}
              disabled={!meta.prevPage}
            >
              <i i-bx-chevron-left />
            </button>
            <button
              btn
              name="page"
              value={meta.nextPage}
              disabled={!meta.nextPage}
            >
              <i i-bx-chevron-right />
            </button>
          </div>
        </div>
      </form>
    {/if}
  </div>
</div>

<!-- Modals -->
{#if modal}
  <div modal use:fnModal={modal} on:close={() => (modal = false)}>
    <div max-w-full w-3xl max-h-screen overflow-auto>
      <button modal-close on:click={() => (modal = false)}> &times; </button>
      <h1 text-lg mb-3>{$t`form.save.title`}</h1>
      <form
        method="post"
        action="?/save"
        use:enhance
        on:reset={() => (modal = false)}
      >
        <!-- {JSON.stringify(modal)} -->
        <div grid md:grid-cols-2 gap-5>
          <div form-control>
            {$t`field.name`}
            <input
              input
              name="name"
              placeholder={$t`field.name`}
              bind:value={modal.name}
              use:autofocus
            />
          </div>
          <div form-control>
            {$t`field.email`}
            <input
              input
              name="email"
              placeholder={$t`field.email`}
              bind:value={modal.email}
            />
          </div>
          <div form-control>
            {$t`field.role`}
            <input
              input
              name="role.connect.name"
              placeholder={$t`field.role`}
              bind:value={modal.role.name}
            />
          </div>
        </div>
        <div>
          <button btn="~ primary" mt-3>
            <i i-bx-save />
            {$t`form.save.button`}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

{#if modalDel}
  <div modal use:fnModal={modalDel} on:close={() => (modalDel = false)}>
    <div>
      <button modal-close on:click={() => (modalDel = false)}> &times; </button>
      <h1 text-lg mb-3>{$t`form.delete.title`}</h1>

      <form
        method="post"
        action="?/del"
        use:enhance
        on:reset={() => (modalDel = false)}
      >
        <p>{$t`form.delete.confirm`}</p>
        {#each modalDel as sel}
          <input name="id[]" value={sel?.id} type="hidden" />
          <input
            value={sel?.email}
            w-full
            readonly
            bg-transparent
            text-base-content:70
          />
        {/each}
        <button btn="~ error" mt-3>
          <i i-bx-trash />
          {$t`form.delete.button`}
        </button>
      </form>
    </div>
  </div>
{/if}
