function calculateDifference(fecha1, fecha2) {
  var fecha1 = new Date(currentDate);
  var fecha2 = new Date(availabilityDate);
  var Difference_In_Time = fecha2.getTime() - fecha1.getTime();
  console.log(Difference_In_Time)
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  console.log(Difference_In_Days)

  if (sessionStorage.Estado == 'Maduro') {
    Difference_In_Days <= 3 ?
      alert('Se acepta el cultivo')
      :
      alert('No se puede aceptar el cultivo')

  } else if (sessionStorage.Estado == 'Verde') {
    Difference_In_Days <= 7 ?
      alert('Se acepta el cultivo')
      :
      alert('No se puede aceptar el cultivo')
  } else {
    Difference_In_Days <= 5 ?
      alert('Se acepta el cultivo')
      :
      alert('No se puede aceptar el cultivo')
  }

}