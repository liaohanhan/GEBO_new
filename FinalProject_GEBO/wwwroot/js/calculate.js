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
var Expenses=0
$(document).ready(function () {
    $("#date").text(date)
    Getalldata()
})

function Getalldata() {
    $.ajax({
        type: "GET",
        url: "/api/calculate/" + date + "/" + $.session.get("MemberId"),
        success: function (alldata) {
            console.log('alldata')
            console.log(alldata)
            Renderalldata(alldata)
        },
        error: function (error) {
            console.log(error)
        }
    })

}

function Renderalldata(alldata) {
    if (alldata == undefined) {
        $("#income_div").empty()
        $("#expense_div").empty()
    } else {
        $("#income_div").empty()
        $("#expense_div").empty()
        for (i = 0; i < alldata.length; i++) {
            var description = alldata[i].description;
            var money = alldata[i].money;
            if (alldata[i].type == false) {
                Expenses=Expenses+alldata[i].money
                $("#expense_div").append(
            `<div id ="area" class="content-area">
            <div class="inside-title">
            <p class="inside-title">項目</p>
            <p class="inside-title">金額</p>
            </div>
            <div class="inside-content">
            <input type ="text" class = "input-content" id = "list-content${alldata[i].id}" value="${alldata[i].description}" disabled >
            <input type ="text" class = "input-content" id = "money-content${alldata[i].id}" value="${alldata[i].money}" disabled >  
            </div>   
            <div class = "list-btngroup"> 
            <div id="edit${alldata[i].id}" class="list-btn" onclick="openedit(${alldata[i].id})"><i class="fas fa-edit"></i></div>
            <div id="delete${alldata[i].id}" class="list-btn" onclick="DeleteCalculist(${alldata[i].id})"><i class="fas fa-trash-alt"></i></div>
            <div id="edit_confirm${alldata[i].id}" class="list-btn" onclick="edit(${alldata[i].id})"style="display: none;"><i class="fas fa-check"></i></div>
            <div id="edit_cancel${alldata[i].id}" class="list-btn" onclick="Getalldata()" style="display: none;"><i class="fas fa-times"></i></div>
        </div>  
        </div>`
                )
                console.log("who are u")
                console.log("expense_div", alldata, i)
            } 
        else {
                $("#income_div").append(
                    `<div id ="area" class="content-area">
                    <div class="inside-title">
            <p class="inside-title">項目</p>
            <p class="inside-title">金額</p>
            </div>
                    <div class="inside-content">
                    <input type ="text" class = "input-content" id = "list-content${alldata[i].id}" value="${alldata[i].description}" disabled >
                    <input type ="text" class = "input-content" id = "money-content${alldata[i].id}" value="${alldata[i].money}" disabled >  
                    </div>   
                    <div class = "list-btngroup"> 
            <div id="edit${alldata[i].id}" class="list-btn" onclick="openedit(${alldata[i].id})"><i class="fas fa-edit"></i></div>
            <div id="delete${alldata[i].id}" class="list-btn" onclick="DeleteCalculist(${alldata[i].id})"><i class="fas fa-trash-alt"></i></div>
            <div id="edit_confirm${alldata[i].id}" class="list-btn" onclick="edit(${alldata[i].id})"style="display: none;"><i class="fas fa-check"></i></div>
            <div id="edit_cancel${alldata[i].id}" class="list-btn" onclick="Getalldata()" style="display: none;"><i class="fas fa-times"></i></div>
        </div> 
                      
                </div>`
                )
                console.log("income_div", alldata, i)
            }
        }
$("#expense2").text(Expenses) 
    }
}


$("#add_btn").click(function () {
        if ($("#item_name").val() == "" || $("#price").val() == "") {
            alert("記得輸入資料！")
        } else {
            var status = $("#select_status").val();
            
            console.log(date)
            if (status == "exp") {
                add_div("expense_div");
            } else {

                add_div("income_div");
            }
        }
    }

)

function add_div(a) {
    
    var item_name = $("#item_name").val();
    var price = $("#price").val();
    var type_status = "";
    $("#item_name").val("")
    $("#price").val("")
    if (a == "income_div") {
        type_status = 1
    } else {
        type_status = 0
    }
    $("#" + a).prepend(`<div>
<input type="text" value="${item_name}">
<input type="text" value="${price}">
<button>del</button>
<button>edit</button>
</div>`)
    AddCalculist(item_name, price, type_status)

}
$("#date-click").change(function () {
    Expenses=0
    var select_date = $("#date-click").val()
    $("#date").text(select_date)
    date = select_date
    Getalldata()
})

function AddCalculist(item_name, price, type_status) {
    $.ajax({
        type: "POST",
        url: "/api/calculate",
        data: JSON.stringify({

            MemberId: $.session.get("MemberId"),
            Date: $("#date").text(),
            Description: item_name,
            Money: price,
            Type: type_status

        }),
        datatype: JSON,
        contentType: "application/json;charset=uf-8",
        success: function (data) {
            console.log(data)
            Getalldata()
            
        },
        error: function () {
            console.log("新增異常！");
        }
    });

}

function del(id) {
    $("#div_" + id).remove();
    DeleteCalculist(id);
    console.log("del的是" + id);
}

function DeleteCalculist(id) {
    $.ajax({
        type: "Delete",
        url: "/api/calculate/" + id,
        success: function (data) {
            console.log(data);
            Getalldata()
        },

        error: function () {
            console.log("刪除異常！");
        }
    });

}

function openedit(id) {

    $("input#money-content" + id).attr("disabled", false);
    $("input#money-content" + id).css("background-color", "#fff");
    $("input#money-content" + id).css("border","solid #5C4938");
    $("input#list-content" + id).attr("disabled", false);
    $("input#list-content" + id).css("background-color", "#fff");
    $("input#list-content" + id).css("border","solid #5C4938");
    $("#edit"+ id).hide()
    $("#delete"+ id).hide()
    $("#edit_confirm"+ id).show()
    $("#edit_cancel"+ id).show()
   
}

function edit(id) {
    console.log('edit(id)')
    console.log(id)
    var description = $("#list-content" + id).val();
    var money = $("#money-content" + id).val();

    EditCalculist(id, description, money)
}

function EditCalculist(id, description, money) {
    $.ajax({
        type: "PUT",
        url: "/api/calculate/saveplan/" + id,
        data: JSON.stringify({

            Description: description,
            Money: money
        }),
        datatype: JSON,
        contentType: "application/json;charset=uf-8",
        success: function (data) {   
            Getalldata()
        },
        error: function () {
            alert("更新異常！");
            console.log("更新CategoryList異常！");
        }
    });
}
