setTimeout(() => {
    var url = location.href;
  var urlSplit = url.split('appViewId=')
  var idVista = urlSplit[1];
  //Vista Perfil
  if (idVista == '60c67c27-2496-4ed8-ad24-eeac4235c582'){
    alert('Bienvenido a MercaFruta')
    $('.sidebar-body').prepend($("li.nav-item.nav-profile.dropdown"))
	$('ul.navbar-nav').remove()
	$('div.navbar-content').prepend('<h1>OK\</h1>')
  }
}, 1000);