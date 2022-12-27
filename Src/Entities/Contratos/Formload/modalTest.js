setTimeout(() => {
  console.clear();
  let appViewId = getAppViewId();
  console.log(appViewId);
  if (appViewId == 'fe5fe785-b651-4639-90e5-19c225ea040d') {
    debugger;
    // Método encargado de abrir una modal
    var header = ``, body = ``, footer = ``

    header = `<h4 class="modal-title">Título modal Lappiz</h4>`
    body = `<p>
  <span>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
  </span>
</p>`
    footer = `<h4>Modal footer</h4>`

    var config = {
      htmlTemplate: true,
      headerTemplate: header,
      bodyTemplate: body,
      footerTemplate: footer,
      showBtnsFooter: true | false,
      size: 'sm' | 'lg' | 'xl',
      scrollable: true | false,
      centered: true | false
    }

    const done = () => {
      console.log('Done callback')
    }

    const cancel = () => {
      console.log('Cancel callback')
    }

    openCustomModal(config, done, cancel)
  }
}, 1000);