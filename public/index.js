
 $(document).ready( function () {
    let btn = $('#btn1');
  
    let search = $('#search') ;
   let box = $('#box1');
  function createpost() {
    let rowitem =  $(`<div class = "row mt-2">  </div>`)
    let colitem =  $(`<div class = "col" >  </div>`)

       let colitem1 =    $(`<div class="card mb-3" id ="box">  </div>`)
         let image =          $(`<img class="card-img-top" src="image3.jpg" alt="Card image cap" id = "img">  `)
           let cardbody =        $(`<div class="card-body">  </div>`)
               let heading =      $(`<h5 class="card-title">Card title</h5>`)
                 
               rowitem.append(colitem.append(colitem1.append(image).append(cardbody.append(heading))))
               box.append(rowitem)  
  }
    function createstatus() {
    let row =   $(`<div class ="row mt-2"></div>`)
      let col = $(`<div class ="col"></div>`)
       let carddiv  =      $(`<div class="card" id ="status1"></div>`)
          let card_header           = $(`<div class="card-header">Status</div>`)
                       
                      
                let card_class =      $(`<div class="card-body"></div>`)
                    let block_quote =    $(`<blockquote class="blockquote mb-0"></blockquote`)
                        let mainstatus =  $(`<p>${status.val()}</p>`)
                     let byline   =  $(`<footer class="blockquote-footer">updated by: <cite title="Source Title">Saksham Sachdeva</cite></footer>`)
                    
               row.append(col.append(carddiv.append(card_header).append(card_class.append(block_quote.append(mainstatus).append(byline))))) 
               box.append(row);    
      
    }
  
  

   $(document).on('scroll' , function () {
   
    if($(this).scrollTop >1)

    {
      $('header').addclass('sticky')
    }

   }


   ) 
  
     $('#event').click( function () {
           $('#input-event').css('visibility' , 'visible')
     })

     $('#pictures').click( function () {

         $('input').trigger('click');
        
     })

     let status = $('#status')

     $('#btn').click( function () {

       createstatus() ;
     })
    
         $('#addimage').click(function() {
           createpost()
         })
    })
