setTimeout(() => {
  $('#btn-enviar').kendoButton({
      click: onClick
  })

  function getToken() {
      return new Promise((resolve, reject) => {
          var settings = {
              "url": "https://designertest.lappiz.io/Api/token",
              "method": "POST",
              "timeout": 0,
              "headers": {
                  "Content-Type": "application/x-www-form-urlencoded",
              },
              "data": {
                  "grant_type": "password",
                  "username": "admin@mercafruta.com",
                  "password": "Fruta.2022"
              }
          };

          $.ajax(settings).done(function (response) {
              resolve(response);
          }).fail(function (error) {
              reject(error);
          });
      });
  }

  function onClick(e) {
      debugger
      e.preventDefault()
      var url = location.href;
      var urlSplit = url.split('appViewId=')
      var idVista = urlSplit[1];

      if (idVista == "a29754b8-237c-4b1b-9cce-59eb9a32640a") {

          let name = $('#nombre').val()
          let email = $('#correo').val()
          let tipo_persona = $('#tipo_persona').val()

          let errores = document.getElementsByClassName('error')

          if (errores.length > 0) {
              toastr.warning("Hay al menos un campo ingresado incorrectamente. Validar que los campos están ingresados correctamente", "Atención")
          } else {
              if (name != '' && email != '' && tipo_persona != '') {
                  debugger

                  getToken().then(function (dataAuth) {
                      let token = dataAuth.access_token;
                      //Ambiente de trabajo
                      var environment = backandGlobal.environment;
                      //dataItem
                      let queryexiste = ajaxQuery(`select * from MercaFruta_Lappiz_Colaborador where Email = '${email}'`, token)
                      var bodyColaborador = {
                          "Nombre": `${name}`,
                          "Email": `${email}`,
                          "TipoPersona": `${tipo_persona}`,
                          "parameters":
                          {
                              "userId": `${sessionStorage.userId}`,
                              "tablaId": "",
                              "actionId": "00000000-0000-0000-0000-000000000000",
                              "pType": "Guardar",
                              "aType": "ffija",
                              "environment": environment,
                              "lappizFunctionId": "00000000-0000-0000-0000-000000000000"
                          }
                      };
                      //Método predefinido
                      if (queryexiste.length > 0) {
                          toastr.warning('El colaborador ya se encuentra registrado en la aplicación')
                          console.log('El colaborador ya se encuentra registrado en la aplicación')
                      } else {
                          $.ajax({
                              async: false,
                              url: `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/MercaFruta_Lappiz_Colaborador`,
                              type: 'POST',
                              data: JSON.stringify(bodyColaborador),
                              beforeSend: function (xhr) {
                                  xhr.setRequestHeader('Content-Type', 'application/json');
                                  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                              },
                              success: function (result) {
                                  toastr.success('Colaborador registrado con éxito');

                                  var email = 'admin@mercafruta.com';
                                  var subject = 'Nuevo colaborador';
                                  var text = '';
                                  var HTML = `<h2>${name} se ha registrado como ${tipo_persona}. Su email: ${email}</h2>`;

                                  sendEmail(email, subject, text, HTML).then(function (response) {
                                      console.log('Se ha enviado el correo');
                                  }, function (error) {
                                      console.log('Ha ocurrido un error al enviar el correo');
                                  });
                              },
                              error: function (error) {
                                  toastr.info('Ha ocurrido un error al tratar de registar', 'Error');
                                  console.log(error)
                              }
                          })
                      }
                  }, function (error) {
                      toastr.warning("Hubo un inconveniente al crear el usuario");
                      console.log("Hubo un inconveniente al crear el usuario");
                  });

              } else {
                  toastr.warning('Por favor ingrese todos los campos', "Atención");
              }
          }
      }
  }

  function ajaxQuery(query, token) {
      debugger;
      let data
      let newquery = {
          "query": query,
          "parameters": {
              "aType": "execTx",
              "environment": `${backandGlobal.environment}`
          }
      }
      $.ajax({
          async: false,
          url: `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/sp/query`,
          type: 'POST',
          data: JSON.stringify(newquery),
          beforeSend: function (xhr) {
              xhr.setRequestHeader('Content-Type', 'application/json');
              xhr.setRequestHeader('Authorization', 'Bearer ' + token);
          },
          success: function (result) {

              data = result[0]

          },
          error: function (error) {
              console.log(error)
          }
      })

      return data
  }
}, 1000)