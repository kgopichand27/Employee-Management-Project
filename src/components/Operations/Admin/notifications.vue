<template>
    <div>
        <Manager></Manager>
      <!-- <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Leave Type</th>
            <th>Number of Days</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(request,index) in leaveRequests" v-bind:key="request.id">
            <td>{{ request.name }}</td>
            <td>{{ request.typeof }}</td>
            <td>{{ request.leaves }}</td>
            <td>{{ request.status }}</td>
            <td v-if="request.status == 'accepted'">
                <button class="btn btn-success">accepted</button>
            </td>
            <td v-else-if="request.status == 'rejected'">
                <button class="btn btn-danger">rejected</button>
            </td>
            <td v-else>
              <button @click.prevent="acceptLeave(index)">Approve</button>
              <button @click.prevent="rejectLeave(index)">Reject</button>
            </td>
          </tr>
        </tbody>
      </table> -->
      <div class="data">
        <div v-for="(request,index) in leaveRequests" v-bind:key="request.id">
            <h3>{{request.name}}</h3>
            <p>Leave request from {{ request.name }} </p>
            <p> Total Days {{  request.leaves }} starting from {{ request.startDate }} to {{ request.endDate}}</p>
            <p>Reason :  {{ request.reason }}</p>
            <td v-if="request.status == 'accepted'">
                <button class="btn btn-success">accepted</button>
            </td>
            <td v-else-if="request.status == 'rejected'">
                <button class="btn btn-danger">rejected</button>
            </td>
            <td v-else>
              <button @click.prevent="acceptLeave(index)">Approve</button>
              <button @click.prevent="rejectLeave(index)">Reject</button>
            </td>
            <hr>
        </div>
      </div>
      
    </div>
  </template>
  
  <script>
import Manager from '@/components/NavBar/Admin.vue'
  export default {
    name:'leaveNotificationsee',
    components:{
        Manager
    },
    data() {
      return {
        leaveRequests: {},
        id:'',
      };
    },
    methods: {
        loadLeaveRequests() {
                const token = localStorage.getItem('token')
                this.$http.get(`http://localhost:3000/api/absences?filter[order]=id desc&access_token=${token}`)
                    .then(response => {
                        this.leaveRequests = response.body;
                    })

            },
        acceptLeave(index) {
            const token = localStorage.getItem('token')
            this.id = this.leaveRequests[index].id
            console.log('request Id',this.id)
            const idd = { userID: this.id}
            this.$http.post(`http://localhost:3000/api/absences/acceptRequest?access_token=${token}`, idd)
                .then(response => {
                    alert('leave request accepted')
                    // this.$router.push('./')
                    this.loadLeaveRequests()
                    console.log(response)
                })
        },
        rejectLeave(index) {
            const token = localStorage.getItem('token')
            this.id = this.leaveRequests[index].id
            console.log('request Id',this.id)
            const idd = { id: this.id}
            this.$http.post(`http://localhost:3000/api/absences/rejectRequest?access_token=${token}`, idd)
                .then(response => {
                    alert('leave request rejected')
                    // this.$router.push('./')
                    this.loadLeaveRequests()
                    console.log(response)
                })
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
  </style>
  