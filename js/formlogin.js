const account = [
  {
    name: "admin",
    password: "1",
  },
  {
    name: "admin2",
    password: "2",
  },
];

// currentAcc = {
//     name: 'asdasdasd',
//     password: 'asdasd'
// }

function validateLogin(currentAcc, accountsValidate) {
  //   console.log(currentAcc);
  const isValidateAcc = accountsValidate.find((_account) => {
    if (
      _account.name === currentAcc.name &&
      _account.password === currentAcc.password
    ) {
      return true;
    }
    return false;
  });

  return isValidateAcc;
}

function login() {
  window.localStorage.setItem("user", JSON.stringify(account));
  //   var data = JSON.parse(account);
  var user = localStorage.getItem(account);
  const eleFormLogin = document.querySelector(".login-form");

  eleFormLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const currentAcc = {
      name: username.value,
      password: password.value,
    };

    // console.log(validateLogin(currentAcc, account));
    if (validateLogin(currentAcc, account)) {
      //   console.log("aaaaa");
      document.querySelector(".message").innerHTML = " Login success";
      window.location.href = "index.html";
    } else {
      document.querySelector(".message").innerHTML =
        " Please input username and password";
    }
    // if (!currentAcc.name === validateLogin.account) {
    //     document.querySelector('.js-err-mess').innerHTML
    //   console.log("aa");
    // } else {
    //   console.log("nn");
    // }
  });
}

login();
