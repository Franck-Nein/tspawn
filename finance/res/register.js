

if (isCookie("username")){
    document.querySelector(".login").textContent = "Re-login";
    let username = getCookie("username");
    let hashedCredentials = getCookie("credentials");
    /*check(username, hashedCredentials, true)*/
    let logged_in_as =  '<img src="https://minotar.net/helm/' + username + '/64"><span> ' + username + '</span>';
    if (window.location.href.split("/")[4] == "login") {
    
      document.querySelector(".whoLogged").innerHTML = '<img src="https://minotar.net/helm/' + username + '/64"><span>Logged in as ' + username + '</span>';
      document.querySelector(".login").insertAdjacentHTML("afterend", '<a class="home_icon" href="' + username + '"><img src="/finance/res/home-icon.svg"></a>');
    } else {
    console.log("not login page")
    }
}


document.querySelector(".logout").addEventListener("click", function() {
  event.preventDefault(); // Prevent form submission
  alert("Logged Out!");
  logOut();
  location.reload();
});

document.querySelector(".login").addEventListener("click", function() {
 event.preventDefault(); // Prevent form submission
  // Get input values
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Calculate hashed credentials
  var hashedCredentials = sha256(sha256(username) + ":" + sha256(password));

  check(username, hashedCredentials, false);
}
  

);
function check(username, hashedCredentials, cookie) {
  // Fetch login.txt file
  fetch("login.txt")
    .then(response => response.text())
    .then(data => {
      var credentialsList = data.split("\n");
      for (var i = 0; i < credentialsList.length; i++) {
        var credentials = credentialsList[i].split(":");
        var storedCredentials = credentials[1];

        if (username === credentials[0]) {
          if (hashedCredentials === storedCredentials) {
           if (!cookie) {
            // Set cookie
             document.cookie = "username=" + username;
             document.cookie = "credentials=" + hashedCredentials;
             alert("Login successful!");
             location.reload();
           }
            return;
            
          }
        }
      }

      alert("Invalid username or password!");
    })
    .catch(error => {
      console.log("Error:", error);
    });
}

function logOut() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function isCookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

