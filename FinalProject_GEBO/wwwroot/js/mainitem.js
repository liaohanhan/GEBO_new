
var temp =new Array

var getitemid=new Array
$(document).ready(function () {
    Getalldata()
    Isloginorlogout()
})
var categorylength = 0
var categoryid = new Array(10)
//#region 
function Getalldata() {
    $.ajax({
        type: "GET",
        url: "/api/itemlist/CategoryList/" + $.session.get("MemberId"),
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
//#endregion

function Renderalldata(alldata) {
    $("#item_list").empty()
    $("#pin_item_list").empty()
    console.log(categorylength)
    for (i = 0; i < alldata.length; i++) {


        if (alldata[i].status == true) {
            $("#pin_item_list").prepend(`<div id="div${alldata[i].id}" class="item_div"  >
        <div class="div_top">
            <div class = "bottom-btn" id="pin${alldata[i].id}" onclick="PincategoryList(${alldata[i].id})">
                <i id="star" class="fas fa-star"></i>
            </div>
            <div class="bottom-btn" onclick="del(${alldata[i].id})">
               <i class="fas fa-trash-alt"></i>
            </div>
        </div>
        <div class="div_bottom" onclick=getdisplay(${alldata[i].id})>
            <p class="bottom-cotent" id="title${alldata[i].id}">標題：${alldata[i].title}</p>
            <p class="bottom-cotent" id="content${alldata[i].id}">描述：${alldata[i].description}</p>
        </div>
    </div>`);
        } else {
            $("#item_list").prepend(`<div id="div${alldata[i].id}" class="item_div"  >
        <div class="div_top">
            <div class="bottom-btn" id="pin${alldata[i].id}" onclick="PincategoryList(${alldata[i].id})">
                <i id="star" class="far fa-star"></i>
            </div>
            <div class="bottom-btn" onclick="del(${alldata[i].id})">
            <i class="fas fa-trash-alt"></i>
            </div>
        </div>
        <div class="div_bottom" onclick=getdisplay(${alldata[i].id})>
            <p class="bottom-cotent" id="title${alldata[i].id}">標題：${alldata[i].title}</p>
            <p class="bottom-cotent" id="content${alldata[i].id}">描述：${alldata[i].description}</p>
        </div>
    </div>`);
        }
        categoryid[i] = alldata[i].id
        console.log(categoryid)
    }
}
$("#yes").click(function () {
    var title = $("input[id='item_title']").val();
    var content = $("input[id='item_content']").val();
    AddCategoryList(title, content)
    $("input[id='item_title']").val(""); 
    $("input[id='item_content']").val("");
})

function AddCategoryList(title, content) {
    $.ajax({
        type: "POST",
        url: "/api/itemlist/Category",
        data: JSON.stringify({
            MemberId: $.session.get("MemberId"),
            Title: title,
            Description: content,
            Status: false

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
    $("#div" + id).remove();

    DeleteCategoryList(id)
}

function DeleteCategoryList(id) {
    $.ajax({
        type: "Delete",
        url: "/api/itemlist/Category/" + id,
        success: function (data) {
            console.log(data);
        },

        error: function () {
            console.log("刪除category異常！");
        }
    });

}


function PincategoryList(categoryid) {
    $.ajax({
        url: "/api/itemlist/category/status/" + categoryid,
        type: "GET",
        success: function (data) {
            console.log("pin資料給我出來")
            console.log(data)
            pinorunpinclass(categoryid, data)
        }
    });
}

function pinorunpinclass(categoryid, data) {
    var html = $("#div" + categoryid)
    if (data == "True") {
        $("#div" + categoryid).remove();
        $("#pin_item_list").prepend(html);
        $("#pin"+categoryid+">i#star").attr("class","fas fa-star");

    } else {
        $("#div" + categoryid).remove();
        $("#item_list").prepend(html);
        $("#pin"+categoryid+">i#star").attr("class","far fa-star");
    }
}

//彈出視窗!!!!!!!!!!!!!!!!!
function getdisplay(categoryid) {

    $.ajax({
        url: '/api/itemlist/Categorylist/' + $.session.get("MemberId"),
        type: 'GET',
        // data: "name=John&location=Boston",
        success: function (cdata) {
            console.log('cdata')
            console.log(cdata)
            display(categoryid)
            getdisplaypart2(categoryid)
        },
        error: function () {
            console.log("取Category異常！");

        }
    });

}
function getdisplaypart2(categoryid) {
    $.ajax({
        url: '/api/itemlist/Category/' + categoryid,
        type: 'GET',
        success: function (idata) {
            console.log("拿item")
            console.log(idata)
            getitems(idata)

        },
        error: function () {
            console.log("取item異常！");

        }
    });
}
function display(categoryid) {
    var title = $("p#title" + categoryid).text().substr(3)
    var content = $("p#content" + categoryid).text().substr(3);
    var num = 0;

    //背景遮罩
    $("#mask").attr("style", "visibility: visible");

    //跳出點擊的item視窗;close是關閉整個視窗;x是刪除item

    $("#container").append(`
    <div id="div_display" class="display_item">
    <div class="layer-top">    
    <div class="layer-btn"id="btn_display" >
        <i class="fas fa-times"></i>
    </div>
        <div class="layer-btn" id="EditData" onclick="EditData(${categoryid});add_tempitem(${categoryid});">
        <i class="fas fa-save"></i>
    </div>
    </div>
    <div class= "layer-bottom">
    <p class="layer-topic">標題</p>
        <input id="EditTitle"  type="text" value="${title}"/>
     <p class="layer-topic">描述</p>
        <input id="EditContent"  type="text" value="${content}"/>
    <p class="layer-topic">新增項目</p>
    <div class="add-item">
        <input id="input_additem" type="text" class="text-layer"/>
        <div id="btn_additem" class = "btn-layer">
        <i class="fas fa-plus"></i>
        </div>
    <div>
    <div id="item_section"></div></br>
    </div>
    </div>`);

    //新增小項目
    $("#btn_additem").click(function () {

        var item = $("#input_additem").val();
        $("#item_section").append('<div class = "temp-content" id="tempdiv_' + num + '" class="temp"><input id="input_item_' + num + '"type="text" value="' + item + '" /><div class = "temp-btn" id="btn_delitem_' +
            num + '" onclick="tempbtn_del_item(' + num + ')" ><i class="fas fa-times"></i></div></div>');
            temp[num]=$('#input_item_'+num).val()
            $("#input_additem").val("");
            num++;
        
    });
   
    $("#btn_display").click(function(){close()})
}

function close() {
    $("#div_display").remove()
    $("#mask").attr("style", "visibility: hidden");
}

function getitems(idata) {
    
    for (i = 0; i < idata.length; i++) {

        $("#item_section").prepend(`<div class = "temp-content"id="div_${idata[i].id}">
        <input id="input_item_${idata[i].id}"type="text" value="${idata[i].item}"/>
        <div class = "temp-btn"id="btn_delitem_${idata[i].id}" onclick="btn_del_item(${idata[i].id})"><i class="fas fa-times"></i></div>
        </div>`);
        getitemid[i]=[idata[i].id,idata[i].item];
        // console.log("get到的2維資料")
        // console.log(getitemid[i][0]+":"+getitemid[i][1])
        
    }
    
}
function tempbtn_del_item(num) {
    $("#tempdiv_" + num).remove();
};
//真ㄉ要從資料庫刪除item
function btn_del_item(itemid) {
    $("#div_" + itemid).attr("style", "display:none");
    DeleteItemList(itemid) 
};

//更新CategoryList
function EditData(categoryid) {
    var title = $("#EditTitle").val();
    var content = $("#EditContent").val();
    EditCategoryList(categoryid, title, content);
    add_tempitem(categoryid)
    for(i=0;i<getitemid.length;i++){
        getitemid[i][1]=$("#input_item_"+getitemid[i][0]).val();
    }
    
    itemData();
    close();

}
function EditCategoryList(categoryid, title, content) {
    $.ajax({
        type: "PUT",
        url: "/api/Itemlist/Category/" + categoryid,
        data: JSON.stringify({

            Title: title,
            Description: content
        }),
        datatype: JSON,
        contentType: "application/json;charset=uf-8",
        success: function (data) {
            console.log(data)
            Getalldata()
        },
        error: function () {
            console.log("更新CategoryList異常！");
        }
    });
}

// 新增ItemList
function add_tempitem(categoryid){
    for(i=0;i<temp.length;i++){
        
            temp[i]=$('#input_item_'+i).val();
            adding_tempitem(categoryid,i);
            
    }
}

function adding_tempitem(categoryid,i){
    console.log('新增temphtml')
    console.log(temp)
    
    $.ajax({
        type: "POST",
        url: "/api/Itemlist/Itemlist",
        data: JSON.stringify({
            CategoryId:categoryid,
            Item: temp[i],
            Status:0    
        }),
        datatype: JSON,
        contentType: "application/json;charset=uf-8",
        success: function (data) {
            console.log(data)
            Getalldata()
        },
        error: function () {
            console.log("新增Item異常！");
        }
    });

}


//更新ItemList
 function itemData(){
     
   
    for(i=0;i<getitemid.length;i++){
        EditItemList(getitemid[i][0],getitemid[i][1])
    }
    
 }
function EditItemList(itemid,item) {
    
    
    $.ajax({
        type: "PUT",
        url: "/api/ItemList/itemlist/" + itemid,
        data: JSON.stringify({

            ItemId:itemid,
            Item:item
        }),
        datatype: JSON,
        contentType: "application/json;charset=uf-8",
        success: function (data) {
            console.log(data)
            Getalldata()
        },
        error: function () {
            console.log("更新ItemList異常！");
        }
    }
    );
  
}
//刪除ItemList

function DeleteItemList(itemid) {
    $.ajax({
        type: "Delete",
        url: "/api/itemlist/ItemList/"+itemid,
        success: function (data) {
            console.log(data);
        },

        error: function () {
            console.log("刪除item異常！");
        }
    });

}


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

