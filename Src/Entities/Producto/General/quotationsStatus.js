function changeOData(status) {
  debugger
  if (status == 'Aprobada') {
    return 'D';
  }
  if (status == 'No Aprobada') {
    return 'E';
  }
  if (status == 'Devuelta con Observación') {
    return 'C';
  }
  return 'N/A'
}