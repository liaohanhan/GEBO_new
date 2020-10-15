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
    public class MonthPlanController : ControllerBase
    {
        private MonthPlanService _monthPlanService = new MonthPlanService();

      
        [HttpGet("RelatedToGoalPlan/{memberId}")]
        public List<MonthPlan> GetRelatedToGoalPlan(int memberId) {
              return _monthPlanService.GetRelatedToGoalPlan(memberId);
        }
        [HttpGet("Plan/{memberId}")]
        public List<MonthPlan> GetMonthPlans(int memberId)
        {
            return _monthPlanService.GetMonthPlans(memberId);
        }

        [HttpPost("Plan")]
        public string InsertMontPlan(MonthPlan monthPlan) {
            return _monthPlanService.InsertPlan(monthPlan);
        }

        [HttpPut("Plan/{id}")]
        public string EditMonthPlan(int id, MonthPlan monthPlan) {
            return _monthPlanService.EditPlan(id ,monthPlan);
        }

        [HttpDelete("Plan/{id}")]
        public string DeleteMonthPlan(int id)
        {
            return _monthPlanService.DeletePlan(id);
        }
       
        [HttpGet("RelatedSchedule/{memberId}")]
        public List<Schedule> GetRelatedSchedule(int memberId)
        {
            return _monthPlanService.GetRelatedSchedule(memberId);
        }
        [HttpGet("Schedule/{memberId}")]
        public List<Schedule> GetSchedule(int memberId)
        {
            return _monthPlanService.GetSchedule(memberId);
        }
        [HttpPost("Schedule")]
        public string InsertSchedule(Schedule schedule)
        {
            return _monthPlanService.InsertSchedule(schedule);
        }
        [HttpPut("Schedule/{id}")]
        public string EditSchedule(int id, Schedule schedule)
        {
            return _monthPlanService.EditSchedule(id, schedule);
        }
        [HttpDelete("Schedule/{id}")]
        public string DeleteSchedule(int id)
        {
            return _monthPlanService.DeleteSchedule(id);
        }
        
    }
}