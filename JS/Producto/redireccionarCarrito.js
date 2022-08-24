
var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1];

if (idVista == 'cdfdc319-5217-480c-990e-14920db48c40') {
    debugger
    setTimeout(() => {

        $('.boton-cart').ready(() => {
            $('.boton-cart').on("click", function () {
                debugger;
                var url = $(this).attr("id");
                goLocation(url);
            });
        })
    }, 1500)
}