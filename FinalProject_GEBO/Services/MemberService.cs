using FinalProject_GEBO.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProject_GEBO.Services
{
    public class MemberService
    {
        private _10801Context _conText = new _10801Context();

        public List<Member> GetMembers()
        {
             return _conText.Member.ToList();
        }

        public string AddMember(Member member)
        {
            
      
            try
            {
               
                //新增會員
                _conText.Member.Add(member);//LinQ
                _conText.SaveChanges();//新增修改資料儲存
                return "新增會員成功";
            }
            catch
            {
                return "新增會員失敗";
            }
            
        }

        public string  LogIn(string account, string password)
        {
            var members = _conText.Member.SingleOrDefault(x => x.Account == account);
            if (members != null)
            {
                if (members.Password == password)
                {
                    
                    return (members.Id.ToString());
                    
                }
                else { return ("密碼錯誤"); }
            }
            else {
                return ( "請先註冊");

            }
        }
    }
}
