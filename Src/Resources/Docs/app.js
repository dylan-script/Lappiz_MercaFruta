//Recibe elemento
const handleOnPasteOTP = (e) => {
	debugger
  const data = e.clipboardData.getData("text");
  const value = data.split("");
  //si el elemento es diferente a un num o vacio
  if (value.some((x) => !Number.isInteger(+x) || x == " " || x == "")) {
    inputs.forEach((input) => (input.value = ""));
    e.preventDefault();
    return;
  }

  if (value.length === inputs.length) {
    inputs.forEach((input, index) => (input.value = value[index]));
    submitOTP();
  }
};

const handleOTP = (e) => {
	debugger
  const input = e.target;
  let value = input.value;
  input.value = "";
  input.value = value ? value[0] : "";

  let fieldIndex = input.dataset.index;
  if (e.key === "Backspace" && fieldIndex > 0) {
    input.previousElementSibling.focus();
  }

  if (
    !Number.isInteger(+input.value) ||
    input.value == " " ||
    input.value == ""
  ) {
    input.value = "";
    return;
  }

  if (value.length > 0 && fieldIndex < inputs.length - 1) {
    input.nextElementSibling.focus();
  }

  if (fieldIndex == inputs.length - 1) {
    let isCompleteOTP = true;
    inputs.forEach((input) => {
      if (input.value == "") isCompleteOTP = false;
    });

    if (isCompleteOTP) {
      submitOTP();
    }
  }
};

const submitOTP = () => {
	debugger
  let otp = "";
  inputs.forEach((input) => {
    otp += input.value;
    input.disabled = true;
    input.classList.add("disabled");
  });
  document.getElementById("btnContinuar").classList.remove("disabled");

  // Aca va a validar el codigo OTP
  if (otp == "240192") {
    console.log("Codigo OTP correcto");
  } else {
    console.log("Codigo OTP incorrecto");
    inputs.forEach((input) => {
      input.value = "";
      input.disabled = false;
      input.classList.remove("disabled");
    });
  }
};

const inputs = document.querySelectorAll(".otp-field input");
debugger
inputs.forEach((input, index) => {
	debugger
  input.dataset.index = index;
  input.addEventListener("paste", handleOnPasteOTP);
  input.addEventListener("keyup", handleOTP);
});
debugger
document.addEventListener("DOMContentLoaded", function () {
	debugger
  document.getElementById("btnContinuar").classList.add("disabled");
});
