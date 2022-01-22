async function save(artisan){
  const { name, email, phone, address } = artisan
  let result
  try{
    result = await window.jQuery.ajax({
      url: window.wpData.ajax_url,
      type: 'POST',
      //timeout: 15000,
      data: {
        action: 'save_artisan',
        name, email, phone, address,
        nonce: window.wpData.nonce
      },
    })
  }
  catch( error ){
    console.log(error)
  }
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
        action: 'delete_artisan',
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