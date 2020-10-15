using FinalProject_GEBO.Models;

using System;
using System.Collections.Generic;
using System.Linq;


namespace FinalProject_GEBO.Services
{
    public class MonthPlanService
    {
        private _10801Context _context = new _10801Context();
        private AnnualGoalService annualgoalService = new AnnualGoalService();
        public List<MonthPlan> GetMonthPlans(int memberId)
        {
            try
            {
              
                var monthPlan = _context.MonthPlan.Where(x =>
                 x.MId == memberId && x.AgId == null
                ).ToList();
                if (monthPlan != null)
                {
                    return monthPlan;
                }
                else { return null; }
            }
            catch (Exception e) {
                Console.WriteLine(e);
                return null;
            }
           
        }
            public string GetLastPlan(MonthPlan monthPlan) { 
            var lastone= _context.MonthPlan.Where(x =>x.MId == monthPlan.MId).ToList();
            var lastoneId = lastone.LastOrDefault();
            if (lastone != null) { return lastoneId.Id.ToString(); }
            else { return null; }
        }

        public List<MonthPlan> GetRelatedToGoalPlan(int memberId)
        {
            try {
              
                var relatedToGoalPlan = _context.MonthPlan.Where(x =>
                  x.MId == memberId && x.AgId != null
                 
                  ).ToList();
                if (relatedToGoalPlan != null) { return relatedToGoalPlan; }
                else { return null; }
            }
            catch (Exception e) {
                Console.WriteLine(e);
                return null;
            }
            
        }

 

        public List<Schedule> GetRelatedSchedule(int memberId)
        {
            return _context.Schedule.Where(x => x.MemberId == memberId && x.MpId != null).ToList();

            }
        public string InsertPlan(MonthPlan monthPlan)
        {
            try {
                
                    _context.MonthPlan.Add(monthPlan);
                    _context.SaveChanges();
          

                    return GetLastPlan(monthPlan);
                
            }
            catch (Exception e) {
                return "失敗原因" + e.ToString();
            }
           
        }

       

        public string EditPlan(int id, MonthPlan monthPlan)
        {
            try
            {
                
                if (monthPlan != null)
                {
                   var old_plan = _context.MonthPlan.SingleOrDefault(x => x.Id == id);
                     old_plan.Content = monthPlan.Content; 
                    
                    _context.SaveChanges();
                    return "修改成功";
                }
                else
                {
                    return "找不到這筆月計畫";
                }
            }
            catch (Exception e)
            {
                return "失敗原因" + e.ToString();
            }
        }

        public string DeletePlan(int id)
        {
            try
            {
                var isPlanExist = _context.MonthPlan.SingleOrDefault(x => x.Id == id);
                if (isPlanExist != null)
                {
                    _context.MonthPlan.Remove(isPlanExist);
                    _context.SaveChanges();
                    return "刪除成功";
                }
                else { return "刪除失敗，找不到這筆資料"; }
            }
            catch (Exception e) {
                return "刪除失敗，原因"+e.ToString();
            }
        }
        public List<Schedule> GetSchedule(int memberId)
        {
            return _context.Schedule.Where(x=>x.MemberId==memberId&&x.MpId==null).ToList();
        }
        public string InsertSchedule(Schedule schedule)
        {
            try
            {
                if (schedule != null)
                {
                    _context.Schedule.Add(schedule);
                    _context.SaveChanges();
                    return "新增行程成功";
                }
                else { return "新增的標題、日期不能是空的喔!"; }
            }
            catch (Exception e)
            {
                return "失敗原因" + e.ToString();
            }

        }
        public string EditSchedule(int id, Schedule schedule)
        {
            try
            {

                if (schedule != null)
                {
                    var old_schedule = _context.Schedule.SingleOrDefault(x => x.Id == id);
                    old_schedule.Title = schedule.Title;

                    _context.SaveChanges();
                    return "修改成功";
                }
                else
                {
                    return "找不到這筆行程";
                }
            }
            catch (Exception e)
            {
                return "失敗原因" + e.ToString();
            }
        }
        public string DeleteSchedule(int id)
        {
            try
            {
                var isScheduleExist = _context.Schedule.SingleOrDefault(x => x.Id == id);
                if (isScheduleExist != null)
                {
                    _context.Schedule.Remove(isScheduleExist);
                    _context.SaveChanges();
                    return "刪除成功";
                }
                else { return "刪除失敗，找不到這筆資料"; }
            }
            catch (Exception e)
            {
                return "刪除失敗，原因" + e.ToString();
            }
        }

    }
}
