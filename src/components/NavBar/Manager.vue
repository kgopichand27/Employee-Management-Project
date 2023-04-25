<template>
  <nav class="navbar">
    <div class="navbar-left">
      <a href="/Manager" class="navbar-item">Home</a>
      <a href="/Manager/Employees" class="navbar-item">Team Details</a>
      <a href="/Manager/AllEmployees" class="navbar-item">Employees</a>
      <a href="/Manager/leave" class="navbar-item">leave request</a>
    </div>
    <div class="navbar-right">
      <a href="#" class="navbar-item">
        <i class="fas fa-bell">
          <router-link to="/Manager/notifications">
            <img src="https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-notification-icon-png-image_855007.jpg" alt="Notifications" class="navbar-icon">
          </router-link >
        </i>
      </a>
      <div class="navbar-dropdown">
        <a href="#" class="navbar-item" @click="showDropdown = !showDropdown">
          <i class="fas fa-user-circle">      <img src="https://as1.ftcdn.net/v2/jpg/02/09/95/42/1000_F_209954204_mHCvAQBIXP7C2zRl5Fbs6MEWOEkaX3cA.jpg" alt="Profile" class="navbar-icon">
          </i>
        </a>
        <ul v-show="showDropdown" class="navbar-dropdown-menu">
          <li><a>{{ employee.name}}</a></li>
          <li><a>{{ employee.Designation}}</a></li>
          <li><a href="/Manager/changepassword">change password</a></li>
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
                console.log(id);
                this.$http.get(`http://localhost:3000/api/Users/${id}?access_token=${token}`)
                    .then(response => {
                        this.employee = response.body;
                        console.log(response.body);
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


