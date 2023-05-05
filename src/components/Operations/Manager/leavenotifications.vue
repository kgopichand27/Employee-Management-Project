<template>
    <div>
        <Manager></Manager>
      <div class="data">
        <div v-for="(request,index) in leaveRequests" v-bind:key="request.id">
            <h3>{{request.name}}</h3>
            <p>Leave request from {{ request.name }} </p>
            <p> Total Days {{  request.leaves }} starting from {{ formatDate(request.startDate) }} to {{ formatDate(request.endDate)}}</p>
            <p>Reason :  {{ request.reason }}</p>
            <td v-if="request.status == 'accepted'">
                <button class="btn btn-success">Approved</button>
            </td>
            <td v-else-if="request.status == 'rejected'">
                <button class="btn btn-danger">Rejected</button>
            </td>
            <td v-else>
              <button class="btn btn-primary" @click.prevent="acceptLeave(index)">Approve</button>
              <button class="btn btn-primary" @click.prevent="rejectLeave(index)">Reject</button>
            </td>
            <hr>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
import Manager from '@/components/NavBar/Manager.vue'
  export default {
    name:'leaveNotifications',
    components:{
        Manager
    },
    data() {
      return {
        leaveRequests: {},
        id:'',
        token:localStorage.getItem('token')
      };
    },
    methods: {
        loadLeaveRequests() {
                const id = localStorage.getItem('id')
                this.$http.get(`http://localhost:3000/api/absences/getAbsenceRequests?manager=${id}&access_token=${this.token}`)
                    .then(response => {
                        this.leaveRequests = response.body.absences;
                    })

            },
        acceptLeave(index) {
            this.id = this.leaveRequests[index].id
            // console.log('request Id',this.id)
            const idd = { userID: this.id}
            this.$http.post(`http://localhost:3000/api/absences/acceptRequest?access_token=${this.token}`, idd)
                .then(response => {
                    alert('leave request accepted')
                    // this.$router.push('./')
                    this.loadLeaveRequests();
                    console.log(response)
                })
        },
        rejectLeave(index) {
            this.id = this.leaveRequests[index].id
            // console.log('request Id',this.id)
            const idd = { id: this.id}
            this.$http.post(`http://localhost:3000/api/absences/rejectRequest?access_token=${this.token}`, idd)
                .then(response => {
                    alert('leave request rejected')
                    // this.$router.push('./')
                    this.loadLeaveRequests();
                    console.log(response)
                })
        },
            formatDate(dateString){
                const date = new Date(dateString);
                return date.toLocaleDateString();
            }
        
    },
    mounted(){
        this.loadLeaveRequests();
    }
  };
  </script>
  
  <style scoped>
  .data{
    align-items: center;
    padding-left: 100px;
    padding-top: 40px;
  }
  .btn-primary{
    margin-left: 5px;
  }
  </style>
  