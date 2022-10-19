setTimeout(() => {
  var url = location.href;
  var urlSplit = url.split('appViewId=')
  var idVista = urlSplit[1];
  if (idVista == '87ad62b5-00e9-4c70-8cd6-e9461cb671a9') {
      debugger
      let pedido = []
      let objDetallePedido = JSON.parse(sessionStorage.DetallePedido)
      var urlquery = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`
      let html = ``
      let flag = 0
      let cantidad_total = 0
      let valor_total = 0
      let cant_detal
      let cant_mayor
      let cant_total

      for (let i = 0; i < objDetallePedido.length; i++) {
          var prom = `select * from MercaFruta_Lappiz_Promocion WHERE ProductoFk = '${objDetallePedido[i].ProductoFk}'`;
          var data_prom = returnQuery(prom, urlquery);
          if (data_prom.length > 0) {
              html += `<div class="row" id="${flag}">
                  <div class="col">
                      <div class="row">
                          <div class="col">
                              <img class="card-img-top" max-height="160" max-width="160" src="https://designertest.lappiz.io/Api/api/Upload/UploadImages/${objDetallePedido[i].Imagen}" alt="Card image cap">
                          </div>
                          <div class="col">
                              <div class="row">
                                  <p id="nombre-producto-${flag}">${objDetallePedido[i].Nombre}</p>
                              </div>
                              <div class="row">
                                  <div class="col">
                                      <p id="precio-producto">${(parseFloat(objDetallePedido[i].PrecioOriginal) * (100 - parseFloat(data_prom[0].Porcentaje)) / 100).toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                  </div>
                                  <div class="col">
                                      <p id="descuento-product"><del>${objDetallePedido[i].PrecioOriginal.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</del></p>
                                  </div>
                              </div>
                              <div class="row">
                                  <p id="descuento-producto">${data_prom[0].Porcentaje} %</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col">
                      <div class="btn-group btn-group-sm" role="group">
                          <button type="button" class="btn outline-light btn-sm" style="color:#6CA90E;">
                          <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-shop" viewBox="0 0 16 16">
                          <path
                              d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />/p>
                          </button>
                          <button type="button" class="btn outline-light btn-sm" style="color:#6CA90E;">
                              <p></svg> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                              class="bi bi-truck" viewBox="0 0 16 16">
                              <path
                                  d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg></p>
                          </button>
                      </div>
                  </div>
                  <div class="col">
                  <div class="btn-group btn-group-sm" role="group">
                      <button id="cantidad-producto-${flag}" type="button" class="btn verde grupo-w" disabled>${objDetallePedido[i].Cantidad}</button>
                      <div class="btn-group-vertical">
                          <button id="${flag}" type="button" class="cantidad-producto-mas btn verde btn-sm grupo">
                              <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                      class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd"
                                          d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z" />
                                  </svg></p>
                          </button>
                          <button id="${flag}" type="button" class="cantidad-producto-menos btn verde btn-sm grupo">
                              <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                      class="bi bi-chevron-compact-down" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd"
                                          d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z" />
                                  </svg></p>
                          </button>
                      </div>
                  </div>
                  </div>
                  <div class="col">
                      <p id="subtotal-producto-${flag}">${objDetallePedido[i].SubTotal.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                      <p id="subtotal-producto-flag-${flag}" style="display: none;">${objDetallePedido[i].SubTotal}</p>
                      <p id="subtotal-producto-none-${flag}" style="display: none;">${objDetallePedido[i].ValorUnitario}</p>
                  </div>
                  <div class="col">
                      <button id="${flag}" type="button" class="eliminar-producto btn outline-light btn-sm" style="color:#6CA90E;">
                          <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                  class="bi bi-trash" viewBox="0 0 16 16">
                                  <path
                                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                  <path fill-rule="evenodd"
                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                              </svg></p>
                          </button>
                  </div>
              </div>
              <hr>`

          } else {
              html += `<div class="row" id="${flag}">
                  <div class="col">
                      <div class="row">
                          <div class="col">
                              <img class="card-img-top" max-height="160" max-width="160" src="https://designertest.lappiz.io/Api/api/Upload/UploadImages/${objDetallePedido[i].Imagen}" alt="Card image cap">
                          </div>
                          <div class="col">
                              <div class="row">
                                  <p id="nombre-producto-${flag}">${objDetallePedido[i].Nombre}</p>
                              </div>
                              <div class="row">
                                  <div class="col">
                                      <p id="precio-producto">${objDetallePedido[i].ValorUnitario.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col">
                      <div class="btn-group btn-group-sm" role="group">
                          <button type="button" class="btn outline-light btn-sm" style="color:#6CA90E;">
                          <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-shop" viewBox="0 0 16 16">
                          <path
                              d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />/p>
                          </button>
                          <button type="button" class="btn outline-light btn-sm" style="color:#6CA90E;">
                              <p></svg> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                              class="bi bi-truck" viewBox="0 0 16 16">
                              <path
                                  d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg></p>
                          </button>
                      </div>
                  </div>
                  <div class="col">
                  <div class="btn-group btn-group-sm" role="group">
                      <button id="cantidad-producto-${flag}" type="button" class="btn verde grupo-w" disabled>${objDetallePedido[i].Cantidad}</button>
                      <div class="btn-group-vertical">
                          <button id="${flag}" type="button" class="cantidad-producto-mas btn verde btn-sm grupo">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                      class="bi bi-chevron-compact-up" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd"
                                          d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z" />
                                  </svg>
                          </button>
                          <button id="${flag}" type="button" class="cantidad-producto-menos btn verde btn-sm grupo">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                      class="bi bi-chevron-compact-down" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd"
                                          d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z" />
                                  </svg>
                          </button>
                      </div>
                  </div>
                  </div>
                  <div class="col">
                      <p id="subtotal-producto-${flag}">${objDetallePedido[i].SubTotal.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                      <p id="subtotal-producto-flag-${flag}" style="display: none;">${objDetallePedido[i].SubTotal}</p>
                      <p id="subtotal-producto-none-${flag}" style="display: none;">${objDetallePedido[i].ValorUnitario}</p>
                  </div>
                  <div class="col">
                      <button id="${flag}" type="button" class="eliminar-producto btn outline-light btn-sm" style="color:#6CA90E;">
                          <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                  class="bi bi-trash" viewBox="0 0 16 16">
                                  <path
                                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                  <path fill-rule="evenodd"
                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                              </svg></p>
                          </button>
                  </div>
              </div>
              <hr>`
          }
          flag++
          cantidad_total += objDetallePedido[i].Cantidad
          valor_total += objDetallePedido[i].SubTotal

      }

      setTimeout(() => {

          $('.cantidad-producto-menos').ready(() => {
              $('.cantidad-producto-menos').on("click", function () {
                  debugger
                  let i = $(this).attr('id')
                  cant_detal = objDetallePedido[i].CantidadDetal != undefined ? objDetallePedido[i].CantidadDetal : -1
                  cant_mayor = objDetallePedido[i].CantidadMayor != undefined ? objDetallePedido[i].CantidadMayor : -1
                  cant_total = objDetallePedido[i].CantidadTotal
                  let cant = parseFloat($(`#cantidad-producto-${i}`).text())
                  let precio_flag = 0
                  let precio_none = 0
                  if (cant_detal != -1) {
                      if (cant > 1) {
                          $(`#cantidad-producto-${i}`).text('')
                          $(`#cantidad-producto-${i}`).text(cant - 1)
                          objDetallePedido[i].Cantidad--
                          cant_detal++
                          cant_total++
                          objDetallePedido[i].CantidadDetal = cant_detal
                          objDetallePedido[i].CantidadTotal = cant_total
                          cantidad_total--
                          precio_flag = parseFloat($(`#subtotal-producto-flag-${i}`).text()) //temporal
                          precio_none = parseFloat($(`#subtotal-producto-none-${i}`).text()) //DB
                          precio_flag -= precio_none
                          valor_total -= precio_none
                          $(`#subtotal-producto-flag-${i}`).text('')
                          $(`#subtotal-producto-flag-${i}`).text(`${precio_flag}`)
                          $(`#subtotal-producto-${i}`).text('')
                          $(`#subtotal-producto-${i}`).text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                      }
                      $('#total-productos').ready(() => {
                          $('#total-productos').text('')
                          $('#total-productos').text(cantidad_total)
                          $('#precio-total').text('')
                          $('#precio-total').text(valor_total.toLocaleString('es-CO', { currency: 'COP', style: 'currency' }))
                      })
                      if (objDetallePedido.length != 0) {
                          sessionStorage.DetallePedido = JSON.stringify(objDetallePedido)
                      } else {
                          sessionStorage.removeItem('DetallePedido')
                      }
                  }
                  if (cant_mayor != -1) {
                      if (cant > 1) {
                          $(`#cantidad-producto-${i}`).text('')
                          $(`#cantidad-producto-${i}`).text(cant - 1)
                          objDetallePedido[i].Cantidad--
                          cant_mayor++
                          cant_total++
                          objDetallePedido[i].CantidadMayor = cant_mayor
                          objDetallePedido[i].CantidadTotal = cant_total
                          cantidad_total--
                          precio_flag = parseFloat($(`#subtotal-producto-flag-${i}`).text()) //temporal
                          precio_none = parseFloat($(`#subtotal-producto-none-${i}`).text()) //DB
                          precio_flag -= precio_none
                          valor_total -= precio_none
                          $(`#subtotal-producto-flag-${i}`).text('')
                          $(`#subtotal-producto-flag-${i}`).text(`${precio_flag}`)
                          $(`#subtotal-producto-${i}`).text('')
                          $(`#subtotal-producto-${i}`).text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                      }
                      $('#total-productos').ready(() => {
                          $('#total-productos').text('')
                          $('#total-productos').text(cantidad_total)
                          $('#precio-total').text('')
                          $('#precio-total').text(valor_total.toLocaleString('es-CO', { currency: 'COP', style: 'currency' }))
                      })
                      if (objDetallePedido.length != 0) {
                          sessionStorage.DetallePedido = JSON.stringify(objDetallePedido)
                      } else {
                          sessionStorage.removeItem('DetallePedido')
                      }
                  }
              })
          })
          $('.cantidad-producto-mas').ready(() => {
              $('.cantidad-producto-mas').on("click", function () {
                  debugger
                  let i = $(this).attr('id')
                  cant_detal = objDetallePedido[i].CantidadDetal != undefined ? objDetallePedido[i].CantidadDetal : -1
                  cant_mayor = objDetallePedido[i].CantidadMayor != undefined ? objDetallePedido[i].CantidadMayor : -1
                  cant_total = objDetallePedido[i].CantidadTotal
                  let precio_flag = 0
                  let precio_none = 0
                  let cant = parseFloat($(`#cantidad-producto-${i}`).text())
                  if (cant_detal != -1) {
                      if (cant < cant_detal) {
                          $('.cantidad-producto-mas').attr('disabled', false)
                          $(`#cantidad-producto-${i}`).text('')
                          $(`#cantidad-producto-${i}`).text(cant + 1)
                          cant_detal--
                          cant_total--
                          objDetallePedido[i].Cantidad++
                          objDetallePedido[i].CantidadDetal = cant_detal
                          objDetallePedido[i].CantidadTotal = cant_total
                          cantidad_total++
                          precio_flag = parseFloat($(`#subtotal-producto-flag-${i}`).text()) //temporal
                          precio_none = parseFloat($(`#subtotal-producto-none-${i}`).text()) //DB
                          precio_flag += precio_none
                          valor_total += precio_none
                          $(`#subtotal-producto-flag-${i}`).text('')
                          $(`#subtotal-producto-flag-${i}`).text(`${precio_flag}`)
                          $(`#subtotal-producto-${i}`).text('')
                          $(`#subtotal-producto-${i}`).text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                          $('#total-productos').ready(() => {
                              $('#total-productos').text('')
                              $('#total-productos').text(cantidad_total)
                              $('#precio-total').text('')
                              $('#precio-total').text(valor_total.toLocaleString('es-CO', { currency: 'COP', style: 'currency' }))
                          })
                          sessionStorage.DetallePedido = JSON.stringify(objDetallePedido)
                      } else {
                          $('.cantidad-producto-mas').attr('disabled', true)
                      }
                  }
                  if (cant_mayor != -1) {
                      if (cant < cant_mayor) {
                          $('.cantidad-producto-mas').attr('disabled', false)
                          $(`#cantidad-producto-${i}`).text('')
                          $(`#cantidad-producto-${i}`).text(cant + 1)
                          cant_mayor--
                          cant_total--
                          objDetallePedido[i].Cantidad++
                          objDetallePedido[i].CantidadMayor = cant_mayor
                          objDetallePedido[i].CantidadTotal = cant_total
                          cantidad_total++
                          precio_flag = parseFloat($(`#subtotal-producto-flag-${i}`).text()) //temporal
                          precio_none = parseFloat($(`#subtotal-producto-none-${i}`).text()) //DB
                          precio_flag += precio_none
                          valor_total += precio_none
                          $(`#subtotal-producto-flag-${i}`).text('')
                          $(`#subtotal-producto-flag-${i}`).text(`${precio_flag}`)
                          $(`#subtotal-producto-${i}`).text('')
                          $(`#subtotal-producto-${i}`).text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                          $('#total-productos').ready(() => {
                              $('#total-productos').text('')
                              $('#total-productos').text(cantidad_total)
                              $('#precio-total').text('')
                              $('#precio-total').text(valor_total.toLocaleString('es-CO', { currency: 'COP', style: 'currency' }))
                          })
                          sessionStorage.DetallePedido = JSON.stringify(objDetallePedido)
                      } else {
                          $('.cantidad-producto-mas').attr('disabled', true)
                      }
                  }
              })
          })

          $('#total-productos').ready(() => {
              $('#total-productos').text('')
              $('#total-productos').text(cantidad_total)
          })
          $('#precio-total').ready(() => {
              $('#precio-total').text('')
              $('#precio-total').text(valor_total.toLocaleString('es-CO', { currency: 'COP', style: 'currency' }))
          })

      }, 1500)

      setTimeout(() => {
          $('.eliminar-producto').ready(() => {
              $('.eliminar-producto').on("click", function () {
                  debugger
                  let i = parseInt($(this).attr('id'))
                  let buscar = objDetallePedido.find(x => x.Nombre === $(`#nombre-producto-${i}`).text())
                  let indice = objDetallePedido.indexOf(buscar)
                  cant_detal = objDetallePedido[indice].CantidadDetal != undefined ? objDetallePedido[indice].CantidadDetal : -1
                  cant_mayor = objDetallePedido[indice].CantidadMayor != undefined ? objDetallePedido[indice].CantidadMayor : -1
                  cant_total = objDetallePedido[indice].CantidadTotal
                  let cant_prod = 0
                  let cant_prod_total = 0
                  let precio = 0
                  let precio_total = 0
                  cant_prod = parseFloat($(`#cantidad-producto-${i}`).text())
                  cant_prod_total = parseInt($('#total-productos').text())
                  if (cant_detal != -1) {
                      cant_prod_total -= cant_prod
                      cantidad_total = cant_prod_total
                      cant_detal += cant_prod
                      cant_total += cant_prod
                      objDetallePedido[indice].CantidadDetal = cant_detal
                      objDetallePedido[indice].CantidadTotal = cant_total
                      objDetallePedido[indice].Eliminado = true
                      precio = parseFloat($(`#subtotal-producto-flag-${i}`).text())
                      precio_total = valor_total
                      precio_total -= precio
                      valor_total = precio_total
                      $('#total-productos').ready(() => {
                          $('#total-productos').text('')
                          $('#total-productos').text(cant_prod_total)
                          $('#precio-total').text('')
                          $('#precio-total').text(precio_total.toLocaleString('es-CO', { currency: 'COP', style: 'currency' }))
                      })
                      $(`#${i}`).remove()
                      objDetallePedido.splice(indice, 1)
                      if (objDetallePedido.length != 0) {
                          sessionStorage.DetallePedido = JSON.stringify(objDetallePedido)
                      } else {
                          sessionStorage.removeItem('DetallePedido')
                      }
                      toastr.warning('Producto eliminado del carrito', '')
                  }
                  if (cant_mayor != -1) {
                      cant_prod_total -= cant_prod
                      cantidad_total = cant_prod_total
                      cant_mayor += cant_prod
                      cant_total += cant_prod
                      objDetallePedido[indice].CantidadMayor = cant_mayor
                      objDetallePedido[indice].CantidadTotal = cant_total
                      objDetallePedido[indice].Eliminado = true
                      precio = parseFloat($(`#subtotal-producto-flag-${i}`).text())
                      precio_total = valor_total
                      precio_total -= precio
                      valor_total = precio_total
                      $('#total-productos').ready(() => {
                          $('#total-productos').text('')
                          $('#total-productos').text(cant_prod_total)
                          $('#precio-total').text('')
                          $('#precio-total').text(precio_total.toLocaleString('es-CO', { currency: 'COP', style: 'currency' }))
                      })
                      $(`#${i}`).remove()
                      objDetallePedido.splice(indice, 1)
                      if (objDetallePedido.length != 0) {
                          sessionStorage.DetallePedido = JSON.stringify(objDetallePedido)
                      } else {
                          sessionStorage.removeItem('DetallePedido')
                      }
                      toastr.warning('Producto eliminado del carrito', '')
                  }
              })
          })
      }, 1500)


      $('#col-carrito').append(html)

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
  }
}, 1500)