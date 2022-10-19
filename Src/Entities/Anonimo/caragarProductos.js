setTimeout(() => {
  var url = location.href;
  var urlSplit = url.split('appViewId=')
  var idVista = urlSplit[1];

  if (idVista == 'd94d2d0c-ba08-42ce-8d59-3025352a0f1c') {
      debugger
    
      $('[title="Cancelar"]').hide()
      $('a#ngb-nav-1').hide()
      $('label.control-label').hide()
      $('a.btn').first().hide()
      $('div.col').first().prepend($('.img-logo-register'))
      $('div.form-section-title').hide()
      $('a#ngb-nav-0').hide() 

      var urltoken = `${backandGlobal.url}/token`;
      var urlquery = `${backandGlobal.api2}/MercaFruta_Lappiz.api/api/lappiz/sp/query`
      var products = 'select * from MercaFruta_Lappiz_Productos where CantidadDetal > 0 OR CantidadMayor > 0 order by Nombre asc'; 
      // var data = returnQuery(products, urlquery);
      var data = returnQuery(products, urltoken, urlquery);

      let html = ``
      let tama = data.length
      let div = Math.floor(tama / 4)
      let mod = tama % 4
      let c = 0

      for (let j = 0; j < div; j++) {
          html += `<div class="row">`
          for (let i = 0; i < 3; i++) {
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
          html += `</div>`
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

      setTimeout(() => {

          let nav_pagi = document.getElementById('nav-pagi')
          while (nav_pagi.hasChildNodes()) {
              nav_pagi.removeChild(nav_pagi.lastChild)
          }
          var rowsShown = 3;
          let i = 1
          var rowsTotal = div;
          var numPages = rowsTotal / rowsShown;
          for (i = 0; i < numPages; i++) {
              var pageNum = i + 1;
              $('#nav-pagi').append('<a href="#" class="btn-outline-info back-verde" style="color: white;" rel="' + i + '">&emsp;' + pageNum + '&emsp;</a> ');
          }
          $('.prod-list .row').hide();
          $('.prod-list .row').slice(0, rowsShown).show();
          $('#nav-pagi a:first').addClass('active');
          $('#nav-pagi a').bind('click', function (e) {
              e.preventDefault();
              $('#nav-pagi a').removeClass('active');
              $(this).addClass('active');
              var currPage = $(this).attr('rel');
              var startItem = currPage * rowsShown;
              var endItem = startItem + rowsShown;
              $('.prod-list .row').css('opacity', '0').hide().slice(startItem, endItem).
                  css('display', 'flex').animate({
                      opacity: 1
                  }, 300);
          });

      }, 1000)

      setTimeout(() => {
          $('#boton-buscar').ready(() => {
              $('#boton-buscar').on("click", function () {
                  let cat = $('#select-cat').val()
                  let prod = $('#buscar').val() != null ? $('#buscar').val() : ''
                  sessionStorage.Buscar = JSON.stringify([prod, cat])
                  var url = "https://runtimetestbeta.lappiz.io/#/forms?viewName=MercaFruta_Lappiz_Anonimo&entityId=d78adbad-a584-4ca8-83ff-2077939b0da4&entityName=MercaFruta_Lappiz_Anonimo&appViewId=1e39996a-8b35-43fb-a956-1395c098acc0"
                  goLocation(url);
              })
          })
      }, 1500)

      setTimeout(() => {
          $('.btn-open-modal').ready(() => {
              $('.btn-open-modal').on("click", function () {
                  toastr.warning('Debe registrarse para poder agregar productos al carrito', '')
              })
          })
      }, 1500)


      $('.prod-list').append(html)

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