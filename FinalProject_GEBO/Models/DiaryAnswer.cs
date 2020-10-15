using System;
using System.Collections.Generic;

namespace FinalProject_GEBO.Models
{
    public partial class DiaryAnswer
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int MemberId { get; set; }
        public string Answer { get; set; }
        public DateTime Date { get; set; }

        public virtual Member Member { get; set; }
        public virtual DiaryQuestion Question { get; set; }
    }
}
