const  authHeader=()=> {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      return { Authorization:user.accessToken };
    } else {
      return {};
    }
  }
  export default  authHeader;
  //authorisation token for admin this should be sent with each request on dashboard for security