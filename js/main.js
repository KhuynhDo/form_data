function main() {
  let isEditFlag = {
    flag: false,
    indexEdit: -1,
  };
  const eleFormRegister = document.querySelector(".js-form-main");
  const eleInputID = document.querySelector("#id");
  const eleInputName = document.querySelector("#name");
  const eleInputBirthday = document.querySelector("#birthday");
  const eleInputPhoneNumber = document.querySelector("#phonenumber");
  const eleBtnReset = document.querySelector(".js-btn-reset");
  const eleListViewData = document.querySelector(".js-content-result");
  const keyLocalListStudent = "k_T_L";
  const listData = localStorage.getItem(keyLocalListStudent)
    ? JSON.parse(localStorage.getItem(keyLocalListStudent))
    : [];

  function handleResetForm() {
    eleFormRegister.reset();
  }

  eleBtnReset.addEventListener("click", (event) => {
    event.preventDefault();
    handleResetForm();
  });

  function renderDataTable() {
    let html = "";
    listData.forEach((data, index) => {
      html += `
      <tr>
            <td>${data?.id}</td> 
            <td>${data?.name}</td> 
            <td>${data?.birthday}</td> 
            <td>${data?.phone}</td> 
            <td >
                <button data-del-index="${index}">Delete</button>
                <button data-edit-index="${index}">Edit</button>
            </td> 
            </tr>
        `;
    });
    eleListViewData.innerHTML = html;

    document.querySelectorAll("[data-del-index]").forEach((btnDelete) => {
      btnDelete.addEventListener("click", () => {
        const dataIndexDel = Number(btnDelete.getAttribute("data-del-index"));
        // console.log(dataIndex);
        deleteStudent(dataIndexDel);
      });
    });

    document.querySelectorAll("[data-edit-index]").forEach((btnEdit) => {
      btnEdit.addEventListener("click", () => {
        const dataIndexEdit = Number(btnEdit.getAttribute("data-edit-index"));
        isEditFlag = {
          flag: true,
          indexEdit: dataIndexEdit,
        };
        // console.log(dataIndexEdit);
        const currenDataStudent = listData[dataIndexEdit];
        UpdateInforStudent(currenDataStudent);
        document.querySelector(".js-success").style.display = "inline";
        document.querySelector(".btn-danger").style.display = "none";
      });
      document.querySelector(".js-success").style.display = "none";
      document.querySelector(".btn-danger").style.display = "inline";
    });
  }
  function phoneValid(phone) {
    // return /^[0-9\+]{1,}[0-9\-]{3,15}$/.test(phone);
    return /^(\d{1,3}|)?(\d{3})(\d{3})(\d{4})$/.test(phone);
  }

  function hanldeResetError() {
    // => return true or false
    let isValid = true;
    if (!eleInputID.value) {
      document.querySelector(".js-err-id").innerHTML = "Vui lòng nhập ID";
      isValid = false;
    } else if (
      eleInputID.value.length < 2 ||
      eleInputID.value.trim().length < 2
    ) {
      document.querySelector(".js-err-id").innerHTML =
        "ID phải nhiều hơn 2 kí tự";
      isValid = false;
    } else {
      document.querySelector(".js-err-id").innerHTML = "";
      isValid = true;
    }

    if (!eleInputName.value) {
      document.querySelector(".js-err-name").innerHTML = "Vui lòng nhập Tên ";
      isValid = false;
    } else if (
      eleInputName.value.length <= 2 ||
      eleInputName.value.trim().length <= 2
    ) {
      document.querySelector(".js-err-name").innerHTML =
        "Tên phải nhiều hơn 2 kí tự";
      isValid = false;
    } else {
      document.querySelector(".js-err-name").innerHTML = "";
      isValid = true;
    }

    if (!eleInputBirthday.value) {
      document.querySelector(".js-err-birthday").innerHTML =
        "Vui lòng nhập ngày tháng năm sinh";
      isValid = false;
    } else {
      document.querySelector(".js-err-birthday").innerHTML = "";
      isValid = true;
    }

    if (!eleInputPhoneNumber.value) {
      document.querySelector(".js-err-phone-number").innerHTML =
        "Vui lòng nhập SDT";
      isValid = false;
    }
    // else if (!phoneValid(eleInputPhoneNumber.value)) {
    //   document.querySelector(".js-err-phone-number").innerHTML =
    //     "SDT không hợp lệ";
    //   isValid = false;
    // }
    else if (
      eleInputPhoneNumber.value.trim().length > 10 ||
      eleInputPhoneNumber.value.trim().length < 10
    ) {
      document.querySelector(".js-err-phone-number").innerHTML =
        "SDT không đúng";
      isValid = false;
    } else {
      document.querySelector(".js-err-phone-number").innerHTML = "";
      return true;
    }
    console.log(isValid);
    return isValid;
  }

  const deleteStudent = (index) => {
    const delIndex = listData.findIndex(
      (listStudent) => listStudent.id === index
    );
    listData.splice(delIndex, 1);
    // console.log(delIndex);
    renderDataTable();
    localStorage.setItem(keyLocalListStudent, JSON.stringify(listData));
  };

  function UpdateInforStudent(value) {
    (eleInputID.value = value.id),
      (eleInputName.value = value.name),
      (eleInputBirthday.value = value.birthday),
      (eleInputPhoneNumber.value = value.phone);
  }

  eleFormRegister.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!hanldeResetError()) return;
    console.log("object");
    const dataValue = {
      id: eleInputID.value,
      name: eleInputName.value,
      birthday: eleInputBirthday.value,
      phone: eleInputPhoneNumber.value,
    };
    if (isEditFlag.flag) {
      listData[isEditFlag.indexEdit] = dataValue;
      isEditFlag = {
        flag: false,
        indexEdit: -1,
      };
      console.log("dadad");
    } else {
      listData.push(dataValue);
    }
    localStorage.setItem(keyLocalListStudent, JSON.stringify(listData));
    renderDataTable();
    hanldeResetError();
    handleResetForm();
  });
  if (listData.length > 0) {
    renderDataTable();
  }

  function logout() {
    const eleBtnLogout = document.querySelector(".js-logout");
    eleBtnLogout.addEventListener("click", (event) => {
      console.log("log");
      return (window.location.href = "formLogin.html");
    });
  }
  logout();
}

main();
