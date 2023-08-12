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
        
                          <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Password</h5>
        
                          <div class="form-outline mb-4">
                            <input type="password" id="form2Example17" class="form-control form-control-lg" v-model="body.password" autocomplete="off" />
                            <label class="form-label" for="form2Example17">New Password</label>
                          </div>
        
                          <div class="form-outline mb-4">
                            <input type="password" id="form2Example27" class="form-control form-control-lg" v-model="password1" autocomplete="off" />
                            <label class="form-label" for="form2Example27">Confirm Password</label>
                          </div>
        
                          <div class="pt-1 mb-4">
                            <button class="btn btn-dark btn-lg btn-block" type="button" @click.prevent="updatePassword">Update Password</button>
                          </div>
                            <div v-if="status">
                            <p style="color:red;">Password's Doesn't match</p>
                          </div>
                          <div v-else-if="status1">
                          <p style="color: green;">Successfully Updated</p>
                          </div>
                          <a class="small text-muted" href="/">Login Page</a>
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
        <div class="card text-center" style="width: 400px; margin: auto;border: 3px solid green;padding: 10px;">
            <div class="card-header h5 text-white bg-primary">Password Reset</div>
                <div class="card-body px-5">
                    <p class="card-text py-2">
                        Enter your new password and we'll update your password.
                    </p>
                    <div class="form-outline">
                        <input type="password" id="typeEmail" class="form-control my-3" v-model="body.password" />
                        <label class="form-label" for="password" >New Password</label>
                    </div> 
                    <div class="form-outline">
                        <input type="text" id="typeEmail" class="form-control my-3" v-model="password1" />
                        <label class="form-label" for="text" >Confirm Password</label>
                    </div> 
                    <button type="submit" @click.prevent="updatePassword" class="btn btn-primary" >Update Password</button>
                    <br>
                </div>
                <div>
                    <div v-if="status">
                    <p style="color:red;">Password Doesn't match</p>
                </div>
                <div v-else-if="status1">
                <p style="color: green;">Successfully Updated</p>
                </div>
                <div v-else>
        
                </div>
                <router-link to="/"><button type="submit"  class="btn btn-link" > ⬅ Login page</button></router-link>
                </div>
            </div>
    </div>    -->
    
</template>

<script>
    export default{
        name:'resetPassword',
          data()
          {
              return {
                  body:{
                    password:'',
                    id:this.$route.query.id
                  },
                  password1:'',
                  status:false,
                  status1:false
                  
              }
          },
          methods:{
            updatePassword(){
                if(this.body.password===this.password1){
                    this.status=false;
                    let body1=this.body;
                    //console.log(body1);
                   // console.log(this.body.id);
                    this.$http.post('http://localhost:3000/api/users/resetPassword',body1,function(err,data){
                        if(err){
                            console.log(err);
                        }else{
                        console.log(data);
                        }
                    });
                    this.status1=true;
                    this.setTimeout(this.clearPassword(),5000);

                }else{
                    console.log("inside else");
                    this.status=true;
                    setTimeout(this.clearPassword(),5000)
                }
                
            },
            clearPassword(){
              this.body.password = '';
              this.password1 = '';
            }
             
          }
      }
</script>
    
<style>
    
    
</style>