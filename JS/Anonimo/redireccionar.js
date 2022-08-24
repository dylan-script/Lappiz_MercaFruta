var url = location.href;
var urlSplit = url.split('appViewId=')
var idVista = urlSplit[1];

if (idVista == '8bb1e803-0a8d-4ec6-b6b9-1e596d16edbb') {
    debugger
    setTimeout(() => {

        $('.red-prov').ready(() => {
            $('.red-prov').on("click", function () {
                debugger;
                var url = $(this).attr("id");
                goLocation(url);
            });
        })
        
        $('.red-log').ready(() => {
            $('.red-log').on("click", function () {
                debugger;
                var url = $(this).attr("id");
                goLocation(url);
            });
        })
        
    }, 2000)
}