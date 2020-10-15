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
    public class DiaryService
    {
        private _10801Context _context = new _10801Context();

        public Diary GetDiary(int memberid,DateTime date)
        {
            var diaryContent = _context.Diary.SingleOrDefault(x => x.Date == date && x.MemberId==memberid);
            //var Diarycontent = _context.Diary.Single(x => x.MemberId = memberId);
            //var diaryContent = _context.Diary.Single(x => x.Date == date);
            try
            {
                if (diaryContent == null)
                {
                    return null;
                }
                else { return diaryContent; }
            }
            catch (Exception e)
            {

                return null;
            }
        }
        //test
        public List<DiaryQuestion> TestGetDiaryQuestion() {
            var test = _context.DiaryQuestion.ToList();
            return test;
        }

        public DiaryQuestion GetQuestionDiary(string date)
        {
           

            var questionDiary = _context.DiaryQuestion.SingleOrDefault(x => x.Date.ToString().Substring(5, 5) == date.Substring(5,5));
            //var Diarycontent = _context.Diary.Single(x => x.MemberId = memberId);
            //var diaryContent = _context.Diary.Single(x => x.Date == date);
            //var data = _context.AnnualGoal.Include(x => x.MonthPlan).ThenInclude(b=>b.Schedule).ToList();

            try
            {
                return questionDiary;
            }
            catch (Exception e)
            {
                return null;
            }



        }

        public string InsertAnswer(DiaryAnswer diaryAnswer)
        {
            try
            
            {
              var isAnswerExist = _context.DiaryAnswer.SingleOrDefault(x => x.MemberId== diaryAnswer.MemberId&& x.Date==diaryAnswer.Date);
                if (isAnswerExist != null)
                {
                    return EditAnswer(isAnswerExist.Id, diaryAnswer);
                    
                }
                else {
                    var questionId = GetQuestionDiary(diaryAnswer.Date.ToString("yyyy-MM-dd HH:mm:ss").Substring(0, 10));
                    diaryAnswer.QuestionId = questionId.Id;
                    _context.DiaryAnswer.Add(diaryAnswer);
                    _context.SaveChanges();
                    return "新增答案成功";

                }
            }
            catch (Exception e)
            {
                return e.ToString();

            }

        }

        public string DeleteAnswer(int memberId,string date)
        {
            try {
                  var isAnswerExist = _context.DiaryAnswer.SingleOrDefault(x =>x.MemberId==memberId&&
             x.Date.ToString("s").Substring(0, 10) == date);
                  if (isAnswerExist != null)
                  {
                      _context.DiaryAnswer.Remove(isAnswerExist);
                      _context.SaveChanges();
                      return "刪除成功";
                  }
                  else { return "查不到資料"; }
            } catch (Exception e) {
                Console.WriteLine(e);
                return "刪除失敗";
            }
            
        }   

        public string DeleteDiary(int memberId, string date)
        {
            try
            {
                 var isExist = _context.Diary.SingleOrDefault(x => x.MemberId == memberId &&
            x.Date.ToString("s").Substring(0, 10) == date);
                 if (isExist != null)
                 {
                     _context.Diary.Remove(isExist);
                     _context.SaveChanges();
                     return "刪除成功";
                 }
                 else { return "查不到資料"; }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return "刪除失敗";
            }
        }

        public string EditDiary(int id, Diary newdiary)
        {
            try
            {
                var oldDiary = _context.Diary.SingleOrDefault(x => x.Id == id);
                if (oldDiary != null)
                {
                    oldDiary.Content = newdiary.Content;
                    _context.SaveChanges();
                    return "編輯成功";
                }
                else return "編輯失敗";
            }
            catch (Exception e) { return "編輯失敗" + e.ToString(); }



        }

        public string EditAnswer(int id, DiaryAnswer newAnswer)
        {
            try
            {
                var oldAnswer = _context.DiaryAnswer.SingleOrDefault(x => x.Id == id);
                if (oldAnswer != null)
                {  oldAnswer.Answer = newAnswer.Answer;
                    _context.SaveChanges();
                    return "編輯成功";
                }
                else
                {
                    return "編輯失敗"; }
            }
            catch (Exception e)
            { return  "編輯失敗" + e.ToString(); }
        }

        public string InsertDiaryContent(Diary diaryContent)
        {
            try
            {
                var isDiaryExist = _context.Diary.FirstOrDefault(x => x.MemberId == diaryContent.MemberId && x.Date == diaryContent.Date );
                
                if (isDiaryExist == null)
                {
                    _context.Diary.Add(diaryContent);
                    _context.SaveChanges();
                    return "新增成功";
                }
                else
                   
                {
                   
                       return EditDiary(isDiaryExist.Id,diaryContent);
                     

                   
                    }
            }
            catch (Exception e)
            {
                return e.ToString();
            }

        }

        public List<DiaryAnswer> GetDiaryAnswer(int memberid,string date)
        {
            // var diaryAnswer = _context.DiaryQuestion.Include(x => x.DiaryAnswer).SingleOrDefault(x => x.Date == date);
            try
            {
               
                var question = _context.DiaryQuestion.SingleOrDefault(x => x.Date.ToString().Substring(5, 5) == date.Substring(5, 5));
                var questionId = question.Id;
                var diaryAnswer = _context.DiaryAnswer
                    .Where(x => x.QuestionId == questionId 
                    && x.MemberId==memberid&&
                    (x.Date.ToString().Substring(0,4).CompareTo(date.Substring(0,4) )<0
                    || x.Date.ToString().Substring(0, 4).CompareTo(date.Substring(0, 4)) == 0)).ToList();
                if (diaryAnswer.Count==0)
                {
                    return null;

                }
                //var diaryA = _context.DiaryQuestion.Include(x => x.DiaryAnswer.Where(x => x.MemberId == memberid)).ToList();
                //if (diaryA.Count>0)
                //{
                //    var diaryAnswer = diaryA.Where(x => x.Date.ToString().Substring(5, 5) == date.Substring(5, 5)).ToList();

                //    return diaryAnswer; 
                //}
                //else {
                //    return null;
                //}
                return diaryAnswer;
                
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }
        

    }
}
