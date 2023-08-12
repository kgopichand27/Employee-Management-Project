<template>
    <div>
        <Admin></Admin>
        <div class="add-employee-form">
            <h2>{{ employee.name }} Details</h2>
            <form>
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" v-model="employee.name" required>
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input" type="text" v-model="employee.email" required readonly>
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
                  <input class="input" type="text" v-model="employee.Role" required readonly>
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
                  <button class="btn btn-success" type="submit" @click.prevent="EditEmployee">Edit Details</button>
                </div>
              </div>
            </form>
          </div>
    </div>
    
  </template>
  
  <script>
    import { checkToken } from '@/utils/utils'
    import Admin from '@/components/NavBar/Admin.vue'
    export default{
      name: 'editEmployee',
      components:{
        Admin
      },
      data() {
        return {
          employee:{
            name: '',
            email:'',
            gender: '',
            dob: '',
            Role:'',
            Designation:'',
          },
          isDisplay: false,
          token:localStorage.getItem('token'),
          id:localStorage.getItem('id')
        }
      },
      methods:{
        EditEmployee(){
                this.$http.put(`http://localhost:3000/api/Users/${this.id}?access_token=${this.token}`, this.employee)
                    .then(response => {
                        this.$router.push('/Admin')
                        alert('successfully updated')
                        console.log(response.body);
                    })
        },
        loadEmployee() {
                this.$http.get(`http://localhost:3000/api/Users/${this.id}?access_token=${this.token}`)
                    .then(response => {
                        this.employee = response.body;
                    })

            },
      },
      mounted(){
        checkToken(this.token)
        this.loadEmployee();
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
  .btn-primary{
    padding-right: 5px;
  }
  </style>
  