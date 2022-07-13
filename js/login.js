const showSignupBtn = document.getElementById("showSignupBtn");
const showLoginBtn = document.getElementById("showLoginBtn");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const signupUsername = document.getElementById("signupUsername");
const signupPassword = document.getElementById("signupPassword");
const signupEmail = document.getElementById("signupEmail");


const authErrMsg = document.getElementById("authErrMsg");

function showSignup() {
	signupForm.classList.remove('d-none');
	loginForm.classList.add('d-none');
}

function showLogin() {
	signupForm.classList.add('d-none');
	loginForm.classList.remove('d-none');
}
const BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1"
function loginFn() {
	if (loginUsername.value == "") {
		updateAuthErrorMsg("Username should not be empty");
	} else if (loginPassword.value == "") {
		updateAuthErrorMsg("Password should not be empty");
	} else {
		const data = {
            username: loginUsername.value,
            password: loginPassword.value
        };
		fetch(BASE_URL + '/auth/signin', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data);
				if(data.accessToken) {
					console.log("##")
                    localStorage.setItem("username", data.username)
                    localStorage.setItem("userId", data.id);
					localStorage.setItem("token", data.accessToken);
					localStorage.setItem("email", data.email);
					
                    window.location.href = "index.html";
                } else {
					updateAuthErrorMsg(data.msg);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
}

function signupFn() {
	if (signupUsername.value == "") {
		updateAuthErrorMsg("Username should not be empty");
	} else if (signupPassword.value == "") {
		updateAuthErrorMsg("Password should not be empty");
	} else {
		const data = {
            username: signupUsername.value,
            password: signupPassword.value,
			email:signupEmail.value
        };
		fetch(BASE_URL + '/auth/signup', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data);
                    localStorage.setItem("username", data.username)
                    localStorage.setItem("userId", data.id);
					localStorage.setItem("email", data.email);
					localStorage.setItem("token", data.accessToken);
					window.location.href = "index.html";
                
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
}

function updateAuthErrorMsg(msg) {
	authErrMsg.innerText = msg;
}

function redirectToHome() {
	window.location.href = "/";
}

showSignupBtn.addEventListener('click', showSignup);
showLoginBtn.addEventListener('click', showLogin);
signupBtn.addEventListener('click', signupFn);
loginBtn.addEventListener('click', loginFn);

if (localStorage.getItem('username')) {
	window.location.href = "index.html";
}
