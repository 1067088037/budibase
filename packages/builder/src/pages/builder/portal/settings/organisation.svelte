<script>
  import {
    Layout,
    Heading,
    Body,
    Button,
    Divider,
    Label,
    Input,
    Dropzone,
    notifications,
    Toggle,
  } from "@budibase/bbui"
  import { auth, organisation, admin } from "stores/portal"
  import { API } from "api"
  import { writable } from "svelte/store"
  import { redirect } from "@roxi/routify"

  // Only admins allowed here
  $: {
    if (!$auth.isAdmin) {
      $redirect("../../portal")
    }
  }

  const values = writable({
    company: $organisation.company,
    platformUrl: $organisation.platformUrl,
    analyticsEnabled: $organisation.analyticsEnabled,
    logo: $organisation.logoUrl
      ? { url: $organisation.logoUrl, type: "image", name: "Logo" }
      : null,
  })
  let loading = false

  async function uploadLogo(file) {
    try {
      let data = new FormData()
      data.append("file", file)
      await API.uploadLogo(data)
    } catch (error) {
      notifications.error("Error uploading logo")
    }
  }

  async function saveConfig() {
    loading = true

    try {
      // Upload logo if required
      if ($values.logo && !$values.logo.url) {
        await uploadLogo($values.logo)
        await organisation.init()
      }

      const config = {
        company: $values.company ?? "",
        platformUrl: $values.platformUrl ?? "",
        analyticsEnabled: $values.analyticsEnabled,
      }

      // Remove logo if required
      if (!$values.logo) {
        config.logoUrl = ""
      }

      // Update settings
      await organisation.save(config)
    } catch (error) {
      notifications.error("Error saving org config")
    }
    loading = false
  }
</script>

{#if $auth.isAdmin}
  <Layout noPadding>
    <Layout gap="XS" noPadding>
      <Heading size="M">组织</Heading>
      <Body>
        组织设置是您编辑组织名称和图标的地方。您还可以配置平台URL并启用或禁用分析。
      </Body>
    </Layout>
    <Divider size="S" />
    <Layout gap="XS" noPadding>
      <Heading size="S">信息</Heading>
      <Body size="S">此处可以修改您的图标和组织名。</Body>
    </Layout>
    <div class="fields">
      <div class="field">
        <Label size="L">组织名</Label>
        <Input thin bind:value={$values.company} />
      </div>
      <div class="field logo">
        <Label size="L">图标</Label>
        <div class="file">
          <Dropzone
            value={[$values.logo]}
            on:change={e => {
              if (!e.detail || e.detail.length === 0) {
                $values.logo = null
              } else {
                $values.logo = e.detail[0]
              }
            }}
          />
        </div>
      </div>
    </div>
    {#if !$admin.cloud}
      <Divider size="S" />
      <Layout gap="XS" noPadding>
        <Heading size="S">平台</Heading>
        <Body size="S">您可以在此处设置通用平台设置。</Body>
      </Layout>
      <div class="fields">
        <div class="field">
          <Label
            size="L"
            tooltip={"Update the Platform URL to match your Budibase web URL. This keeps email templates and authentication configs up to date."}
            >平台 URL</Label
          >
          <Input thin bind:value={$values.platformUrl} />
        </div>
      </div>
    {/if}
    {#if !$admin.cloud}
      <Divider size="S" />
      <Layout gap="XS" noPadding>
        <Heading size="S">智能分析</Heading>
        <Body size="S">选择是否开启智能分析。</Body>
      </Layout>
      <div class="fields">
        <div class="field">
          <Label size="L">智能分析</Label>
          <Toggle text="" bind:value={$values.analyticsEnabled} />
        </div>
      </div>
    {/if}
    <div>
      <Button disabled={loading} on:click={saveConfig} cta>保存</Button>
    </div>
  </Layout>
{/if}

<style>
  .fields {
    display: grid;
    grid-gap: var(--spacing-m);
  }
  .field {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-gap: var(--spacing-l);
    align-items: center;
  }
  .file {
    max-width: 30ch;
  }
  .logo {
    align-items: start;
  }
</style>
