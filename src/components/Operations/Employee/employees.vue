<template>
    <div>
      <Employee></Employee>  
      <div class="data">
        
        <div class="employee-grid">
            <div v-for="(employee) in employees" :key="employee.name" class="employee-card">
            <h5>{{ employee.name }}</h5>
            <p style="color:mediumblue;"> {{ employee.Designation }}</p>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
    import Employee from '@/components/NavBar/Employee.vue'
    export default{
        name: 'AllEmployees',
        data(){
          return {
            employees:{}
          }
        },
        components:{
            Employee
        },
        methods:{
          loadEmployees() {
                const token = localStorage.getItem('token')
                this.$http.get(`http://localhost:3000/api/Users?access_token=${token}`)
                    .then(response => {
                        this.employees = response.body;
                    })

            }
        },
        mounted(){
          this.loadEmployees();
        }
    }
</script>

<style scoped>
.employee-grid {

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 1rem;
  width: 700px;
  font-size: 12px;
  padding: 20px;
}

.employee-card {
  background-color:rgb(201, 217, 230);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
}

.data{
    padding: 20px;
    display: flex;
}
</style>