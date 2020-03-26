<template>
  <div>
    <div class="login-wrap">
      <div class="login-title">
        <h2>Welcome!</h2>
      </div>
      <div class="login-content">
        <div class="login-username">
          <div class="text">username: </div>
          <el-input v-model="username" class="local-input"></el-input>
        </div>
        <div class="login-password">
          <div class="text">password: </div>
          <el-input type="password" v-model="password" class="local-input"></el-input>
        </div>
      </div>
      <el-button @click="login" class="login-confirm">Log In</el-button>
    </div>
  </div>
</template>

<script>
    import {login} from "../api/api";

    export default {
        name: "AdminLogin",
        data(){
            return{
                username:'',
                password:''
            }
        },
        methods:{
            login: function () {
                if(this.username!==''&&this.password!==''){
                    login(this.username, this.password).then(res=>{
                        alert("登录信息：" + res.success);
                    })
                }
            }
        }
    }
</script>

<style scoped>
  .login-wrap{
    margin: 50px auto;
    padding: 32px 0;
    width: 40vw;
    box-shadow: 6px 6px 20px 4px #e4e8ef;
  }
  .login-username{
    display: flex;
    margin: 2px 6vw;
  }
  .login-password{
    display: flex;
    margin: 10px 6vw;
  }
  .text{
    font-size: 20px;
    line-height: 42px;
    width: 8vw;
  }
  .local-input{
    border: 1px solid #e4e8ef;
    width: 20vw;
    border-radius: 4px;
  }
  .login-confirm{
    margin: 5px;
    padding: 10px 16px;
  }
</style>
