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
                    alt="forget form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <a href="https://www.applaudhr.com/">
                        <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/aztaseeudgqnwqeigr8q" alt="">
                        </a>
                      </div>
                      <p class="card-text py-2">
                        Enter your email address and we'll send you an email with instructions to reset your password.
                      </p>
                      <div class="form-outline mb-4">
                        <input type="email" id="form2Example17" class="form-control form-control-lg" v-model="forgetEmail.email" autocomplete="off" />
                        <label class="form-label" for="form2Example17">Email address</label>
                      </div>
                      <div class="pt-1 mb-4">
                        <button class="btn btn-dark btn-lg btn-block" type="button" @click.prevent="forgetPassword">Reset Password</button>
                      </div>
                      <div>
                        <a class="small text-muted" href="/">Login Page</a>

                      </div>
                      <div >
                        <p style="color:rgb(51, 211, 20);"> {{successMessage}}</p>
                      </div>                    
                      <div v-if="isReqEmail">
                        <p style="color:rgb(231, 109, 21);">Email is required</p>
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
</template>

<script>
export default{
      name:'forgetPassword',
      data()
      {
          return {
              forgetEmail:{
                email:''
              },
              successMessage:'',
              isReqEmail:false
          }
      },
      methods:{
        forgetPassword(){
            if(this.forgetEmail.email!=''){
              let body=this.forgetEmail;
            console.log(body);
            this.$http.post(`http://localhost:3000/api/users/forgetPassword`,body).then(res=>{
              console.log(res.body.user);
              this.successMessage=res.body.user.message;
              setTimeout(this.clearEmail(),5000)
            }).catch(err=>{
              console.log(err);              
              setTimeout(this.clearEmail(),5000)

            })
          }
          else {
            this.isReqEmail = true;
            setTimeout(this.clearReqEmail,1500);
          }
        },
        clearEmail(){
          this.forgetEmail.email = ''
        },
        clearReqEmail(){
          this.isReqEmail = false;
        }
         
      }
  }
</script>

<style>


</style>