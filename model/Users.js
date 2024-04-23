class Users {
    constructor(id, username, email, bid, password) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.bid = bid;
      this.password = password;
    }
  
    getAuthorities() {
      return null;
    }
  
    isAccountNonExpired() {
      return true;
    }
  
    isAccountNonLocked() {
      return true;
    }
  
    isCredentialsNonExpired() {
      return true;
    }
  
    isEnabled() {
      return true;
    }
  }
  
  