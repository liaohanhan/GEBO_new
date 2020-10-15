//#region  顯示


function openslideRefresh() {
   console.log('openslideRefresh')
   // $(".all_year ul").hide()
   $(".MONTH").off("click")
   $(".GOAL").off("click")

   $(".MONTH").on("click", function () {
      console.log('".MONTH").on("click"')
      $(this).next("div.all_schedule").slideToggle()
      $(".all_schedule").not($(this).next("div.all_schedule")).slideUp()
   })
   $(".GOAL").on("click", function () {
      console.log('".GOAL").on("click",')
      $(this).next("div.all_month").slideToggle()
      $(".all_month").not($(this).next("div.all_month")).slideUp()

   })


}

//年度目標的DATA
function GetGoal() {

   $.ajax({
      type: "GET",
      url: "/api/AnnualGoal/" + $.session.get("MemberId") + "/" + $.session.get("Year"),
      success: function (goaldata) {
         console.log("STEP1:GETGOAL")
         console.log(goaldata)

         RenderGoal(goaldata)
         GetRelatedPlan()
         GetPlan()


      },
      error: function (error) {
         console.log('goaldataerror')
         console.log(error)
      }
   })
}
//有連結的月計畫
function GetRelatedPlan() {

   $.ajax({
      type: "GET",
      url: "/api/monthplan/RelatedToGoalPlan/" + $.session.get("MemberId"),
      success: function (relatedplandata) {
         console.log("GETRELATEDPLAN")
         console.log(relatedplandata)

         RenderRelatedPlan(relatedplandata)
         GetRelatedSchdule()


      },
      error: function (error) {
         console.log('relatedplandataerror')
         console.log(error)
      }
   })
}
//獨立月計畫
function GetPlan() {
   $.ajax({
      type: "GET",
      url: "/api/monthplan/Plan/" + $.session.get("MemberId"),
      success: function (plandata) {
         console.log("GETPLAN")
         console.log(plandata)

         RenderPlan(plandata)



      },
      error: function (error) {
         console.log('rplandataerror')
         console.log(error)
      }
   })
}
//有連結的行程
function GetRelatedSchdule() {
   $.ajax({
      type: "GET",
      url: "/api/monthplan/RelatedSchedule/" + $.session.get("MemberId"),
      success: function (relatedSchduledata) {
         console.log("GETRELATESchdule")
         console.log(relatedSchduledata)

         RenderRelatedSchdule(relatedSchduledata)
         RenderRelatedTOGoalSchdule(relatedSchduledata)



      },
      error: function (error) {
         console.log('relatedSchduledataerror')
         console.log(error)
      }
   })
}
//獨立行程
function GetSchdule() {
   $.ajax({
      type: "GET",
      url: "/api/monthplan/Schedule/" + $.session.get("MemberId"),
      success: function (Schduledata) {
         console.log("GETSchdule")
         console.log(Schduledata)

         RenderSchdule(Schduledata)



      },
      error: function (error) {
         console.log('Schduledataerror')
         console.log(error)
      }
   })


}

//載入年度目標
function RenderGoal(goaldata) {
   console.log("RenderGoal")
   $("#ALL_YEAR").empty()
   $("#ALL_YEAR").append("年度目標")
   for (i = 0; i < goaldata.length; i++) {
      if (
         (Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(goaldata[i].beginDate))) >= 0)
         && (Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(goaldata[i].endDate))) <= 0)) {
         $("#ALL_YEAR").append(
            `
            <div class="GOAL"><input id="Goal${goaldata[i].id}"  value="${goaldata[i].goal}" disabled/></div>
        
         <div id="ALL_MONTH${goaldata[i].id}" class="all_month">月計畫</div>`

         )
      }

   }

}
//載入有連結的月計畫
function RenderRelatedPlan(relatedplandata) {
   console.log("RenderRelatedPlan")
   for (i = 0; i < relatedplandata.length; i++) {
      if ((Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(relatedplandata[i].beginDate))) >= 0)
         && (Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(relatedplandata[i].endDate))) <= 0)) {
         $("#ALL_MONTH" + relatedplandata[i].agId).append(
            `
          <div class="MONTH"><input id="Month${relatedplandata[i].id}"   value="${relatedplandata[i].content}" disabled/></div>
            <div  id="ALL_SCHEDULE${relatedplandata[i].id}"class="all_schedule"></div>
                
         `
         )
      }
   }

}
//載入獨立月計畫
function RenderPlan(plandata) {
   console.log("RenderPlan")
   $("#OnlyPlan").empty()
   $("#OnlyPlan").append("獨立月計畫")
   for (i = 0; i < plandata.length; i++) {
      if ((Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(plandata[i].beginDate))) >= 0)
         && (Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(plandata[i].endDate))) <= 0)) {
         $("#OnlyPlan").append(
            `<div id="plan${plandata[i].id}" class="GOAL">${plandata[i].title}</div>
         <div  id="ALL_MONTH${plandata[i].id}"class="all_month"></div>
       `
         )
      }

   }

}
//載入有連結的行程(+date)
function RenderRelatedSchdule(relatedscheduledata) {
   console.log("RenderRelatedSchdule")
   for (i = 0; i < relatedscheduledata.length; i++) {
      if ((Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(relatedscheduledata[i].beginDate))) >= 0)
         && (Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(relatedscheduledata[i].endDate))) <= 0)) {
         $("#ALL_MONTH" + relatedscheduledata[i].mpId).empty()
         $("#ALL_MONTH" + relatedscheduledata[i].mpId).append(
            ` <div id="Month${relatedscheduledata[i].id}"  class="Month">${relatedscheduledata[i].title}</div>`
         )
      }
   }




}
//載入有年度目標有月計畫的行程
function RenderRelatedTOGoalSchdule(relatedtoGoalscheduledata) {
   console.log("RenderRelatedTOGoalSchdule")
   for (i = 0; i < relatedtoGoalscheduledata.length; i++) {
      if ((Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(relatedtoGoalscheduledata[i].beginDate))) >= 0)
         && (Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(relatedtoGoalscheduledata[i].endDate))) <= 0)) {
         $("#ALL_SCHEDULE" + relatedtoGoalscheduledata[i].mpId).append(
            ` <div class="SCHEDULE"><input id="Schedule${relatedtoGoalscheduledata[i].id}"   value="${relatedtoGoalscheduledata[i].title}" disabled/></div>`
         )
      }
   }
   openslideRefresh()
}
//載入行程
function RenderSchdule(scheduledata) {
   $("#OnlySchedule").empty()
   $("#OnlySchedule").append("獨立行程")
   for (i = 0; i < scheduledata.length; i++) {
      if (
         (Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(scheduledata[i].beginDate))) >= 0)
         && (Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(scheduledata[i].endDate))) <= 0)) {
         // console.log("DATETIME")
         // console.log(Date.parse(new Date(formatDate(dt))) - Date.parse(new Date(formatDate(scheduledata[i].beginDate))))
         $("#OnlySchedule").append(
            `<div class="GOAL">${scheduledata[i].title}</div>`
         )
      }

   }
   openslideRefresh()


}
//#region 
function formatDate(date) {
   var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

   if (month.length < 2)
      month = '0' + month;
   if (day.length < 2)
      day = '0' + day;

   return [year, month, day].join('-');
}


//#endregion

//新增按鈕開到insert.html頁面
function add() {
   $("#iframe_insert").show()
   $.session.set("Year", $("#date_str").text().substr(11))

   // window.open("../Insert.html", width = 200, height = 200)
};
//行事曆
var selectdate = new Date()
var months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December"
]

var week = [7, 1, 2, 3, 4, 5, 6]
var dt = new Date();
function renderDate() {
   var today_week = week[dt.getDay()]//取得今天星期幾
   var goback = today_week - ((dt.getDate() - 1) % 7)//回推的日期
   if (goback < 0) { goback = goback + 7 }//如果回推的日期是負數就+7
   var thismonthfirstdayweek = week[goback]//最後結論

   //dt.setDate(1);-->預dt的日期為1，拿掉後就會跟著跟新了

   var today = new Date();
   var endDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
   var prevDate = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
   document.getElementById("month").innerHTML = months[dt.getMonth()];
   document.getElementById("date_str").innerHTML = dt.toDateString();

   var cells = "";
   if (thismonthfirstdayweek == 7) { thismonthfirstdayweek = 0 }
   for (x = thismonthfirstdayweek; x > 0; x--) {
      cells += "<div class='prev_date'>" + (prevDate - x + 1) + "</div>";
   }
   for (i = 1; i <= endDate; i++) {

      cells +=
         "<div id=" + i + " onclick='getcalendar(" + i + ")'>" + i +
         "</div>";

      document.getElementsByClassName("days")[0].innerHTML = cells;
   }
   var selected = $("#date_str").text().substr(8, 2)
   if (selected.startsWith(0)) {
      selected = selected.substr(1)
   }

   $("#" + selected).attr("class", "selected")
   $.session.set("Year", $("#date_str").text().substr(11))
}

function getcalendar(day) {
   var textmonth = $("#month").text()//選的月份的全名
   var year = $("#date_str").text().substr(11)//選的該年像是2020
   var days = $("#" + day).text()//選的幾號

   for (i = 0; i < 12; i++) {
      if (textmonth == months[i]) { var month = i }
   }
   dt = new Date(year, month, days)

   renderDate()
   GetGoal()

   GetSchdule()

}
function moveDate(para) {
   console.log('movedate')
   if (para == "prev") {
      dt.setMonth(dt.getMonth() - 1);

   } else if (para == 'next') {
      dt.setMonth(dt.getMonth() + 1);

   }
   renderDate()
   GetGoal()
   GetSchdule()


}








//登入或登出
function clearsession() {
   $.session.set("MemberId", -1)
   Isloginorlogout()
}
function Isloginorlogout() {
   if ($.session.get('MemberId') == -1 || $.session.get('MemberId') == null) {
      $("a#nav_item_login").attr("style", "display:")
      $("a#logout").attr("style", "display:none")
   }
   else {
      $("a#nav_item_login").attr("style", "display:none")
      $("a#logout").attr("style", "display:")
   }
}









