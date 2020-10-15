using FinalProject_GEBO.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalProject_GEBO.Models;
using FinalProject_GEBO.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject_GEBO.Services
{
    public class AnnualGoalService
    {
        private _10801Context _context = new _10801Context();

        public List<AnnualGoal> GetAnnualGoalsByYear(int memberid, string year)
        {
            var getannualgoalsbyyear = _context.AnnualGoal
                .Where(x => x.Year.ToString().Substring(0,4)== year && x.MId==memberid).ToList();
            if (getannualgoalsbyyear.Count<=0) { return null; }
            else { return getannualgoalsbyyear; }
        }

      
        public string InsertGoal(AnnualGoal goal)
        {
            try {
                _context.AnnualGoal.Add(goal);
                _context.SaveChanges();
                return "新增目標成功";
            }
            catch (Exception e) {
                return "新增失敗原因" + e.ToString();
            }
            
        }

        public string CompleteStatus(int id)
        {
            try
            {
                var editGoal = _context.AnnualGoal.SingleOrDefault(x => x.Id == id);
                if (editGoal != null)
                {
                    switch (editGoal.Status)
                    {
                        case true:
                            {
                                editGoal.Status = false;
                                _context.SaveChanges();
                                break;
                            }
                        case false:
                            {
                                editGoal.Status = true;
                                _context.SaveChanges();
                                break;
                            }
                    }
                    return editGoal.Status.ToString();
                }
                else { return null; }
            }
            catch (Exception e) {
                return e.ToString();
            }
           
        }

        public string EditGoal(int id ,AnnualGoal editgoal)
        {
            try
            {
                var old_goal = _context.AnnualGoal.SingleOrDefault(x => x.Id == id);
                if (old_goal != null)
                {
                    old_goal.Goal = editgoal.Goal;
                    //old_goal.Status = editgoal.Status;
                    old_goal.BeginDate = editgoal.BeginDate;
                    old_goal.EndDate = editgoal.EndDate;
                    
                    _context.SaveChanges();
                    return "修改成功";
                }

                else { return "先新增才能再修改喔"; }
            }
            catch (Exception e) {
                return "修改失敗原因" + e.ToString();
            }
        }

        public string DeleteGoal(int id)
        {
            var deletegoal = _context.AnnualGoal.SingleOrDefault(x => x.Id == id);
            try
            {
                if (deletegoal != null)
                {
                    _context.AnnualGoal.Remove(deletegoal);
                    _context.SaveChanges();
                    return "刪除成功";
                }
                else { return "刪除失敗，找不到資料"; }
            }
            catch (Exception e) {
                return "刪除失敗原因" + e.ToString();
            }
         }
    }
}
