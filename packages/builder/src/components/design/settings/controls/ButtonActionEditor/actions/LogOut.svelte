<script>
  import { Label, Body, Layout } from "@budibase/bbui"
  import DrawerBindableInput from "components/common/bindings/DrawerBindableInput.svelte"

  export let parameters
  export let bindings = []
</script>

<div class="root">
  <Layout noPadding gap="M">
    <Body size="S">
      请输入您想在注销后重定向到的URL
      如果不输入，将被重定向到登录页面
    </Body>
    <div class="content">
      <Label small>Redirect URL</Label>
      <DrawerBindableInput
        title="Return URL"
        value={parameters.redirectUrl}
        on:change={value => (parameters.redirectUrl = value.detail)}
        {bindings}
      />
    </div>
  </Layout>
</div>

<style>
  .root {
    max-width: 400px;
    margin: 0 auto;
  }
  .content {
    display: grid;
    align-items: center;
    gap: var(--spacing-m);
    grid-template-columns: auto 1fr;
  }
</style>
