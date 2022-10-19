
setTimeout(() => {
  $('#registrar').kendoButton({
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

      if (idVista == "5c772004-0515-4e52-93d2-17b07e299157") {



          let name = $('#name').val()
          let lastname = $('#lastname').val()
          let empresa = $('#nombre_empresa').val()
          let email = $('#email').val()
          let password = $('#password').val()
          let password2 = $('#password2').val()
          let tipo_persona = $('#tipo_persona').val()
          let tipo_documento = $('#tipo_documento').val()
          let numero = $('#numero').val()
          let pais = $('#pais').val()
          let provincia = $('#prov').val()
          let ciudad = $('#ciudad_mu').val()
          let depa_co = $('#depa_select').val()
          let ciudad_co = $('#ciudad_select').val()
          let direc = $('#direc').val()
          let telefono = $('#telefono').val()
          let terminos = $('#terminos').is(":checked")
          let prof = $('#profesion').val()
          let producto = $('#tipo-prod-val').text()
          let otro = $('#ot span').text().split(".")
          let nombre_empresa = $('#nombre_empresa').val()
          let profesion = $('#profesion').val()
          otro.pop()
          let prod = otro.join() + ',' + producto
          let ciu = ciudad != '' ? ciudad : ciudad_co
          let depa = provincia != '' ? provincia : depa_co
          let nombreCompleto = name.concat(" ", lastname);

          let errores = document.getElementsByClassName('error')

          if (errores.length > 0) {
              toastr.warning("Hay al menos un campo ingresado incorrectamente. Validar que los campos están ingresados correctamente", "Atención")
          } else {
              if (name != '' && lastname != '' && email != '' && password != '' && password2 != '' && tipo_persona != '' && tipo_documento != '' && numero != '' && pais != '' && depa != '' && ciu != '' && direc != '' && telefono != '' && terminos && prof != '' && nombre_empresa != '' && profesion != '' && prod != '') {
                  if (password == password2) {
                      debugger

                      getToken().then(function (dataAuth) {
                          let token = dataAuth.access_token;
                          let type = dataAuth.token_type;

                          //Usuario quien solicita el req

                          //Ambiente de trabajo
                          var environment = backandGlobal.environment;
                          //dataItem
                          let queryexiste = ajaxQuery(`select * from MercaFruta_Lappiz_Proveedor where Email = '${email}'`, token)
                          var bodyProveedor = {
                              "Nombre": `${name}`,
                              "Apellido": `${lastname}`,
                              "Email": `${email}`,
                              "TipoPersona": `${tipo_persona}`,
                              "TipoDocumento": `${tipo_documento}`,
                              "NumeroDocumento": `${numero}`,
                              "Ciudad": `${ciu}`,
                              "Departamento": `${depa}`,
                              "Pais": `${pais}`,
                              "Direccion": `${direc}`,
                              "Telefono": `${telefono}`,
                              "NombreEmpresa": `${empresa}`,
                              "Profesion": `${prof}`,
                              "TipoProducto": `${prod}`,
                              "CEDescripcin": "",
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
                          //Nombre de la entidad
                          var entityName = 'MercaFruta_Lappiz_Proveedor';
                          //Método predefinido
                          if (queryexiste.length > 0) {
                              toastr.warning('El proveedor ya se encuentra registrado en la aplicación')
                              console.log('El proveedor ya se encuentra registrado en la aplicación')
                          } else {
                              $.ajax({
                                  async: false,
                                  url: `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/MercaFruta_Lappiz_Proveedor`,
                                  type: 'POST',
                                  data: JSON.stringify(bodyProveedor),
                                  beforeSend: function (xhr) {
                                      xhr.setRequestHeader('Content-Type', 'application/json');
                                      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                                  },
                                  success: function (result) {
                                      let Id = result.Id
                                      let bodyUser = {
                                          "FullName": `${nombreCompleto}`,
                                          "Email": `${email}`,
                                          "Phone": `${telefono}`,
                                          "Address": `${direc}`,
                                          "Identificacion": `${numero}`,
                                          "Contrasena": `${password}`,
                                          "Activo": true,
                                          "ProveedorFk": `${Id}`,
                                          "parameters": {
                                              "userId": `${sessionStorage.userId}`,
                                              "tablaId": "",
                                              "actionId": "00000000-0000-0000-0000-000000000000",
                                              "pType": "Guardar",
                                              "aType": "ffija",
                                              "environment": environment,
                                              "lappizFunctionId": "00000000-0000-0000-0000-000000000000"
                                          }
                                      }

                                      var url = `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/MercaFruta_Lappiz_Users`;
                                      //------------Insert User -------------
                                      $.ajax({
                                          async: false,
                                          url: url,
                                          type: 'POST',
                                          data: JSON.stringify(bodyUser),
                                          beforeSend: function (xhr) {
                                              xhr.setRequestHeader('Content-Type', 'application/json');
                                              xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                                          },
                                          success: function (result) {

                                              let IdUser = result.Id

                                              //--------------- Replicacion de user--------------//
                                              var BodyReplicate = {

                                                  "UserName": `${email}`,
                                                  "Email": `${email}`,
                                                  "PasswordHash": `${password}`,
                                                  "Activo": true,
                                                  "Id": `${IdUser}`

                                              }
                                              var url = `https://designertest.lappiz.io/Api/api/Users/replicate?appCode=MercaFruta_Lappiz&languageApp=es&runtime=beta`
                                              $.ajax({
                                                  async: false,
                                                  url: url,
                                                  type: 'POST',
                                                  data: JSON.stringify(BodyReplicate),
                                                  beforeSend: function (xhr) {
                                                      xhr.setRequestHeader('Content-Type', 'application/json');
                                                      //xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                                                  },
                                                  success: function (result) {

                                                      //-----------------Asignar Rol-----------
                                                      var IdTipoRol = '12ef9a54-036d-4942-a391-2c9fb6538753'
                                                      var BodyRol = [{
                                                          "idRol": `${IdTipoRol}`,
                                                          "Action": "Save"
                                                      }]
                                                      IdUser = IdUser.toUpperCase()
                                                      var url = `https://designertest.lappiz.io/Api/api/Roles/SaveChanges?idUser=${IdUser}`
                                                      $.ajax({
                                                          async: false,
                                                          url: url,
                                                          type: 'POST',
                                                          data: JSON.stringify(BodyRol),
                                                          beforeSend: function (xhr) {
                                                              xhr.setRequestHeader('Content-Type', 'application/json');
                                                              // xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                                                          },
                                                          success: function (result) {
                                                              toastr.success('Usuario registrado correctamente');
                                                              console.log('Usuario registrado correctamente');
                                                              toastr.info(`se ha enviado un correo de verificacion a ${email}`);
                                                              console.log(`se ha enviado un correo de verificacion a ${email}`);
                                                              console.log('Rol Asignado');
                                                              document.getElementById("formulario").reset();
                                                              ajaxQuery(`update LappizV2Test.dbo.AspNetUsers set EmailConfirmed = 1 where Id = ${IdUser}`)
                                                              if (location.host == 'runtimetestbeta.lappiz.io') {
                                                                  var goLocation = myService.goLocation;
                                                                  var url = 'https://runtimetestbeta.lappiz.io/#/grids?viewName=MercaFruta_Lappiz_DetalleProducto&workspaceId=e5b03115-2a14-4956-833a-10796e1dd2d4&entityId=782d7bce-f35c-433a-ab69-b840b95af1c7&dato=Agregar%20producto&appViewId=dce23cb9-423d-421f-a02f-04805e3c0ef6';
                                                                  goLocation(url);

                                                              } else {
                                                                  location.assign(
                                                                      `${url}`
                                                                  );
                                                              }
                                                          },
                                                          error: function (error) {
                                                              toastr.warning('El usuario ya se encuentra registrado en la aplicación');
                                                              console.log('El usuario ya se encuentra registrado en la aplicación rol');
                                                          }
                                                      })

                                                  },
                                                  error: function (error) {

                                                      toastr.warning('El usuario ya se encuentra registrado en la aplicación');
                                                      console.log('El usuario ya se encuentra registrado en la aplicación replicar');
                                                  }
                                              })
                                          },
                                          error: function (error) {
                                              console.log('El usuario ya se encuentra registrado en la aplicación insert user');
                                              //  toastr.warning('El usuario ya se encuentra registrado en la aplicación');
                                          }
                                      })

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
                      toastr.warning('Las contraseñas ingresadas no son iguales ');
                  }
              } else {
                  toastr.warning('Por favor ingrese todos los campos', "Atención");
              }
          }
      } else if (idVista == '8bb1e803-0a8d-4ec6-b6b9-1e596d16edbb') {
          let email = $('#email').val()
          let password = $('#password').val()
          let password2 = $('#password2').val()
          let nombreCompleto = "nombre provisional"

          let errores = document.getElementsByClassName('error')

          if (errores.length > 0) {
              toastr.warning("Hay al menos un campo ingresado incorrectamente. Validar que los campos están ingresados correctamente", "Atención")
          } else {
              if (email != '' && password != '' && password2 != '') {
                  if (password == password2) {
                      debugger

                      getToken().then(function (dataAuth) {
                          let token = dataAuth.access_token;
                          let type = dataAuth.token_type;

                          //Usuario quien solicita el req

                          //Ambiente de trabajo
                          var environment = backandGlobal.environment;
                          //dataItem
                          let queryexiste = ajaxQuery(`select * from MercaFruta_Lappiz_Comprador where Email = '${email}'`, token)
                          var bodyComprador = {
                              "Email": `${email}`,
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
                          //Nombre de la entidad
                          var entityName = 'MercaFruta_Lappiz_Comprador';
                          //Método predefinido
                          if (queryexiste.length > 0) {
                              toastr.warning('El comprador ya se encuentra registrado en la aplicación')
                              console.log('El comprador ya se encuentra registrado en la aplicación')
                          } else {
                              $.ajax({
                                  async: false,
                                  url: `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/MercaFruta_Lappiz_Comprador`,
                                  type: 'POST',
                                  data: JSON.stringify(bodyComprador),
                                  beforeSend: function (xhr) {
                                      xhr.setRequestHeader('Content-Type', 'application/json');
                                      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                                  },
                                  success: function (result) {
                                      let Id = result.Id
                                      let bodyUser = {
                                          "FullName": `${nombreCompleto}`,
                                          "Email": `${email}`,
                                          "Contrasena": `${password}`,
                                          "CompradorFk": `${Id}`,
                                          "Activo": true,
                                          "parameters": {
                                              "userId": `${sessionStorage.userId}`,
                                              "tablaId": "",
                                              "actionId": "00000000-0000-0000-0000-000000000000",
                                              "pType": "Guardar",
                                              "aType": "ffija",
                                              "environment": environment,
                                              "lappizFunctionId": "00000000-0000-0000-0000-000000000000"
                                          }
                                      }

                                      var url = `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/MercaFruta_Lappiz_Users`;
                                      //------------Insert User -------------
                                      $.ajax({
                                          async: false,
                                          url: url,
                                          type: 'POST',
                                          data: JSON.stringify(bodyUser),
                                          beforeSend: function (xhr) {
                                              xhr.setRequestHeader('Content-Type', 'application/json');
                                              xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                                          },
                                          success: function (result) {

                                              let IdUser = result.Id

                                              //--------------- Replicacion de user--------------//
                                              var BodyReplicate = {

                                                  "UserName": `${email}`,
                                                  "Email": `${email}`,
                                                  "PasswordHash": `${password}`,
                                                  "Activo": true,
                                                  "Id": `${IdUser}`

                                              }
                                              var url = `https://designertest.lappiz.io/Api/api/Users/replicate?appCode=MercaFruta_Lappiz&languageApp=es&runtime=beta`
                                              $.ajax({
                                                  async: false,
                                                  url: url,
                                                  type: 'POST',
                                                  data: JSON.stringify(BodyReplicate),
                                                  beforeSend: function (xhr) {
                                                      xhr.setRequestHeader('Content-Type', 'application/json');
                                                      //xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                                                  },
                                                  success: function (result) {

                                                      //-----------------Asignar Rol-----------
                                                      var IdTipoRol = 'd20eb7c2-cf7b-4e99-8a1b-cc4fb28294d4'
                                                      var BodyRol = [{
                                                          "idRol": `${IdTipoRol}`,
                                                          "Action": "Save"
                                                      }]
                                                      IdUser = IdUser.toUpperCase()
                                                      var url = `https://designertest.lappiz.io/Api/api/Roles/SaveChanges?idUser=${IdUser}`
                                                      $.ajax({
                                                          async: false,
                                                          url: url,
                                                          type: 'POST',
                                                          data: JSON.stringify(BodyRol),
                                                          beforeSend: function (xhr) {
                                                              xhr.setRequestHeader('Content-Type', 'application/json');
                                                              // xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                                                          },
                                                          success: function (result) {
                                                              toastr.success('Usuario registrado correctamente');
                                                              console.log('Usuario registrado correctamente');
                                                              toastr.info(`se ha enviado un correo de verificacion a ${email}`);
                                                              console.log(`se ha enviado un correo de verificacion a ${email}`);
                                                              console.log('Rol Asignado');
                                                              document.getElementById("formulario").reset();
                                                              ajaxQuery(`update LappizV2Test.dbo.AspNetUsers set EmailConfirmed = 1 where Id = ${IdUser}`)
                                                              if (location.host == 'runtimetestbeta.lappiz.io') {
                                                                  var goLocation = myService.goLocation;
                                                                  var url = 'https://runtimetestbeta.lappiz.io/#/forms?viewName=MercaFruta_Lappiz_Comprador&entityId=d1ea9c1e-2742-4ba1-b964-dd436aa9fde5&entityName=MercaFruta_Lappiz_Comprador&appViewId=268a32b8-2df4-4e86-83af-17a22c732675'
                                                                  goLocation(url);

                                                              } else {
                                                                  location.assign(
                                                                      `${url}`
                                                                  );
                                                              }
                                                          },
                                                          error: function (error) {
                                                              toastr.warning('El usuario ya se encuentra registrado en la aplicación');
                                                              console.log('El usuario ya se encuentra registrado en la aplicación rol');
                                                          }
                                                      })

                                                  },
                                                  error: function (error) {

                                                      toastr.warning('El usuario ya se encuentra registrado en la aplicación');
                                                      console.log('El usuario ya se encuentra registrado en la aplicación replicar');
                                                  }
                                              })
                                          },
                                          error: function (error) {
                                              console.log('El usuario ya se encuentra registrado en la aplicación insert user');
                                              //  toastr.warning('El usuario ya se encuentra registrado en la aplicación');
                                          }
                                      })

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
                  }
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