<script>
  import {
    notifications,
    Input,
    Button,
    Layout,
    Body,
    Heading,
    ActionButton,
  } from "@budibase/bbui"
  import { organisation, auth } from "stores/portal"
  import Logo from "assets/bb-emblem.svg"
  import { onMount } from "svelte"
  import { goto } from "@roxi/routify"

  let email = ""

  async function forgot() {
    try {
      await auth.forgotPassword(email)
      notifications.success("Email sent - please check your inbox")
    } catch (err) {
      notifications.error("Unable to send reset password link")
    }
  }

  onMount(async () => {
    try {
      await organisation.init()
    } catch (error) {
      notifications.error("Error getting org config")
    }
  })
</script>

<div class="login">
  <div class="main">
    <Layout>
      <Layout noPadding justifyItems="center">
        <img alt="logo" src={$organisation.logoUrl || Logo} />
      </Layout>
      <Layout gap="XS" noPadding>
        <Heading textAlign="center">重置密码</Heading>
        <Body size="S" textAlign="center">
          只要输入您帐户的电子邮件地址，我们会发送一个链接给您用于重置密码。
        </Body>
        <Input label="电子邮件" bind:value={email} />
      </Layout>
      <Layout gap="XS" nopadding>
        <Button cta on:click={forgot} disabled={!email}>
          重置密码
        </Button>
        <ActionButton quiet on:click={() => $goto("../")}>返回</ActionButton>
      </Layout>
    </Layout>
  </div>
</div>

<style>
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .main {
    width: 300px;
  }

  img {
    width: 48px;
  }
</style>
