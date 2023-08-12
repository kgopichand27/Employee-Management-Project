<template>
    <div>
        <Admin></Admin>
        <form autocomplete="off">
            <div class="form-group">
                <strong><h3>Change Password </h3></strong>
                <br>
                <label for="exampleInputPassword1">Enter Old Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Old Password" v-model="myUser.currentPassword">
            </div>
            <br>
            <div class="form-group">
                <label for="exampleInputPassword2">Enter New Password</label>
                <input type="password" class="form-control" id="exampleInputPassword2" placeholder="New Password" v-model="myUser.newPassword">
            </div>
            <br>
            <button type="submit" class="btn btn-primary" @click.prevent="changePassword">Update Password</button>
        </form>
    </div>

    
</template>

<script>
  import Admin from '@/components/NavBar/Admin.vue';
  import { checkToken } from '@/utils/utils';
    export default{
        name:'changePasswordAdmin',
        data(){
            return{
                token: localStorage.getItem("token"),
                myUser: {
                    id:localStorage.getItem("id"),
                    currentPassword: "",
                    newPassword:""
                },
            }
        },
        components:{
            Admin
        },
        methods:{
            changePassword(){
                
                this.$http.patch("http://localhost:3000/api/Users/change-password?access_token="+this.token, this.myUser)
                    .then((res)=>{
                        console.log(res);
                        this.$router.push("/");
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            }
        },
        mounted(){
            checkToken(this.token);
        }
    }
</script>

<style scoped>
    form{
        padding-top: 50px;
        text-align: center;
        width: 300px;
        margin: auto;
    }
</style>