using System;
using System.Collections.Generic;

namespace FinalProject_GEBO.Models
{
    public partial class MonthPlan
    {
        public int Id { get; set; }
        public int MId { get; set; }
        public int? AgId { get; set; }
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool? Status { get; set; }
        public bool? IsRemind { get; set; }
    }
}
