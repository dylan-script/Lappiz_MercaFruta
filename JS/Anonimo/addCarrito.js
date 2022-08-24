setTimeout(() => {

  var url = location.href;
  var urlSplit = url.split('appViewId=')
  var idVista = urlSplit[1];
  if (idVista == '1e39996a-8b35-43fb-a956-1395c098acc0') {
      debugger
      var urltoken = `${backandGlobal.url}/token`;
      var urlquery = `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/sp/query`
      var products = 'select * from MercaFruta_Lappiz_Productos where CantidadDetal > 0 OR CantidadMayor > 0 order by Nombre asc';        
      // var data = returnQuery(products, urlquery);
      var data = returnQuery(products, urltoken, urlquery);
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
          var rowsShown = Math.floor(parseInt($('#mostrar_select').val())) / 3;
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
                              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                  <label class="btn btn-secondary active">
                                  <input type="radio" name="options" id="btn-cant-mayor" autocomplete="off" checked> Por mayor
                                  </label>
                              </div>
                          </div>
                          <div class="col">
                              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                  <label class="btn btn-secondary">
                                  <input type="radio" name="options" id="btn-cant-detal" autocomplete="off"> Al detal
                                  </label>
                              </div>
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
                              <button id="cant-menos" type="button" class="btn bor-barra-menos"> - </button>
                              <button id="cant-texto" type="button" class="bor-barra-texto" disabled>1</button>
                              <button id="cant-mas" type="button" class="btn bor-barra-mas back-verde text-center"> + </button>
                          </div>
                      </div>
                      <div class="col">
                          <input type="submit" id="${index}" class="addProduct btn rounded-pill back-verde" style="color: white;" value="Agregar">
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
                          if (s_cant == 'mayor') {
                              if (cant > 1) {
                                  $('#cant-texto').text('')
                                  $('#cant-texto').text(cant - 1)
                                  cant_max_mayor += cant - 1
                                  cant_max_total += cant_max_mayor
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
                                  $('#cant-texto').text('')
                                  $('#cant-texto').text(cant - 1)
                                  cant_max_detal += cant - 1
                                  cant_max_total += cant_max_detal
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
                          $('#btn-cant-detal').attr('focus', true)
                          $('#btn-cant-detal').attr('active', true)
                          $('#btn-cant-mayor').attr('focus', false)
                          $('#btn-cant-mayor').attr('active', false)
                      })
                  })

                  $('#btn-cant-mayor').ready(() => {
                      $('#btn-cant-mayor').on("click", function () {
                          s_cant = 'mayor'
                          $('#btn-cant-detal').attr('focus', false)
                          $('#btn-cant-detal').attr('active', false)
                          $('#btn-cant-mayor').attr('focus', true)
                          $('#btn-cant-mayor').attr('active', true)
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

      $('#slide-precio').on("change", function () {
          debugger
          let precio = parseFloat($('#slide-precio').val())
          $('#p-precio').text('')
          $('#p-precio').text(`Mayor a ${precio.toLocaleString('es-CO', { currency: 'COP', style: 'currency' })}`)
      })

      $('#col-agregar').append(html)

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
