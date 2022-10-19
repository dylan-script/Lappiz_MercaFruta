setTimeout(() => {
  var url = location.href;
  var urlSplit = url.split('appViewId=')
  var idVista = urlSplit[1];
  if (idVista == 'fbc24a95-a5ea-4aa8-9b63-1fc1c69b5ffd'){
    console.log('En modo edición...');
    disabledField('3b50f4ff-bc13-4d2b-bb1d-e7995f903d60', true);
  }
}, 1000);