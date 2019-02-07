<template>
    <!-- Material form login -->
    <form>
    <p class="h4 text-center mb-4">Sign in</p>
    <div class="grey-text">
        <mdb-input label="Your email" icon="envelope" type="email"/>
        <mdb-input label="Your password" icon="lock" type="password"/>
    </div>
    <div class="text-center">
        <mdb-btn>Login</mdb-btn>
        <mdb-btn v-on:click="login('bla@mail.com', 'easypassword')">Login</mdb-btn>
        <mdb-btn v-on:click="logout()">Logout</mdb-btn>
        <mdb-btn v-on:click="register('bob','bla@mail.com','easypassword')">register</mdb-btn>
        <span>Message: {{ msgFromServer }}</span>
    </div>
    </form>
    <!-- Material form login -->    
</template>

<script>
  import AuthServices from '../AuthServices'
  import { mdbContainer, mdbBtn, mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter, mdbInput } from 'mdbvue';

    export default {
    name: 'LoginComponent',
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
            login: false,
            error: '',
            text: '',
            msgFromServer: 'test'
        }
    },
    methods: {
        async login(email, password){
            this.msgFromServer = await AuthServices.login(email, password);
        },
        async logout(){
            this.msgFromServer = await AuthServices.logout(); 
        },
        async register(name, email, password){
            this.msgFromServer = await AuthServices.register(name, email, password);
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