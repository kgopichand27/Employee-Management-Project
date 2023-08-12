<template>
  <nav class="navbar">
    <div class="navbar-left">
      <a href="/Employee" class="navbar-item fa fa-home"> HOME</a>
      <a href="/Employee/Employees" class="navbar-item fa">
        <img src="https://mediationnorthernireland.org/app/uploads/2016/07/staff_white.png" alt="" style="height:23px">EMPLOYEES</a>
      <a href="/Employee/leave" class="navbar-item fa fa-pencil"> LEAVE REQUEST</a>
    </div>
    <div class="navbar-right">
      <div class="navbar-dropdown">
        <a class="navbar-item" @click="showDropdown = !showDropdown">
          <i class="">      <img src="https://as1.ftcdn.net/v2/jpg/02/09/95/42/1000_F_209954204_mHCvAQBIXP7C2zRl5Fbs6MEWOEkaX3cA.jpg" alt="Profile" class="navbar-icon">
          </i>
        </a>
        <ul v-show="showDropdown" class="navbar-dropdown-menu">
          <li><a  href="/Employee/Edit">Profile</a></li>
          <li><a >{{ employee.Designation}}</a></li>
          <li><a href="/Employee/changepassword">Change Password</a></li>
          <li><a  @click="logout()">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name:'employeeNavbar',
  data() {
    return {
      showDropdown: false,
      employee:{}
    };
  },
  methods:{
    logout() 
    {
      localStorage.clear();
      this.$router.push('/');
    },
    loadEmployee() {
                const token = localStorage.getItem('token')
                const id = localStorage.getItem('id')
                this.$http.get(`http://localhost:3000/api/Users/${id}?access_token=${token}`)
                    .then(response => {
                        this.employee = response.body;
                        localStorage.setItem('manager',this.employee.manager)
            
                    })

      },
    
  },
  mounted(){
    this.loadEmployee();
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
</style>


