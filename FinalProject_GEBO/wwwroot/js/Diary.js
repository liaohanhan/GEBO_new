var today = new Date()
var month = today.getMonth() + 1
if (month < 10) {
   month = "0" + month
}
var day = today.getDate()
if (day < 10) {
   day = "0" + day
}
var date = today.getFullYear() + "-" + month + "-" + day
var insertstatus
var oldanswer
//一開始載入
$(document).ready(function () {

   $("p#date").text(date)
   Isloginorlogout()
   GetAllDiary()

})

//選日期時更新顯示日期及顯示對應日期跟
$("#dates").change(function () {
   date = $("#dates").val()
   $("p#date").text(date)
   GetAllDiary()
})
//點問題跳出問題日記回答框
$("#Show__answer").click(function () {
   var oldanswer = $("div#" + date.substr(0, 4)).text()

   $("#Answer").val(oldanswer)
   $("#Answer").show()
   $("#Answer_confirm").show()
   $("div#" + date.substr(0, 4)).empty()
   $("#label" + date.substr(0, 4)).empty()
   $("#Answer_delete").show()

})
//點一般日記內容跳出回答框
$("#Show__diarycontent").click(function () {
   //$("#Diary_div").show()

   var olddiarycontent = $("#Show__diarycontent").text()
   $("#Diary_content").val(olddiarycontent)
   $("#Diary_content").show()
   $("#Diary_confirm").show()
   $("#Show__diarycontent").empty()
   $("#Diary_delete").show()
})
//新增答案
// $("#Answer_confirm").click(function () {
//    answer = $("#Answer").val()
//    $("#Answer").val("")
//    $("#Answer_div").hide()
//    $("div#Show__answer").append(answer)
// })
//#region Call api 拿所有日記及問題日記資料(HttpGet)
function GetAllDiary() {
   GetDiaryContent()
   GetQuestion()
   GetAnswer()
}

//#region -- call GET一般日記的API
function GetDiaryContent() {
   $.ajax({
      type: "GET",
      url: "/api/Diary/" + $.session.get("MemberId") + "/" + date,
      success: function (diarydata) {
         RenderDiary(diarydata)
         //    if(diarydata!=undefined)
         //   {var datalength=diarydata.length}
         //    else{var datalength=0}
         if(diarydata!=undefined){
            console.log('GetDiaryContent(diarydata')
            console.log(diarydata)
         }else{
            console.log('GetDiaryContent(diarydata')
            console.log("diarydata is empty")
          }
        

      },
      error: function (error) {
         console.log('diaryerror')
         console.log(error)
      }
   })
}
//#endregion
//#region --call GET問題的API
function GetQuestion() {
   $.ajax({
      type: "GET",
      url: "/api/Diary/Question/" + date,
      success: function (questiondata) {
         //console.log("questiondata")
         console.log(questiondata)
         RenderQuestion(questiondata)
      },
      error: function (error) {
         console.log("questionerror")
         console.log(error)
      }
   })
}
//#endregion
//#region --call GET答案的API
function GetAnswer() {
   console.log("1 GETANSWER")
   $.ajax({
      type: "GET",
      url: "/api/Diary/Answer/" + $.session.get("MemberId") + "/" + date,
      success: function (answerdata) {
         console.log("answerdata")
         console.log(answerdata)

         RenderAnswer(answerdata)
      },
      error: function (error) {
         console.log("answererror")
         console.log(error)

      }

   })
}


//#endregion
//#endregion
//#region  載入一般日記
function RenderDiary(diarydata) {
   switch (diarydata) {
      case undefined:
         console.log("沒資料")
         $("#Show__diarycontent").empty()
         $("#Diary_content").val('')
         $("#Diary_content").show()
         $("#Diary_confirm").show()

   }
   if (diarydata != undefined) {
      if (date == diarydata.date.substr(0, 10)) {
         console.log("日期"+diarydata.date.substr(0, 10))
         console.log("有資料，日期符合")
         $("#Show__diarycontent").empty()
         console.log('diarydata.content')
        
         console.log(diarydata.content)
         $("#Show__diarycontent").append(diarydata.content)
         $("#Diary_confirm").hide()
         $("#Diary_content").hide()


      }
      // else {
      //    console.log("沒資料")
      //    $("#Show__diarycontent").empty()
      //    $("#Diary_content").empty()
      //    $("#Diary_content").show()

      //    $("#Diary_confirm").show()

      // }

   }
}
//#endregion
//#region  載入問題日記的問題
function RenderQuestion(questiondata) {

   $("p#Quenstion").text(questiondata.question)
}
//#endregion
//#region  載入問題日記的答案
function RenderAnswer(answerdata) {
   console.log("2 RenderANSWER")
   if(answerdata==undefined){
      console.log("沒資料")
      $("#Answer").val("")
   $("#Show__answer").empty()
   $("#Answer").show()
   $("#Answer").empty()
   $("#Answer_confirm").show()

      
   }else{
      $("#Show__answer").empty()
    
      for (i = 0; i < answerdata.length; i++) {
         var answeryear = answerdata[i].date.substr(0, 4)

         $("div#Show__answer").append(
            `<div class = "content" >
            <div id=label${answeryear}>${answeryear} ：</div>
            <div id=${answeryear}>${answerdata[i].answer}</div>
            </div>`
         )
      }
      $("#Answer_confirm").hide()
      $("#Answer").hide()
      $("#Answer").empty()
   }
   // switch (answerdata) {
   //    case undefined:
   //       console.log("沒資料")
   //       $("#Answer").val("")
   //    $("#Show__answer").empty()
   //    $("#Answer").show()
   //    $("#Answer").empty()
   //    $("#Answer_confirm").show()
   //       }
   // if (answerdata != undefined) {

   //    $("#Show__answer").empty()
   //    for (i = 0; i < answerdata.length; i++) {
   //       var answeryear = answerdata[i].date.substr(0, 4)

   //       $("div#Show__answer").append(
   //          `<div class = "content" >
   //          <div id=label${answeryear } >${answeryear } ：</div>
   //          <div id=${answeryear } >  ${answerdata[i].answer }</div>
   //          </div>`
   //       )
   //    }
   //    $("#Answer_confirm").hide()
   //    $("#Answer").hide()
   //    $("#Answer").empty()

   // } 
   // else {
   //    console.log("沒資料")
   //    $("#Show__answer").empty()
   //    $("input[text]#Answer").show()
   //    $("#Answer").empty()
   //    $("#Answer_confirm").show()

   // }

  
}
function clearsession() {
   $.session.set("MemberId", -1)
   Isloginorlogout()
}
//#region -- call api去新增一般日記
function InsertDiary() {
   console.log($("#Diary_content").val())
   if($("#Diary_content").val()==""){
      alert("請輸入資料哦，人生不留白")
   }
   else{
      if($.trim($("#Diary_content").val())==""){
         alert("不可以輸入空白喔，人生不留白")
      }
      else{   $.ajax({
         type: "POST",
         url: "/api/diary/diary",
         data: JSON.stringify({
            MemberId: $.session.get("MemberId"),
            content: $("#Diary_content").val(),
            date: date
         }),
         datatype: JSON,
         contentType: "application/json;charset=uf-8",
         success: function (data) {

            GetDiaryContent();
            insertstatus = data
           // $("#Diary_content").val()==""
           // $("#Diary_content").empty()
         },
         error: function () {
            alert("新增異常！");
         }
      });}
   
   }

}
//#endregion
//#region -- call api去新增問題日記的回答
function InsertAnswer() {
   if($.trim($("#Answer").val())==""){
      alert("不可以輸入空白喔，人生不留白")
   }
   else{ 
   $.ajax({
      type: "POST",
      url: "/api/diary/answer",
      data: JSON.stringify({
         QuestionId: -1,
         Answer: $("#Answer").val(),
         date: date,
         MemberId: $.session.get("MemberId")
      }),
      datatype: JSON,
      contentType: "application/json;charset=uf-8",
      success: function (data) {
         GetAnswer();
         console.log("data")
         console.log(data)
         //alert("ADD成功！");
      },
      error: function (error) {
         console.log(error);
         console.log("新增問題異常！");
      }
   });}
}
function confirmdialog(shcomsg){
   
   if(confirm("確認要"+shcomsg+"嗎?")) {

   }
   else{

   }
}
function clearsession() {
   $.session.set("MemberId", -1)
   Isloginorlogout()
}


function Isloginorlogout() {
   if ($.session.get('MemberId') == -1 || $.session.get('MemberId') == null) {
      $("a#nav_item_login").attr("style", "display:")
      $("a#logout").attr("style", "display:none")
   } else {

      $("a#nav_item_login").attr("style", "display:none")
      $("a#logout").attr("style", "display:")
   }
}