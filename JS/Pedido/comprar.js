setTimeout(() => {
  var url = location.href;
  var urlSplit = url.split('appViewId=')
  var idVista = urlSplit[1];
  if (idVista == '87ad62b5-00e9-4c70-8cd6-e9461cb671a9') {
      debugger
      setTimeout(() => {
          $('#boton-comprar').ready(() => {
              $('#boton-comprar').on("click", function () {
                  if (JSON.parse(sessionStorage.LappizUser).CompradorFk !== null) {
                      let compradorId = JSON.parse(sessionStorage.LappizUser).CompradorFk
                      var urlquery = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`
                      var comprador = `select NumeroDocumento from MercaFruta_Lappiz_Comprador WHERE Id = '${compradorId}'`;
                      var data = returnQuery(comprador, urlquery);
                      if (!data || data.length === 0) {
                          debugger
                          toastr.warning('Debe completar sus datos')
                          var url = `https://runtimetestbeta.lappiz.io/#/forms?rowId=${JSON.parse(sessionStorage.LappizUser).CompradorFk}&viewName=MercaFruta_Lappiz_Comprador&entityId=d1ea9c1e-2742-4ba1-b964-dd436aa9fde5&appViewId=fd31855a-35d4-4e9a-ba99-c1e036e9583f`
                          goLocation(url);
                      } else {

                          debugger

                          var urlquery = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`
                          let objDetallePedido = JSON.parse(sessionStorage.DetallePedido)
                          let MercaFruta_Lappiz_DetallePedido = []
                          let obj_detallepedido = {}
                          let obj_pedido = {}
                          let items = []
                          let obj_items = {}

                          const date = new Date();
                          const [month, day, year] = [("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2), date.getFullYear()];
                          const [hour, minutes, seconds, mili] = [("0" + date.getHours()).slice(-2), ("0" + date.getMinutes()).slice(-2), date.getSeconds(), date.getMilliseconds()]
                          let datestring = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}.${mili}`

                          let tipo_cliente = objDetallePedido[0].TipoCliente == 'CompradorFk' ? 'CompradorFk' : 'ProveedorFk'
                          let cliente_fk = objDetallePedido[0].ClienteId
                          let total = 0
                          let payer = {}
                          let obj_config = {}

                          for (let i = 0; i < objDetallePedido.length; i++) {
                              obj_detallepedido = {
                                  Cantidad: objDetallePedido[i].Cantidad,
                                  ProductoFk: objDetallePedido[i].ProductoFk,
                                  ValorUnitario: objDetallePedido[i].ValorUnitario,
                                  SubTotal: objDetallePedido[i].SubTotal
                              }
                              total += objDetallePedido[i].SubTotal
                              MercaFruta_Lappiz_DetallePedido.push(obj_detallepedido)

                          }

                          if (tipo_cliente == 'CompradorFk') {
                              var products = `select * from MercaFruta_Lappiz_Comprador WHERE Id = '${cliente_fk}'`;
                              var data = returnQuery(products, urlquery);
                              let q_pais = `select * from MercaFruta_Lappiz_Pais WHERE Nombre = '${data[0].Pais}'`
                              // let q = returnQuery(q_pais, urlquery)
                              // let code_pais = q[0].PhoneCode
                              obj_pedido = {
                                  Fecha: datestring,
                                  TotalFactura: total,
                                  CompradorFk: cliente_fk,
                                  NombreCliente: data[0].Nombre,
                                  Created_by: `${sessionStorage.userId}`,
                                  EventType: "Insertar",
                                  Edited_by: `${sessionStorage.userId}`,
                                  tenantId: "null",
                                  MercaFruta_Lappiz_DetallePedido,
                                  parameters: {
                                      "userId": `${sessionStorage.userId}`,
                                      "appViewId": `${idVista}`,
                                      "pType": "Guardar",
                                      "aType": "view",
                                      "environment": "TEST"
                                  }
                              }
                              payer = {
                                  name: data[0].Nombre,
                                  surname: data[0].Apellido,
                                  email: data[0].Email,
                                  phone: {
                                      // area_code: code_pais,
                                      // number: data[0].Telefono,
                                  },
                                  identification: {
                                      type: "type", //----------------------------------buscar en api de mercadopago
                                      number: data[0].NumeroDocumento,
                                  },
                                  address: {
                                      street_name: data[0].Direccion
                                  }
                              }
                          } else {
                              var products = `select * from MercaFruta_Lappiz_Proveedor WHERE Id = '${cliente_fk}'`;
                              var data = returnQuery(products, urlquery);
                              let q_pais = `select * from MercaFruta_Lappiz_Pais WHERE Nombre = '${data[0].Pais}'`
                              let q = returnQuery(q_pais, urlquery)
                              let code_pais = q[0].PhoneCode
                              obj_pedido = {
                                  Fecha: datestring,
                                  TotalFactura: total,
                                  ProveedorFk: cliente_fk,
                                  NombreCliente: data[0].Nombre,
                                  Created_by: `${sessionStorage.userId}`,
                                  EventType: "Insertar",
                                  Edited_by: `${sessionStorage.userId}`,
                                  tenantId: "null",
                                  MercaFruta_Lappiz_DetallePedido,
                                  parameters: {
                                      "userId": `${sessionStorage.userId}`,
                                      "appViewId": `${idVista}`,
                                      "pType": "Guardar",
                                      "aType": "view",
                                      "environment": "TEST"
                                  }
                              }
                              payer = {
                                  name: data[0].Nombre,
                                  surname: data[0].Apellido,
                                  email: data[0].Email,
                                  phone: {
                                      area_code: code_pais,
                                      number: data[0].Telefono,
                                  },
                                  identification: {
                                      type: "type", //----------------------------------buscar en api de mercadopago
                                      number: data[0].NumeroDocumento,
                                  },
                                  address: {
                                      street_name: data[0].Direccion
                                  }
                              }
                          }

                          if (obj_pedido != '') {
                              getToken().then(function (dataAuth) {
                                  let token = dataAuth.access_token;
                                  $.ajax({
                                      async: false,
                                      url: `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/MercaFruta_Lappiz_Pedido`,
                                      type: 'POST',
                                      data: JSON.stringify(obj_pedido),
                                      beforeSend: function (xhr) {
                                          xhr.setRequestHeader('Content-Type', 'application/json');
                                          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                                      },
                                      success: function (result) {
                                          let pedidoId = result.Id
                                          obj_config.pedidoId = pedidoId
                                          for (let i = 0; i < result.MercaFruta_Lappiz_DetallePedido.length; i++) {
                                              var detallePedido = `UPDATE MercaFruta_Lappiz_DetallePedido SET ProductoFK = '${MercaFruta_Lappiz_DetallePedido[i].ProductoFk}' WHERE Id = '${result.MercaFruta_Lappiz_DetallePedido[i].Id}'`;
                                              var data = returnQuery(detallePedido, urlquery);
                                          }
                                          sessionStorage.removeItem('DetallePedido')
                                      },
                                      error: function (error) {
                                          console.log('Error al añadir el pedido')
                                          console.log(error)
                                      }
                                  })

                              }, function (error) {
                                  toastr.warning("Hubo un inconveniente al intentar obtener el token");
                                  console.log("Hubo un inconveniente al intentar obtener el token");
                                  console.log(error)
                              });
                          }

                          let cant_detal_gr = 0
                          let cant_detal_kg = 0
                          let cant_mayor_kg = 0
                          let cant_mayor_ton = 0
                          let cant_total_mayor = 0
                          let cant_total_detal = 0

                          for (let i = 0; i < objDetallePedido.length; i++) {
                              obj_items = {
                                  id: objDetallePedido[i].ProductoFk,
                                  title: objDetallePedido[i].Nombre,
                                  category_id: "others",
                                  quantity: objDetallePedido[i].Cantidad,
                                  currency_id: "COP",
                                  unit_price: objDetallePedido[i].ValorUnitario
                              }
                              items.push(obj_items)
                              if (objDetallePedido[i].CantidadMayor != undefined) {
                                  if (objDetallePedido[i].PesoMayor == 'kg') {
                                      cant_mayor_kg += objDetallePedido[i].CantidadMayor
                                  } else {
                                      cant_mayor_ton += objDetallePedido[i].CantidadMayor
                                  }
                                  let upd_q = `UPDATE MercaFruta_Lappiz_Productos SET CantidadMayor = ${objDetallePedido[i].CantidadMayor}, CantidadTotal = ${objDetallePedido[i].CantidadTotal} WHERE Id = '${objDetallePedido[i].ProductoFk}'`
                                  let upd_q_r = returnQuery(upd_q, urlquery)
                              }
                              if (objDetallePedido[i].CantidadDetal != undefined) {
                                  if (objDetallePedido[i].PesoDetal == 'kg') {
                                      cant_detal_kg += objDetallePedido[i].CantidadDetal
                                  } else {
                                      cant_detal_gr += objDetallePedido[i].CantidadDetal
                                  }
                                  let upd_q = `UPDATE MercaFruta_Lappiz_Productos SET CantidadDetal = ${objDetallePedido[i].CantidadDetal}, CantidadTotal = ${objDetallePedido[i].CantidadTotal} WHERE Id = '${objDetallePedido[i].ProductoFk}'`
                                  let upd_q_r = returnQuery(upd_q, urlquery)
                              }

                          }

                          cant_total_detal = (cant_detal_gr / 1000000) + (cant_detal_kg / 1000)
                          cant_total_mayor = cant_mayor_ton + (cant_mayor_kg / 1000)

                          if (cant_total_detal >= 1 || cant_total_mayor >= 1) {
                              var url = "https://runtimetestbeta.lappiz.io/#/forms?viewName=MercaFruta_Lappiz_Contrato&entityId=f99fce85-0e96-438c-9a57-e3e3a4697eb8&entityName=MercaFruta_Lappiz_Contrato&appViewId=fe5fe785-b651-4639-90e5-19c225ea040d"
                              goLocation(url);
                          }

                          obj_config.items = items
                          obj_config.payer = payer
                          let id_mp
                          let url_sandbox

                          // if (obj_config.length > 0) {
                          //     $.ajax({
                          //         async: false,
                          //         url: `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/functions/nombre de la función -------------`,
                          //         type: 'POST',
                          //         data: JSON.stringify(obj_config),
                          //         beforeSend: function (xhr) {
                          //             xhr.setRequestHeader('Content-Type', 'application/json');
                          //             xhr.setRequestHeader("Authorization", localStorage.Authorization);
                          //         },
                          //         success: function (result) {
                          //             id_mp = result.id
                          //             url_sandbox = result.sandbox_init_point
                          //         },
                          //         error: function (error) {
                          //             console.log('Error')
                          //             console.log(error)
                          //         }
                          //     })
                          // }

                          // const mp = new MercadoPago('TEST-cbe417ba-f603-46b3-92c3-29ba3d6801d7', {
                          //     locale: 'es-CO'
                          // });

                          // // Inicializa el checkout
                          // mp.checkout({
                          //     preference: {
                          //         id: "YOUR_PREFERENCE_ID",
                          //     },
                          //     render: {
                          //         container: ".cho-container", // Indica el nombre de la clase donde se mostrará el botón de pago
                          //         label: "Pagar", // Cambia el texto del botón de pago (opcional)
                          //     },
                          // });

                          // fetch("/create_preference", {
                          //     method: "POST",
                          //     headers: {
                          //         "Content-Type": "application/json",
                          //     },
                          //     body: JSON.stringify(DetallePedido),
                          // })
                          //     .then(function (response) {
                          //         return response.json();
                          //     })
                          //     .then(function (preference) {
                          //         createCheckoutButton(preference.id);

                          //         $(".shopping-cart").fadeOut(500);
                          //         setTimeout(() => {
                          //             $(".container_payment").show(500).fadeIn();
                          //         }, 500);
                          //     })
                          //     .catch(function () {
                          //         alert("Unexpected error");
                          //         $('#boton-comprar').attr("disabled", false);
                          //     });

                          // function createCheckoutButton(preferenceId) {
                          //     // Initialize the checkout
                          //     mercadopago.checkout({
                          //         preference: {
                          //             id: preferenceId
                          //         },
                          //         render: {
                          //             container: '#button-checkout', // Class name where the payment button will be displayed
                          //             label: 'Pay', // Change the payment button text (optional)
                          //         }
                          //     });
                          // }
                      }
                  } else {

                      debugger

                      var urlquery = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`
                      let objDetallePedido = JSON.parse(sessionStorage.DetallePedido)
                      let MercaFruta_Lappiz_DetallePedido = []
                      let obj_detallepedido = {}
                      let obj_pedido = {}
                      let items = []
                      let obj_items = {}

                      const date = new Date();
                      const [month, day, year] = [("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2), date.getFullYear()];
                      const [hour, minutes, seconds, mili] = [("0" + date.getHours()).slice(-2), ("0" + date.getMinutes()).slice(-2), date.getSeconds(), date.getMilliseconds()]
                      let datestring = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}.${mili}`

                      let tipo_cliente = objDetallePedido[0].TipoCliente == 'CompradorFk' ? 'CompradorFk' : 'ProveedorFk'
                      let cliente_fk = objDetallePedido[0].ClienteId
                      let total = 0
                      let payer = {}
                      let obj_config = {}

                      for (let i = 0; i < objDetallePedido.length; i++) {
                          obj_detallepedido = {
                              Cantidad: objDetallePedido[i].Cantidad,
                              ProductoFk: objDetallePedido[i].ProductoFk,
                              ValorUnitario: objDetallePedido[i].ValorUnitario,
                              SubTotal: objDetallePedido[i].SubTotal
                          }
                          total += objDetallePedido[i].SubTotal
                          MercaFruta_Lappiz_DetallePedido.push(obj_detallepedido)

                      }

                      if (tipo_cliente == 'CompradorFk') {
                          var products = `select * from MercaFruta_Lappiz_Comprador WHERE Id = '${cliente_fk}'`;
                          var data = returnQuery(products, urlquery);
                          let q_pais = `select * from MercaFruta_Lappiz_Pais WHERE Nombre = '${data[0].Pais}'`
                          let q = returnQuery(q_pais, urlquery)
                          let code_pais = q[0].PhoneCode
                          obj_pedido = {
                              Fecha: datestring,
                              TotalFactura: total,
                              CompradorFk: cliente_fk,
                              NombreCliente: data[0].Nombre,
                              Created_by: `${sessionStorage.userId}`,
                              EventType: "Insertar",
                              Edited_by: `${sessionStorage.userId}`,
                              tenantId: "null",
                              MercaFruta_Lappiz_DetallePedido,
                              parameters: {
                                  "userId": `${sessionStorage.userId}`,
                                  "appViewId": `${idVista}`,
                                  "pType": "Guardar",
                                  "aType": "view",
                                  "environment": "TEST"
                              }
                          }
                          payer = {
                              name: data[0].Nombre,
                              surname: data[0].Apellido,
                              email: data[0].Email,
                              phone: {
                                  area_code: code_pais,
                                  number: data[0].Telefono,
                              },
                              identification: {
                                  type: "type", //----------------------------------buscar en api de mercadopago
                                  number: data[0].NumeroDocumento,
                              },
                              address: {
                                  street_name: data[0].Direccion
                              }
                          }
                      } else {
                          var products = `select * from MercaFruta_Lappiz_Proveedor WHERE Id = '${cliente_fk}'`;
                          var data = returnQuery(products, urlquery);
                          let q_pais = `select * from MercaFruta_Lappiz_Pais WHERE Nombre = '${data[0].Pais}'`
                          let q = returnQuery(q_pais, urlquery)
                          let code_pais = q[0].PhoneCode
                          obj_pedido = {
                              Fecha: datestring,
                              TotalFactura: total,
                              ProveedorFk: cliente_fk,
                              NombreCliente: data[0].Nombre,
                              Created_by: `${sessionStorage.userId}`,
                              EventType: "Insertar",
                              Edited_by: `${sessionStorage.userId}`,
                              tenantId: "null",
                              MercaFruta_Lappiz_DetallePedido,
                              parameters: {
                                  "userId": `${sessionStorage.userId}`,
                                  "appViewId": `${idVista}`,
                                  "pType": "Guardar",
                                  "aType": "view",
                                  "environment": "TEST"
                              }
                          }
                          payer = {
                              name: data[0].Nombre,
                              surname: data[0].Apellido,
                              email: data[0].Email,
                              phone: {
                                  area_code: code_pais,
                                  number: data[0].Telefono,
                              },
                              identification: {
                                  type: "type", //----------------------------------buscar en api de mercadopago
                                  number: data[0].NumeroDocumento,
                              },
                              address: {
                                  street_name: data[0].Direccion
                              }
                          }
                      }

                      if (obj_pedido != '') {
                          getToken().then(function (dataAuth) {
                              let token = dataAuth.access_token;
                              $.ajax({
                                  async: false,
                                  url: `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/MercaFruta_Lappiz_Pedido`,
                                  type: 'POST',
                                  data: JSON.stringify(obj_pedido),
                                  beforeSend: function (xhr) {
                                      xhr.setRequestHeader('Content-Type', 'application/json');
                                      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                                  },
                                  success: function (result) {
                                      let pedidoId = result.Id
                                      obj_config.pedidoId = pedidoId
                                      for (let i = 0; i < result.MercaFruta_Lappiz_DetallePedido.length; i++) {
                                          var detallePedido = `UPDATE MercaFruta_Lappiz_DetallePedido SET ProductoFK = '${MercaFruta_Lappiz_DetallePedido[i].ProductoFk}' WHERE Id = '${result.MercaFruta_Lappiz_DetallePedido[i].Id}'`;
                                          var data = returnQuery(detallePedido, urlquery);
                                      }
                                      sessionStorage.removeItem('DetallePedido')
                                  },
                                  error: function (error) {
                                      console.log('Error al añadir el pedido')
                                      console.log(error)
                                  }
                              })

                          }, function (error) {
                              toastr.warning("Hubo un inconveniente al intentar obtener el token");
                              console.log("Hubo un inconveniente al intentar obtener el token");
                              console.log(error)
                          });
                      }

                      let cant_detal_gr = 0
                      let cant_detal_kg = 0
                      let cant_mayor_kg = 0
                      let cant_mayor_ton = 0
                      let cant_total_mayor = 0
                      let cant_total_detal = 0

                      for (let i = 0; i < objDetallePedido.length; i++) {
                          obj_items = {
                              id: objDetallePedido[i].ProductoFk,
                              title: objDetallePedido[i].Nombre,
                              category_id: "others",
                              quantity: objDetallePedido[i].Cantidad,
                              currency_id: "COP",
                              unit_price: objDetallePedido[i].ValorUnitario
                          }
                          items.push(obj_items)
                          if (objDetallePedido[i].CantidadMayor != undefined) {
                              if (objDetallePedido[i].PesoMayor == 'kg') {
                                  cant_mayor_kg += objDetallePedido[i].CantidadMayor
                              } else {
                                  cant_mayor_ton += objDetallePedido[i].CantidadMayor
                              }
                              let upd_q = `UPDATE MercaFruta_Lappiz_Productos SET CantidadMayor = ${objDetallePedido[i].CantidadMayor}, CantidadTotal = ${objDetallePedido[i].CantidadTotal} WHERE Id = '${objDetallePedido[i].ProductoFk}'`
                              let upd_q_r = returnQuery(upd_q, urlquery)
                          }
                          if (objDetallePedido[i].CantidadDetal != undefined) {
                              if (objDetallePedido[i].PesoDetal == 'kg') {
                                  cant_detal_kg += objDetallePedido[i].CantidadDetal
                              } else {
                                  cant_detal_gr += objDetallePedido[i].CantidadDetal
                              }
                              let upd_q = `UPDATE MercaFruta_Lappiz_Productos SET CantidadDetal = ${objDetallePedido[i].CantidadDetal}, CantidadTotal = ${objDetallePedido[i].CantidadTotal} WHERE Id = '${objDetallePedido[i].ProductoFk}'`
                              let upd_q_r = returnQuery(upd_q, urlquery)
                          }

                      }

                      cant_total_detal = (cant_detal_gr / 1000000) + (cant_detal_kg / 1000)
                      cant_total_mayor = cant_mayor_ton + (cant_mayor_kg / 1000)

                      if (cant_total_detal >= 1 || cant_total_mayor >= 1) {
                          var url = "https://runtimetestbeta.lappiz.io/#/forms?viewName=MercaFruta_Lappiz_Contrato&entityId=f99fce85-0e96-438c-9a57-e3e3a4697eb8&entityName=MercaFruta_Lappiz_Contrato&appViewId=fe5fe785-b651-4639-90e5-19c225ea040d"
                          goLocation(url);
                      }

                      obj_config.items = items
                      obj_config.payer = payer
                      let id_mp
                      let url_sandbox

                      // if (obj_config.length > 0) {
                      //     $.ajax({
                      //         async: false,
                      //         url: `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/functions/nombre de la función -------------`,
                      //         type: 'POST',
                      //         data: JSON.stringify(obj_config),
                      //         beforeSend: function (xhr) {
                      //             xhr.setRequestHeader('Content-Type', 'application/json');
                      //             xhr.setRequestHeader("Authorization", localStorage.Authorization);
                      //         },
                      //         success: function (result) {
                      //             id_mp = result.id
                      //             url_sandbox = result.sandbox_init_point
                      //         },
                      //         error: function (error) {
                      //             console.log('Error')
                      //             console.log(error)
                      //         }
                      //     })
                      // }

                      // const mp = new MercadoPago('TEST-cbe417ba-f603-46b3-92c3-29ba3d6801d7', {
                      //     locale: 'es-CO'
                      // });

                      // // Inicializa el checkout
                      // mp.checkout({
                      //     preference: {
                      //         id: "YOUR_PREFERENCE_ID",
                      //     },
                      //     render: {
                      //         container: ".cho-container", // Indica el nombre de la clase donde se mostrará el botón de pago
                      //         label: "Pagar", // Cambia el texto del botón de pago (opcional)
                      //     },
                      // });

                      // fetch("/create_preference", {
                      //     method: "POST",
                      //     headers: {
                      //         "Content-Type": "application/json",
                      //     },
                      //     body: JSON.stringify(DetallePedido),
                      // })
                      //     .then(function (response) {
                      //         return response.json();
                      //     })
                      //     .then(function (preference) {
                      //         createCheckoutButton(preference.id);

                      //         $(".shopping-cart").fadeOut(500);
                      //         setTimeout(() => {
                      //             $(".container_payment").show(500).fadeIn();
                      //         }, 500);
                      //     })
                      //     .catch(function () {
                      //         alert("Unexpected error");
                      //         $('#boton-comprar').attr("disabled", false);
                      //     });

                      // function createCheckoutButton(preferenceId) {
                      //     // Initialize the checkout
                      //     mercadopago.checkout({
                      //         preference: {
                      //             id: preferenceId
                      //         },
                      //         render: {
                      //             container: '#button-checkout', // Class name where the payment button will be displayed
                      //             label: 'Pay', // Change the payment button text (optional)
                      //         }
                      //     });
                      // }
                  }
              })
          })
      }, 1500);

      function returnQuery(Query, urlquery) {
          debugger;
          var Response = ''
          $.ajax({
              async: false,
              url: urlquery,
              type: 'POST',
              data: JSON.stringify({
                  query: Query,
                  parameters: {
                      aType: "execTx",
                      environment: `${backandGlobal.environment}`
                  }
              }),
              beforeSend: function (xhr) {
                  xhr.setRequestHeader('Content-Type', 'application/json');
                  xhr.setRequestHeader("Authorization", localStorage.Authorization);
              },
              success: function (x) {
                  Response = x[0];
              }
          });
          return Response;
      }

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

  }
}, 1000)