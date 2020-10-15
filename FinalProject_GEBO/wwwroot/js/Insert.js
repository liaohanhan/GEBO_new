var selectAgval
var mpdata
var date_str

//#region 設定父頁面(Monthplan.html)的元素方法變數

$(window.parent.document).ready(function () {
    iframe = $("#iframe_insert", window.parent.document)
    dt = window.parent.dt
    date_str = $("#date_str", window.parent.document)
    window.parent.GetSchdule()
    window.parent.GetGoal()
    window.parent.renderDate()

})

//#endregion
//#region 選擇新增月計畫或行程  
$('input[type="radio"]').click(function () {
    var monthplanORschedule = ""
    if ($(this).attr("value") == "monthplan") {
        monthplanORschedule = $(this).attr("value")
        $(".box").hide();
        $(".mp01").show();
        $("#Plan_SC").hide();
        //console.log(monthplanORschedule)

    }
    if ($(this).attr("value") == "schedule") {
        monthplanORschedule = $(this).attr("value")
        $(".box").hide();
        $(".mp02").show();
        // console.log(monthplanORschedule)
    }

});
$('input[type="checkbox"]').change(function (e) {
    if ($(this).is(':checked')) {
        $("#Plan_SC").show();
        $("#confirmonlyplan").hide()
        $("#cancelmonlyplan").hide()

    }

    else {
        $("#Plan_SC").hide();
        $("#confirmonlyplan").show()
        $("#cancelmonlyplan").show()
    }

});

$('input[type="radio"]').click(function () {
    GetAnnualGoal()
    Getmpdata()
    console.log("$.session.get(Year)")
    console.log($.session.get("Year")
    )
})
//#endregion
//#region call API 拿資料
function GetAnnualGoal() {
    $.ajax({
        type: "GET",
        url: "/api/AnnualGoal/" + $.session.get("MemberId") + "/" + $.session.get("Year"),
        success: function (goaldata) {

            console.log('GetAnnualGoal(goaldata)')
            console.log(goaldata)
            addOption(goaldata)

        },
        error: function (error) {
            console.log('goaldataerror')
            console.log(error)
        }
    })
}

//#endregion
//#region 建年度目標選項
function addOption(goaldata) {
    $("#selectAg").empty()
    if (goaldata != undefined) {
        $("#selectAg").append(
            `<option value="null">無</option>`)
        for (i = 0; i < goaldata.length; i++) {
            $("#selectAg").append(
                `<option value="${goaldata[i].id}">${goaldata[i].goal}</option>`
            )
        }
    }
}
//#endregion
//#region 選取年度目標的value(AGID)
$("#selectAg").on('change', function () {
    selectAgval = $("#selectAg").val()//被選到的年度目標的Id(AgId)【新增用】
})

//#endregion
//#region insert monthplan()
function insertmp(relatedtoSC) {

    $.ajax({
        type: "POST",
        url: "/api/monthplan/plan",
        data: JSON.stringify({
            AgId: selectAgval,
            MId: $.session.get("MemberId"),
            Title: $("#titlem").val(),
            BeginDate: $("#begindate").val(),
            EndDate: $("#enddate").val(),
            Content: $("#content").val()
        }),
        datatype: JSON,
        contentType: "application/json;charset=uf-8",
        success: function (mpdata) {

            if (relatedtoSC == 1) {
                console.log(mpdata)
                insertsc(mpdata, 1)
            } else { }
            alert("新增成功")
            console.log("InsertPLAN_GetGoal")
            GetSchdule()
            GetGoal()
            iframe.hide()
            // window.parent.location.href = "../html/monthplan.html"
        },
        error: function (error) {
            console.log("新增月計畫異常！");
            console.log(error)

        }
    });
}
//#endregion
//#region
function Getmpdata() {
    $.ajax({
        type: "GET",
        url: "/api/monthplan/plan/" + $.session.get("MemberId"),
        success: function (mpdata) {
            console.log("給我出來mpdata")
            console.log(mpdata)

        },
        error: function () { console.error(); }
    })
}
//#endregion
//#region insert schedule
function insertsc(MPID, confirmbtn) {
    // for (i = 0; i < mpdata.length; i++) {
    //     if (mpdata[i] != null) {
    var sctitle
    var scbegindate
    var scendDate

    if (confirmbtn == 1) {
        console.log($("#dates").val())
        console.log($("#begintime").val())
        $.ajax({
            type: "POST",
            url: "/api/monthplan/Schedule",
            data: JSON.stringify({
                MpID: MPID,
                MemberId: $.session.get("MemberId"),
                Title: $("#titles").val(),
                BeginDate: $("#dates").val() + "T" + $("#begintime").val(),
                EndDate: $("#dates").val() + "T" + $("#endtime").val(),

            }),
            datatype: JSON,
            contentType: "application/json;charset=uf-8",
            success: function (schedule) {
                console.log(schedule)
                alert("新增成功")

                console.log("InsertRS_GetGoal")
                GetGoal()
                GetSchdule()
                iframe.hide()

                // window.parent.location.href = "../html/monthplan.html"


            },
            error: function () {
                console.log("新增行程異常！");
            }
        })
    }
    else {
        console.log($("#dates").val())
        console.log($("#begintimes").val())
        $.ajax({
            type: "POST",
            url: "/api/monthplan/Schedule",
            data: JSON.stringify({
                MpID: MPID,
                MemberId: $.session.get("MemberId"),
                Title: $("#titles").val(),
                BeginDate: $("#dates").val() + "T" + $("#begintime").val(),
                EndDate: $("#dates").val() + "T" + $("#endtime").val(),

            }),
            datatype: JSON,
            contentType: "application/json;charset=uf-8",
            success: function (schedule) {
                console.log(schedule)
                alert("新增成功")
                console.log("InsertS_GetGoal")

                GetGoal()
                GetSchdule()
                iframe.hide()

                // window.parent.location.href = "../html/monthplan.html"


            },
            error: function () {
                console.log("新增行程異常！#begintimesc");
            }
        }
        )
    }
}
//    function checksc(id){
//     console.log($("#datesc").val())
//     console.log($("#begintimesc").val())
//     $.ajax({
//         type: "POST",
//         url: "/api/monthplan/Schedule",
//         data: JSON.stringify({
//             MpID: null,
//             MemberId: $.session.get("MemberId"),
//             Title: $("#titlesc"+id).val(),
//             BeginDate: $("#datesc"+id).val() + "T" + $("#begintimesc"+id).val(),
//             EndDate: $("#datesc"+id).val() + "T" + $("#endtimesc"+id).val(),

//         }),
//         datatype: JSON,
//         contentType: "application/json;charset=uf-8",
//         success: function (schedule) {
//             console.log(schedule)
//             alert("新增成功")
//             console.log("InsertS_GetGoal")

//             GetGoal()
//             GetSchdule()
            

//             // window.parent.location.href = "../html/monthplan.html"


//         },
//         error: function () {
//             console.log("新增行程異常！");
//         }
//     }
//     )
//    }

    



// }}

//#endregion
//#region confirm()
function confirm() {
    insertmp(1)
    //月計畫行程
}

function confirm2() {
    insertsc(null, 2)
    //獨立行程
}
function confirm3() {
    insertmp(3)
    //獨立月計畫(無行程)
}

//#endregion

$("#sc_reset","#mpsc_reset").click(function (){
    $("#titlesc").val("")
    $("#datesc").val("")
    $("#begintimesc").val("")
    $("#endtimesc").val("")
})

$("#mpsc_reset").click(function (){
    $("#titles").val("")
    $("#dates").val("")
    $("#begintime").val("")
    $("#endtime").val("")
})

$("#mp_reset").click(function (){
    $("#titlem").val("")
    $("#content").val("")
    $("#begindate").val("")
    $("#enddate").val("")
    $("#confirmonlyplan").val("")
    $("#mp_reset").val("")
    $("#selectAg").val("null")
})


$("#close").click(function(){
    scnum = 0;
    iframe.hide()

})

