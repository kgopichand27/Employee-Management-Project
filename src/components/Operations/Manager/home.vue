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
                <hr>
                <h4>Upcoming Holidays</h4>
                <div v-for="holiday in holidays" v-bind:key="holiday.id">
                    <br>
                    <b>{{ holiday.description }}</b>
                    <p>{{ formatDate(holiday.date) }}</p>
                </div>
            </div>
            <div class="block" id="block2">
                <h4> Your Upcoming Meetings</h4>
                <div v-for="meeting in meetings" v-bind:key="meeting.id">
                    <br>
                    <b>{{ meeting.description }}</b>
                    <p>{{ formatDate(meeting.date) }} at {{ formatTime(meeting.date) }} </p>
                    <p> Meet Link : <a :href="meeting.link">Join Meeting</a></p>
                </div>
            </div>
            </div><div class="container">
            <div class="block" id="block3">
                <h4>Your Leaves</h4>
                <div v-for="leave in leaves" v-bind:key="leave.id">
                    <br>
                    <b>{{ leave.typeof }}</b>
                    <p>{{ formatDate(leave.startDate) }} to {{ formatDate(leave.endDate) }} → {{  leave.leaves }} Days</p>
                    <p style="color: green;" v-if="leave.status == 'accepted'">{{ leave.status }}</p>
                    <p style="color: red;" v-if="leave.status == 'rejected'">{{ leave.status }}</p>
                    <p style="color: orange;" v-if="leave.status == 'pending'">{{ leave.status }}</p>
                </div>
                <hr>
                <h4> Your Upcoming Events</h4>
                <button @click="AddEvents" class="btn button">Add</button>
                <form v-if="isAddEvent" autocomplete="off">
                    <div class="form-group">
                        <label >Date</label>
                        <input type="date" class="form-control"  placeholder="Enter Event date" v-model="event.date">
                    </div>
                    <div class="form-group">
                        <label>Time</label>
                        <input type="time" class="form-control"  placeholder="Enter Event time" v-model="event.time">
                    </div>
                    <div class="form-group">
                        <label >Description</label>
                        <input type="text" class="form-control"  placeholder="Enter Event description" v-model="event.description">
                    </div>
                    <button type="button" class="btn btn-primary" @click.prevent="SubmitEvent">Submit</button>
                </form>
                <br><br>
                <div v-for="event in events" v-bind:key="event.id" class="container">
                    <br>
                    <div class="box">
                        <b>{{ event.description }}</b>
                        <p>{{ formatDate(event.date) }} at {{ event.time }}</p>
                    </div>
                    <div>
                        <button class="btn" @click="deleteEvents(event.id)"><i class="fa fa-trash-o" style="font-size:20px;"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Nav from '@/components/NavBar/Manager.vue';
    import { checkToken } from '@/utils/utils';
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
                leaves:{},
                events:{},
                event:{
                    description:"",
                    date:"",
                    time:"",
                    userId: localStorage.getItem("id")
                },
                isAddEvent: false,
            }
        },
        methods:{
            load(){
                //loading holidays
                this.$http.get(`http://localhost:3000/api/holidays?filter[order]=id desc&access_token=${this.token}`)
                    .then((res)=>{
                        // console.log(res.body);
                        this.holidays = res.body
                    })
                    .catch((err) =>{
                        console.log(err)
                    })

                //loading updates
                this.$http.get(`http://localhost:3000/api/updates?filter[order]=id desc&access_token=${this.token}`)
                    .then((res)=>{
                        // console.log(res.body);
                        this.updates = res.body
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
                //loading meetings
                this.$http.get(`http://localhost:3000/api/meetings?filter[order]=id desc&access_token=${this.token}`)
                    .then((res)=>{
                        // console.log(res.body);
                        this.meetings = res.body
                    })
                    .catch((err) =>{
                        console.log(err)
                    })

                //loading leaves
                const id = localStorage.getItem('id')
                this.$http.get(`http://localhost:3000/api/absences/requested-leaves?userId=${id}&access_token=${this.token}`)
                    .then((res)=>{
                        // console.log(res.body.absences);
                        this.leaves = res.body.absences
                        // console.log("Leaves", this.leaves);
                        // console.log("id", id)
                    })
                    .catch((err) =>{
                        console.log(err)
                    })

                //loading events
                this.$http.get(`http://localhost:3000/api/events?filter=%7B%22where%22%3A%7B%22userId%22%3A%22${this.event.userId}%22%7D%7D&access_token=${this.token}`)
                    .then((res) =>{
                        this.events = res.body;
                        // console.log("Events:", this.events);
                        // console.log("UserId", this.event.userId);
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
            SubmitEvent(){
                this.$http.post("http://localhost:3000/api/events?access_token="+this.token, this.event)
                    .then((res) => {
                        // console.log(this.event);
                        console.log(res);
                        // this.clearEvents();
                        this.AddEvents();
                        this.load();
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            AddEvents(){
                this.isAddEvent = !this.isAddEvent;
            },
            deleteEvents(ID){
                // console.log("ID", ID)
                this.$http.delete(`http://localhost:3000/api/events/${ID}?access_token=${this.token}`)
                    .then((res)=>{
                        console.log(res);
                        this.load();
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
        },
        beforeMount(){
            this.load()
        },
        mounted(){
            checkToken(this.token);
        }
    } 
</script>

<style scoped>

.container {
  display: flex;
}

.block {
  flex: 1;
  margin: 20px;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgb(201, 217, 230);
}

.box{
    flex: 1;
}

.button{
    background-color: rgb(149, 177, 202);
    width: 10%;
}

/* #block1 {
  background-color: rgb(240, 236, 236);
}

#block2 {
  background-color: #d3e1ed;
}

#block3 {
  background-color: #d1e8dc;
} */

.btn-primary{
    margin: 8px;
    size: 10px;
}
</style>