<template>
  <div>
    <i class="el-icon-setting logout" @click="logout"></i>
    <div>
      这里是管理员页面
    </div>
  </div>
</template>

<script>
    import {getConfusedAlias, logout} from "../api/api";
    import cookie from 'js-cookie';

    export default {
        name: "Manage",
        mounted(){
            getConfusedAlias(1,2)
                .then(res=>{
                    if(res.status === '000'){
                        this.$alert('Identity expired, please login again','Tips', {
                            type: 'error',
                            confirmButtonText: 'confirm'
                        }).then(()=>{
                            cookie.remove('Authorization');
                            window.location.href = '/login';
                        })
                    }
                })
                .catch(()=>{
                    this.$alert('Identity expired, please login again','Tips', {
                        type: 'error',
                        confirmButtonText: 'confirm'
                    }).then(()=>{
                        cookie.remove('Authorization');
                        window.location.href = '/login';
                    })
                })
        },
        methods:{
            logout: function () {
                this.$confirm('确定要退出登录吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    logout().then(res=>{
                        if(res.status === '100'){
                            cookie.remove('Authorization');
                            window.location.href = '/login';
                        }
                    })
                }).catch(() => {
                    console.log('取消登出');
                });
            }
        }
    }
</script>

<style scoped>
  .logout{
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 20px;
  }
</style>
