<template>
    <!-- Material form register -->
    <form>
      <p class="h4 text-center mb-4">Sign up</p>
      <div class="grey-text">
        <mdb-input label="Your name" icon="user" type="text"/>
        <mdb-input label="Your email" icon="envelope" type="email"/>
        <mdb-input label="Confirm your email" icon="exclamation-triangle" type="text"/>
        <mdb-input label="Your password" icon="lock" type="password"/>
      </div>
      <div class="text-center">
        <mdb-btn color="primary">Register</mdb-btn>
      </div>
    </form>
    <!-- Material form register -->
</template>

<script>
  import { mdbContainer, mdbBtn, mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter, mdbInput } from 'mdbvue';

  export default {
    name: 'RegisterComponent',
    components: {
      mdbContainer,
      mdbBtn,
      mdbModal,
      mdbModalHeader,
      mdbModalBody,
      mdbModalFooter,
      mdbInput
    },
    data() {
      return {
        register: false,
      }
    }
  }
</script>

<style>
  form{
        max-width: 900px;
        margin: 0 auto;
        margin-top: 100px;
    }
</style>
