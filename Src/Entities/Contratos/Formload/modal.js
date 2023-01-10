function generateOTP() {
  setTimeout(() => {
    console.clear();
    const appViewId = getAppViewId();
    console.log(appViewId);
    if (appViewId == 'fe5fe785-b651-4639-90e5-19c225ea040d') {
      debugger;

      const modalHeader1 = `<div></div>`;
      const modalBody1 = `
      <style>
    .otp-container {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: #ffffff;
      color: #fa6900;
      font-weight: bold;
      font-size: large;
    }
  
    .otp-field {
      display: flex;
    }
  
    .otp-field input {
      width: 60px;
      font-size: 32px;
      padding: 10px;
      text-align: center;
      border-radius: 5px;
      margin: 2px;
      border: 2px solid #f38630;
      background: #f0f0f0;
      font-weight: bold;
      color: #000000;
      outline: none;
      transition: all 0.1s;
      margin-top: 20px;
    }
  
    .otp-field input:focus {
      border: 2px solid rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 2px 2px #fa6900;
    }
  
    .disabled {
      opacity: 0.5;
    }
  
    .space {
      margin-right: 1rem !important;
    }
  
    #btn-ok, #btn-cancel {
      margin-top: 20px;
      height: 40px;
      width: 100%;
      max-width: 400px;
      border-radius: 8px;
      border-color: #fa6900;
      background-color: #fa6900;
      color: #ffffff;
      font-weight: bold;
      font-size: large;
    }
  </style>
      <div class="otp-container">
      <h2>INGRESA EL CODIGO</h2>
      <div class="otp-field">
          <input type="text" maxlength="1">
          <input type="text" maxlength="1">
          <input type="text" maxlength="1" class="space">
          <input type="text" maxlength="1">
          <input type="text" maxlength="1">
          <input type="text" maxlength="1">
      </div>
      </div>
          
      `;
      const modalFooter1 = `<div></div>`;

      const configModal = {
        htmlTemplate: true,
        headerTemplate: modalHeader1,
        bodyTemplate: modalBody1,
        footerTemplate: modalFooter1,
        showBtnsFooter: true,
        size: "xl",
        scrollable: true,
        centered: true,
        keyboard: true,
        dataItem: e.dataItem,
        viewName: "Dev_Lappiz_Test",
        entityId: "6409099a-d22e-47c3-a3b6-5d5fdbbf7480",
        parent: "",
        parentRules: "",
      };

      const doneModal = () => {
        debugger;
        console.log("Dió click en done");
      };

      const cancelModal = () => {
        debugger;
        console.log("Dió click en cancel");
      };


      openCustomModal(configModal, doneModal, cancelModal);
      const code = getRandomInt();
      sendCode(code)
      sessionStorage.Code = code;
      console.log(sessionStorage.Code)
    }
  }, 100);
}


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
  const email = `${JSON.parse(sessionStorage.LappizUser).Email}`;
  const subject = 'My life is a bug';
  const text = '';
  const HTML = `<h1>Su código de verificación es ${cod}</h1>`;
  const attachments = [
    {
      filename: 'test.txt',
      content: 'Hola mundo Lappiz desde un archivo!'
    }
  ]
  const cc = [""]
  const bcc = [""]

  sendEmail(email, subject, text, HTML, attachments, cc, bcc).then(function (response) {
    toastr.info('Se ha enviado el correo su código de verificación');
  }, function (error) {
    toastr.warning('Ha ocurrido un error al enviar el correo');
  });
}