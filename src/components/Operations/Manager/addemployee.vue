<template>
    <div>
        <Manager></Manager>
        <div class="add-employee-form">
            <h2>Add Employee</h2>
            <form @submit.prevent="addEmployee">
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" v-model="employee.name" required>
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input" type="email" v-model="employee.email" required>
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input" type="password" v-model="employee.password" required>
                </div>
              </div>
              <div class="field">
                <label class="label">Gender</label>
                <div class="control">
                  <input class="input" type="text" v-model="employee.gender" required>
                </div>
              </div>
              <div class="field">
                <label class="label">DOB</label>
                <div class="control">
                  <input class="input" type="date" v-model="employee.dob" required>
                </div>
              </div>
              <div class="field">
                <label class="label">Role</label>
                <div class="control">
                  <select class="select" v-model="employee.Role" required>
                    <option disabled value="">Please select a role</option>
                    <option v-for="role in Roles" v-bind:key="role">{{ role }}</option>
                  </select>
                </div>
              </div>
              <div class="field"  v-if="this.employee.Role ==`Employee`">
                <label class="label">Managers</label>
                <div class="control">
                  <select v-model="employee.manager">
                    <option value="" disabled>Select an option</option>
                    <option v-for="option in managers" :key="option.id" :value="option.id">{{ option.name }}</option>
                  </select>
                </div>
              </div>
              <div class="field">
                <label class="label">Designation</label>
                <div class="control">
                  <input class="input" type="text" v-model="employee.Designation" required>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button class="btn btn-success" type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
    </div>
    
  </template>
  
  <script>
  import Manager from '@/components/NavBar/Manager.vue';
  export default{
      name: 'addEmployee',
      components:{
        Manager
      },
      data() {
        return {
          employee:{
            name: '',
            email:'',
            password: '',
            gender: '',
            dob: '',
            Role: '',
            Designation:'',
            manager: ''
          },
          Roles:['Manager','Employee'],
          managers:{},
          isdisplaymng:false,
          token:localStorage.getItem('token')
        }
      },
      methods:{
        addEmployee(){
          this.$http.post(`http://localhost:3000/api/Users?access_token=${this.token}`, this.employee)
          .then(res => {
            console.log(res);
            alert('success Registered')
            this.$router.push('/Manager/Employees')
          }, err => {
            console.log(err)
          })
  
        },
        loadManagers(){
                this.$http.get(`http://localhost:3000/api/Users/managers?access_token=${this.token}`)
                    .then(response => {
                        this.managers = response.body;
                    }).catch(err =>{
                      console.log(err);
                    })
        }
  
      },
      mounted(){
        this.loadManagers()
      }
    }
  </script>
  
  <style scoped>
  .add-employee-form {
    margin: 2rem auto;
    max-width: 600px;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
  }
  
  h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  
  .field {
    margin-bottom: 1.5rem;
  }
  
  .control {
    display: flex;
  }
  
  .label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .input,
  .select {
    flex: 1;
    margin-right: 1rem;
  }
  
  button {
    margin-top: 1.5rem;
  }
  </style>
  