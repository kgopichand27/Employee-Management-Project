<template>
    <div>
    <navbar></navbar>
    <div class="leaves-box">
        <div class="sick-leave box">
          <div class="box-header">
            <h3>Available Sick Leaves</h3>
          </div>
          <div class="box-body">
            <p>{{ employee.sickLeaves }} days</p>
          </div>
        </div>
        <div class="vacation-leave box">
          <div class="box-header">
            <h3>Available Vacation Leaves</h3>
          </div>
          <div class="box-body">
            <p>{{ employee.vacationLeaves}} days</p>
          </div>
        </div>
      </div>  
      <br>
    <div class="leaveform">
        <button @click="alterDisplay" class="btn btn-primary">Request Leave</button>
        <button @click="alterRequestedLeaves" class="btn btn-primary">View All Requested Leaves</button>
        <br>
        <br>
      <div v-if="isDisplay">
        <form class="data" style="background-color: antiquewhite; width:68%; padding:20px">
            <h3>Leave Request</h3>
            <br>
            <label for="type"><b>Type of Leave</b></label>
            <br>
            <select v-model="absence.typeof" id="type" name="type">
              <option value="sick" v-if="employee.sickLeaves>0">Sick Leave</option>
              <option value="sick" v-else disabled>No available sick Leaves</option>
              <option value="vacation" v-if="employee.vacationLeaves>0">Vacation Leave</option>
              <option value="sick" v-else disabled>No available vacation Leaves</option>
            </select>
            <br>
            <br>
            <label for="reason"><b>Reason</b></label>
            <br>
            <input type="text" v-model="absence.reason">
            <br>
            <br>
            <label for="start-date"><b>Start Date</b></label>
            <br>
            <input v-model="absence.startDate" type="date" id="start-date" name="start-date">
            <br>
            <br>
            <label for="end-date"><b>End Date</b></label>
            <br>
            <input v-model="absence.endDate" type="date" id="end-date" name="end-date">
            <br>
            <br>
            <button class="btn btn-success" @click.prevent="submitForm">Submit</button>
          </form>
     </div>
     <div v-if="isDisplayRequestedLeaves">
      <table  style="background-color: antiquewhite; width:68%; padding:20px">
        <thead>
          <tr>
            <th>Index</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(leave,index) in reqestedleaves" v-bind:key="leave.id">
            <td> {{ index }}</td>
            <td> {{ formatDate(leave.startDate) }}</td>
            <td> {{ formatDate(leave.endDate) }}</td>
            <td> {{ leave.typeof }}</td>
            <td>{{ leave.status }}</td>
          </tr>
        </tbody>
      </table>
     </div>
    </div>
  </div>
  </template>
  
  <script>
  import moment from 'moment'
  import navbar from '@/components/NavBar/Employee.vue';
  export default {
    name:'leaveRequest',
    data() {
      return {
        absence :{
        name:'',
        startDate: '',
        endDate: '',
        typeof:'',
        reason:'',
        leaves: 0,
        userId: localStorage.getItem('id'),
        managerId: localStorage.getItem('manager'),
        },
        employee:{},
        isDisplay:false,
        reqestedleaves:{},
        isDisplayRequestedLeaves:false,
        token:localStorage.getItem('token')
      }
    },
    components:{
        navbar
    },
    methods: {
      submitForm() {
        this.absence.name = this.employee.name
        if (!this.absence.startDate || !this.absence.endDate) {
        this.absence.leaves = 0
        }
        const duration = moment.duration(moment(this.absence.endDate).diff(moment(this.absence.startDate)));
        this.absence.leaves =  duration.asDays();

        this.$http.post(`http://localhost:3000/api/absences?access_token=${this.token}`, this.absence)
          .then(res => {
            console.log(res);
            alert('successfully requested leave')
            this.$router.push('/Employee')
          }, err => {
            console.log(err)
          })
      },
      loadEmployee() {
                const id = localStorage.getItem('id')
                this.$http.get(`http://localhost:3000/api/Users/${id}?access_token=${this.token}`)
                    .then(response => {
                        this.employee = response.body;
                    })

      },
      loadLeaves(){
        const id = localStorage.getItem('id')
                this.$http.get(`http://localhost:3000/api/absences/getEmployeeLeaveRequests?id=${id}&access_token=${this.token}`)
                    .then((res)=>{
                        this.reqestedleaves = res.body.absences
                 
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
      },
      alterDisplay(){
        if(this.isDisplay == false){
        this.isDisplay = true
        this.isDisplayRequestedLeaves = false}
        else
        this.isDisplay = false
      },
      alterRequestedLeaves(){
        if(this.isDisplayRequestedLeaves == false){
        this.isDisplayRequestedLeaves = true
        this.isDisplay = false
      } else {
        this.isDisplayRequestedLeaves = false
      }
      },
      formatDate(dateString){
                const date = new Date(dateString);
                return date.toLocaleDateString();
      },
    },
    mounted(){
        this.loadEmployee();
        this.loadLeaves();
    },

  }
  </script>

<style scoped>
.data{
    padding: 40px;
}

.leaves-box {
    padding-left: 100px;
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin-top: 20px;
  }
  .leaveform{
    padding-left: 100px;
  }
  .box {
    background-color: rgb(201, 217, 230);
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
  }
  .box-header {
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
  }
  .box-header h3 {
    margin: 0;
  }
  .box-body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  .sick-leave {
    flex-basis: 45%;
  }
  .vacation-leave {
    flex-basis: 45%;
  }
  .btn{
    margin-left: 10px;
  }
  th, td {
    padding: 15px;
  }
</style>
  