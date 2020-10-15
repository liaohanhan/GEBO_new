$("#no,#retil").click(function () {
    $("#item_title,#item_content").val("")
});
var itemId = 0;
// $("#yes").click(function () {
//     var title = $("input[id='item_title']").val();
//     var content = $("input[id='item_content']").val();
 
//     // 新增的DIV->  div+id > div_top > btn del edit > div_bottom >p
//     // $("#item_list").prepend('<div id="div' + itemId + '" class="item_div" ><div class="div_top"><button id="pin'
//     //     + itemId + '" onclick="pin(' + itemId + ')"><img class="icon" src="img/edit.png"></button><button class="del" onclick="del('
//     //     + itemId +')"><img class="icon" src="img/delete.png"></button></div><div class="div_bottom" onclick=display(' + itemId + ')><p id="title' + itemId + '">標題:'
//     //     + title + '</p><p id="content' + itemId + '">描述:' + content + '</p></div></div>');

//         $("#item_list").prepend(
//             `<div id="div${itemId}" class="item_div" >
//                 <div class="div_top">
//                     <button id="pin${itemId}">
//                         <img class="icon" src="img/edit.png">
//                     </button>
//                     <button class="del" onclick="del(${itemId})">
//                         <img class="icon" src="img/delete.png">
//                     </button>
//                 </div>
//                 <div class="div_bottom" onclick=display(${itemId})>
//                 <p id="title${itemId}">標題:${title}</p>
//                     <p id="content${itemId}">描述:${content}</p>
//                 </div>
//             </div>`
//         );
//  itemId++;
// });

// 刪除item
// function del(id) {
//     $("#div" + id).remove()
//     console.log(id)
// }

// // 釘選item
// function pin(id) {

//     $("#pin_item_list").prepend($("#div" + id));
//     $("#item_list").remove("#div" + id);
//     $("#pin" + id).attr('onclick', 'unpin(' + id + ')');
    
    
// }
// // 解除釘選item
// function unpin(id) {

//     $("#item_list").prepend($("#div" + id));
//     $("#pin_item_list").remove("#div" + id);
//     $("#pin" + id).attr('onclick', 'pin(' + id + ')');
// }

/////////////////////////// 跳出視窗後的事件處理

// 跳出視窗
function display(id) {
    var title = $("input[id='item_title']").val();
    var content = $("input[id='item_content']").val();
    var num=0;

    //背景遮罩
    $("#mask").attr("style", "visibility: visible");

    //跳出點擊的item視窗;close是關閉整個視窗;x是刪除item
    $("#container").append('<div id="div_display" class="display_item"><button id="btn_display" onclick="close('
    + id + ')">close</button><button>提交更新</button><p>標題:</p><input type="text" value="'
        + title + '"/><p>描述:</p><input type="text" value="'
        + content + '"/><p>新增項目:</p><input id="input_additem" type="text"/><button id="btn_additem">+</button><div id="item_section"></br></div></div>');

    //close關閉視窗和背景遮罩
    $("#btn_display").click(function () {
        $("#div_display").remove()
        $("#mask").attr("style", "visibility: hidden");
    });

    //新增小項目
    $("#btn_additem").click(function () {
        
        var item = $("#input_additem").val();
        $("#item_section").append('<div id="div_'+num+'"><input id="input_item_' + num + '"type="text" value="' + item + '"/><button id="btn_delitem_' 
        +num  + '" onclick="btn_del_item('+num+')">x</button></div>');
        num++;
    });

}
function btn_del_item(num) {
    $("#div_"+num).remove();
};







