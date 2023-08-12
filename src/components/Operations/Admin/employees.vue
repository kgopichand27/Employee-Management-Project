<template>
    <div>
      <Admin></Admin>  
      <div class="data">
        
        <div class="employee-grid">
            <div v-for="(employee,index) in employees" :key="employee.name" class="employee-card">
            <h5>{{ employee.name }}</h5>
            <p style="color:mediumblue;">{{ employee.Designation }}</p>
            <button class="btn btn-info" @click="moreInfo(index)">moreInfo</button>
            </div>
        </div>
        <div>
            <router-link to="/Admin/Addemployee" class="btn btn-primary">AddEmployee</router-link>
        </div>
      </div>
    </div>
</template>

<script>
    import Admin from '@/components/NavBar/Admin.vue'
    import { checkToken } from '@/utils/utils';
    export default{
        name: 'AllEmployees',
        data(){
          return {
            employees:{},
            token:localStorage.getItem('token')
          }
        },
        components:{
            Admin
        },
        methods:{
          loadEmployees() {
                this.$http.get(`http://localhost:3000/api/Users?access_token=${this.token}`)
                    .then(response => {
                        this.employees = response.body;
                    })

            },
            moreInfo(index){
                const id = this.employees[index].id
                this.$router.push(`Employees/${id}`)

            }
        },
        mounted(){
          checkToken(this.token);
          this.loadEmployees();
        }
    }
</script>

<style scoped>
.employee-grid {

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 1rem;
  width: 800px;
  font-size: 12px;
  padding: 20px;
}

.employee-card {
  background-color: rgb(201, 217, 230);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
}

.data{
    padding: 20px;
    display: flex;
}
</style>