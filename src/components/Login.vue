<template>
  <div>
    <section class="vh-100" style="background-color: #9A616D;">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card" style="border-radius: 1rem;">
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
    
                    <form>
    
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <a href="https://www.applaudhr.com/">
                        <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/aztaseeudgqnwqeigr8q" alt="">
                        </a>
                      </div>
    
                      <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>
    
                      <div class="form-outline mb-4">
                        <input type="email" id="form2Example17" class="form-control form-control-lg" v-model="employee.email" autocomplete="off" required />
                        <label class="form-label" for="form2Example17">Email address</label>
                      </div>
    
                      <div class="form-outline mb-4">
                        <input type="password" id="form2Example27" class="form-control form-control-lg" v-model="employee.password" autocomplete="off" required/>
                        <label class="form-label" for="form2Example27">Password</label>
                      </div>
    
                      <div class="pt-1 mb-4">
                        <button class="btn btn-dark btn-lg btn-block" type="button" @click.prevent="login">Login</button>
                      </div>
    
                      <a class="small text-muted" href="/forgetPassword">Forgot password?</a>
                      <br>
                      <br>
                      <div v-if="ispasswordtrue">
                        <p style="color:red;">Incorrect Password,Please try again!</p>
                      </div>
                      <div v-if="isRequriedCred">
                        <p style="color:red;">All Fields are Required</p>
                      </div>
                    </form>    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
    <!-- <div class="main">
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
      <div>
        <router-link to="/forgetPassword">Forget Password</router-link>
      </div>
      <br>
      <div v-if="ispasswordtrue">
        <p style="color:red;">Incorrect email or password,Please try again!</p>
       </div>
      </form>
      
      <br />
    </div> -->
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
                ispasswordtrue: false,
                isRequriedCred : false,
            }
        },
        components:{
        },
        methods:{
            login(){
              if(this.employee.email!='' && this.employee.password!=''){
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
                } 
                else {
                  this.isRequriedCred = true;
                  console.log('Email and password are required');
                  setTimeout(this.clearReqCred,1500);
                }
            },
            clearPassword(){
                this.employee.password = '',
                this.ispasswordtrue = false
            },
            clearReqCred(){
              this.isRequriedCred = false;
            }
           
        }
  };
  </script>
  
  <style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
  .main {
    background: rgba(255, 255, 255, 0.4);
    position: absolute;
    top: 10%;
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
    width: 50%;
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
    width: 30%;
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