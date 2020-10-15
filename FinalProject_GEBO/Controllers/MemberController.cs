using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalProject_GEBO.Models;
using FinalProject_GEBO.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace FinalProject_GEBO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private MemberService _memberService = new MemberService(); 
        [HttpGet]
        public List<Member> Get()
        {
            return _memberService.GetMembers();
        }
        [HttpPost("ADD")]
        public string AddMember([FromBody]Member member)//傳輸api資料庫的Member資料
        //丟到Body,希望回傳值是登入成功與否(字串)
        {
            return _memberService.AddMember(member);
        }
        [HttpPost("Login")]
        
        public string  LogIn([FromBody]JObject data) {
            
            return _memberService.LogIn(data["account"].ToString(), data["password"].ToString());
        }
    }
}