<script>
  import { goto } from "@roxi/routify"
  import { Layout, Page, notifications, ActionButton } from "@budibase/bbui"
  import TemplateDisplay from "components/common/TemplateDisplay.svelte"
  import { onMount } from "svelte"
  import { templates } from "stores/portal"

  let loaded = $templates?.length

  onMount(async () => {
    try {
      await templates.load()
      if ($templates?.length === 0) {
        notifications.error(
          "加载快速入门模板时出现问题！请稍后重试！"
        )
      }
    } catch (error) {
      notifications.error("加载应用程序和模板时发生错误！")
    }
    loaded = true
  })
</script>

<Page wide>
  <Layout noPadding gap="XL">
    <span>
      <ActionButton
        secondary
        icon={"ArrowLeft"}
        on:click={() => {
          $goto("../")
        }}
      >
        Back
      </ActionButton>
    </span>
    {#if loaded && $templates?.length}
      <TemplateDisplay templates={$templates} />
    {/if}
  </Layout>
</Page>
