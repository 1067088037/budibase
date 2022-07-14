<script>
  import {
    Body,
    Input,
    Label,
    ModalContent,
    notifications,
    Select,
    Toggle,
  } from "@budibase/bbui"
  import { createValidationStore, emailValidator } from "helpers/validation"
  import { users } from "stores/portal"
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()
  const password = Math.random().toString(36).substring(2, 22)
  const options = ["Email onboarding", "Basic onboarding"]
  const [email, error, touched] = createValidationStore("", emailValidator)
  let disabled
  let builder
  let admin
  let selected = "Email onboarding"

  $: basic = selected === "Basic onboarding"

  function addUser() {
    if (basic) {
      createUser()
    } else {
      createUserFlow()
    }
  }

  async function createUser() {
    try {
      await users.create({
        email: $email,
        password,
        builder,
        admin,
        forceResetPassword: true,
      })
      notifications.success("创建用户成功！")
      dispatch("created")
    } catch (error) {
      notifications.error("创建用户失败！")
    }
  }

  async function createUserFlow() {
    try {
      const res = await users.invite({ email: $email, builder, admin })
      notifications.success(res.message)
    } catch (error) {
      notifications.error("邀请用户失败！")
    }
  }

  function getChineseLabel(option) {
    switch (option) {
      case "Email onboarding": return "通过电子邮件添加新用户"
      case "Basic onboarding": return "通过基本流程添加新用户"
    }
  }
</script>

<ModalContent
  onConfirm={addUser}
  size="M"
  title="添加用户"
  confirmText="添加"
  confirmDisabled={disabled}
  cancelText="关闭"
  disabled={$error}
  showCloseIcon={false}
>
  <Body size="S">
  如果已配置SMTP并为新用户发送了电子邮件，则可以使用自动电子邮件登录流程。否则，请使用我们的基本入职流程自动生成密码。
  </Body>
  <Select
    placeholder={null}
    bind:value={selected}
    {options}
    label="通过以下方式添加用户:"
    getOptionLabel="{getChineseLabel}"
  />

  <Input
    type="email"
    label="邮箱"
    bind:value={$email}
    error={$touched && $error}
    placeholder="example@ceeda.cn"
  />

  {#if basic}
    <Input disabled label="Password" value={password} />
  {/if}

  <div>
    <div class="toggle">
      <Label size="L">开发访问权限</Label>
      <Toggle text="" bind:value={builder} />
    </div>
    <div class="toggle">
      <Label size="L">管理访问权限</Label>
      <Toggle text="" bind:value={admin} />
    </div>
  </div>
</ModalContent>

<style>
  .toggle {
    display: grid;
    grid-template-columns: 78% 1fr;
    align-items: center;
    width: 50%;
  }
</style>
