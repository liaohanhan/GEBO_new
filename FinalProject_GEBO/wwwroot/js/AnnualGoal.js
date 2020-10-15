var today = new Date()
var topYear = today.getFullYear()

$( document ).ready(function(){
    
    Isloginorlogout()
    $("label#show_year").text(topYear)
    GetAnnualGoal()
    setDateLimit(topYear)
})
//#region 上方的年份加減
function Minustopyear(){  
    topYear=topYear-1
    $("label#show_year").text(topYear)
    GetAnnualGoal()
    setDateLimit(topYear)
}
function Plustopyear(){
    topYear=topYear+1
    $("label#show_year").text(topYear)
    GetAnnualGoal()
    setDateLimit(topYear)

}
function setDateLimit(year){
    // document.getElementById("startdate").setAttribute("min",year+"01-01")
    // document.getElementById("startdate").setAttribute("max",year+"12-31")

    // document.getElementById("enddate").setAttribute("min",$("#startdate").val())
    // document.getElementById("enddate").setAttribute("max",year+"12-31")

    $("#startdate").attr("min",year+"-01-01")
    $("#startdate").attr("max",year+"-12-31")
    $("#enddate").attr("min",year+"-01-01")
    $("#enddate").attr("max",year+"-12-31")
    $("#startdate").on("change",
        function(){
            console.log($("#startdate").val())
            $("#enddate").attr("min", $("#startdate").val())
        }
        )
}
// $("#minusyear").click(function(){
//     topYear=topYear-1
//     $("label#show_year").text(topYear)
// })
// $("#plusyear").click(function(){
//     topYear=topYear+1
//     $("label#show_year").text(topYear)
// })
//#endregion
//#region call API 拿資料
function GetAnnualGoal(){
    $.ajax({
        type: "GET",
        url: "/api/AnnualGoal/" + $.session.get("MemberId") + "/" + topYear,
        success: function (goaldata) {
           RenderAnnualGoal(goaldata)
           $("#AnnualGoal").val("")
           $("#startdate").val("")
           $("#enddate").val("")
           console.log('GetAnnualGoal(goaldata)')
           console.log(goaldata)
  
        },
        error: function (error) {
           console.log('goaldataerror')
           console.log(error)
        }
     })
  }

//#endregion
//#region Render年度目標
function RenderAnnualGoal(goaldata){
    if(goaldata==undefined){
        $("#goal_div").empty()
    }
    else{
        $("#goal_div").empty()
        $("#goal_div_complete").empty()
        $("#goal_div").append(`<h4>未完成</h4>`)
        $("#goal_div_complete").append(`<h4>已完成</h4>`)
        for(i=0;i<goaldata.length;i++){
           
            if(goaldata[i].status){
                
                $("#goal_div_complete").append(
                    `<div id="goal${goaldata[i].id}" class="goal-list">
                    <input type="text" disabled id="goalcontent${goaldata[i].id}" class="goal-content unedit" value="${goaldata[i].goal}"/>
                    <input type="date" disabled id="startdate${goaldata[i].id}" class="list-date unedit" value="${goaldata[i].beginDate.substr(0,10)}"/>
                    <input type="date"disabled id="enddate${goaldata[i].id}" class="list-date unedit" value="${goaldata[i].endDate.substr(0,10)}"/>
                    <div class = "list-btngroup"> 
                        <div id="complete${goaldata[i].id}" class="list-btn" onclick="CompleteGoal(${goaldata[i].id})"><i class="fas fa-check"></i></div>
                        <div id="edit${goaldata[i].id}" class="list-btn disabled"  ><i class="fas fa-edit"></i></div>
                        <div id="delete${goaldata[i].id}" class="list-btn" onclick="DelterGoal(${goaldata[i].id})"><i class="fas fa-trash-alt"></i></div>
                        </div>
                </div>`
                )
                $("#goal"+goaldata[i].id).addClass("complete")
            }
            else{
                $("#goal_div").append(
                `<div id="goal${goaldata[i].id}" class="goal-list">
                <input type="text" disabled id="goalcontent${goaldata[i].id}" class="goal-content unedit" value="${goaldata[i].goal}"/>
                <input type="date" disabled id="startdate${goaldata[i].id}" class="list-date unedit" value="${goaldata[i].beginDate.substr(0,10)}"/>
                <input type="date"disabled id="enddate${goaldata[i].id}" class="list-date unedit" value="${goaldata[i].endDate.substr(0,10)}"/>
                <div class = "list-btngroup"> 
                    <div id="complete${goaldata[i].id}" class="list-btn" onclick="CompleteGoal(${goaldata[i].id})"><i class="fas fa-check"></i></div>
                    <div id="edit${goaldata[i].id}" class="list-btn"  onclick="OpenEditGoal(${goaldata[i].id})")><i class="fas fa-edit"></i></div>
                    <div id="delete${goaldata[i].id}" class="list-btn" onclick="DelterGoal(${goaldata[i].id})"><i class="fas fa-trash-alt"></i></div>
                    <div id="edit_confrim${goaldata[i].id}" onclick="EditGoal(${goaldata[i].id})"class="list-btn"  style="display: none;"><i class="fas fa-check"></i></div>
                    <div id="edit_cancle${goaldata[i].id}" onclick="GetAnnualGoal()"class="list-btn"  style="display: none;"><i class="fas fa-times"></i></div>
                </div>
            </div>`
            )
        }
            
           
           
        }
        
    }
}
//#endregion
//#region 新增年度目標
function InsertGoal(){
    $.ajax({
        type: "POST",
        url: "/api/AnnualGoal" ,
        data:JSON.stringify({
            Mid:$.session.get("MemberId"),
            Year:topYear+"-01-01",
            BeginDate:$("#startdate").val(),
            endDate:$("#enddate").val(),
            Goal:$("#AnnualGoal").val(),
            Status:0,
            Rate:0
        }),
        datatype: JSON,
      contentType: "application/json;charset=uf-8",
        success: function (data) {
           GetAnnualGoal()
           
           console.log('InsertGoal(status)')
           console.log(data)
  
        },
        error: function (error) {
           console.log('InsertGoalerror')
           console.log(error)
        }
     })
}
//#endregion
//#region 編輯年度目標
    //開放編輯(拿掉disabled)

  
function OpenEditGoal(goalId){
    $("#edit_confrim"+goalId).attr("style","display:show")
    $("#edit_cancle"+goalId).attr("style","display:show")

    $("#complete"+goalId).attr("style","display:none")
    $("#edit"+goalId).attr("style","display:none")
    $("#delete"+goalId).attr("style","display:none")

    $("#goalcontent"+goalId).attr("disabled",false)
    $("#startdate"+goalId).attr("disabled",false)
    $("#enddate"+goalId).attr("disabled",false)
    $("#goalcontent"+goalId).removeClass("unedit")
    $("#startdate"+goalId).removeClass("unedit")
    $("#enddate"+goalId).removeClass("unedit")

    $("#startdate"+goalId).attr("min",topYear+"-01-01")
    $("#startdate"+goalId).attr("max",topYear+"-12-31")
    $("#enddate"+goalId).attr("min",topYear+"-01-01")
    $("#enddate"+goalId).attr("max",topYear+"-12-31")
    $("#startdate"+goalId).on("change",
        function(){
            console.log($("#startdate"+goalId).val())
            $("#enddate"+goalId).attr("min", $("#startdate"+goalId).val())
        }
        )
      
}
    //按下確認Call API
    function EditGoal(goalId){
        // console.log(    
        // "BeginDate"+$("#startdate"+goalId).val()+
        // "endDate"+$("#enddate"+goalId).val()+
        // "Goal"+$("#goalcontent"+goalId).val()  )
        $.ajax({
            type: "PUT",
            url: "/api/AnnualGoal/"+goalId,
            data:JSON.stringify({
                BeginDate:$("#startdate"+goalId).val(),
                endDate:$("#enddate"+goalId).val(),
                Goal:$("#goalcontent"+goalId).val()            
            }),
            datatype: JSON,
          contentType: "application/json;charset=uf-8",
            success: function (data) {
               GetAnnualGoal()
               
               console.log('EditGoal(status)')
               console.log(data)
                
            },
            error: function (error) {
               console.log('EditGoalerror')
               console.log(error)
            }
         })
    }
//#endregion
//#region  按下完成(complete)
function CompleteGoal(goalId){
    $.ajax({
        type: "PUT",
        url: "/api/AnnualGoal/CompleteStatus/"+goalId,
        // data:JSON.stringify({
        //     BeginDate:$("#startdate"+goalId).val(),
        //     endDate:$("#enddate"+goalId).val(),
        //     Goal:$("#goalcontent"+goalId).val()            
        // }),
        // datatype: JSON,
      contentType: "application/json;charset=uf-8",
        success: function (data) {
            CompleteForCSS(data,goalId)
   
           
           console.log('Complete(status)')
           console.log(data)
            
        },
        error: function (error) {
           console.log('Complete_error')
           console.log(error)
        }
     })
}
function CompleteForCSS(status,goalId){

    if(status!="null"){$("div#goal"+goalId).toggleClass("complete")}
    // switch (status){
    //     case "True":{$("div#goal"+goalId).attr("class","complete") }
    //     case "False":{$("div#goal"+goalId).attr("class","uncomplete")}
    //     case "null":console.log("compete have error")
    // }
    GetAnnualGoal()
    // if(status=="True"){
    //     $("goal"+goalId).attr("class","complete")
    // }
    // else{$("goal"+goalId).removeClass("complete")}
}

//#endregion
// function Isloginorlogout(){
//     if(memberid==-1 ||memberid==null){
//         $("a#nav_item_login").show()
//         $("a#logout").hide()
//     }
//     else{
  
//     $("#nav_item_login").hide()
//     $("#logout").show()
//     }
// }
//#region delete goal
function DelterGoal(goalId){
    $.ajax({
        type: "Delete",
        url: "/api/AnnualGoal/" + goalId,
        success: function (data) {
            console.log(data);
            $("#goal"+goalId).remove()
        },

        error: function () {
            console.log("刪除Goal異常！");
        }
    });
   

}
//#endregion
function clearsession(){
    $.session.set("MemberId", -1)
    Isloginorlogout()
}


function Isloginorlogout(){
    if($.session.get('MemberId')==-1 ||$.session.get('MemberId')==null){
        $("a#nav_item_login").attr("style","display:")
        $("a#logout").attr("style","display:none")}
    else{

    $("a#nav_item_login").attr("style","display:none")
    $("a#logout").attr("style","display:")
    }
}
