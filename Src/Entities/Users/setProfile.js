//Roles
//Admin: IdRol=d57d7e30-34b8-4b42-9e37-2038d1d715b2
//Comprador:idRol=d20eb7c2-cf7b-4e99-8a1b-cc4fb28294d4
//Proveedor: idRol=12ef9a54-036d-4942-a391-2c9fb6538753
function setProfile(idRol) {
  if (idRol == 'd20eb7c2-cf7b-4e99-8a1b-cc4fb28294d4') {
    alert('Bienvenido a MercaFruta')
    $('.sidebar-body').prepend($("li.nav-item.nav-profile.dropdown"))
    $('ul.navbar-nav').remove()
  }
}