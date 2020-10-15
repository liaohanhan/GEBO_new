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
    public class AnnualGoalController : ControllerBase
    {
        private AnnualGoalService annualgoalService = new AnnualGoalService();
        [HttpGet("{memberid}/{year}")]
        public List<AnnualGoal> GetAnnualGoalsByYear(int memberid, string year) {

            return annualgoalService.GetAnnualGoalsByYear(memberid, year);
        }
        [HttpPost]
        public string InsertGoal(AnnualGoal insertgoal) {
            return annualgoalService.InsertGoal(insertgoal);
        }

        [HttpPut("{id}")]
        public string EditGoal(int id, AnnualGoal editgoal)
        {
            return annualgoalService.EditGoal(id, editgoal);
        }
        [HttpPut("CompleteStatus/{id}")]
        public string CompleteStatus(int id)
        {
            return annualgoalService.CompleteStatus(id);
        }
        [HttpDelete("{Id}")]
        public string DeleteGoal(int id)
        {
            return annualgoalService.DeleteGoal(id);
        }
    }
}