//設定signin siginup按鈕是誰
const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');
const container = document.getElementById('container');

signUpBtn.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInBtn.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// //#region --拿會員資料
// $.ajax({
// 	type: "GET",
// 	url: "/api/Member",
// 	success: function (memberdata) {
// 		//顯示標記
// 		console.log("memberdata")
// 		console.log(memberdata)


// 	},
// 	error: function (error) {
// 		console.log("membererror")
// 		console.log(error)
// 	}
// }) //#endregion



$("#submitlogin").click(function () {

	$.ajax({
		type: "POST",
		url: "/api/Member/Login",
		data: JSON.stringify({
			account: $("#account1").val(),
			password: $("#password1").val(),
		}),
		contentType: 'application/json',
		success: function (data) {
			console.log(data)
			//conver(String,data)

			if (data != "密碼錯誤" && data != "請先註冊") {
				console.log(data)
				setsession(data)
				getsession()
			} else {
				alert(data)
			}
		},
		error: function (error) {
			console.log(error)
		}
	})

})
//紀錄現在登入的會員Id

//登入後跳轉至function.html
function Redirect() {
	window.location.href = "../html/function.html"
}
$("#submitsignin").click(function () {
	Addmember()
})
/*寫入Session:
<% Session.Add("test","123"); %>

讀取Session:
<%= Session["test"] %>
*/
//#region 
function Addmember(){
    //基本判斷帳密是不是空值
	if($("#name").val() == ""){
		alert("請輸入姓名");
		return false;
	}else if($("#email").val() == ""){
		alert("請輸入Email");
		return false;
	}else if($("#account2").val() == ""){
		alert("請輸入帳號");
		return false;
	}else if($("#password2").val() == ""){
		alert("請輸入密碼");
		return false;
	}else if(($("#name").val() && $("#email").val() && $("#account2").val() &&$("#password2").val() )!= ""){
			$.ajax({
				type: "POST",
				url: "/api/Member/ADD",
				data: JSON.stringify({
					Name: $("#name").val(),
					Email: $("#email").val(),
					Account: $("#account2").val(),
					Password: $("#password2").val()
				}),
				datatype: JSON,
				contentType: "application/json;charset=uf-8",
				success: function (data) {
					console.log("data")
					console.log(data)
					alert("帳號密碼新增成功");
					window.location.reload();
				},
				error: function () {
					alert("帳號密碼新增失敗");
				}
			});
	}

}

////#endregion

//#region --設定session(set)
function setsession(mid) {
	console.log('setsession:');
	console.log(mid)
	$.session.set("MemberId", mid)
	Redirect()
}
//#endregion
//#region --設定session(set)
function getsession() {
	console.log('getsession:');
	console.log($.session.get("MemberId"))
}
//#endregion
