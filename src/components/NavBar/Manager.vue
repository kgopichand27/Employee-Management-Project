<template>
  <nav class="navbar">
    <div class="navbar-left">
      <a href="/Manager" class="navbar-item fa fa-home"> HOME</a>
      <a href="/Manager/Employees" class="navbar-item fa"> 
        <img src="https://mediationnorthernireland.org/app/uploads/2016/07/staff_white.png" alt="" style="height:23px">TEAM DETAILS</a>
        <a href="/Manager/AllEmployees" class="navbar-item fa">
       <img src="https://mediationnorthernireland.org/app/uploads/2016/07/staff_white.png" alt="" style="height:23px">EMPLOYEES</a>
      <a href="/Manager/leave" class="navbar-item fa fa-pencil"> LEAVE REQUEST</a>
    </div>
    <div class="navbar-right">
      <a class="navbar-item">
        <i class="">
          <router-link to="/Manager/notifications">
            <!-- <img src="https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-notification-icon-png-image_855007.jpg" alt="Notifications" class="navbar-icon">
            <span class="badge rounded-pill badge-notification bg-danger">{{ this.count }}</span> -->
            <button type="button" class="icon-button">
              <img src="https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-notification-icon-png-image_855007.jpg" alt="Notifications" class="navbar-icon">
              <span class="icon-button__badge">{{ this.count }}</span>
            </button>
          </router-link >
        </i>
      </a>
      <div class="navbar-dropdown">
        <a  class="navbar-item" @click="showDropdown = !showDropdown">
          <i class="">      <img src="https://as1.ftcdn.net/v2/jpg/02/09/95/42/1000_F_209954204_mHCvAQBIXP7C2zRl5Fbs6MEWOEkaX3cA.jpg" alt="Profile" class="navbar-icon">
          </i>
        </a>
        <ul v-show="showDropdown" class="navbar-dropdown-menu">
          <li><a href="/Manager/Edit">Profile</a></li>
          <li><a>{{ employee.Designation}}</a></li>
          <li><a href="/Manager/changepassword">Change Password</a></li>
          <li><a  @click="logout()">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name:'ManagerDash',
  data() {
    return {
      showDropdown: false,
      employee:{},
      absencerequest:{},
      count:'',
      token:localStorage.getItem('token'),
      id:localStorage.getItem('id')
    };
  },
  methods:{
    logout() 
    {
      localStorage.clear();
      this.$router.push('/');
    },
    loadEmployee() {
                this.$http.get(`http://localhost:3000/api/Users/${this.id}?access_token=${this.token}`)
                    .then(response => {
                        this.employee = response.body;
                    })

      },
    loadNotifyMng(){
      this.$http.get(`http://localhost:3000/api/absences/pending-count-mng?managerId=${this.id}&access_token=${this.token}`)
                    .then(response => {
                        this.absencerequest = response.body;
                        this.count = response.body.countmng.length;
                    })
    }
    
    
  },
  mounted(){
    this.loadEmployee();
    this.loadNotifyMng();
  }
};
</script>


<style scoped>
.navbar {
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.navbar-item {
  color: #fff;
  margin-right: 1rem;
  text-decoration: none;
  font-size: 18px;
}

.navbar-item:hover {
  text-decoration: underline;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-dropdown {
  position: relative;
  width: 120px;

}

.navbar-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #000;
  color: #fff;
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  border-radius: 0.25rem;
  z-index: 1;
}

.navbar-dropdown-menu li {
  padding: 0.5rem;
}

.navbar-dropdown-menu li:hover {
  background-color: #555;
}

.navbar-dropdown-menu a {
  color: #fff;
  text-decoration: none;
}

.navbar-right .navbar-icon {
  width: 30px;
  height: 30px;
  margin-left: 20px;
}

.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  color: #1c1b1b;
  background: #121111;
  border: none;
  outline: none;
  border-radius: 50%;
}

.icon-button:hover {
  cursor: pointer;
}

.icon-button:active {
  background: #101010;
}

.icon-button__badge {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 15px;
  height: 15px;
  background: red;
  color: #faf8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>


