
  $(document).ready( function () {
    let newperson = []
   let username = $('#username')
   let cpassword = $('#cpassword')
   let vpassword =  $('#vpassword')
      $('#btn').click(function() {
     if(cpassword.val()!=vpassword.val()) {

        window.alert(`both passwords does not match`)

        
        
     }
  else {
      newperson.push( {
         Username : username.val() ,
         password : cpassword.val() 
     })

     localStorage.setItem('newperson' , JSON.stringify(newperson))
     window.location.href = "file:///home/saksham/Documents/Project/loginidpage.html"
    }
})

  

})