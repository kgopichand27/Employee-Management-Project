<template>
    <div class="main">
      <h4>Welcome!</h4>
      <a href="https://www.applaudhr.com/">
        <img src="../assets/applaud.jpg" alt="">
      </a>
      <br>
      <form>
        <input
        type="text"
        name="username"
        id="username"
        placeholder="User Name"
        autocomplete="off"
        v-model="employee.email"
      />
      <br>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        v-model="employee.password"
        autocomplete="off"
        placeholder="Password"
      />
      <br />
      <br>
      <input
        type="button"
        value="Login!"
        class="button"
        @click.prevent="login"
        id="done"
      />
      <br>
      <br>
      <div v-if="ispasswordtrue">
        <p style="color:red;">Incorrect email or password,Please try again!</p>
       </div>
      </form>
      
      <br />
    </div>
  </template>
  
  <script>
  export default {
    name: 'loginPage',
        data()
        {
            return {
                employee: {
                    email: '',
                    password: '',
                },
                ispasswordtrue: false
            }
        },
        components:{
        },
        methods:{
            login(){
                console.log(this.employee);
                this.$http.post("http://localhost:3000/api/Users/login", this.employee)
                    .then(res => {
                      localStorage.setItem('token',res.body.id);
                      localStorage.setItem('id',res.body.userId);
                      //const token=res.body.id;
                      const userId=res.body.userId;
                      this.$http.get(`http://localhost:3000/api/Users/${userId}`,{id:userId}).then(res=>{
                        console.log(res.body);
                        localStorage.setItem('Username',res.body.Username);
                        
                        console.log("inside login");
                        if(res.body.Role=='Manager'){
                          localStorage.setItem('manager',res.body.name)
                          this.$router.push('/Manager');
                        }else if(res.body.Role=='Employee'){
                          this.$router.push('/Employee');
                        }else{
                          this.$router.push('/Admin');
                        }
  
  
                      }).catch(err=>{
                        console.log(err);
                      })
                    }).catch(error=>{
                      this.ispasswordtrue = true,
                      console.log(error);
                             this.$router.push('/');
                            setTimeout(this.clearPassword,1500)
                    })
            },
            clearPassword(){
              this.employee.email = '',
                this.employee.password = '',
                this.ispasswordtrue = false
            }
           
        }
  };
  </script>
  
  <style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
  .main {
    background: rgba(255, 255, 255, 0.4);
    position: absolute;
    top: 20%;
    left: 30%;
    width: 40%;
    text-align: center;
    padding: 2px;
    border-radius: 3rem;
    box-shadow: 0px 0px 8px -5px #000000;
    padding-top: 3%;
    padding-bottom: 5%;
    font-family: "Poppins", sans-serif;
  }
  h1 {
    cursor: default;
    user-select: none;
  }
  input {
    border-radius: 3rem;
    border: none;
    padding: 10px;
    text-align: center;
    outline: none;
    margin: 10px;
    width: 30%;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    font-size: 18px;
    font-weight: 400;
  }
  input:hover {
    box-shadow: 0px 0px 8px -5px #000000;
  }
  input:active {
    box-shadow: 0px 0px 8px -5px #000000;
  }
  #done {
    background: lightgreen;
  }
  .button {
    cursor: pointer;
    user-select: none;
  }
  img {
    height: 5.2rem;
    margin: 10px;
    user-select: none;
  }
  img:hover {
    box-shadow: 0px 0px 8px -5px #000000;
    cursor: pointer;
    border-radius: 200rem;
  }

  </style>