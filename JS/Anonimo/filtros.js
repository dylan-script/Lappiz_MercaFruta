setTimeout(() => {

  var url = location.href;
  var urlSplit = url.split('appViewId=')
  var idVista = urlSplit[1];
  if (idVista == '1e39996a-8b35-43fb-a956-1395c098acc0') {
      //Filtro general
      $('#boton-buscar').ready(() => {
          $('#boton-buscar').click(() => {
              let palabra = $('#buscar').val()
              if (palabra != '') {


                  //var urltoken = `${backandGlobal.url}/token`;
                  var urlquery = `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/sp/query`
                  var products = `select * from MercaFruta_Lappiz_Productos WHERE Nombre LIKE '%${palabra}%' order by Nombre asc`;
                  var data = returnQuery(products, urlquery);

                  let tama = data.length
                  $('#resultado_busqueda').text(`1 - ${tama} de ${tama}`)
                  let div = Math.floor(tama / 3)
                  let mod = tama % 3
                  let c = 0


                  $('#col-agregar').remove()
                  $('#col-parent').append('<div id="col-agregar"></div>')
                  let html = ``

                  for (let j = 0; j < div; j++) {
                      html += `<div class="row">`
                      for (let i = 0; i < 3; i++) {
                          html += `
                          <div class="col">
                              <div class="card-deck">
                                  <div class="card">
                                      <img class="card-img-top" src="" alt="Card image cap">
                                      <div class="card-body">
                                          <h5 class="card-title">${data[c].Nombre} x cantidad</h5>
                                          <p class="card-text">${data[c].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                          <button id="${c}" class="btn-open-modal btn back-verde" style="color: white;">Agregar</button>
                                      </div>
                                  </div>
                              </div>
                          </div>`
                          c++
                      }
                      html += `</div>`
                  }
                  html += `<div class="row">`
                  for (let i = 0; i < mod; i++) {
                      html += `
                      <div class="col">
                          <div class="card-deck">
                              <div class="card">
                                  <img class="card-img-top" src="" alt="Card image cap">
                                  <div class="card-body">
                                      <h5 class="card-title">${data[c].Nombre} x cantidad</h5>
                                      <p class="card-text">${data[c].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                      <button id="${c}" class="btn-open-modal btn back-verde" style="color: white;">Agregar</button>
                                  </div>
                              </div>
                          </div>
                      </div>`
                      c++
                  }
                  html += `</div> <div id="nav-pagi" class="text-center"></div>`
                  $('#mostrar_select').on("change", function () {
                      debugger
                      let nav_pagi = document.getElementById('nav-pagi')
                      while (nav_pagi.hasChildNodes()) {
                          nav_pagi.removeChild(nav_pagi.lastChild)
                      }
                      var rowsShown = Math.floor(parseInt($('#mostrar_select').val())) / 3;
                      let i = 1
                      let f = parseInt($('#mostrar_select').val())
                      let c = f
                      $('#resultado_busqueda').text(`${i} - ${f} de ${tama}`)
                      var rowsTotal = div;
                      var numPages = rowsTotal / rowsShown;
                      for (i = 0; i < numPages; i++) {
                          var pageNum = i + 1;
                          $('#nav-pagi').append('<a href="#" class="btn-outline-info back-verde" style="color: white;"" rel="' + i + '">&emsp;' + pageNum + '&emsp;</a> ');
                      }
                      $('#col-agregar .row').hide();
                      $('#col-agregar .row').slice(0, rowsShown).show();
                      $('#nav-pagi a:first').addClass('active');
                      $('#nav-pagi a').bind('click', function (e) {
                          e.preventDefault();
                          i = f + 1
                          f += c
                          if (f > tama) f = tama
                          $('#resultado_busqueda').text(`${i} - ${f} de ${tama}`)
                          $('#nav-pagi a').removeClass('active');
                          $(this).addClass('active');
                          var currPage = $(this).attr('rel');
                          var startItem = currPage * rowsShown;
                          var endItem = startItem + rowsShown;
                          $('#col-agregar .row').css('opacity', '0').hide().slice(startItem, endItem).
                              css('display', 'flex').animate({
                                  opacity: 1
                              }, 300);
                      });
                  })

                  var header = ``, body = ``, footer = ``;

                  header = ``;

                  var done = () => {
                      debugger;
                      console.log('Hola');
                  }

                  var cancel = () => {
                      debugger;
                      console.log('Ah');
                  }

                  let contador = 0
                  let num = 0
                  let detallepedido = sessionStorage.DetallePedido == undefined ? [] : JSON.parse(sessionStorage.DetallePedido)
                  let objDetallePedido = {}
                  let saber_prod = sessionStorage.SaberProd == undefined ? [] : JSON.parse(sessionStorage.SaberProd)
                  let cant_max_detal
                  let cant_max_mayor
                  let cant_max_total
                  let s_cant = 'mayor'

                  $('#boton-cart-p').ready(() => {
                      $('#boton-cart-p').text('')
                      let n = JSON.parse(sessionStorage.DetallePedido).length
                      contador = n == undefined ? 0 : n
                      $('#boton-cart-p').append(n)
                  })

                  // var modalOpen = openCustomModal;
                  setTimeout(() => {
                      $('.btn-open-modal').ready(() => {
                          $('.btn-open-modal').on("click", function () {
                              debugger
                              let index = $(this).attr('id')
                              cant_max_detal = data[index].CantidadDetal
                              cant_max_mayor = data[index].CantidadMayor
                              cant_max_total = data[index].CantidadTotal
                              body = ``, footer = ``; header = ``
                              header += `<span aria-hidden="true"></span>`
                              body += `<div class="row">
          <div class="col">
              imagen
          </div>

          <div class="col">
              <div class="row">
                  <h2 id="nombre-producto">${data[index].Nombre}</h2>
                  <p id="comprador_fk" style="display: none;">${JSON.parse(sessionStorage.LappizUser).CompradorFk}</p>
                  <p id="proveedor_fk" style="display: none;">${JSON.parse(sessionStorage.LappizUser).ProveedorFk}</p>
                  <p id="producto-fk" style="display: none;">${data[index].Id}</p>
              </div>
              <div class="row">
                  <span>Calificación</span>
              </div>
              <hr>
              <div class="row">
                  <span>Origen</span>
              </div>
              <div class="row">
                  <span>Localización</span>
              </div>
              <div class="row">
                  <span>Cantidad disponible</span>
              </div>
              <div class="row">
                  <div class="col">
                      <span>Cantidad</span>
                  </div>
                  <div class="col">
                  <button id="btn-cant-mayor" type="button" class="btn back-verde rounded-pill" > Por mayor </button>
                  </div>
                  <div class="col">
                  <button id="btn-cant-detal" type="button" class="btn rounded-pill" > Al detal </button>
                              
                  </div>
              </div>
              <div class="row">
                  <p>Descripción/peso</p>
              </div>
              <div class="row">
                  <p><strong>Descripción:</strong></p>
              </div>
              <div class="row">
                  <p>Lorem Ipsum is simply dummy .orem Ipsum is simply dummy .orem
                      Ipsum is simply dummy .orem Ipsum is simply dummy .orem Ipsum is
                      simply dummy .orem Ipsum is simply dummy .</p> <a href="#"><strong>Leer más</strong></a>
              </div>

          </div>
          </div>`;

                              footer += `<div class="row">
              <div class="col">
                  <p id="precio-producto">${data[index].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                  <p id="precio-producto-flag" style="display: none;">${data[index].Precio}</p>
                  <p id="precio-producto-none" style="display: none;">${data[index].Precio}</p>
              </div>
              <div class="col">
                  <div class="input-group small">
                  <button id="cant-menos" type="button" class="btn bor-barra-menos" style="
                  border-radius: 35px 0 0 35px;"> - </button>
                  <button id="cant-texto" type="button" class="bor-barra-texto" disabled>1</button>
                  <button id="cant-mas" type="button" class="btn bor-barra-mas back-verde" style="
                  border-radius: 0 35px 35px 0;"> + </button>
                  </div>
              </div>
              <div class="col">
                  <input type="submit" id="${index}" class="addProduct btn back-verde" style="color: white;"" value="Agregar">
              </div>
              </div>`;

                              var config = {
                                  htmlTemplate: true,
                                  headerTemplate: header,
                                  bodyTemplate: body,
                                  footerTemplate: footer,
                                  showBtnsFooter: false,
                                  size: 'lg',
                                  scrollable: false,
                                  centered: true
                              }
                              $('#btn-close').ready().hide()
                              let nuevo = ``

                              $('#cant-menos').ready(() => {
                                  $('#cant-menos').on("click", function () {
                                      debugger
                                      let precio_flag = 0
                                      let precio_none = 0
                                      let cant = $('#cant-texto').text()
                                      if (cant > 1) {
                                          $('#cant-texto').text('')
                                          $('#cant-texto').text(cant - 1)
                                          precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                          precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                          precio_flag -= precio_none
                                          $('#precio-producto-flag').text('')
                                          $('#precio-producto-flag').text(`${precio_flag}`)
                                          $('#precio-producto').text('')
                                          $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                                      }
                                  })
                              })
                              $('#cant-mas').ready(() => {
                                  $('#cant-mas').on("click", function () {
                                      debugger
                                      let precio_flag = 0
                                      let precio_none = 0
                                      let cant = parseInt($('#cant-texto').text())
                                      if (s_cant == 'mayor') {
                                          if (cant < cant_max_mayor) {
                                              $('#cant-mas').attr('disabled', false)
                                              $('#cant-texto').text('')
                                              $('#cant-texto').text(cant + 1)
                                              cant_max_mayor -= cant + 1
                                              cant_max_total -= cant_max_mayor
                                              precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                              precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                              precio_flag += precio_none
                                              $('#precio-producto-flag').text('')
                                              $('#precio-producto-flag').text(`${precio_flag}`)
                                              $('#precio-producto').text('')
                                              $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                                          } else {
                                              $('#cant-mas').attr('disabled', true)
                                          }
                                      } else {
                                          if (cant < cant_max_detal) {
                                              $('#cant-mas').attr('disabled', false)
                                              $('#cant-texto').text('')
                                              $('#cant-texto').text(cant + 1)
                                              cant_max_detal -= cant + 1
                                              cant_max_total -= cant_max_detal
                                              precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                              precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                              precio_flag += precio_none
                                              $('#precio-producto-flag').text('')
                                              $('#precio-producto-flag').text(`${precio_flag}`)
                                              $('#precio-producto').text('')
                                              $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                                          } else {
                                              $('#cant-mas').attr('disabled', true)
                                          }
                                      }

                                  })
                              })

                              $('#btn-cant-detal').ready(() => {
                                  $('#btn-cant-detal').on("click", function () {
                                      s_cant = 'detal'
                                      $('#btn-cant-detal').addClass('back-verde')
                                      $('#btn-cant-mayor').removeClass('back-verde')
                                  })
                              })
                              
                              $('#btn-cant-mayor').ready(() => {
                                  $('#btn-cant-mayor').on("click", function () {
                                      s_cant = 'mayor'
                                      $('#btn-cant-detal').removeClass('back-verde')
                                      $('#btn-cant-mayor').addClass('back-verde')
                                  })
                              })

                              openCustomModal(config, done, cancel);
                              $('.addProduct').ready(() => {

                                  $('.addProduct').click(() => {
                                      debugger
                                      let index = parseInt($(this).attr("id"))
                                      if (!saber_prod.includes(index)) {
                                          saber_prod.push(index)
                                          sessionStorage.SaberProd = JSON.stringify(saber_prod)
                                          $('#boton-cart-p').text('')
                                          contador++
                                          $('#boton-cart-p').append(contador)
                                          let sub = parseInt($('#cant-texto').text()) * parseFloat($('#precio-producto-none').text())
                                          let cliente = $('#comprador_fk').text() == undefined ? $('#proveedor_fk').text() : $('#comprador_fk').text()
                                          let tipo_cliente = $('#comprador_fk').text() == undefined ? "ProveedorFk" : "CompradorFk"
                                          if (sessionStorage.DetallePedido == undefined) {
                                              if (s_cant == 'mayor') {
                                                  objDetallePedido = {
                                                      "Nombre": $('#nombre-producto').text(),
                                                      "Cantidad": parseInt($('#cant-texto').text()),
                                                      "CantidadMayor": cant_max_mayor,
                                                      "CantidadTotal": cant_max_total,
                                                      "ProductoFk": $('#producto-fk').text(),
                                                      "ValorUnitario": parseFloat($('#precio-producto-none').text()),
                                                      "SubTotal": sub,
                                                      "ClienteId": `${cliente}`,
                                                      "TipoCliente": `${tipo_cliente}`
                                                  }
                                                  detallepedido.push(objDetallePedido)
                                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                                  num = JSON.parse(sessionStorage.DetallePedido).length
                                              } else {
                                                  objDetallePedido = {
                                                      "Nombre": $('#nombre-producto').text(),
                                                      "Cantidad": parseInt($('#cant-texto').text()),
                                                      "CantidadDetal": cant_max_detal,
                                                      "CantidadTotal": cant_max_total,
                                                      "ProductoFk": $('#producto-fk').text(),
                                                      "ValorUnitario": parseFloat($('#precio-producto-none').text()),
                                                      "SubTotal": sub,
                                                      "ClienteId": `${cliente}`,
                                                      "TipoCliente": `${tipo_cliente}`
                                                  }
                                                  detallepedido.push(objDetallePedido)
                                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                                  num = JSON.parse(sessionStorage.DetallePedido).length
                                              }
                                          } else {
                                              let cliente = $('#comprador_fk').text() == undefined ? $('#proveedor_fk').text() : $('#comprador_fk').text()
                                              let tipo_cliente = $('#comprador_fk').text() == undefined ? "ProveedorFk" : "CompradorFk"
                                              if (s_cant == 'mayor') {
                                                  objDetallePedido = {
                                                      "Nombre": $('#nombre-producto').text(),
                                                      "Cantidad": parseInt($('#cant-texto').text()),
                                                      "CantidadMayor": cant_max_mayor,
                                                      "CantidadTotal": cant_max_total,
                                                      "ProductoFk": $('#producto-fk').text(),
                                                      "ValorUnitario": parseFloat($('#precio-producto-none').text()),
                                                      "SubTotal": sub,
                                                      "ClienteId": `${cliente}`,
                                                      "TipoCliente": `${tipo_cliente}`
                                                  }
                                                  detallepedido.push(objDetallePedido)
                                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                                  num = JSON.parse(sessionStorage.DetallePedido).length
                                              } else {
                                                  objDetallePedido = {
                                                      "Nombre": $('#nombre-producto').text(),
                                                      "Cantidad": parseInt($('#cant-texto').text()),
                                                      "CantidadDetal": cant_max_detal,
                                                      "CantidadTotal": cant_max_total,
                                                      "ProductoFk": $('#producto-fk').text(),
                                                      "ValorUnitario": parseFloat($('#precio-producto-none').text()),
                                                      "SubTotal": sub,
                                                      "ClienteId": `${cliente}`,
                                                      "TipoCliente": `${tipo_cliente}`
                                                  }
                                                  detallepedido.push(objDetallePedido)
                                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                                  num = JSON.parse(sessionStorage.DetallePedido).length
                                              }
                                          }
                                          toastr.success('Producto añadido al carrito', '')
                                      }
                                  })
                              })

                          });
                      })
                  }, 2000)
                  $('#col-agregar').append(html)
              } else {
                  //var urltoken = `${backandGlobal.url}/token`;
                  var urlquery = `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/sp/query`
                  var products = `select * from MercaFruta_Lappiz_Productos order by Nombre asc`;
                  var data = returnQuery(products, urlquery);

                  let tama = data.length
                  $('#resultado_busqueda').text(`1 - ${tama} de ${tama}`)
                  let div = Math.floor(tama / 3)
                  let mod = tama % 3
                  let c = 0


                  $('#col-agregar').remove()
                  $('#col-parent').append('<div id="col-agregar"></div>')
                  let html = ``

                  for (let j = 0; j < div; j++) {
                      html += `<div class="row">`
                      for (let i = 0; i < 3; i++) {
                          html += `
                          <div class="col">
                              <div class="card-deck">
                                  <div class="card">
                                      <img class="card-img-top" src="" alt="Card image cap">
                                      <div class="card-body">
                                          <h5 class="card-title">${data[c].Nombre} x cantidad</h5>
                                          <p class="card-text">${data[c].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                          <button id="${c}" class="btn-open-modal btn back-verde" style="color: white;">Agregar</button>
                                      </div>
                                  </div>
                              </div>
                          </div>`
                          c++
                      }
                      html += `</div>`
                  }
                  html += `<div class="row">`
                  for (let i = 0; i < mod; i++) {
                      html += `
                      <div class="col">
                          <div class="card-deck">
                              <div class="card">
                                  <img class="card-img-top" src="" alt="Card image cap">
                                  <div class="card-body">
                                      <h5 class="card-title">${data[c].Nombre} x cantidad</h5>
                                      <p class="card-text">${data[c].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                      <button id="${c}" class="btn-open-modal btn back-verde" style="color: white;">Agregar</button>
                                  </div>
                              </div>
                          </div>
                      </div>`
                      c++
                  }
                  html += `</div> <div id="nav-pagi" class="text-center"></div>`
                  $('#mostrar_select').on("change", function () {
                      debugger
                      let nav_pagi = document.getElementById('nav-pagi')
                      while (nav_pagi.hasChildNodes()) {
                          nav_pagi.removeChild(nav_pagi.lastChild)
                      }
                      var rowsShown = Math.floor(parseInt($('#mostrar_select').val())) / 3;
                      let i = 1
                      let f = parseInt($('#mostrar_select').val())
                      let c = f
                      $('#resultado_busqueda').text(`${i} - ${f} de ${tama}`)
                      var rowsTotal = div;
                      var numPages = rowsTotal / rowsShown;
                      for (i = 0; i < numPages; i++) {
                          var pageNum = i + 1;
                          $('#nav-pagi').append('<a href="#" class="btn-outline-info back-verde" style="color: white;"" rel="' + i + '">&emsp;' + pageNum + '&emsp;</a> ');
                      }
                      $('#col-agregar .row').hide();
                      $('#col-agregar .row').slice(0, rowsShown).show();
                      $('#nav-pagi a:first').addClass('active');
                      $('#nav-pagi a').bind('click', function (e) {
                          e.preventDefault();
                          i = f + 1
                          f += c
                          if (f > tama) f = tama
                          $('#resultado_busqueda').text(`${i} - ${f} de ${tama}`)
                          $('#nav-pagi a').removeClass('active');
                          $(this).addClass('active');
                          var currPage = $(this).attr('rel');
                          var startItem = currPage * rowsShown;
                          var endItem = startItem + rowsShown;
                          $('#col-agregar .row').css('opacity', '0').hide().slice(startItem, endItem).
                              css('display', 'flex').animate({
                                  opacity: 1
                              }, 300);
                      });
                  })

                  var header = ``, body = ``, footer = ``;

                  header = ``;

                  var done = () => {
                      debugger;
                      console.log('Hola');
                  }

                  var cancel = () => {
                      debugger;
                      console.log('Ah');
                  }

                  let contador = 0
                  let num = 0
                  let detallepedido = sessionStorage.DetallePedido == undefined ? [] : JSON.parse(sessionStorage.DetallePedido)
                  let objDetallePedido = {}
                  let saber_prod = sessionStorage.SaberProd == undefined ? [] : JSON.parse(sessionStorage.SaberProd)
                  let cant_max_detal
                  let cant_max_mayor
                  let cant_max_total
                  let s_cant = 'mayor'

                  $('#boton-cart-p').ready(() => {
                      $('#boton-cart-p').text('')
                      let n = JSON.parse(sessionStorage.DetallePedido).length
                      contador = n == undefined ? 0 : n
                      $('#boton-cart-p').append(n)
                  })

                  // var modalOpen = openCustomModal;
                  setTimeout(() => {
                      $('.btn-open-modal').ready(() => {
                          $('.btn-open-modal').on("click", function () {
                              debugger
                              let index = $(this).attr('id')
                              cant_max_detal = data[index].CantidadDetal
                              cant_max_mayor = data[index].CantidadMayor
                              cant_max_total = data[index].CantidadTotal
                              body = ``, footer = ``; header = ``
                              header += `<span aria-hidden="true"></span>`
                              body += `<div class="row">
          <div class="col">
              imagen
          </div>

          <div class="col">
              <div class="row">
                  <h2 id="nombre-producto">${data[index].Nombre}</h2>
                  <p id="comprador_fk" style="display: none;">${JSON.parse(sessionStorage.LappizUser).CompradorFk}</p>
                  <p id="proveedor_fk" style="display: none;">${JSON.parse(sessionStorage.LappizUser).ProveedorFk}</p>
                  <p id="producto-fk" style="display: none;">${data[index].Id}</p>
              </div>
              <div class="row">
                  <span>Calificación</span>
              </div>
              <hr>
              <div class="row">
                  <span>Origen</span>
              </div>
              <div class="row">
                  <span>Localización</span>
              </div>
              <div class="row">
                  <span>Cantidad disponible</span>
              </div>
              <div class="row">
                  <div class="col">
                      <span>Cantidad</span>
                  </div>
                  <div class="col">
                  <button id="btn-cant-mayor" type="button" class="btn back-verde rounded-pill" > Por mayor </button>
                  </div>
                  <div class="col">
                  <button id="btn-cant-detal" type="button" class="btn back-verde rounded-pill" > Al detal </button>
                  </div>
              </div>
              <div class="row">
                  <p>Descripción/peso</p>
              </div>
              <div class="row">
                  <p><strong>Descripción:</strong></p>
              </div>
              <div class="row">
                  <p>Lorem Ipsum is simply dummy .orem Ipsum is simply dummy .orem
                      Ipsum is simply dummy .orem Ipsum is simply dummy .orem Ipsum is
                      simply dummy .orem Ipsum is simply dummy .</p> <a href="#"><strong>Leer más</strong></a>
              </div>

          </div>
          </div>`;

                              footer += `<div class="row">
              <div class="col">
                  <p id="precio-producto">${data[index].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                  <p id="precio-producto-flag" style="display: none;">${data[index].Precio}</p>
                  <p id="precio-producto-none" style="display: none;">${data[index].Precio}</p>
              </div>
              <div class="col">
                  <div class="input-group small">
                  <button id="cant-menos" type="button" class="btn bor-barra-menos" style="
                  border-radius: 35px 0 0 35px;"> - </button>
                  <button id="cant-texto" type="button" class="bor-barra-texto" disabled>1</button>
                  <button id="cant-mas" type="button" class="btn bor-barra-mas back-verde" style="
                  border-radius: 0 35px 35px 0;"> + </button>
                  </div>
              </div>
              <div class="col">
                  <input type="submit" id="${index}" class="addProduct btn back-verde" style="color: white;" value="Agregar">
              </div>
              </div>`;

                              var config = {
                                  htmlTemplate: true,
                                  headerTemplate: header,
                                  bodyTemplate: body,
                                  footerTemplate: footer,
                                  showBtnsFooter: false,
                                  size: 'lg',
                                  scrollable: false,
                                  centered: true
                              }
                              $('#btn-close').ready().hide()
                              let nuevo = ``

                              $('#cant-menos').ready(() => {
                                  $('#cant-menos').on("click", function () {
                                      debugger
                                      let precio_flag = 0
                                      let precio_none = 0
                                      let cant = $('#cant-texto').text()
                                      if (cant > 1) {
                                          $('#cant-texto').text('')
                                          $('#cant-texto').text(cant - 1)
                                          precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                          precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                          precio_flag -= precio_none
                                          $('#precio-producto-flag').text('')
                                          $('#precio-producto-flag').text(`${precio_flag}`)
                                          $('#precio-producto').text('')
                                          $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                                      }
                                  })
                              })
                              $('#cant-mas').ready(() => {
                                  $('#cant-mas').on("click", function () {
                                      debugger
                                      let precio_flag = 0
                                      let precio_none = 0
                                      let cant = parseInt($('#cant-texto').text())
                                      if (s_cant == 'mayor') {
                                          if (cant < cant_max_mayor) {
                                              $('#cant-mas').attr('disabled', false)
                                              $('#cant-texto').text('')
                                              $('#cant-texto').text(cant + 1)
                                              cant_max_mayor -= cant + 1
                                              cant_max_total -= cant_max_mayor
                                              precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                              precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                              precio_flag += precio_none
                                              $('#precio-producto-flag').text('')
                                              $('#precio-producto-flag').text(`${precio_flag}`)
                                              $('#precio-producto').text('')
                                              $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                                          } else {
                                              $('#cant-mas').attr('disabled', true)
                                          }
                                      } else {
                                          if (cant < cant_max_detal) {
                                              $('#cant-mas').attr('disabled', false)
                                              $('#cant-texto').text('')
                                              $('#cant-texto').text(cant + 1)
                                              cant_max_detal -= cant + 1
                                              cant_max_total -= cant_max_detal
                                              precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                              precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                              precio_flag += precio_none
                                              $('#precio-producto-flag').text('')
                                              $('#precio-producto-flag').text(`${precio_flag}`)
                                              $('#precio-producto').text('')
                                              $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                                          } else {
                                              $('#cant-mas').attr('disabled', true)
                                          }
                                      }

                                  })
                              })

                              $('#btn-cant-detal').ready(() => {
                                  $('#btn-cant-detal').on("click", function () {
                                      s_cant = 'detal'
                                      $('#btn-cant-detal').addClass('back-verde')
                                      $('#btn-cant-mayor').removeClass('back-verde')
                                  })
                              })
                              
                              $('#btn-cant-mayor').ready(() => {
                                  $('#btn-cant-mayor').on("click", function () {
                                      s_cant = 'mayor'
                                      $('#btn-cant-detal').removeClass('back-verde')
                                      $('#btn-cant-mayor').addClass('back-verde')
                                  })
                              })

                              openCustomModal(config, done, cancel);
                              $('.addProduct').ready(() => {

                                  $('.addProduct').click(() => {
                                      debugger
                                      let index = parseInt($(this).attr("id"))
                                      if (!saber_prod.includes(index)) {
                                          saber_prod.push(index)
                                          sessionStorage.SaberProd = JSON.stringify(saber_prod)
                                          $('#boton-cart-p').text('')
                                          contador++
                                          $('#boton-cart-p').append(contador)
                                          let sub = parseInt($('#cant-texto').text()) * parseFloat($('#precio-producto-none').text())
                                          let cliente = $('#comprador_fk').text() == undefined ? $('#proveedor_fk').text() : $('#comprador_fk').text()
                                          let tipo_cliente = $('#comprador_fk').text() == undefined ? "ProveedorFk" : "CompradorFk"
                                          if (sessionStorage.DetallePedido == undefined) {
                                              if (s_cant == 'mayor') {
                                                  objDetallePedido = {
                                                      "Nombre": $('#nombre-producto').text(),
                                                      "Cantidad": parseInt($('#cant-texto').text()),
                                                      "CantidadMayor": cant_max_mayor,
                                                      "CantidadTotal": cant_max_total,
                                                      "ProductoFk": $('#producto-fk').text(),
                                                      "ValorUnitario": parseFloat($('#precio-producto-none').text()),
                                                      "SubTotal": sub,
                                                      "ClienteId": `${cliente}`,
                                                      "TipoCliente": `${tipo_cliente}`
                                                  }
                                                  detallepedido.push(objDetallePedido)
                                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                                  num = JSON.parse(sessionStorage.DetallePedido).length
                                              } else {
                                                  objDetallePedido = {
                                                      "Nombre": $('#nombre-producto').text(),
                                                      "Cantidad": parseInt($('#cant-texto').text()),
                                                      "CantidadDetal": cant_max_detal,
                                                      "CantidadTotal": cant_max_total,
                                                      "ProductoFk": $('#producto-fk').text(),
                                                      "ValorUnitario": parseFloat($('#precio-producto-none').text()),
                                                      "SubTotal": sub,
                                                      "ClienteId": `${cliente}`,
                                                      "TipoCliente": `${tipo_cliente}`
                                                  }
                                                  detallepedido.push(objDetallePedido)
                                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                                  num = JSON.parse(sessionStorage.DetallePedido).length
                                              }
                                          } else {
                                              let cliente = $('#comprador_fk').text() == undefined ? $('#proveedor_fk').text() : $('#comprador_fk').text()
                                              let tipo_cliente = $('#comprador_fk').text() == undefined ? "ProveedorFk" : "CompradorFk"
                                              if (s_cant == 'mayor') {
                                                  objDetallePedido = {
                                                      "Nombre": $('#nombre-producto').text(),
                                                      "Cantidad": parseInt($('#cant-texto').text()),
                                                      "CantidadMayor": cant_max_mayor,
                                                      "CantidadTotal": cant_max_total,
                                                      "ProductoFk": $('#producto-fk').text(),
                                                      "ValorUnitario": parseFloat($('#precio-producto-none').text()),
                                                      "SubTotal": sub,
                                                      "ClienteId": `${cliente}`,
                                                      "TipoCliente": `${tipo_cliente}`
                                                  }
                                                  detallepedido.push(objDetallePedido)
                                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                                  num = JSON.parse(sessionStorage.DetallePedido).length
                                              } else {
                                                  objDetallePedido = {
                                                      "Nombre": $('#nombre-producto').text(),
                                                      "Cantidad": parseInt($('#cant-texto').text()),
                                                      "CantidadDetal": cant_max_detal,
                                                      "CantidadTotal": cant_max_total,
                                                      "ProductoFk": $('#producto-fk').text(),
                                                      "ValorUnitario": parseFloat($('#precio-producto-none').text()),
                                                      "SubTotal": sub,
                                                      "ClienteId": `${cliente}`,
                                                      "TipoCliente": `${tipo_cliente}`
                                                  }
                                                  detallepedido.push(objDetallePedido)
                                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                                  num = JSON.parse(sessionStorage.DetallePedido).length
                                              }
                                          }
                                          toastr.success('Producto añadido al carrito', '')
                                      }
                                  })
                              })

                          });
                      })
                  }, 2000)
                  $('#col-agregar').append(html)

              }
          })
      })

      //Filtro categoría
      $('#btn-filtrar').ready(() => {
          $('#btn-filtrar').click(() => {

              let slide = $('#slide-precio').val()
              let semi = $('#semi-check').is(":checked")
              let fruta = $('#fruta-check').is(":checked")
              let verdura = $('#verdura-check').is(":checked")
              let horta = $('#horta-check').is(":checked")
              let grano = $('#grano-check').is(":checked")
              let otro = $('#otro-check').is(":checked")

              $('#p-precio small').text('')
              $('#p-precio small').text(`Mayor a ${slide.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)

              let q = ''
              let html = ``
              if (semi) q += 'Semillas,'
              if (fruta) q += 'Frutas,'
              if (verdura) q += 'Verduras,'
              if (horta) q += 'Hortalizas,'
              if (grano) q += 'Granos,'
              if (otro) q += 'Otros,'
              let qu = q.split(',')
              let tama = q.split(',').length - 1
              if (slide != 0) {
                  var products = `select * from MercaFruta_Lappiz_Productos WHERE (Tipo = `;
                  if (tama > 1) {
                      for (let i = 0; i < tama; i++) {
                          if (i <= tama - 2) products += `'${qu[i]}' OR Tipo = `
                          if (i > tama - 2) products += `'${qu[i]}'`
                      }
                      products += `) AND Precio >= ${slide} order by Nombre asc`
                  }
                  if (tama == 1) products = `select * from MercaFruta_Lappiz_Productos WHERE Tipo = '${qu[0]}' AND Precio >= ${slide} order by Nombre asc`;
                  if (tama == 0) products = `select * from MercaFruta_Lappiz_Productos WHERE Precio >= ${slide} order by Nombre asc`;

                  //var urltoken = `${backandGlobal.url}/token`;
                  var urlquery = `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/sp/query`
                  var data = returnQuery(products, urlquery);

                  let tamaD = data.length
                  $('#resultado_busqueda').text(`1 - ${tamaD} de ${tamaD}`)
                  let div = Math.floor(tamaD / 3)
                  let mod = tamaD % 3
                  let c = 0


                  $('#col-agregar').remove()
                  $('#col-parent').append('<div id="col-agregar"></div>')

                  for (let j = 0; j < div; j++) {
                      html += `<div class="row">`
                      for (let i = 0; i < 3; i++) {
                          html += `
                          <div class="col">
                              <div class="card-deck">
                                  <div class="card">
                                      <img class="card-img-top" src="" alt="Card image cap">
                                      <div class="card-body">
                                          <h5 class="card-title">${data[c].Nombre} x cantidad</h5>
                                          <p class="card-text">${data[c].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                          <button id="${c}" class="btn-open-modal btn back-verde" style="color: white;">Agregar</button>
                                      </div>
                                  </div>
                              </div>
                          </div>`
                          c++
                      }
                      html += `</div>`
                  }
                  html += `<div class="row">`
                  for (let i = 0; i < mod; i++) {
                      html += `
                      <div class="col">
                          <div class="card-deck">
                              <div class="card">
                                  <img class="card-img-top" src="" alt="Card image cap">
                                  <div class="card-body">
                                      <h5 class="card-title">${data[c].Nombre} x cantidad</h5>
                                      <p class="card-text">${data[c].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                      <button id="${c}" class="btn-open-modal btn back-verde" style="color: white;">Agregar</button>
                                  </div>
                              </div>
                          </div>
                      </div>`
                      c++
                  }
                  html += `</div> <div id="nav-pagi" class="text-center"></div>`
                  $('#mostrar_select').on("change", function () {
                      debugger
                      let nav_pagi = document.getElementById('nav-pagi')
                      while (nav_pagi.hasChildNodes()) {
                          nav_pagi.removeChild(nav_pagi.lastChild)
                      }
                      var rowsShown = Math.floor(parseInt($('#mostrar_select').val())) / 3;
                      let i = 1
                      let f = parseInt($('#mostrar_select').val())
                      let c = f
                      $('#resultado_busqueda').text(`${i} - ${f} de ${tamaD}`)
                      var rowsTotal = div;
                      var numPages = rowsTotal / rowsShown;
                      for (i = 0; i < numPages; i++) {
                          var pageNum = i + 1;
                          $('#nav-pagi').append('<a href="#" class="btn-outline-info back-verde" style="color: white;"" rel="' + i + '">&emsp;' + pageNum + '&emsp;</a> ');
                      }
                      $('#col-agregar .row').hide();
                      $('#col-agregar .row').slice(0, rowsShown).show();
                      $('#nav-pagi a:first').addClass('active');
                      $('#nav-pagi a').bind('click', function (e) {
                          e.preventDefault();
                          i = f + 1
                          f += c
                          if (f > tamaD) f = tamaD
                          $('#resultado_busqueda').text(`${i} - ${f} de ${tamaD}`)
                          $('#nav-pagi a').removeClass('active');
                          $(this).addClass('active');
                          var currPage = $(this).attr('rel');
                          var startItem = currPage * rowsShown;
                          var endItem = startItem + rowsShown;
                          $('#col-agregar .row').css('opacity', '0').hide().slice(startItem, endItem).
                              css('display', 'flex').animate({
                                  opacity: 1
                              }, 300);
                      });
                  })

                  var header = ``, body = ``, footer = ``;

                  header = ``;

                  var done = () => {
                      debugger;
                      console.log('Hola');
                  }

                  var cancel = () => {
                      debugger;
                      console.log('Ah');
                  }

                  let contador = 0
                  let num = 0
                  let detallepedido = sessionStorage.DetallePedido == undefined ? [] : JSON.parse(sessionStorage.DetallePedido)
                  let objDetallePedido = {}
                  let saber_prod = sessionStorage.SaberProd == undefined ? [] : JSON.parse(sessionStorage.SaberProd)
                  let cant_max_detal
                  let cant_max_mayor
                  let cant_max_total
                  let s_cant = 'mayor'

                  $('#boton-cart-p').ready(() => {
                      $('#boton-cart-p').text('')
                      let n = JSON.parse(sessionStorage.DetallePedido).length
                      contador = n == undefined ? 0 : n
                      $('#boton-cart-p').append(n)
                  })

                  // var modalOpen = openCustomModal;
                  setTimeout(() => {
                      $('.btn-open-modal').ready(() => {
                          $('.btn-open-modal').on("click", function () {
                              debugger
                              let index = $(this).attr('id')
                              cant_max_detal = data[index].CantidadDetal
                              cant_max_mayor = data[index].CantidadMayor
                              cant_max_total = data[index].CantidadTotal
                              body = ``, footer = ``; header = ``
                              header += `<span aria-hidden="true"></span>`
                              body += `<div class="row">
          <div class="col">
              imagen
          </div>

          <div class="col">
              <div class="row">
                  <h2 id="nombre-producto">${data[index].Nombre}</h2>
                  <p id="comprador_fk" style="display: none;">${JSON.parse(sessionStorage.LappizUser).CompradorFk}</p>
                  <p id="proveedor_fk" style="display: none;">${JSON.parse(sessionStorage.LappizUser).ProveedorFk}</p>
                  <p id="producto-fk" style="display: none;">${data[index].Id}</p>
              </div>
              <div class="row">
                  <span>Calificación</span>
              </div>
              <hr>
              <div class="row">
                  <span>Origen</span>
              </div>
              <div class="row">
                  <span>Localización</span>
              </div>
              <div class="row">
                  <span>Cantidad disponible</span>
              </div>
              <div class="row">
                  <div class="col">
                      <span>Cantidad</span>
                  </div>
                  <div class="col">
                  <button id="btn-cant-mayor" type="button" class="btn back-verde rounded-pill" > Por mayor </button>
                  </div>
                  <div class="col">
                  <button id="btn-cant-detal" type="button" class="btn rounded-pill" > Al detal </button>
                  </div>
              </div>
              <div class="row">
                  <p>Descripción/peso</p>
              </div>
              <div class="row">
                  <p><strong>Descripción:</strong></p>
              </div>
              <div class="row">
                  <p>Lorem Ipsum is simply dummy .orem Ipsum is simply dummy .orem
                      Ipsum is simply dummy .orem Ipsum is simply dummy .orem Ipsum is
                      simply dummy .orem Ipsum is simply dummy .</p> <a href="#"><strong>Leer más</strong></a>
              </div>

          </div>
          </div>`;

                              footer += `<div class="row">
              <div class="col">
                  <p id="precio-producto">${data[index].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                  <p id="precio-producto-flag" style="display: none;">${data[index].Precio}</p>
                  <p id="precio-producto-none" style="display: none;">${data[index].Precio}</p>
              </div>
              <div class="col">
                  <div class="input-group small">
                  <button id="cant-menos" type="button" class="btn bor-barra-menos" style="
                  border-radius: 35px 0 0 35px;"> - </button>
                  <button id="cant-texto" type="button" class="bor-barra-texto" disabled>1</button>
                  <button id="cant-mas" type="button" class="btn bor-barra-mas back-verde" style="
                  border-radius: 0 35px 35px 0;"> + </button>
                  </div>
              </div>
              <div class="col">
                  <input type="submit" id="${index}" class="addProduct btn back-verde" style="color: white;" value="Agregar">
              </div>
              </div>`;

                              var config = {
                                  htmlTemplate: true,
                                  headerTemplate: header,
                                  bodyTemplate: body,
                                  footerTemplate: footer,
                                  showBtnsFooter: false,
                                  size: 'lg',
                                  scrollable: false,
                                  centered: true
                              }
                              $('#btn-close').ready().hide()
                              let nuevo = ``

                              $('#cant-menos').ready(() => {
                                  $('#cant-menos').on("click", function () {
                                      debugger
                                      let precio_flag = 0
                                      let precio_none = 0
                                      let cant = $('#cant-texto').text()
                                      if (cant > 1) {
                                          $('#cant-texto').text('')
                                          $('#cant-texto').text(cant - 1)
                                          precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                          precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                          precio_flag -= precio_none
                                          $('#precio-producto-flag').text('')
                                          $('#precio-producto-flag').text(`${precio_flag}`)
                                          $('#precio-producto').text('')
                                          $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                                      }
                                  })
                              })
                              $('#cant-mas').ready(() => {
                                  $('#cant-mas').on("click", function () {
                                      debugger
                                      let precio_flag = 0
                                      let precio_none = 0
                                      let cant = parseInt($('#cant-texto').text())
                                      if (s_cant == 'mayor') {
                                          if (cant < cant_max_mayor) {
                                              $('#cant-mas').attr('disabled', false)
                                              $('#cant-texto').text('')
                                              $('#cant-texto').text(cant + 1)
                                              cant_max_mayor -= cant + 1
                                              cant_max_total -= cant_max_mayor
                                              precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                              precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                              precio_flag += precio_none
                                              $('#precio-producto-flag').text('')
                                              $('#precio-producto-flag').text(`${precio_flag}`)
                                              $('#precio-producto').text('')
                                              $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                                          } else {
                                              $('#cant-mas').attr('disabled', true)
                                          }
                                      } else {
                                          if (cant < cant_max_detal) {
                                              $('#cant-mas').attr('disabled', false)
                                              $('#cant-texto').text('')
                                              $('#cant-texto').text(cant + 1)
                                              cant_max_detal -= cant + 1
                                              cant_max_total -= cant_max_detal
                                              precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                              precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                              precio_flag += precio_none
                                              $('#precio-producto-flag').text('')
                                              $('#precio-producto-flag').text(`${precio_flag}`)
                                              $('#precio-producto').text('')
                                              $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                                          } else {
                                              $('#cant-mas').attr('disabled', true)
                                          }
                                      }

                                  })
                              })

                              $('#btn-cant-detal').ready(() => {
                                  $('#btn-cant-detal').on("click", function () {
                                      s_cant = 'detal'
                                      $('#btn-cant-detal').addClass('back-verde')
                                      $('#btn-cant-mayor').removeClass('back-verde')
                                  })
                              })
                              
                              $('#btn-cant-mayor').ready(() => {
                                  $('#btn-cant-mayor').on("click", function () {
                                      s_cant = 'mayor'
                                      $('#btn-cant-detal').removeClass('back-verde')
                                      $('#btn-cant-mayor').addClass('back-verde')
                                  })
                              })

                              openCustomModal(config, done, cancel);
                              $('.addProduct').ready(() => {

                                  $('.addProduct').click(() => {
                                      debugger
                                      let index = parseInt($(this).attr("id"))
                                      if (!saber_prod.includes(index)) {
                                          saber_prod.push(index)
                                          sessionStorage.SaberProd = JSON.stringify(saber_prod)
                                          $('#boton-cart-p').text('')
                                          contador++
                                          $('#boton-cart-p').append(contador)
                                          let sub = parseInt($('#cant-texto').text()) * parseFloat($('#precio-producto-none').text())
                                          let cliente = $('#comprador_fk').text() == undefined ? $('#proveedor_fk').text() : $('#comprador_fk').text()
                                          let tipo_cliente = $('#comprador_fk').text() == undefined ? "ProveedorFk" : "CompradorFk"
                                          if (sessionStorage.DetallePedido == undefined) {
                                              if (s_cant == 'mayor') {
                                                  objDetallePedido = {
                                                      "Nombre": $('#nombre-producto').text(),
                                                      "Cantidad": parseInt($('#cant-texto').text()),
                                                      "CantidadMayor": cant_max_mayor,
                                                      "CantidadTotal": cant_max_total,
                                                      "ProductoFk": $('#producto-fk').text(),
                                                      "ValorUnitario": parseFloat($('#precio-producto-none').text()),
                                                      "SubTotal": sub,
                                                      "ClienteId": `${cliente}`,
                                                      "TipoCliente": `${tipo_cliente}`
                                                  }
                                                  detallepedido.push(objDetallePedido)
                                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                                  num = JSON.parse(sessionStorage.DetallePedido).length
                                              } else {
                                                  objDetallePedido = {
                                                      "Nombre": $('#nombre-producto').text(),
                                                      "Cantidad": parseInt($('#cant-texto').text()),
                                                      "CantidadDetal": cant_max_detal,
                                                      "CantidadTotal": cant_max_total,
                                                      "ProductoFk": $('#producto-fk').text(),
                                                      "ValorUnitario": parseFloat($('#precio-producto-none').text()),
                                                      "SubTotal": sub,
                                                      "ClienteId": `${cliente}`,
                                                      "TipoCliente": `${tipo_cliente}`
                                                  }
                                                  detallepedido.push(objDetallePedido)
                                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                                  num = JSON.parse(sessionStorage.DetallePedido).length
                                              }
                                          } else {
                                              let cliente = $('#comprador_fk').text() == undefined ? $('#proveedor_fk').text() : $('#comprador_fk').text()
                                              let tipo_cliente = $('#comprador_fk').text() == undefined ? "ProveedorFk" : "CompradorFk"
                                              if (s_cant == 'mayor') {
                                                  objDetallePedido = {
                                                      "Nombre": $('#nombre-producto').text(),
                                                      "Cantidad": parseInt($('#cant-texto').text()),
                                                      "CantidadMayor": cant_max_mayor,
                                                      "CantidadTotal": cant_max_total,
                                                      "ProductoFk": $('#producto-fk').text(),
                                                      "ValorUnitario": parseFloat($('#precio-producto-none').text()),
                                                      "SubTotal": sub,
                                                      "ClienteId": `${cliente}`,
                                                      "TipoCliente": `${tipo_cliente}`
                                                  }
                                                  detallepedido.push(objDetallePedido)
                                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                                  num = JSON.parse(sessionStorage.DetallePedido).length
                                              } else {
                                                  objDetallePedido = {
                                                      "Nombre": $('#nombre-producto').text(),
                                                      "Cantidad": parseInt($('#cant-texto').text()),
                                                      "CantidadDetal": cant_max_detal,
                                                      "CantidadTotal": cant_max_total,
                                                      "ProductoFk": $('#producto-fk').text(),
                                                      "ValorUnitario": parseFloat($('#precio-producto-none').text()),
                                                      "SubTotal": sub,
                                                      "ClienteId": `${cliente}`,
                                                      "TipoCliente": `${tipo_cliente}`
                                                  }
                                                  detallepedido.push(objDetallePedido)
                                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                                  num = JSON.parse(sessionStorage.DetallePedido).length
                                              }
                                          }
                                          toastr.success('Producto añadido al carrito', '')
                                      }
                                  })
                              })

                          });
                      })
                  }, 2000)
              } else {
                  var products = `select * from MercaFruta_Lappiz_Productos WHERE Tipo = `;
                  if (tama > 1) {
                      for (let i = 0; i < tama; i++) {
                          if (i <= tama - 2) products += `'${qu[i]}' OR Tipo = `
                          if (i > tama - 2) products += `'${qu[i]}' order by Nombre asc`
                      }
                  }
                  if (tama == 1) products = `select * from MercaFruta_Lappiz_Productos WHERE Tipo = '${qu[0]}' order by Nombre asc`;
                  if (tama == 0) products = `select * from MercaFruta_Lappiz_Productos order by Nombre asc`;

                  //var urltoken = `${backandGlobal.url}/token`;
                  var urlquery = `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/sp/query`
                  var data = returnQuery(products, urlquery);

                  let tamaD = data.length
                  $('#resultado_busqueda').text(`1 - ${tamaD} de ${tamaD}`)
                  let div = Math.floor(tamaD / 3)
                  let mod = tamaD % 3
                  let c = 0


                  $('#col-agregar').remove()
                  $('#col-parent').append('<div id="col-agregar"></div>')

                  for (let j = 0; j < div; j++) {
                      html += `<div class="row">`
                      for (let i = 0; i < 3; i++) {
                          html += `
                          <div class="col">
                              <div class="card-deck">
                                  <div class="card">
                                      <img class="card-img-top" src="" alt="Card image cap">
                                      <div class="card-body">
                                          <h5 class="card-title">${data[c].Nombre} x cantidad</h5>
                                          <p class="card-text">${data[c].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                          <button id="${c}" class="btn-open-modal btn back-verde" style="color: white;">Agregar</button>
                                      </div>
                                  </div>
                              </div>
                          </div>`
                          c++
                      }
                      html += `</div>`
                  }
                  html += `<div class="row">`
                  for (let i = 0; i < mod; i++) {
                      html += `
                      <div class="col">
                          <div class="card-deck">
                              <div class="card">
                                  <img class="card-img-top" src="" alt="Card image cap">
                                  <div class="card-body">
                                      <h5 class="card-title">${data[c].Nombre} x cantidad</h5>
                                      <p class="card-text">${data[c].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                      <button id="${c}" class="btn-open-modal btn back-verde" style="color: white;">Agregar</button>
                                  </div>
                              </div>
                          </div>
                      </div>`
                      c++
                  }
                  html += `</div> <div id="nav-pagi" class="text-center"></div>`
                  $('#mostrar_select').on("change", function () {
                      debugger
                      let nav_pagi = document.getElementById('nav-pagi')
                      while (nav_pagi.hasChildNodes()) {
                          nav_pagi.removeChild(nav_pagi.lastChild)
                      }
                      var rowsShown = Math.floor(parseInt($('#mostrar_select').val())) / 3;
                      let i = 1
                      let f = parseInt($('#mostrar_select').val())
                      let c = f
                      $('#resultado_busqueda').text(`${i} - ${f} de ${tamaD}`)
                      var rowsTotal = div;
                      var numPages = rowsTotal / rowsShown;
                      for (i = 0; i < numPages; i++) {
                          var pageNum = i + 1;
                          $('#nav-pagi').append('<a href="#" class="btn-outline-info back-verde" style="color: white;"" rel="' + i + '">&emsp;' + pageNum + '&emsp;</a> ');
                      }
                      $('#col-agregar .row').hide();
                      $('#col-agregar .row').slice(0, rowsShown).show();
                      $('#nav-pagi a:first').addClass('active');
                      $('#nav-pagi a').bind('click', function (e) {
                          e.preventDefault();
                          i = f + 1
                          f += c
                          if (f > tamaD) f = tamaD
                          $('#resultado_busqueda').text(`${i} - ${f} de ${tamaD}`)
                          $('#nav-pagi a').removeClass('active');
                          $(this).addClass('active');
                          var currPage = $(this).attr('rel');
                          var startItem = currPage * rowsShown;
                          var endItem = startItem + rowsShown;
                          $('#col-agregar .row').css('opacity', '0').hide().slice(startItem, endItem).
                              css('display', 'flex').animate({
                                  opacity: 1
                              }, 300);
                      });
                  })

                  var header = ``, body = ``, footer = ``;

                  header = ``;

                  var done = () => {
                      debugger;
                      console.log('Hola');
                  }

                  var cancel = () => {
                      debugger;
                      console.log('Ah');
                  }

                  let contador = 0
                  let num = 0
                  let detallepedido = sessionStorage.DetallePedido == undefined ? [] : JSON.parse(sessionStorage.DetallePedido)
                  let objDetallePedido = {}
                  let saber_prod = sessionStorage.SaberProd == undefined ? [] : JSON.parse(sessionStorage.SaberProd)
                  let cant_max_detal
                  let cant_max_mayor
                  let cant_max_total
                  let s_cant = 'mayor'

                  $('#boton-cart-p').ready(() => {
                      $('#boton-cart-p').text('')
                      let n = JSON.parse(sessionStorage.DetallePedido).length
                      contador = n == undefined ? 0 : n
                      $('#boton-cart-p').append(n)
                  })

                  // var modalOpen = openCustomModal;
                  setTimeout(() => {
                      $('.btn-open-modal').ready(() => {
                          $('.btn-open-modal').on("click", function () {
                              debugger
                              let index = $(this).attr('id')
                              cant_max_detal = data[index].CantidadDetal
                              cant_max_mayor = data[index].CantidadMayor
                              cant_max_total = data[index].CantidadTotal
                              body = ``, footer = ``; header = ``
                              header += `<span aria-hidden="true"></span>`
                              body += `<div class="row">
          <div class="col">
              imagen
          </div>

          <div class="col">
              <div class="row">
                  <h2 id="nombre-producto">${data[index].Nombre}</h2>
                  <p id="comprador_fk" style="display: none;">${JSON.parse(sessionStorage.LappizUser).CompradorFk}</p>
                  <p id="proveedor_fk" style="display: none;">${JSON.parse(sessionStorage.LappizUser).ProveedorFk}</p>
                  <p id="producto-fk" style="display: none;">${data[index].Id}</p>
              </div>
              <div class="row">
                  <span>Calificación</span>
              </div>
              <hr>
              <div class="row">
                  <span>Origen</span>
              </div>
              <div class="row">
                  <span>Localización</span>
              </div>
              <div class="row">
                  <span>Cantidad disponible</span>
              </div>
              <div class="row">
                  <div class="col">
                      <span>Cantidad</span>
                  </div>
                  <div class="col">
                  <button id="btn-cant-mayor" type="button" class="btn back-verde rounded-pill" > Por mayor </button>
                  </div>
                  <div class="col">
                  <button id="btn-cant-detal" type="button" class="btn rounded-pill" > Al detal </button>
                  </div>
              </div>
              <div class="row">
                  <p>Descripción/peso</p>
              </div>
              <div class="row">
                  <p><strong>Descripción:</strong></p>
              </div>
              <div class="row">
                  <p>Lorem Ipsum is simply dummy .orem Ipsum is simply dummy .orem
                      Ipsum is simply dummy .orem Ipsum is simply dummy .orem Ipsum is
                      simply dummy .orem Ipsum is simply dummy .</p> <a href="#"><strong>Leer más</strong></a>
              </div>

          </div>
          </div>`;

                              footer += `<div class="row">
              <div class="col">
                  <p id="precio-producto">${data[index].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                  <p id="precio-producto-flag" style="display: none;">${data[index].Precio}</p>
                  <p id="precio-producto-none" style="display: none;">${data[index].Precio}</p>
              </div>
              <div class="col">
                  <div class="input-group small">
                  <button id="cant-menos" type="button" class="btn bor-barra-menos" style="
                  border-radius: 35px 0 0 35px;"> - </button>
                  <button id="cant-texto" type="button" class="bor-barra-texto" disabled>1</button>
                  <button id="cant-mas" type="button" class="btn bor-barra-mas back-verde" style="
                  border-radius: 0 35px 35px 0;"> + </button>
                  </div>
              </div>
              <div class="col">
                  <input type="submit" id="${index}" class="addProduct btn back-verde" style="color: white;" value="Agregar">
              </div>
              </div>`;

                              var config = {
                                  htmlTemplate: true,
                                  headerTemplate: header,
                                  bodyTemplate: body,
                                  footerTemplate: footer,
                                  showBtnsFooter: false,
                                  size: 'lg',
                                  scrollable: false,
                                  centered: true
                              }
                              $('#btn-close').ready().hide()
                              let nuevo = ``

                              $('#cant-menos').ready(() => {
                                  $('#cant-menos').on("click", function () {
                                      debugger
                                      let precio_flag = 0
                                      let precio_none = 0
                                      let cant = $('#cant-texto').text()
                                      if (cant > 1) {
                                          $('#cant-texto').text('')
                                          $('#cant-texto').text(cant - 1)
                                          precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                          precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                          precio_flag -= precio_none
                                          $('#precio-producto-flag').text('')
                                          $('#precio-producto-flag').text(`${precio_flag}`)
                                          $('#precio-producto').text('')
                                          $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                                      }
                                  })
                              })
                              $('#cant-mas').ready(() => {
                                  $('#cant-mas').on("click", function () {
                                      debugger
                                      let precio_flag = 0
                                      let precio_none = 0
                                      let cant = parseInt($('#cant-texto').text())
                                      if (s_cant == 'mayor') {
                                          if (cant < cant_max_mayor) {
                                              $('#cant-mas').attr('disabled', false)
                                              $('#cant-texto').text('')
                                              $('#cant-texto').text(cant + 1)
                                              cant_max_mayor -= cant + 1
                                              cant_max_total -= cant_max_mayor
                                              precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                              precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                              precio_flag += precio_none
                                              $('#precio-producto-flag').text('')
                                              $('#precio-producto-flag').text(`${precio_flag}`)
                                              $('#precio-producto').text('')
                                              $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                                          } else {
                                              $('#cant-mas').attr('disabled', true)
                                          }
                                      } else {
                                          if (cant < cant_max_detal) {
                                              $('#cant-mas').attr('disabled', false)
                                              $('#cant-texto').text('')
                                              $('#cant-texto').text(cant + 1)
                                              cant_max_detal -= cant + 1
                                              cant_max_total -= cant_max_detal
                                              precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                              precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                              precio_flag += precio_none
                                              $('#precio-producto-flag').text('')
                                              $('#precio-producto-flag').text(`${precio_flag}`)
                                              $('#precio-producto').text('')
                                              $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                                          } else {
                                              $('#cant-mas').attr('disabled', true)
                                          }
                                      }

                                  })
                              })

                              $('#btn-cant-detal').ready(() => {
                                  $('#btn-cant-detal').on("click", function () {
                                      s_cant = 'detal'
                                      $('#btn-cant-detal').addClass('back-verde')
                                      $('#btn-cant-mayor').removeClass('back-verde')
                                  })
                              })
                              
                              $('#btn-cant-mayor').ready(() => {
                                  $('#btn-cant-mayor').on("click", function () {
                                      s_cant = 'mayor'
                                      $('#btn-cant-detal').removeClass('back-verde')
                                      $('#btn-cant-mayor').addClass('back-verde')
                                  })
                              })

                              openCustomModal(config, done, cancel);
                              $('.addProduct').ready(() => {

                                  $('.addProduct').click(() => {
                                      debugger
                                      toastr.warning('Debe iniciar sesión', '')
                                      let url = 'https://runtimetestbeta.lappiz.io/#/forms?viewName=MercaFruta_Lappiz_Anonimo&entityId=d78adbad-a584-4ca8-83ff-2077939b0da4&entityName=MercaFruta_Lappiz_Anonimo&appViewId=8bb1e803-0a8d-4ec6-b6b9-1e596d16edbb'
                                      goLocation(url)
                                  })
                              })

                          });
                      })
                  }, 2000)
              }
              $('#col-agregar').append(html)
          })
      })

      $('#slide-precio').on("change", function () {
          debugger
          let precio = parseFloat($('#slide-precio').val())
          $('#p-precio').text('')
          $('#p-precio').text(`Mayor a ${precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
      })

      function returnQuery(Query, urltoken, urlquery) {
          debugger;
          var token = '';
          var datos = {
              grant_type: 'password',
              username: 'admin@mercafruta.com',
              password: 'Fruta.2022',
              parameters: {
                  aType: 'event',
                  environment: 'TEST'
              }
          };
          $.ajax({
              async: false,
              method: "POST",
              url: urltoken,
              data: datos,
              success: function (response) {
                  token = response.access_token;
                  return token;
              },
              error: function (result) {
                  console.log(result);
              },

          });
          if (token != '') {
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
                      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                  },
                  success: function (x) {
                      Response = x[0];
                  }
              });

          }
          return Response;
      }

  }


}, 1500)