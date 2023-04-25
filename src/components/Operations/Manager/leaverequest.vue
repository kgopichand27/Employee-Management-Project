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
      <div v-if="isDisplay">
        <form class="data">
            <h3>Leave Request</h3>
            <br>
            <label for="type"><b>Type of Leave:</b></label>
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
            <label for="start-date"><b>Start Date:</b></label>
            <br>
            <input v-model="absence.startDate" type="date" id="start-date" name="start-date">
            <br>
            <br>
            <label for="end-date"><b>End Date:</b></label>
            <br>
            <input v-model="absence.endDate" type="date" id="end-date" name="end-date">
            <br>
            <br>
            <label for="num-leaves"><b>Number of Leaves:</b></label>
            <br>
            <input v-model="absence.leaves" type="number" id="num-leaves" name="num-leaves">
            <br>
            <br>
            <br>
            <button class="btn btn-success" @click.prevent="submitForm">Submit</button>
          </form>
     </div>
      </div>
    </div>
  </template>
  
  <script>
  import navbar from '@/components/NavBar/Manager.vue';
  export default {
    name:'leaveRequestMng',
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
        managerId: ''
        },
        employee:{},
        isDisplay:false
      }
    },
    components:{
        navbar
    },
    methods: {
      submitForm() {
        const token = localStorage.getItem('token')
        this.absence.name = this.employee.name
        var date1 =new Date(this.startDate)
        var date2 = new Date(this.endDate)
        var total_seconds = Math.abs(date2 - date1) / 1000;
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
        console.log('DAYS',days_difference);
        this.$http.post(`http://localhost:3000/api/absences?access_token=${token}`, this.absence)
          .then(res => {
            console.log(res);
            alert('successfully requested leave')
            this.$router.push('/Manager')
          }, err => {
            console.log(err)
          })
      },
      loadEmployee() {
                const token = localStorage.getItem('token')
                const id = localStorage.getItem('id')
                this.$http.get(`http://localhost:3000/api/Users/${id}?access_token=${token}`)
                    .then(response => {
                        this.employee = response.body;
                    })

      },
      alterDisplay(){
        if(this.isDisplay == false)
        this.isDisplay = true
        else
        this.isDisplay = false
      }
    },
    mounted(){
        this.loadEmployee();
    }

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
    background-color: #62b14b;
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
</style>
  