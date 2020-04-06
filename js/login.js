function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  // expires after exday days
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function login() {
   user = prompt("Hi! What's your name?","");
   if (user !== "" && user !== null) {
     setCookie("username", user, 30);
     setupUser(user);
   }
}

function askLogout() {
  let login = document.getElementById('login');
  login.innerHTML = 'Sign Out?';
}

function removeLogout() {
  let user = getCookie("username");
  setupUser(user);
}

function logout() {
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
  let login = document.getElementById('login');
  login.removeAttribute('onmouseover');
  login.removeAttribute('onmouseout');
  login.setAttribute('onclick', 'login()');
  login.innerHTML = 'login';
}

function setupUser(user) {
  let login = document.getElementById('login');
  login.innerHTML = 'Hi there ' + user +'!'  ;
  login.setAttribute('onmouseover', 'askLogout();');
  login.setAttribute('onmouseout', 'removeLogout();');
  login.setAttribute('onclick', 'logout();');
}

(function loadCookie() {
  document.addEventListener('DOMContentLoaded', (e) => {
    let user = getCookie("username");
    if (user) { setupUser(user); }
  });
})();
