<template>
    <div>
        <app-nav></app-nav>
        <div class="container">
            <div class="block" id="block1">
                <h4>Office Updates</h4>
                <button @click="AddUpdates">Add</button>
                <form v-if="isAddUpdate" autocomplete="off">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control"  placeholder="Enter Update title" v-model="update.title">
                    </div>
                    <div class="form-group">
                        <label >Description</label>
                        <textarea class="form-control"  placeholder="Enter update description" v-model="update.description"></textarea>
                    </div>
                    <button type="submit" class="btn" @click.prevent="submitUpdate">submit</button>
                </form>
                <div v-for="update in updates" v-bind:key="update.id">
                    <br>
                    <b>{{ update.title }}</b>
                    <p>{{ update.description }}</p>
                </div>
            </div>
            <div class="block" id="block2">
                <h4>Upcoming Holidays</h4>
                <button @click="AddHolidays">Add</button>
                <form v-if="isAddHoliday" autocomplete="off">
                    <div class="form-group">
                        <label >Date</label>
                        <input type="date" class="form-control"  placeholder="Enter Holiday date" v-model="holiday.date">
                    </div>
                    <div class="form-group">
                        <label >Holiday</label>
                        <input type="text" class="form-control"  placeholder="Enter holiday description" v-model="holiday.description">
                    </div>
                    <button type="submit" class="btn" @click.prevent="submitHoliday">submit</button>
                </form>
                <div v-for="holiday in holidays" v-bind:key="holiday.id">
                    <br>
                    <b>{{ holiday.description }}</b>
                    <p>{{ formatDate(holiday.date) }}</p>
                </div>
            </div>
            <div class="block" id="block3">
                <h4> Your Upcoming Events</h4>
                <button @click="AddMeetings">Add</button>
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
                        <label >Description</label>
                        <input type="text" class="form-control"  placeholder="Enter meeting description" v-model="meeting.description">
                    </div>
                    <button type="submit" class="btn" @click.prevent="submitMeeting">submit</button>
                </form>
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
                    link:""
                },
                isAddMeeting: false
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
                this.holiday.description = "",
                this.meeting.link = ""
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