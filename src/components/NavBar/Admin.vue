<template>
  <nav class="navbar">
    <div class="navbar-left">
      <a href="/Admin" class="navbar-item fa fa-home" > HOME</a>
      <a href="/Admin/Employees" class="navbar-item fa " >
        <img src="https://www.nicepng.com/png/full/355-3559775_better-benefits-for-employees-employees-icon-png-white.png" alt=""  style="height:18px">EMPLOYEES
      </a>
    </div>
    <div class="navbar-right">
      <router-link to="/Admin/notifications" class="navbar-item">
        <button type="button" class="icon-button ">
          <img src="https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-notification-icon-png-image_855007.jpg" alt="Notifications" class="navbar-icon">
          <span class="icon-button__badge">{{ this.count }}</span>
        </button>
      </router-link>
      <div class="navbar-dropdown">
        <a  class="navbar-item" @click="showDropdown = !showDropdown">
          <i class="">      <img src="https://as1.ftcdn.net/v2/jpg/02/09/95/42/1000_F_209954204_mHCvAQBIXP7C2zRl5Fbs6MEWOEkaX3cA.jpg" alt="Profile" class="navbar-icon">
          </i>
        </a>
        <ul v-show="showDropdown" class="navbar-dropdown-menu">
          <li><a href="/Admin/Edit">Profile</a></li>
          <li><a >{{ employee.Designation}}</a></li>
          <li><a href="/Admin/changepassword">Change Password</a></li>
          <li><a  @click="logout()">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name:'AdminDash',
  data() {
    return {
      showDropdown: false,
      employee:{},
      count:'',
      token : localStorage.getItem('token'),
      id : localStorage.getItem('id')
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
    loadNotifyCount(){
      this.$http.get(`http://localhost:3000/api/absences/pending-count?access_token=${this.token}`)
                    .then(response => {
                        this.count = response.body.count;
                    })
    }
    
  },
  mounted(){
    this.loadEmployee();
    this.loadNotifyCount();
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
  width: 115px;
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
  background: rgb(244, 5, 33);
  color: #faf8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>


