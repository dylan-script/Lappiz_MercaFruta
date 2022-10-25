setTimeout(() => {
  var appViewId = getAppViewId();
  if (appViewId == 'fbc24a95-a5ea-4aa8-9b63-1fc1c69b5ffd') {
    let tipo = getFieldValue('7c2bd4bf-1690-40b2-9655-0ccc84117dcd')

    if (tipo == 'Verduras') {
      sessionStorage.Tipo = 'Verduras';
    }else if(tipo == 'Frutas'){
      sessionStorage.Tipo = 'Frutas';
    }else if(tipo == 'Hortalizas'){
      sessionStorage.Tipo = 'Hortalizas';
    }else if(tipo == 'Granos'){
      sessionStorage.Tipo = 'Granos';
    }else if(tipo == 'Semillas'){
      sessionStorage.Tipo = 'Semillas';
    }else{
      sessionStorage.Tipo = 'Otros';
    }
    console.log(sessionStorage.Tipo)
  }
}, 1000);

setTimeout(() => {
  var appViewId = getAppViewId();
  if (appViewId == 'fbc24a95-a5ea-4aa8-9b63-1fc1c69b5ffd') {
    let estado = getFieldValue('9f568a17-3ec9-4bf7-b6ad-859f0c09d285')

    if (estado == 'Maduro') {
      sessionStorage.Estado = 'Maduro';
      
    }else if(estado == 'Verde'){
        sessionStorage.Estado = 'Verde';
    }else{
        sessionStorage.Estado = 'Pintón';
    }
    console.log(sessionStorage.Estado)
  }
}, 1000);