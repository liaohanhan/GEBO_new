using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalProject_GEBO.Models;
using FinalProject_GEBO.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject_GEBO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculateController : ControllerBase
    {
        private CalculateService _calculateService = new CalculateService();

        //拿全部的記帳資料
        [HttpGet("{Date}/{MemberId}")]
        public List<SavePlan> GetAll(DateTime date, int memberid) {

            var getall = _calculateService.GetAll(date,memberid);
            return getall;
        }
        //新增收入或支出
        [HttpPost]
        public string AddSaveRecord(int id,SavePlan record){
             return _calculateService.AddRecord(id, record);
    }

        [HttpDelete("{id}")]
        public string DeleteSaveRecord(int id)
        {
            var del = _calculateService.DeleteRecord(id);
            return del;
        }
        [HttpPut("saveplan/{id}")]
        public string EditSaveRecord(int id,SavePlan saveplan) {
            var edit= _calculateService.EditRecord(id, saveplan);
            return edit;
        }
        [HttpGet("report/{memberId}")]
        public List<SavePlan> Getdatas(int memberid)
        {

            var getall = _calculateService.Getdatas( memberid);
            return getall;
        }
        [HttpGet("GetBudget/{memberId}/{date}")]
        public int GetBudget(int memberId,string date) {
            return _calculateService.GetBudget(memberId, date);
        }
        [HttpPost("savereport")]
        public string AddSaveReport(SaveReport saveReport)
        {
            return _calculateService.AddReport(saveReport);
        }

    }
}