<script>
  import { goto } from "@roxi/routify"
  import {
    Heading,
    Body,
    Divider,
    Button,
    ButtonGroup,
    Search,
    Table,
    Label,
    Layout,
    Modal,
    notifications,
    Pagination,
  } from "@budibase/bbui"
  import TagsRenderer from "./_components/TagsTableRenderer.svelte"
  import AddUserModal from "./_components/AddUserModal.svelte"
  import { users, auth } from "stores/portal"
  import { createPaginationStore } from "helpers/pagination"

  const schema = {
    email: { displayName: "电子邮件" },
    lastName: { displayName: "姓氏" },
    firstName: { displayName: "名字" },
    'builder.global': { displayName: "开发者", type: "boolean" },
    'admin.global': { displayName: "管理员", type: "boolean" },
    group: { displayName: "组" },
  }

  if ($auth.isRoot) {
    schema['root.global'] = { displayName: "ROOT", type: "boolean" }
  }

  let pageInfo = createPaginationStore()
  let prevSearch = undefined,
    search = undefined
  $: page = $pageInfo.page
  $: fetchUsers(page, search)
  let userList

  let createUserModal

  async function fetchUsers(page, search) {
    if ($pageInfo.loading) {
      return
    }
    // need to remove the page if they've started searching
    if (search && !prevSearch) {
      pageInfo.reset()
      page = undefined
    }
    prevSearch = search
    try {
      pageInfo.loading()
      await users.search({ page, search })
      pageInfo.fetched($users.hasNextPage, $users.nextPage)
      userList = $users.data.filter(user => {
        return $auth.isRoot ? true : !user.root?.global
      })
      console.log(userList)
    } catch (error) {
      notifications.error("Error getting user list")
    }
  }
</script>

<Layout noPadding>
  <Layout gap="XS" noPadding>
    <Heading>用户</Heading>
    <Body>
      每个用户被分配到一个包含应用程序和权限的组中。在该选项中，您可以添加用户，或编辑和删除现有用户。
    </Body>
  </Layout>
  <Divider size="S" />
  <Layout gap="S" noPadding>
    <div class="users-heading">
      <Heading size="S">用户</Heading>
      <ButtonGroup>
        <Button disabled secondary>导入用户</Button>
        <Button primary dataCy="add-user" on:click={createUserModal.show}
          >添加用户</Button
        >
      </ButtonGroup>
    </div>
    <div class="field">
      <Label size="L">搜索 / 过滤</Label>
      <Search bind:value={search} placeholder="" />
    </div>
    <Table
      on:click={({ detail }) => $goto(`./${detail._id}`)}
      {schema}
      data={userList}
      allowEditColumns={false}
      allowEditRows={false}
      allowSelectRows={false}
      customRenderers={[{ column: "group", component: TagsRenderer }]}
    />
    <div class="pagination">
      <Pagination
        page={$pageInfo.pageNumber}
        hasPrevPage={$pageInfo.loading ? false : $pageInfo.hasPrevPage}
        hasNextPage={$pageInfo.loading ? false : $pageInfo.hasNextPage}
        goToPrevPage={pageInfo.prevPage}
        goToNextPage={pageInfo.nextPage}
      />
    </div>
  </Layout>
</Layout>

<Modal bind:this={createUserModal}>
  <AddUserModal
    on:created={async () => {
      pageInfo.reset()
      await fetchUsers()
    }}
  />
</Modal>

<style>
  .field {
    display: flex;
    align-items: center;
    flex-direction: row;
    grid-gap: var(--spacing-m);
  }
  .field > :global(*) + :global(*) {
    margin-left: var(--spacing-m);
  }
  .users-heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>
