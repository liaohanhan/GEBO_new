// $(document).ready(function(){
//    GetGoal()
//    GetSchdule()

// })
// //年度目標的DATA
// function GetGoal(){

//    $.ajax({
//       type: "GET",
//       url: "/api/AnnualGoal/" + $.session.get("MemberId") + "/" + 2020,
//       success: function (goaldata) {
//          console.log("STEP1:GETGOAL")
//          console.log(goaldata)
         
//          RenderGoal(goaldata)
//          GetRelatedPlan()
//          GetPlan()

//       },
//       error: function (error) {
//          console.log('goaldataerror')
//          console.log(error)
//       }
//    })
// }
// //有連結的月計畫
// function GetRelatedPlan(){

//    $.ajax({
//       type: "GET",
//       url: "/api/monthplan/RelatedToGoalPlan/" + $.session.get("MemberId"),
//       success: function (relatedplandata) {
//          console.log("GETRELATEDPLAN")
//          console.log(relatedplandata)
        
//          RenderRelatedPlan(relatedplandata)
//          GetRelatedSchdule()
         

//       },
//       error: function (error) {
//          console.log('relatedplandataerror')
//          console.log(error)
//       }
//    })
// }
// //獨立月計畫
// function GetPlan(){
//    $.ajax({
//       type: "GET",
//       url: "/api/monthplan/Plan/" + $.session.get("MemberId"),
//       success: function (plandata) {
//          console.log("GETPLAN")
//          console.log(plandata)
        
//          RenderPlan(plandata)
      
        

//       },
//       error: function (error) {
//          console.log('rplandataerror')
//          console.log(error)
//       }
//    })
// }
// //有連結的行程
// function GetRelatedSchdule(){
//    $.ajax({
//       type: "GET",
//       url: "/api/monthplan/RelatedSchedule/" + $.session.get("MemberId"),
//       success: function (relatedSchduledata) {
//          console.log("GETRELATESchdule")
//          console.log(relatedSchduledata)
         
//          RenderRelatedSchdule(relatedSchduledata)
//          RenderRelatedTOGoalSchdule(relatedSchduledata)
         
         

//       },
//       error: function (error) {
//          console.log('relatedSchduledataerror')
//          console.log(error)
//       }
//    })
// }
// //獨立行程
// function GetSchdule(){
//    $.ajax({
//       type: "GET",
//       url: "/api/monthplan/Schedule/" + $.session.get("MemberId"),
//       success: function (Schduledata) {
//          console.log("GETSchdule")
//          console.log(Schduledata)
        
//          RenderSchdule(Schduledata)
         
         

//       },
//       error: function (error) {
//          console.log('Schduledataerror')
//          console.log(error)
//       }
//    })


// }

// //載入年度目標
// function RenderGoal(goaldata){
//    for(i=0;i<goaldata.length;i++){
//       $("#ALL_YEAR").append(
//          `<li id="Goal${goaldata[i].id}" class="GOAL" >${goaldata[i].goal}</li>
        
//          <ul id="ALL_MONTH${goaldata[i].id}" class="all_month">月計畫</ul>`
         
//       )
//    }
 
// }
// //載入有連結的月計畫
// function RenderRelatedPlan(relatedplandata){
//    for (i=0;i<relatedplandata.length;i++){
//       $("#ALL_MONTH"+relatedplandata[i].agId).append(
//          `
//           <li id="Month${relatedplandata[i].id}"  class="MONTH">${relatedplandata[i].content}</li>
//             <ul  id="ALL_SCHEDULE${relatedplandata[i]}"class="all_schedule">行程</ul>
                
//          `
//       )
//    }
   
// }
// //載入獨立月計畫
// function RenderPlan(plandata){
//    for (i=0;i<plandata.length;i++){
//       $("#OnlyPlan").append(
//          `<li id="plan${plandata[i].id}" class="GOAL">${plandata[i].title}</li>
//          <ul  id="ALL_MONTH${plandata[i].id}"class="all_month">行程</ul>
//        `
//       )
     
//    }
  
// }
// //載入有連結的行程(+date)
// function RenderRelatedSchdule(relatedscheduledata){
  
//    for(i=0;i<relatedscheduledata.length;i++){
//    $("#ALL_MONTH"+relatedscheduledata[i].mpId).append(
//       ` <li id="Month${relatedscheduledata[i].id}"  class="Month">${relatedscheduledata[i].title}</li>`
//    )
// }


// }
// //載入有年度目標有月計畫的行程
// function RenderRelatedTOGoalSchdule(relatedtoGoalscheduledata){
//    for(i=0;i<relatedtoGoalscheduledata.length;i++){
//       $("#ALL_SCHEDULE"+relatedtoGoalscheduledata[i].mpId).append(
//          ` <li id="Schedule${relatedtoGoalscheduledata[i].id}"  class="SCHEDULE">${relatedtoGoalscheduledata[i].title}</li>`
//       )

//    }
// }
// //載入行程
// function RenderSchdule(scheduledata){
//    for(i=0;i<scheduledata.length;i++){
//    $("#OnlySchdule").append(
//       `<li class="GOAL">${scheduledata[i].title}</li>`
//    )
// }
// Openslide()
// }

// function Openslide(){
//    console.log("open")
//     $(".all_year ul").hide()

//    $(".GOAL").on("click", function () {
//       $(this).next("ul.all_month").slideToggle()
//       $(".all_month").not($(this).next("ul.all_month")).slideUp()
//       console.log("open.GOAL")
//    })

//    $(".MONTH").on("click", function () {
//       $(this).next("ul.all_schdule").slideToggle()

//       $(".all_schdule").not($(this).next("ul.all_schdule")).slideUp()

//    })
// }


