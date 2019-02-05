<template>
        <div class="container">
            <form method="post" action="Model/login-logic.php">  
                <label><b>Username</b></label>


                <input type="text" placeholder="Enter Username" name="uname" required>



                <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="pwd" required>   

                <button class ="Loginbutton" type="submit" v-on:click="login">Login!</button>   
            </form>
        </div>	
</template>

<script>
        export default {
                name: 'LoginComponent',
                data() {
                        return{
                                loginURL: 'test.se'
                        }
                }
        }
</script>

<style>

</style>
