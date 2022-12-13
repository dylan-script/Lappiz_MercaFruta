//Devuelta con Observación,Aprobada,No Aprobada
function getStatusImg(status) {
  debugger
  let image = 0
  if (status == 'En Revisión') { image = `https://i.postimg.cc/hPk40Q5Y/Estado-En-Revision.jpg` }

  if (status == 'Devuelta con Observación') { image = `https://i.postimg.cc/x8kYv9yY/Estado-Devuelto-con-Observaciones.png` }

  if (status == 'Aprobada') { image = `https://i.postimg.cc/jjXsKgSV/Estado-Aprobado.png` }

  if (status == 'No Aprobada') { image = `https://i.postimg.cc/zf5JsZ5S/Estado-No-Aprobado.png` }

  if (status == 'Recibida con Ajuste') { image = `https://i.postimg.cc/wvj9BX11/Estado-Recibido-con-ajustes.png` }

  if (status == 'Recibida') { image = `https://i.postimg.cc/T2STRWfP/Estado-Recibido.png` }

  return image;

}