<template>
    <div>
        <Manager></Manager>
        <div class="add-employee-form">
            <h2>{{ employee.name }} Details</h2>
            <form>
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" v-model="employee.name" required readonly>
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input" type="email" v-model="employee.email" required readonly>
                </div>
              </div>
              <div class="field">
                <label class="label">Gender</label>
                <div class="control">
                  <input class="input" type="text" v-model="employee.gender" required readonly>
                </div>
              </div>
              <div class="field">
                <label class="label">DOB</label>
                <div class="control">
                  <input class="input" type="text" v-model="employee.dob" required readonly>
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
                  <button class="btn btn-success" type="submit" @click.prevent="EditEmployee">Edit Employee</button>
                  <button class="btn btn-danger" type="submit" @click.prevent="DeleteEmployee">Delete Employee</button>
                </div>
              </div>
            </form>
          </div>
    </div>
    
  </template>
  
  <script>
    import Manager from '@/components/NavBar/Manager.vue'
    export default{
      name: 'editEmployee',
      components:{
        Manager
      },
      data() {
        return {
          employee:{
            name: '',
            email:'',
            gender: '',
            dob: '',
            Role: '',
            Designation:'',
            manager: ''
          },
          Roles:['Manager','Employee'],
          managers:{},
          isDisplay: false,
          token:localStorage.getItem('token'),
          id: this.$route.params.id
        }
      },
      methods:{
        EditEmployee(){
                this.$http.put(`http://localhost:3000/api/Users/${this.id}?access_token=${this.token}`, this.employee)
                    .then(response => {
                        this.$router.push('/Manager/Employees')
                        console.log(response.body);
                    })
        },
        loadEmployee() {
                this.$http.get(`http://localhost:3000/api/Users/${this.id}?access_token=${this.token}`)
                    .then(response => {
                        this.employee = response.body;
                    })

            },
        loadManagers(){
                this.$http.get(`http://localhost:3000/api/Users/managers?access_token=${this.token}`)
                    .then(response => {
                        this.managers = response.body;
                    }).catch(err =>{
                      console.log(err);
                    })
        },
        DeleteEmployee(){
                const id = this.id
                const idd = {id}
                this.$http.post(`http://localhost:3000/api/Users/DeleteUser?access_token=${this.token}`, idd)
                    .then(response => {
                        console.log(response.body);
                        this.$http.delete(`http://localhost:3000/api/absences/deleteall?userId=${this.id}&access_token=${this.token}`)
                          .then(response => {
                            console.log('all absences deleted',response)
                          })
                        this.$router.push('../Employees')
                    })
            }
  
      },
      mounted(){
        this.loadEmployee();
        this.loadManagers();
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

  .btn{
    margin-left: 10px;
  }
  </style>
  