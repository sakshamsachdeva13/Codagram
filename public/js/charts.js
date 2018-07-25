


fetch('https://secure-sierra-40015.herokuapp.com/profilepage/user')
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
   
   console.log(user)
     let teacher_rating_percentage = 0
    
     let sum  = 0
   for(var i =0;i<user.teacherrating.length ; i++)
   {
     sum = sum + user.teacherrating[i].rating

   } 
    teacher_rating_percentage = (sum/(5*user.teacherrating.length))*100 ; //teacherrating that to be shown

   let projectsum = 0;
    for(var i =0 ; i<user.projectrating.length ; i++)
    {
      projectsum = projectsum+ user.projectrating[i].studentrating ;
    }
      
     let project_rating_percent = (projectsum/(5*user.projectrating.length))*100;
     
     console.log(project_rating_percent)
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
        labels:['Teacher Rating', 'Semester Marks', 'Project Rating'],
        datasets:[{
          label : [''],
          data:[  teacher_rating_percentage , user.sempercentage.percentage, project_rating_percent ,] ,
             
            
          
         
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
            fontColor:'#111'
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

     
}).catch((err) => {
  console.log(err)
})   

