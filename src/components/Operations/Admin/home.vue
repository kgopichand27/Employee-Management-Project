<template>
    <div>
        <app-nav></app-nav>
        <div class="container">
            <div class="block" id="block1">
                <h4>Office Updates</h4>
                <button @click="AddUpdates" class="btn button">Add</button>
                <form v-if="isAddUpdate" autocomplete="off">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control"  placeholder="Enter Update title" v-model="update.title">
                    </div>
                    <div class="form-group">
                        <label >Description</label>
                        <textarea class="form-control"  placeholder="Enter update description" v-model="update.description"></textarea>
                    </div>
                    <button type="button" class="btn btn-primary" @click.prevent="submitUpdate">Submit</button>
                </form>
                <br><br>
                <div v-for="update in updates" v-bind:key="update.id" class="container">
                    <br>
                    <div class="box">
                        <b>{{ update.title }}</b>
                        <p>{{ update.description }}</p>
                    </div>
                    <div>
                        <button class="btn" @click="deleteUpdates(update.id)"><i class="fa fa-trash-o" style="font-size:20px;"></i></button>
                    </div>
                </div>
                <hr>
                <h4>Upcoming Holidays</h4>
                <button @click="AddHolidays" class="btn button">Add</button>
                <form v-if="isAddHoliday" autocomplete="off">
                    <div class="form-group">
                        <label >Date</label>
                        <input type="date" class="form-control"  placeholder="Enter Holiday date" v-model="holiday.date">
                    </div>
                    <div class="form-group">
                        <label >Holiday</label>
                        <input type="text" class="form-control"  placeholder="Enter holiday description" v-model="holiday.description">
                    </div>
                    <button type="button" class="btn btn-primary" @click.prevent="submitHoliday">Submit</button>
                </form>
                <br><br>
                <div v-for="holiday in holidays" v-bind:key="holiday.id" class="container">
                    <br>
                    <div class="box">
                        <b>{{ formatDate(holiday.date) }}</b>
                        <p>{{ holiday.description }}</p>
                    </div>
                    <div>
                        <button class="btn" @click="deleteHolidays(holiday.id)"><i class="fa fa-trash-o" style="font-size:20px;"></i></button>
                    </div>
                </div>
            </div>
            <div class="block" id="block2">
                <h4>Office Meetings</h4>
                <button @click="AddMeetings" class="btn button">Add</button>
                <form v-if="isAddMeeting" autocomplete="off">
                    <div class="form-group">
                        <label >Date</label>
                        <input type="date" class="form-control"  placeholder="Enter meeting date" v-model="meeting.date">
                    </div>
                    <div class="form-group">
                        <label >Link</label>
                        <input type="text" class="form-control"  placeholder="Enter meeting link" v-model="meeting.link">
                    </div>
                    <div class="form-group">
                        <label>Time</label>
                        <input type="time" class="form-control"  placeholder="Enter Event time" v-model="meeting.time">
                    </div>
                    <div class="form-group">
                        <label >Description</label>
                        <input type="text" class="form-control"  placeholder="Enter meeting description" v-model="meeting.description">
                    </div>
                    <button type="button" class="btn btn-primary" @click.prevent="submitMeeting">submit</button>
                </form>
                <br><br>
                <!--Displaying Meetings-->
                <div v-for="meeting in meetings" v-bind:key="meeting.id" class="container">
                    <br>
                    <div class="box">
                        <b>{{ meeting.description }}</b>
                        <p>{{ formatDate(meeting.date) }} at {{ meeting.time }} </p>
                        <p> Meet Link : <a :href="meeting.link">Join Meeting</a></p>
                    </div>
                    <div>
                        <button class="btn" @click="deleteMeetings(meeting.id)"><i class="fa fa-trash-o" style="font-size:20px;"></i></button>
                    </div>
                </div>
            </div>
            </div><div class="container">
            <div class="block" id="block3">
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
    import Nav from '@/components/NavBar/Admin.vue'
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
                    link:"",
                    time:""
                },
                isAddMeeting: false,
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
                //loading events
                this.$http.get(`http://localhost:3000/api/events?filter=%7B%22where%22%3A%7B%22userId%22%3A%22${this.event.userId}%22%7D%7D&access_token=${this.token}`)
                    .then((res) =>{
                        this.events = res.body;
                        // console.log("Events:", this.events);
                    })
                    .catch((err) =>{
                        console.log(err)
                    })

            },
            AddHolidays(){
                this.isAddHoliday = !this.isAddHoliday;
            },
            submitHoliday(){
                this.$http.post("http://localhost:3000/api/holidays?access_token="+this.token, this.holiday)
                    .then((res) => {
                        console.log(res)
                        this.clearHoliday();
                        this.AddHolidays();
                        this.load();
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            clearHoliday(){
                this.holiday.date = "",
                this.holiday.description = ""
            },
            deleteHolidays(ID){
                // console.log("ID", ID)
                this.$http.delete(`http://localhost:3000/api/holidays/${ID}?access_token=${this.token}`)
                    .then((res)=>{
                        console.log(res);
                        this.load();
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            formatDate(dateString){
                const date = new Date(dateString);
                return date.toLocaleDateString();
            },
            AddUpdates(){
                this.isAddUpdate = !this.isAddUpdate;
            },
            submitUpdate(){
                this.$http.post("http://localhost:3000/api/updates?access_token="+this.token, this.update)
                    .then((res) => {
                        console.log(res)
                        this.clearUpdate();
                        this.AddUpdates();
                        this.load();
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            clearUpdate(){
                this.update.title = "",
                this.update.description = ""
            },
            deleteUpdates(ID){
                console.log("ID", ID)
                this.$http.delete(`http://localhost:3000/api/updates/${ID}?access_token=${this.token}`)
                    .then((res)=>{
                        console.log(res);
                        this.load();
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            AddMeetings(){
                this.isAddMeeting = !this.isAddMeeting;
            },
            submitMeeting(){
                this.$http.post("http://localhost:3000/api/meetings?access_token="+this.token, this.meeting)
                    .then((res) => {
                        console.log(res)
                        this.clearMeeting();
                        this.AddMeetings();
                        this.load();
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            clearMeeting(){
                this.meeting.date = "",
                this.meeting.description = "",
                this.meeting.link = ""
            },
            deleteMeetings(ID){
                console.log("ID", ID)
                this.$http.delete(`http://localhost:3000/api/meetings/${ID}?access_token=${this.token}`)
                    .then((res)=>{
                        console.log(res);
                        this.load();
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            formatTime(dateString){
                const date = new Date(dateString);
                return date.toLocaleTimeString();
            },
            SubmitEvent(){
                this.$http.post("http://localhost:3000/api/events?access_token="+this.token, this.event)
                    .then((res) => {
                        console.log(this.event);
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
                console.log("ID", ID)
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
.button{
    background-color: rgb(149, 177, 202);
    width: 10%;
}

.box{
    flex: 1;
}
.btn-primary{
    margin: 8px;
    size: 10px;
}

</style>