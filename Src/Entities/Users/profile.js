setTimeout(() => {
  var url = location.href;
  var urlSplit = url.split('appViewId=')
  var idVista = urlSplit[1];
  //Vista Perfil
  if (idVista == '60c67c27-2496-4ed8-ad24-eeac4235c582') {
    setProfile(sessionStorage.rolesId)
  }
}, 1000);