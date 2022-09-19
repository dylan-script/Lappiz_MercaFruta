var url = location.href;
    var urlSplit = url.split('appViewId=')
    var idVista = urlSplit[1];

    if (idVista == 'd94d2d0c-ba08-42ce-8d59-3025352a0f1c') {
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

            $('.red-comp').ready(() => {
                $('.red-comp').on("click", function () {
                    debugger;
                    var url = $(this).attr("id");
                    goLocation(url);
                });
            })
            
            $('.red-otros').ready(() => {
                $('.red-otros').on("click", function () {
                    debugger;
                    var url = $(this).attr("id");
                    goLocation(url);
                });
            })
            
            $('.red-parque').ready(() => {
                $('.red-parque').on("click", function () {
                    debugger;
                    var url = $(this).attr("id");
                    goLocation(url);
                });
            })
            $('.btn-reg').ready(() => {
                $('.btn-reg').on("click", function () {
                    debugger;
                    var url = $(this).attr("id");
                    goLocation(url);
                });
            })
            $('.btn-login').ready(() => {
                $('.btn-login').on("click", function () {
                    debugger;
                    var url = $(this).attr("id");
                    goLocation(url);
                });
            })
        }, 2000)
    }