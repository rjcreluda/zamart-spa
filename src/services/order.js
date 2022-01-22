
async function set_prestataire(order_id, artisan_id){
  let result
  try{
    result = await window.jQuery.ajax({
      url: window.wpData.ajax_url,
      type: 'POST',
      data: {
        action: 'set_arisan_id',
        order_id: order_id,
        artisan_id: artisan_id,
        nonce: window.wpData.nonce
      }
    })
  }
  catch( error ){
    console.log(error)
  }
  return result
}

export { set_prestataire }