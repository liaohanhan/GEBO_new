$(document).ready(function(){
    Isloginorlogout()
    console.log($.session.get("MemberId"))}
)

function clearsession(){
    $.session.set("MemberId", -1)
    Isloginorlogout()
}


function Isloginorlogout(){
    if($.session.get('MemberId')==-1 ||$.session.get('MemberId')==null){
        $("a#nav_item_login").attr("style","display:")
        $("a#logout").attr("style","display:none")
        $("#getstarted").click(function(){
            window.location.href="../html/login.html"
            
        })
    }
      
    else{
  
    $("a#nav_item_login").attr("style","display:none")
    $("a#logout").attr("style","display:")
    $("#getstarted").click(function(){
        window.location.href="../html/function.html"
        
    })
    }
}

