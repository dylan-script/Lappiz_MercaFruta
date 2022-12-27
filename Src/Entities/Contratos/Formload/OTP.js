setTimeout(function () {
  let appViewId = getAppViewId();
  console.log(appViewId);
  if (appViewId == 'fe5fe785-b651-4639-90e5-19c225ea040d') {
    debugger
    const code = getRandomInt();
    sendCode(code)
    //Recibe elemento
    const handleOnPasteOTP = (e) => {
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
      let otp = "";
      inputs.forEach((input) => {
        otp += input.value;
        input.disabled = true;
        input.classList.add("disabled");
      });
      document.getElementById("btn-ok").classList.remove("disabled");

      // Aca va a validar el codigo OTP
      if (otp == code) {
        debugger
        console.log("Codigo OTP correcto");
        toastr.success('Código Correcto');
      } else {
        debugger
        console.log("Codigo OTP incorrecto");
        toastr.error('Código Incorrecto');
        inputs.forEach((input) => {
          input.value = "";
          input.disabled = false;
          input.classList.remove("disabled");
        });
      }
    };

    const inputs = document.querySelectorAll(".otp-field input");
    inputs.forEach((input, index) => {
      input.dataset.index = index;
      input.addEventListener("paste", handleOnPasteOTP);
      input.addEventListener("keyup", handleOTP);
    });
    document.addEventListener("DOMContentLoaded", function () {
      document.getElementById("btn-ok").classList.add("disabled");
    });

  }
}, 200);

function getRandomInt() {
  debugger
  const first = Math.floor(Math.random() * 10);
  const second = Math.floor(Math.random() * 10);
  const third = Math.floor(Math.random() * 10);
  const fourth = Math.floor(Math.random() * 10);
  const fifth = Math.floor(Math.random() * 10);
  const sixth = Math.floor(Math.random() * 10);
  console.log(`${first}${second}${third}${fourth}${fifth}${sixth}`);

  return `${first}${second}${third}${fourth}${fifth}${sixth}`
}

function sendCode(cod) {
  var email = `${JSON.parse(sessionStorage.LappizUser).Email}`;
  var subject = 'My life is a bug';
  var text = '';
  var HTML = `<h1>Su código de verificación es ${cod}</h1>`;
  var attachments = [
    {
      filename: 'test.txt',
      content: 'Hola mundo Lappiz desde un archivo!'
    }
  ]
  var cc = [""]
  var bcc = [""]

  sendEmail(email, subject, text, HTML, attachments, cc, bcc).then(function (response) {
    toastr.info('Se ha enviado el correo su código de verificación');
  }, function (error) {
    toastr.warning('Ha ocurrido un error al enviar el correo');
  });
}