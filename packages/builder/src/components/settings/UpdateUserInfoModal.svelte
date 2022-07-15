<script>
  import { ModalContent, Body, Input, notifications } from "@budibase/bbui"
  import { writable } from "svelte/store"
  import { auth } from "stores/portal"

  const values = writable({
    firstName: $auth.user.firstName,
    lastName: $auth.user.lastName,
  })

  const updateInfo = async () => {
    try {
      await auth.updateSelf($values)
      notifications.success("Information updated successfully")
    } catch (error) {
      notifications.error("Failed to update information")
    }
  }
</script>

<ModalContent
  title="更新用户信息"
  confirmText="更新信息"
  onConfirm={updateInfo}
>
  <Body size="S">
    通过添加你的姓名来个性化平台。
  </Body>
  <Input disabled bind:value={$auth.user.email} label="Email 邮箱" />

  <Input
      bind:value={$values.lastName}
      label="姓"
      dataCy="user-last-name"
    />

  <Input
    bind:value={$values.firstName}
    label="名"
    dataCy="user-first-name"
  />

</ModalContent>
