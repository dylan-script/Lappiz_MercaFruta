
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1];

if (idVista == '28a8a4ee-84b9-4289-8df9-501ef4eb7a35') {
    //debugger
    setTimeout(() => {

        $('#btnProv').ready(() => {
            $('#btnProv').on("click", function () {
                debugger;
                //var url = $(this).attr("id");
                var url = '#/forms?viewName=MercaFruta_Lappiz_Proveedor&entityId=0c672e60-fd25-492d-b15d-4288353eba6b&entityName=MercaFruta_Lappiz_Proveedor';
                goLocation(url);
            });
        })
    }, 1500)
}
