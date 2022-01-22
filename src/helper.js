function orderStatusText( order ){
  let status = ''
  switch( order.status ){
    case 'processing':
      status = 'en cours'
      break
    case 'on-hold':
      status = 'en attente'
      break
    case 'failed':
      status = 'echoué'
      break
    case 'cancelled':
      status = 'annulée'
      break
    default:
      break
  }
  return status
}

export {orderStatusText}