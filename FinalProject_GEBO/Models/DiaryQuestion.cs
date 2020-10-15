using System;
using System.Collections.Generic;

namespace FinalProject_GEBO.Models
{
    public partial class DiaryQuestion
    {
        public DiaryQuestion()
        {
            DiaryAnswer = new HashSet<DiaryAnswer>();
        }

        public int Id { get; set; }
        public int? MemberId { get; set; }
        public string Question { get; set; }
        public DateTime Date { get; set; }

        public virtual ICollection<DiaryAnswer> DiaryAnswer { get; set; }
    }
}
