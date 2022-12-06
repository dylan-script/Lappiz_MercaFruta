setTimeout(() => {

  var url = location.href;
  var urlSplit = url.split('appViewId=')
  var idVista = urlSplit[1];
  if (idVista == 'cdfdc319-5217-480c-990e-14920db48c40') {
      debugger
      // var urltoken = `${backandGlobal.url}/token`;
      var urlquery = `${backandGlobal.api2}/${sessionStorage.workspace}.api/api/lappiz/sp/query`
      var products = 'select * from FrutaNet_Lappiz_Productos where CantidadDetal > 0 OR CantidadMayor > 0 order by Nombre asc';
      var data = returnQuery(products, urlquery);
      // var data = returnQuery(products, urltoken, urlquery);
      let mayor = data[0].Precio
      let menor = data[0].Precio
      for (let i = 1; i < data.length; i++) {
          if (mayor < data[i].Precio) mayor = data[i].Precio
          if (menor > data[i].Precio) menor = data[i].Precio
      }
      setTimeout(() => {
          $('#slide-precio').ready(() => {
              $('#slide-precio').attr("min", menor)
              $('#slide-precio').attr("max", mayor * 0.9)
              $('#slide-precio').attr("step", menor * 2)
              $('#slide-precio').val(menor)
              $('#p-precio').text('')
              $('#p-precio').text(`Mayor a ${parseFloat($('#slide-precio').val()).toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
          })
      }, 1000)

      let tama = data.length

      $('#resultado_busqueda').text(`1 - ${tama} de ${tama}`)
      let div = Math.floor(tama / 4)
      let mod = tama % 4
      let c = 0

      let html = ``
      let cantidad

      for (let j = 0; j < div; j++) {
          html += `<div class="row">`
          for (let i = 0; i < 4; i++) {
              let cantidad = data[c].PesoDetal > 0 ? data[c].PesoDetal : data[c].PesoMayor
              let imagen = data[c].Foto.replace('[', '')
              imagen = imagen.replace(']', '')
              html += `
                  <div class="col-3">
                      <div class="card-deck">
                          <div class="card" style="max-height: 344px; max-width: 256px;">
                              <img class="card-img-top" max-height="230" max-width="256" src="https://designertest.lappiz.io/Api/api/Upload/UploadImages/${imagen}" alt="Card image cap">
                              <div class="card-body" style="height: 113px;">
                                  <p class="card-text">${data[c].Nombre} x ${cantidad}</p>
                                  <p class="card-text">${data[c].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                  <button id="${c}" class="btn-open-modal btn back-verde" style="color: white;">Agregar</button>
                              </div>
                          </div>
                      </div>
                  </div>`
              c++
          }
          html += `</div> <br>`
      }
      html += `<div class="row">`
      for (let i = 0; i < mod; i++) {
          let cantidad = data[c].PesoDetal > 0 ? data[c].PesoDetal : data[c].PesoMayor
          let imagen = data[c].Foto.replace('[', '')
          imagen = imagen.replace(']', '')
          html += `
              <div class="col-3">
                  <div class="card-deck">
                      <div class="card" style="max-height: 344px; max-width: 256px;">
                          <img class="card-img-top" max-height="230" max-width="256" src="https://designertest.lappiz.io/Api/api/Upload/UploadImages/${imagen}" alt="Card image cap">
                          <div class="card-body" style="height: 113px;">
                              <p class="card-text">${data[c].Nombre} x ${cantidad}</p>
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
          var rowsShown = Math.floor(parseInt($('#mostrar_select').val())) / 4;
          let i = 1
          let f = parseInt($('#mostrar_select').val())
          let c = f
          $('#resultado_busqueda').text(`${i} - ${f} de ${tama}`)
          var rowsTotal = div;
          var numPages = rowsTotal / rowsShown;
          for (i = 0; i < numPages; i++) {
              var pageNum = i + 1;
              $('#nav-pagi').append('<a href="#" class="btn-outline-info back-verde" style="color: white;" rel="' + i + '">&emsp;' + pageNum + '&emsp;</a> ');
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
      let detallepedido = sessionStorage.DetallePedido == undefined ? [] : JSON.parse(sessionStorage.DetallePedido)
      let objDetallePedido = {}
      let cant_max_detal
      let cant_max_mayor
      let cant_max_total
      let cant = 0
      let s_cant = 'mayor'
      let aux_detal = 0
      let aux_mayor = 0

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
                  cant_max_detal = parseInt(data[index].CantidadDetal) - 1
                  cant_max_mayor = parseInt(data[index].CantidadMayor) - 1
                  cant_max_total = parseInt(data[index].CantidadTotal) - 1
                  aux_detal = parseInt(data[index].CantidadDetal)
                  aux_mayor = parseInt(data[index].CantidadMayor)


                  var prom = `select Porcentaje from FrutaNet_Lappiz_Promocion WHERE ProductoFk = '${data[index].Id}'`;
                  var desc = returnQuery(prom, urlquery);

                  body = ``, footer = ``; header = ``
                  header += `<span aria-hidden="true"></span>`
                  let imagen = data[index].Foto.replace('[', '')
                  imagen = imagen.replace(']', '')

                  body += `<div class="row">
                  <div class="col-5">
                      <div class="row"></div>
                      <div class="row">
                          <img width="240" heigth="323" src="https://designertest.lappiz.io/Api/api/Upload/UploadImages/${imagen}" alt="image">
                      </div>
                      <div class="row"></div>
                  </div>

                  <div class="col-7">
                      <div class="row">
                          <h3 id="nombre-producto">${data[index].Nombre}</h3>
                          <p id="user_pk" style="display: none;">${JSON.parse(sessionStorage.LappizUser).Id}</p>
                          <p id="producto-fk" style="display: none;">${data[index].Id}</p>
                      </div>
                      <div class="row">
                          <h4>${data[index].NombreCientifico}</h4>
                      </div>
                      <hr>
                      <div class="row">
                          <span>${data[index].PaisFk}</span>
                      </div>
                      <div class="row">
                          <span>${data[index].CantidadTotal} ${data[index].PesoTotal} disponible</span>
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
                          <div class="col">
                              <p><strong>Tamaño:</strong> ${data[index].Tamano}</p>
                          </div>
                          <div class="col">
                              <p><strong>Estado de maduración:</strong> ${data[index].Estado}</p>
                          </div>
                      </div>
                      <div class="row">
                          <p><strong>Descripción:</strong></p>
                      </div>
                      <div class="row">
                          <p>${data[index].Descripcion}</p> <a href="#"><strong>Leer más</strong></a>
                      </div>

                  </div>
                  </div>`;

                  if (desc != '') {
                      let precio = (100 - desc[0].Porcentaje) * data[index].Precio / 100
                      footer += `<div class="row">
                          <div class="col">
                              <div class="row">
                                  <p id="precio-producto">${precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                  <p id="precio-producto-flag" style="display: none;">${precio}</p>
                                  <p id="precio-producto-none" style="display: none;">${precio}</p>
                                  <p id="precio-producto-original" style="display: none;">${data[index].Precio}</p>
                              </div>
                              <div class="row">
                                  <p><small><del>${data[index].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</del></small></p>
                              </div>
                          </div>
                          <div class="col">
                              <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                              <button id="cant-menos" type="button" class="btn bor-barra-menos" style="
                              border-radius: 35px 0 0 35px;"> - </button>
                              <button id="cant-texto" type="button" class="bor-barra-texto" disabled>1</button>
                              <button id="cant-mas" type="button" class="btn bor-barra-mas back-verde" style="
                              border-radius: 0 35px 35px 0;"> + </button>
                              </div>
                          </div>
                          <div class="col">
                              <input type="submit" id="${index}" class="addProduct btn rounded-pill back-verde" style="color: white;" value="Agregar">
                          </div>
                          </div>`;
                  } else {
                      footer += `<div class="row">
                          <div class="col">
                              <div class="row">
                                  <p id="precio-producto">${data[index].Precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}</p>
                                  <p id="precio-producto-flag" style="display: none;">${data[index].Precio}</p>
                                  <p id="precio-producto-none" style="display: none;">${data[index].Precio}</p>
                                  <p id="precio-producto-original" style="display: none;">${data[index].Precio}</p>
                              </div>
                          </div>
                          <div class="col">
                              <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                              <button id="cant-menos" type="button" class="btn bor-barra-menos" style="
                              border-radius: 35px 0 0 35px;"> - </button>
                              <button id="cant-texto" type="button" class="bor-barra-texto" disabled>1</button>
                              <button id="cant-mas" type="button" class="btn bor-barra-mas back-verde" style="
                              border-radius: 0 35px 35px 0;"> + </button>
                              </div>
                          </div>
                          <div class="col">
                              <input type="submit" id="${index}" class="addProduct btn rounded-pill back-verde" style="color: white;" value="Agregar">
                          </div>
                          </div>`;
                  }

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
                          cant = $('#cant-texto').text()
                          if (s_cant == 'mayor') {
                              if (cant > 1) {
                                  $('#cant-mas').removeClass('back-verde')
                                  $('#cant-menos').addClass('back-verde')
                                  $('#cant-texto').text('')
                                  $('#cant-texto').text(cant - 1)
                                  cant--
                                  cant_max_mayor++
                                  cant_max_total++
                                  precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                  precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                  precio_flag -= precio_none
                                  $('#precio-producto-flag').text('')
                                  $('#precio-producto-flag').text(`${precio_flag}`)
                                  $('#precio-producto').text('')
                                  $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                              }
                          } else {
                              if (cant > 1) {
                                  $('#cant-mas').removeClass('back-verde')
                                  $('#cant-menos').addClass('back-verde')
                                  $('#cant-texto').text('')
                                  $('#cant-texto').text(cant - 1)
                                  cant--
                                  cant_max_detal++
                                  cant_max_total++
                                  precio_flag = parseFloat($('#precio-producto-flag').text()) //temporal
                                  precio_none = parseFloat($('#precio-producto-none').text()) //DB
                                  precio_flag -= precio_none
                                  $('#precio-producto-flag').text('')
                                  $('#precio-producto-flag').text(`${precio_flag}`)
                                  $('#precio-producto').text('')
                                  $('#precio-producto').text(`${precio_flag.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
                              }
                          }
                      })
                  })
                  $('#cant-mas').ready(() => {
                      $('#cant-mas').on("click", function () {
                          debugger
                          let precio_flag = 0
                          let precio_none = 0
                          cant = parseInt($('#cant-texto').text())
                          if (s_cant == 'mayor') {
                              if (cant < aux_mayor) {
                                  $('#cant-mas').addClass('back-verde')
                                  $('#cant-menos').removeClass('back-verde')
                                  $('#cant-mas').attr('disabled', false)
                                  $('#cant-texto').text('')
                                  $('#cant-texto').text(cant + 1)
                                  cant++
                                  cant_max_mayor--
                                  cant_max_total--
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
                              if (cant < aux_detal) {
                                  $('#cant-mas').addClass('back-verde')
                                  $('#cant-menos').removeClass('back-verde')
                                  $('#cant-mas').attr('disabled', false)
                                  $('#cant-texto').text('')
                                  $('#cant-texto').text(cant + 1)
                                  cant++
                                  cant_max_detal--
                                  cant_max_total--
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
                          let sub = parseInt($('#cant-texto').text()) * parseFloat($('#precio-producto-none').text())
                          let original = parseFloat($('#precio-producto-original').text())
                          let cliente = $('#user_pk').text()
                          if (sessionStorage.DetallePedido == undefined) {
                              if (s_cant == 'mayor') {
                                  objDetallePedido = {
                                      Nombre: $('#nombre-producto').text(),
                                      Cantidad: parseInt($('#cant-texto').text()),
                                      CantidadMayor: cant_max_mayor,
                                      CantidadTotal: cant_max_total,
                                      PesoMayor: data[index].PesoMayor,
                                      PesoTotal: data[index].PesoTotal,
                                      PrecioOriginal: original,
                                      ProductoFk: $('#producto-fk').text(),
                                      ValorUnitario: parseInt($('#precio-producto-none').text()),
                                      SubTotal: sub,
                                      ClienteId: `${cliente}`,
                                      Eliminado: false,
                                      TipoCantidad: s_cant,
                                      Imagen: imagen
                                  }
                                  detallepedido.push(objDetallePedido)
                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                  $('#boton-cart-p').text('')
                                  contador++
                                  $('#boton-cart-p').append(contador)
                              } else {
                                  objDetallePedido = {
                                      Nombre: $('#nombre-producto').text(),
                                      Cantidad: parseInt($('#cant-texto').text()),
                                      CantidadDetal: cant_max_detal,
                                      CantidadTotal: cant_max_total,
                                      PesoDetal: data[index].PesoDetal,
                                      PrecioOriginal: original,
                                      PesoTotal: data[index].PesoTotal,
                                      ProductoFk: $('#producto-fk').text(),
                                      ValorUnitario: parseInt($('#precio-producto-none').text()),
                                      SubTotal: sub,
                                      ClienteId: `${cliente}`,
                                      Eliminado: false,
                                      TipoCantidad: s_cant,
                                      Imagen: imagen
                                  }
                                  detallepedido.push(objDetallePedido)
                                  sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                  $('#boton-cart-p').text('')
                                  contador++
                                  $('#boton-cart-p').append(contador)
                              }
                          } else {
                              let buscar = detallepedido.find(x => x.Nombre === $('#nombre-producto').text())
                              if (buscar != undefined) {
                                  let indice = detallepedido.indexOf(buscar)

                                  let cliente = $('#user_pk').text()
                                  if (s_cant == 'mayor') {
                                      objDetallePedido = {
                                          Nombre: $('#nombre-producto').text(),
                                          Cantidad: parseInt($('#cant-texto').text()),
                                          CantidadMayor: cant_max_mayor,
                                          CantidadTotal: cant_max_total,
                                          ProductoFk: $('#producto-fk').text(),
                                          ValorUnitario: parseInt($('#precio-producto-none').text()),
                                          SubTotal: sub,
                                          PesoMayor: data[index].PesoMayor,
                                          PrecioOriginal: original,
                                          PesoTotal: data[index].PesoTotal,
                                          ClienteId: `${cliente}`,
                                          TipoCantidad: s_cant,
                                          Imagen: imagen
                                      }
                                      let nuevo = detallepedido.splice(indice, 1, objDetallePedido)
                                      sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                  } else {
                                      objDetallePedido = {
                                          Nombre: $('#nombre-producto').text(),
                                          Cantidad: parseInt($('#cant-texto').text()),
                                          CantidadDetal: cant_max_detal,
                                          CantidadTotal: cant_max_total,
                                          PesoTotal: data[index].PesoTotal,
                                          PrecioOriginal: original,
                                          PesoDetal: data[index].PesoDetal,
                                          ProductoFk: $('#producto-fk').text(),
                                          ValorUnitario: parseInt($('#precio-producto-none').text()),
                                          SubTotal: sub,
                                          ClienteId: `${cliente}`,
                                          TipoCantidad: s_cant,
                                          Imagen: imagen
                                      }
                                      let nuevo = detallepedido.splice(indice, 1, objDetallePedido)
                                      sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                  }
                              } else {
                                  let cliente = $('#user_pk').text()
                                  if (s_cant == 'mayor') {
                                      objDetallePedido = {
                                          Nombre: $('#nombre-producto').text(),
                                          Cantidad: parseInt($('#cant-texto').text()),
                                          CantidadMayor: cant_max_mayor,
                                          CantidadTotal: cant_max_total,
                                          ProductoFk: $('#producto-fk').text(),
                                          ValorUnitario: parseInt($('#precio-producto-none').text()),
                                          SubTotal: sub,
                                          PesoMayor: data[index].PesoMayor,
                                          PrecioOriginal: original,
                                          PesoTotal: data[index].PesoTotal,
                                          ClienteId: `${cliente}`,
                                          TipoCantidad: s_cant,
                                          Imagen: imagen
                                      }
                                      detallepedido.push(objDetallePedido)
                                      sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                      $('#boton-cart-p').text('')
                                      contador++
                                      $('#boton-cart-p').append(contador)
                                  } else {
                                      objDetallePedido = {
                                          Nombre: $('#nombre-producto').text(),
                                          Cantidad: parseInt($('#cant-texto').text()),
                                          CantidadDetal: cant_max_detal,
                                          CantidadTotal: cant_max_total,
                                          PesoTotal: data[index].PesoTotal,
                                          PrecioOriginal: original,
                                          PesoDetal: data[index].PesoDetal,
                                          ProductoFk: $('#producto-fk').text(),
                                          ValorUnitario: parseInt($('#precio-producto-none').text()),
                                          SubTotal: sub,
                                          ClienteId: `${cliente}`,
                                          TipoCantidad: s_cant,
                                          Imagen: imagen
                                      }
                                      detallepedido.push(objDetallePedido)
                                      sessionStorage.DetallePedido = JSON.stringify(detallepedido)
                                      $('#boton-cart-p').text('')
                                      contador++
                                      $('#boton-cart-p').append(contador)
                                  }
                              }
                          }
                          toastr.success('Producto añadido al carrito', '')
                      })
                  })

              });
          })
      }, 2000)

      $('#slide-precio').on("change", function () {
          debugger
          let precio = parseFloat($('#slide-precio').val())
          $('#p-precio').text('')
          $('#p-precio').text(`Mayor a ${precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
      })

      $('#col-agregar').append(html)

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