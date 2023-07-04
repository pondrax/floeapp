<script lang="ts">
  import type { ActionData, PageData } from "./$types";
  import { enhance } from "$app/forms";
  import {
    fnBreadcrumb,
    fnModal,
    fnAutofocus,
    fnToggleColumn,
    fnSelect,
    fnSearchParams,
  } from "$lib/utils";
  import { t, loading, toast } from "$lib/common";

  export let data: PageData;
  export let form: ActionData;

  $: if (form) {
    $toast = [...$toast, form];
    form = null;
  }

  $: page = data.page;
  $: options = data.options;
  $: result = data.result;
  $: meta = data.meta;

  let columns = [{}];
  let modal: any = false;
  let modalDel: any = false;
  let selections: any[] = [];

  function initColumn(event: InputEvent) {
    // console.log(e)
    const detail = event.detail as any;
    columns = detail?.columns;
  }
</script>

<div flex flex-col gap-3>
  <!-- Header -->
  <div flex flex-wrap items-center gap-3>
    <div breadcrumb use:fnBreadcrumb={[page.uri, data.lang.id]} />
    <button btn="~ outline" border-transparent p-1 mr-auto>
      <i i-bx-cog />
    </button>
    <button
      btn
      on:click={() =>
        (modal = {
          id: crypto.randomUUID(),
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
      {JSON.stringify({ meta, form }, null, 2)}
    </div>
  </div>

  <!-- Filterbox -->
  <form use:fnSearchParams={{ meta, exclude: ["filter"] }}>
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
        placeholder={$t(`form.filter`, columns[0])}
        autocomplete="off"
        autofocus
      />
      <button btn="~ outline" absolute right-1 border-transparent mt-.5 p-1>
        <i i-bx-refresh class={$loading ? "animate-spin" : ""} />
      </button>
    </div>
  </form>

  <!-- Selections -->
  {#if selections.length}
    <div alert="~ base">
      {$t(`form.selected`, { length: selections.length })}
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

  <div form-control use:fnSelect={options.roles}>
    {$t`field.role`}
    <div filter relative>
      <input input placeholder={$t`field.role`} />
    </div>
    <input
      input
      type="hidden"
      name="role.connect.name"
      bind:value={modal.name}
      placeholder="Selected"
    />
    <ul menu w-full bg-base rounded-box shadow p-1>
      <li>
        <button type="button" bg-transparent value="(name)"> (name) </button>
      </li>
    </ul>
  </div>
  <!-- {JSON.stringify(columns)} -->

  <div bg-base p-2 rounded-box z-10>
    <!-- Main Table -->
    <div overflow-x-auto min-h-50vh>
      <table table w-full class={$loading ? "opacity-50" : ""}>
        <thead>
          <tr children-bg-base-a>
            <th sticky left-0 rounded-tl-xl w-1 aria-label="Checkbox">
              <input
                type="checkbox"
                checkbox
                checked={selections.length == result.length}
                on:click={() =>
                  selections.length == result.length
                    ? (selections = [])
                    : (selections = result)}
              />
            </th>
            <th data-key="name">{$t`field.name`}</th>
            <th data-key="email">{$t`field.email`}</th>
            <th data-key="roleId">{$t`field.role`}</th>
            <th data-key="createdAt" hidden>{$t`field.createdAt`}</th>
            <th
              rounded-tr-xl
              w-1
              sticky
              right-0
              class="!z-20"
              aria-label="Action"
            >
              <div dropdown="~ end" use:fnToggleColumn on:init={initColumn}>
                <button btn="~ outline" border-0>
                  <i i-bx-dots-horizontal />
                </button>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <ul tabindex="0" menu w-60 bg-base rounded-box shadow>
                  <li menu-title>{$t`form.toggle.title`}</li>
                </ul>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {#if result.length == 0}
            <tr>
              <th colspan="10">
                {$t`form.page.empty`}
                <form inline mx-5>
                  <button btn="~ sm outline">{$t`form.reset.button`}</button>
                </form>
              </th>
            </tr>
          {/if}
          {#each result as row}
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
              <td hidden>{row.createdAt}</td>
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
    {#if result.length > 0}
      <form flex flex-wrap justify-center sm:justify-between gap-5 mt-5>
        <div flex gap-3 items-center>
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
        <div use:fnSearchParams={{ meta, exclude: ["limit", "page"] }}>
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
        on:submit={() => ($loading = true)}
        on:reset={() => (modal = false)}
      >
        <!-- {JSON.stringify(modal)} -->
        <input type="hidden" name="id" value={modal.id} />
        <div grid md:grid-cols-2 gap-5>
          <div form-control>
            {$t`field.name`}
            <input
              input
              name="name"
              placeholder={$t`field.name`}
              bind:value={modal.name}
              use:fnAutofocus
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
          <div form-control use:fnSelect={options.roles}>
            {$t`field.role`}
            <div filter relative>
              <input input placeholder={$t`field.role`} />
            </div>
            <input
              input
              type="hidden"
              name="role.connect.name"
              bind:value={modal.role.name}
              placeholder="Selected"
            />
            <ul menu w-full bg-base rounded-box shadow p-1>
              <li>
                <button type="button" bg-transparent value="(name)"
                  >(name)</button
                >
              </li>
            </ul>
          </div>
        </div>
        <div mt-36>
          <button btn="~ primary" mt-3 disabled={$loading}>
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
        on:submit={() => ($loading = true)}
        on:reset={() => {
          modalDel = false;
          selections = [];
        }}
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
