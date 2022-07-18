<script>
  import { onMount } from "svelte"
  import {
    Layout,
    Heading,
    Body,
    Button,
    Divider,
    notifications,
    Label,
  } from "@budibase/bbui"
  import { API } from "api"
  import { auth, admin } from "stores/portal"
  import { redirect } from "@roxi/routify"

  let version

  // Only admins allowed here
  $: {
    if (!$auth.isAdmin || $admin.cloud) {
      $redirect("../../portal")
    }
  }

  async function updateBudibase() {
    try {
      notifications.info("Updating budibase..")
      await fetch("/v1/update", {
        headers: {
          Authorization: "Bearer budibase",
        },
      })
      notifications.success("Your budibase installation is up to date.")
      getVersion()
    } catch (err) {
      notifications.error(`Error installing budibase update ${err}`)
    }
  }

  async function getVersion() {
    try {
      version = await API.getBudibaseVersion()
    } catch (error) {
      notifications.error("Error getting Budibase version")
      version = null
    }
  }

  onMount(() => {
    getVersion()
  })
</script>

{#if $auth.isAdmin}
  <Layout noPadding>
    <Layout gap="XS" noPadding>
      <Heading size="M">更新</Heading>
      <Body>
      使您的Budibase安装保持最新，以使用最新功能、安全更新等。
      </Body>
    </Layout>
    <Divider size="S" />
    {#if version}
      <div>
        <Label size="L">当前版本</Label>
        <Heading size="XS">
          {version}
        </Heading>
      </div>
    {/if}
    <div>
      <Button cta on:click={updateBudibase}>检查更新</Button>
    </div>
  </Layout>
{/if}
