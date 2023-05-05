<template>
    <div>
      <Manager></Manager>  
      <div class="data">
        
        <div class="employee-grid">
            <div v-for="(employee,index) in employees" :key="employee.name" class="employee-card">
            <h5>{{ employee.name }}</h5>
            <p style="color:mediumblue;">{{ employee.Designation }}</p>
            <button class="btn btn-info" @click="moreInfo(index)">moreInfo</button>
            </div>
        </div>
        <div>
            <router-link to="/Manager/AddEmployee" class="btn btn-primary">AddEmployee</router-link>
        </div>
      </div>
    </div>
</template>

<script>
    import Manager from '@/components/NavBar/Manager.vue'
    export default{
        name: 'AllEmployees',
        data(){
          return {
            employees:{}
          }
        },
        components:{
            Manager
        },
        methods:{
            loadEmployees() {
                const token = localStorage.getItem('token')
                const manager =  localStorage.getItem('id')
                this.$http.get(`http://localhost:3000/api/Users/getEmployees?manager=${manager}&access_token=${token}`)
                    .then(response => {
                        this.employees = response.body.employees;
                        // console.log("data",response.body.employees);
                        // console.log(typeof(this.employees))
                    })

            },
            moreInfo(index){
                const id = this.employees[index].id
                this.$router.push(`Employees/${id}`)

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
  background-color: aliceblue;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
}

.data{
    padding: 20px;
    display: flex;
}
</style>