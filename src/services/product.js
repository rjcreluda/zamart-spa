
async function save(product){
  const { name, price, category_id, description, thumbnail_id } = product
  let result
  try{
    result = await window.jQuery.ajax({
      url: window.wpData.ajax_url,
      type: 'POST',
      //timeout: 15000,
      data: {
        action: 'save_product',
        name, price, category_id, description, thumbnail_id,
        nonce: window.wpData.nonce
      },
    })
  }
  catch( error ){
    console.log(error)
  }
  /*window.jQuery.ajax({
    url: window.wpData.ajax_url,
    type: 'POST',
    //timeout: 15000,
    data: {
      action: 'save_product',
      name, price, category_id, description,
      nonce: window.wpData.nonce
    },
    error: (err) => {
      console.log(err)
      //this.loading = false
      console.log('erreur')
      is_success = false;
    },
    success: (response) => {
      console.log(response)
      console.log('done')
      is_success = true;
    }
  })*/
  return result
}
async function remove( id ){
  let result;
  try{
    result = await window.jQuery.ajax({
      url: window.wpData.ajax_url,
      type: 'POST',
      //timeout: 15000,
      data: {
        action: 'delete_product',
        id,
        nonce: window.wpData.nonce
      },
    })
  }
  catch( error ){
    console.log(error)
  }
  return result
}


export { save, remove }