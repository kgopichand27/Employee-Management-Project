<template>
    <div>
        <app-nav></app-nav>
        <div class="container">
            <div class="block" id="block1">
                <h4>Office Updates</h4>
                <div v-for="update in updates" v-bind:key="update.id">
                    <br>
                    <b>{{ update.title }}</b>
                    <p>{{ update.description }}</p>
                </div>
            </div>
            <div class="block" id="block2">
                <h4>Upcoming Holidays</h4>
                <div v-for="holiday in holidays" v-bind:key="holiday.id">
                    <br>
                    <b>{{ holiday.description }}</b>
                    <p>{{ formatDate(holiday.date) }}</p>
                </div>
                <hr>
                <h4>Upcomming Leaves</h4>
                <div v-for="leave in leaves" v-bind:key="leave.id">
                    <br>
                    <b>{{ leave.typeof }}</b>
                    <p>{{ formatDate(leave.startDate) }} to {{ formatDate(leave.endDate) }} --> {{  leave.leaves }} Days</p>
                    <p style="color: green;" v-if="leave.status == 'accepted'">{{ leave.status }}</p>
                    <p style="color: red;" v-if="leave.status == 'rejected'">{{ leave.status }}</p>
                    <p style="color: yellow;" v-if="leave.status == 'pending'">{{ leave.status }}</p>


                </div>
            </div>
            <div class="block" id="block3">
                <h4> Your Upcoming Events</h4>
                <div v-for="meeting in meetings" v-bind:key="meeting.id">
                    <br>
                    <b>{{ meeting.description }}</b>
                    <p>{{ formatDate(meeting.date) }} at {{ formatTime(meeting.date) }} </p>
                    <p> Meet Link : <a href="">{{ meeting.link }}</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Nav from '@/components/NavBar/Employee.vue';
    export default{
        name:'HomePage',
        components: {
            "app-nav": Nav
        },
        data(){
            return{
                holidays:{},
                token: localStorage.getItem("token"),
                holiday:{
                    date:"",
                    description:""
                },
                isAddHoliday: false,
                updates:{},
                update:{
                    title:"",
                    description:""
                },
                isAddUpdate: false,
                meetings:{},
                meeting:{
                    description:"",
                    date:"",
                    link:""
                },
                isAddMeeting: false,
                leaves:{}
            }
        },
        methods:{
            load(){
                //loading holidays
                this.$http.get(`http://localhost:3000/api/holidays?filter[order]=id desc&access_token=${this.token}`)
                    .then((res)=>{
                        console.log(res.body);
                        this.holidays = res.body
                    })
                    .catch((err) =>{
                        console.log(err)
                    })

                //loading updates
                this.$http.get(`http://localhost:3000/api/updates?filter[order]=id desc&access_token=${this.token}`)
                    .then((res)=>{
                        console.log(res.body);
                        this.updates = res.body
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
                //loading meetings
                this.$http.get(`http://localhost:3000/api/meetings?filter[order]=id desc&access_token=${this.token}`)
                    .then((res)=>{
                        console.log(res.body);
                        this.meetings = res.body
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
                const id = localStorage.getItem('id')
                const token = localStorage.getItem('token')
                this.$http.get(`http://localhost:3000/api/absences/getEmployeeLeaveRequests?id=${id}&access_token=${token}`)
                    .then((res)=>{
                        console.log(res.body.absences);
                        this.leaves = res.body.absences
                    })
                    .catch((err) =>{
                        console.log(err)
                    })

            },
            formatDate(dateString){
                const date = new Date(dateString);
                return date.toLocaleDateString();
            },
            formatTime(dateString){
                const date = new Date(dateString);
                return date.toLocaleTimeString();
            },
        },
        beforeMount(){
            this.load()
        },
    } 
</script>

<style>

.container {
  display: flex;
  flex-direction: row;
}

.block {
  flex: 1;
  padding: 20px;
}

#block1 {
  background-color: #e6aaaa;
}

#block2 {
  background-color: #95c0e4;
}

#block3 {
  background-color: #a1e6c3;
}

</style>