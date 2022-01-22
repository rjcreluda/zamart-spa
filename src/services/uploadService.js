
async function upload( file ){
  let formData = new FormData()
  formData.append("file", file)
  formData.append( "action", 'upload');
   //Append here your necessary data
  let result;
  try{
    result = window.jQuery.ajax({
        type: 'POST',
        url: window.wpData.ajax_url,
        data: formData,
        processData: false,
        contentType: false,
        success: function(data, /*textStatus, XMLHttpRequest*/) {
            console.log(data)
        },
        error: function(MLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
            MLHttpRequest;
            textStatus;
        }

    });
  }
  catch( error ){
    console.log(error)
  }
  return result
}

export { upload }