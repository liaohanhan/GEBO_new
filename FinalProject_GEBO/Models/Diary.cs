using System;
using System.Collections.Generic;

namespace FinalProject_GEBO.Models
{
    public partial class Diary
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
    }
}
