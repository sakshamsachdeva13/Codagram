


fetch('https://secure-sierra-40015.herokuapp.com/profilepage/users')
.then(res => res.json())
.then(data => {
  console.log(data.data)

    let username = document.getElementById('username').innerHTML
    console.log(username)
  let user
    for(let i =0 ; i< data.data.length ;i ++)
    {
      if(data.data[i].username === username)
      {
         user = data.data[i]
        break;
      }
    }
    if(user.teacherrating.length=== 0 && user.percentage === 0 && user.projectrating.length === 0) {

      let label = document.createElement("h1")
      label.innerHTML ="your data is not sufficient to show your performance raise your graph as much as possible"
       let doc = document.getElementById('label')
       doc.appendChild(label)
       console.log(doc)
    } else {
   console.log(user)
     let teacher_rating_percentage = 0
    
     let sum  = 0
   for(var i =0;i<user.teacherrating.length ; i++)
   {
     sum = sum + user.teacherrating[i].rating

   } 
    teacher_rating_percentage = sum*10 ; //teacherrating that to be shown
      
   
     
let myChart = document.getElementById('myChart').getContext('2d');
myChart.canvas.height = 40
myChart.canvas.width = 50
    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    let massPopChart = new Chart(myChart, {
      type:'pie', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['teacherrating', 'semmarks', 'project rating'],
        datasets:[{
          label : [''],
          data:[ 
           teacher_rating_percentage,
           
           user.sempercentage.percentage,
           87 ,
            
           
          ],
          //backgroundColor:'green',
          backgroundColor:[
            '#59253a',
            '#2d4159',
            '#0677a1',
           
          ],
          borderWidth:1,
          borderColor:'#bbb',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
        title:{
          display:true,
          text:'Your performance',
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    }); 

  }    
}).catch((err) => {
  console.log(err)
})   

