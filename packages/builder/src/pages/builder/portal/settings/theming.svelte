<script>
  import { Layout, Heading, Body, Divider, Label, Select } from "@budibase/bbui"
  import { themeStore } from "builderStore"

  function getChineseLabel(option) {
    switch (option) {
      case "lightest": return "最亮"
      case "light": return "亮"
      case "dark": return "暗"
      case "darkest": return "最暗"
      case "nord": return "北极"
    }
  }
</script>

<Layout noPadding>
  <Layout gap="XS" noPadding>
    <Heading size="M">主题</Heading>
    <Body>设置主题。</Body>
  </Layout>
  <Divider size="S" />
  <div class="fields">
    <div class="field">
      <Label size="L">主题样式</Label>
      <Select
        options={$themeStore.options}
        bind:value={$themeStore.theme}
        placeholder={null}
        getOptionLabel={getChineseLabel}
      />
    </div>
  </div>
</Layout>

<style>
  .fields {
    display: grid;
    grid-gap: var(--spacing-m);
  }
  .field {
    display: grid;
    grid-template-columns: 120px 1fr;
    align-items: center;
  }
</style>
