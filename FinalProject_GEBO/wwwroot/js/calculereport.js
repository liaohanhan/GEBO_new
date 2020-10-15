var today = new Date()
var TotalIncome = 0
var TotalExpense = 0
var date = today.getFullYear() + "-" + today.getMonth() + 1
var Render = new Array()
$(document).ready(function () {

    GetAllRecord()
    GetBudget()
    $("#date").append(date)
    RenderDate()



})

function RenderDate() {

    $("#date-click").change(function () {
        $("#date").empty()
        date = $("#date-click").val()
        $("#date").append(date)
        GetAllRecord()
        GetBudget()
        console.log('TotalIncome')
        console.log(TotalIncome)
        console.log('TotalExpense')
        console.log(TotalExpense)
    })
}
//#region  Get該會員全部資料
function GetAllRecord() {
    $.ajax({
        type: "GET",
        url: "/api/calculate/report/" + $.session.get("MemberId"),
        success: function (alldata) {

            FilterDate(alldata)
            
    
        },
        error: function (error) {
            console.log(error)
        }
    })
}
//#endregion
function GetBudget(){

    $.ajax({
        type: "GET",
        url: "/api/calculate/GetBudget/" + $.session.get("MemberId")+"/"+date+"-01",
        success: function (buddata) {

           Renderbud(buddata,TotalExpense)
        },
        error: function (error) {
            console.log(error)
        }
    })
}

//#region 篩選日期
function FilterDate(alldata) {
    if (alldata != undefined) {
        $("#expense-container").empty()
        $("#income-container").empty()
        TotalExpense=0
        TotalIncome=0
        for (i = 0; i < alldata.length; i++) {


            if (alldata[i].date.substr(0, 7) == $("#date").text()) {

                //放Render的資料
                if (alldata[i].type == false) {
                    TotalExpense = TotalExpense + alldata[i].money
                    
                    $("#expense-container").append(
                        `<div id ="area" class="content-area">
                <div class="inside-title">
                <p class="inside-title">項目</p>
                <p class="inside-title">金額</p>
                </div>
                <div class="inside-content">
                <input type ="text" class = "input-content" id = "list-content${alldata[i].id}" value="${alldata[i].description}" disabled >
                <input type ="text" class = "input-content" id = "money-content${alldata[i].id}" value="${alldata[i].money}" disabled >  
                </div>   
                
            </div>`
                    )

                } else {
                    TotalIncome = TotalIncome + alldata[i].money
                    $("#income-container").append(
                        `<div id ="area" class="content-area">
                        <div class="inside-title">
                <p class="inside-title">項目</p>
                <p class="inside-title">金額</p>
                </div>
                        <div class="inside-content">
                        <input type ="text" class = "input-content" id = "list-content${alldata[i].id}" value="${alldata[i].description}" disabled >
                        <input type ="text" class = "input-content" id = "money-content${alldata[i].id}" value="${alldata[i].money}" disabled >  
                        </div>   
                      
                          
                    </div>`
                    )

                }
            } else {}
        }
    } else {console.log('NO DATA')}

}
//#endregion

//#region 計算餘額

//#endregion

//#region 計算總收入
function TotalIncome(alldata) {
    if (alldata != undefined) {

    } else {}

}
//#endregion


//#region 計算支出
//#endregion

$("#add_bud").click(function(){
    GetBudget()
    var bud=$("#name").val() 
if(bud!= null){
    Addbud(bud)
    
}
$("#name").val("") 
})
function Renderbud(bud,TotalExpense){
    if(bud!=0&&bud!=-1){
        $("#bud").empty()
        $("#bud").append(`<p>(預算總額:${bud})</p>`)
    }
    $("#expense").text(bud-TotalExpense);
   
}
function Addbud(bud) {
    $.ajax({
        type: "POST",
        url: "/api/calculate/savereport",
        data: JSON.stringify({
            MemberId: $.session.get("MemberId"),
            Date: date+"-01",
            Budget: bud
          }),
        datatype: JSON,
        contentType: "application/json;charset=uf-8",
        success: function (data) {
            console.log(data)
            GetAllRecord()
            GetBudget()
        },
        error: function () {
            console.log("新增異常！");
        }
    });
    
}