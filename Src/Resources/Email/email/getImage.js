var mercados = ajaxQuery(`select Id,Nombre,Icono,Direccion from Mercapp_Lappiz_Mercados`)
mercados.forEach(element => {

  var logo = element.Icono
  logo = logo.split('[')
  logo = logo[1].split(']')
  logo = logo[0].split("[")

  var card = `
              <div class="col-xs-12 col-sm-6 col-md-4">
                      <div class="card carda mt-2" style="width: 19rem;">
                          <img src="https://designertest.lappiz.io/Api/api/Upload/UploadImages/${logo[0]}" class="card-img-top" style="width: 100%; alt="mercado">
                          <div class="card-body">
                              <h5 class="card-title" id="h5"><i class="fas fa-mercado"></i> ${element.Nombre}</h5>                    
                              <hr>
                              <button class="btn btn-sesecundary h5 btnIrMercado" id="${element.Id}" >IR AL MERCADO</button>
                          </div>
                      </div>`
  $("#ListMercados").append(card)

})