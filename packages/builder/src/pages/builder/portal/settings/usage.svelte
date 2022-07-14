<script>
  import {
    Body,
    Divider,
    Heading,
    Layout,
    notifications,
    Link,
  } from "@budibase/bbui"
  import { onMount } from "svelte"
  import { admin, auth, licensing } from "stores/portal"
  import Usage from "components/usage/Usage.svelte"

  let staticUsage = []
  let monthlyUsage = []
  let loaded = false

  $: quotaUsage = $licensing.quotaUsage
  $: license = $auth.user?.license

  const upgradeUrl = `${$admin.accountPortalUrl}/portal/upgrade`

  const setMonthlyUsage = () => {
    monthlyUsage = []
    if (quotaUsage.monthly) {
      for (let [key, value] of Object.entries(license.quotas.usage.monthly)) {
        const used = quotaUsage.monthly.current[key]
        if (used !== undefined) {
          monthlyUsage.push({
            name: value.name,
            used: used,
            total: value.value,
          })
        }
      }
    }
  }

  const setStaticUsage = () => {
    staticUsage = []
    for (let [key, value] of Object.entries(license.quotas.usage.static)) {
      const used = quotaUsage.usageQuota[key]
      if (used !== undefined) {
        staticUsage.push({
          name: value.name,
          used: used,
          total: value.value,
        })
      }
    }
  }

  const capitalise = string => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }

  const init = async () => {
    try {
      await licensing.getQuotaUsage()
    } catch (e) {
      console.error(e)
      notifications.error(e)
    }
  }

  onMount(async () => {
    await init()
    loaded = true
  })

  $: {
    if (license && quotaUsage) {
      setMonthlyUsage()
      setStaticUsage()
    }
  }
</script>

{#if loaded}
  <Layout>
    <Heading>使用情况</Heading>
    <Body
      >获取关于您在系统中的使用情况信息。
    {#if $admin.cloud}
        {#if $auth.user?.accountPortalAccess}
          To upgrade your plan and usage limits visit your <Link
            size="L"
            href={upgradeUrl}>Account</Link
          >.
        {:else}
          Contact your account holder to upgrade your usage limits.
        {/if}
      {/if}
    </Body>
  </Layout>
  <Layout gap="S">
    <Divider size="S" />
  </Layout>
  <Layout gap="S" noPadding>
    <Layout gap="XS">
      <Body size="S">你的计划</Body>
      <Heading size="S">{capitalise(license?.plan.type)}</Heading>
    </Layout>
    <Layout gap="S">
      <Body size="S">使用量</Body>
      <div class="usages">
        {#each staticUsage as usage}
          <div class="usage">
            <Usage {usage} />
          </div>
        {/each}
      </div>
    </Layout>
    {#if monthlyUsage.length}
      <Layout gap="S">
        <Body size="S">每月</Body>
        <div class="usages">
          {#each monthlyUsage as usage}
            <div class="usage">
              <Usage {usage} />
            </div>
          {/each}
        </div>
      </Layout>
      <div></div>
    {/if}
  </Layout>
{/if}

<style>
  .usages {
    display: grid;
    column-gap: 60px;
    row-gap: 50px;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
