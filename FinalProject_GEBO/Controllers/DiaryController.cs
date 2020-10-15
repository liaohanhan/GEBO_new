using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalProject_GEBO.Models;
using FinalProject_GEBO.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject_GEBO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiaryController : ControllerBase
    {
        private DiaryService diaryService = new DiaryService();
        [HttpGet("{MemberId}/{Date}")]//拿一般日記的資料
        public Diary GetDiary(int memberid,DateTime date)
        {

            //var data = _context.AnnualGoal.Include(x => x.MonthPlan).ThenInclude(b=>b.Schedule).ToList();
            // return data;

            var diaryContent = diaryService.GetDiary(memberid,date);

            return diaryContent;
        }
        [HttpGet("Question/{date}")]//拿問題日記的問題

        public DiaryQuestion GetQuesionDiary(string date)
        {

            var questionDiary = diaryService.GetQuestionDiary(date);

            return questionDiary;

        }
        [HttpGet("Answer/{MemberId}/{Date}")]//拿問題日記的答案

        public List<DiaryAnswer> GetDiaryAnswer(int memberid,string date)
        {
            var diaryAnswer = diaryService.GetDiaryAnswer(memberid,date);
            return diaryAnswer;
        }

        [HttpPost("Diary")]
        public string InsertDiaryContent(Diary diaryContent)
        {
            var insertDiary = diaryService.InsertDiaryContent(diaryContent);
            return insertDiary;

        }
        [HttpPost("Answer")]
        public string InsertAnswer(DiaryAnswer diaryAnswer){
            var insertAnswer = diaryService.InsertAnswer(diaryAnswer);
            return insertAnswer;
        }
        [HttpPut("Diary/{id}")]
        public string EditDiary(int id, Diary newdiary)
        {
            var editDiary = diaryService.EditDiary(id, newdiary);
            return editDiary;
        }

        [HttpPut("Answer/{id}")]
        public string EditAnswer(int id, DiaryAnswer newAnswer)
        {
            var editAnswer = diaryService.EditAnswer(id, newAnswer);
            return editAnswer;
        }
        [HttpDelete("Diary/{memberId}/{date}")]
        public string DeleteDiary(int memberId ,string date) {
            return diaryService.DeleteDiary(memberId, date);
        }
        [HttpDelete("Answer/{memberId}/{date}")]
        public string DeleteAnswer(int memberId, string date)
        {
            return diaryService.DeleteAnswer(memberId, date);
        }
        [HttpGet("Diary/Test/{date}")]
        public List<DiaryQuestion> TestGetDiary() {
            var diaryContent = diaryService.TestGetDiaryQuestion();

            return diaryContent;
        }

    }
}