using FinalProject_GEBO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProject_GEBO.Services
{
    public class CalculateService
    {
        private _10801Context _conText = new _10801Context();

        public List<SavePlan> GetAllSavePlan()
        {
            return _conText.SavePlan.ToList();
        }

        public string AddRecord(int id ,SavePlan record)
        {
            try {
                _conText.SavePlan.Add(record);
                _conText.SaveChanges();
                return "新增成功";            
            } 
            catch (Exception e){
                return "新增失敗" + e.ToString();

            }
            
        }

        public List<SavePlan> GetAll(DateTime date,int memberid)
        {
            var getallcalculate = _conText.SavePlan.Where(x => x.Date == date && x.MemberId == memberid).ToList();
            return getallcalculate;
        }

        public string EditRecord(int id, SavePlan savePlan)
        {
            
            
            //try
            //{
                //if (old_record != null)
                //{
                //    if (new_record.Description != null) { old_record.Description = new_record.Description; }
                //    if (new_record.Money > 0) { old_record.Money = new_record.Money; }
                //    old_record.Type = new_record.Type;

                //}
                //var old_record = _conText.SavePlan.SingleOrDefault(x => x.Id == id);
                

                //    old_record.Description = new_record.Description;
                //    old_record.Money = new_record.Money;
                //    _conText.SaveChanges();
                //    return "編輯成功";
                

                //else
                //{
                //    return "要有內容喔";
                //}

            //}

            try
            {
                    var old_record = _conText.SavePlan.SingleOrDefault(x => x.Id == id);
                    old_record.Description = savePlan.Description;
                    old_record.Money =savePlan.Money;
                     _conText.SaveChanges();
                    return "success";
              

            }
            catch (Exception e)
            {
                return "false" + e.ToString();
            }
        }

        public int GetBudget(int memberId, string date)
        {
            try {
                var budget = _conText.SaveReport.SingleOrDefault(x => x.MemberId == memberId
                && x.Date.ToString().Substring(0, 10) == date).Budget;
                if (budget != null)
                {
                    return (int)budget;
                }
                else { return 0; }
            } catch (Exception e) {
                Console.WriteLine(e);
                return -1;
            }
            
        }

        public string AddReport(SaveReport saveReport)
        {

            try
            {

                var isExist = _conText.SaveReport.SingleOrDefault(x => 
                x.MemberId  == saveReport.MemberId && x.Date == saveReport.Date);
                if (isExist != null) {
                    isExist.Budget = saveReport.Budget;
                    _conText.SaveChanges();
                    return "編輯成功";
                }
                else
                {
                    _conText.SaveReport.Add(saveReport);
                    _conText.SaveChanges();
                    return "新增成功";
                }

            }
            catch (Exception e)
            {
                return "新增失敗" + e.ToString();

            }
        }

        public List<SavePlan> Getdatas(int memberid)
        {
            try
            {      var lists = _conText.SavePlan.Where(x => x.MemberId == memberid).ToList();
                if (lists.Count() >= 0) { return lists; }
                else { return null; }
            } catch (Exception e) {
                Console.WriteLine(e);
                return null;
            }
   
        }

        public string DeleteRecord(int id)
        {
           
            try {
                var deleteRecord = _conText.SavePlan.SingleOrDefault(x => x.Id == id);          
                
                    _conText.SavePlan.Remove(deleteRecord);
                    _conText.SaveChanges();
                
                
                return "刪除成功";
                
            }
            catch (Exception e) {
                return "刪除失敗"+e.ToString();
            }
            
        }
    }
}
