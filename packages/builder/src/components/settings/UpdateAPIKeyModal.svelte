<script>
  import { ModalContent, Body, notifications } from "@budibase/bbui"
  import { auth } from "stores/portal"
  import { onMount } from "svelte"
  import CopyInput from "components/common/inputs/CopyInput.svelte"

  let apiKey = null

  async function generateAPIKey() {
    try {
      apiKey = await auth.generateAPIKey()
      notifications.success("New API key generated")
    } catch (err) {
      notifications.error("Unable to generate new API key")
    }
    // need to return false to keep modal open
    return false
  }

  onMount(async () => {
    try {
      apiKey = await auth.fetchAPIKey()
    } catch (err) {
      notifications.error("Unable to fetch API key")
    }
  })
</script>

<ModalContent
  title="开发者信息"
  showConfirmButton={false}
  showSecondaryButton={true}
  secondaryButtonText="重新生成密钥"
  secondaryAction={generateAPIKey}
>
  <Body size="S">
    您可以在这里找到关于您的开发人员帐户的信息，例如用于访问Budibase API的API密钥。
  </Body>
  <CopyInput bind:value={apiKey} label="API key" />
</ModalContent>
