<template>
  <div>
    <div class="login-wrap">
      <div class="login-title">
        <h2>Welcome!</h2>
      </div>
      <div class="login-content">
        <div class="login-username">
          <code class="text">username: </code>
          <el-input v-model="username" class="local-input"></el-input>
        </div>
        <div class="login-password">
          <code class="text">password: </code>
          <el-input type="password" v-model="password" class="local-input"></el-input>
        </div>
        <input type="checkbox" name="remember-me" value="true" checked="checked"/>remember me
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
  .login-content{
    text-align: left;
    margin: 0 6vw;
  }
  .login-username{
    display: flex;
    margin: 2px 0;
  }
  .login-password{
    display: flex;
    margin: 10px 0;
  }
  .text{
    margin-right: 8px;
    font-size: 20px;
    line-height: 42px;
    width: 8vw;
    min-width: 104px;
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
  input[name='remember-me']{
  }
</style>
