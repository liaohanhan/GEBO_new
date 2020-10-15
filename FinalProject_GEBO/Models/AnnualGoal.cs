using System;
using System.Collections.Generic;

namespace FinalProject_GEBO.Models
{
    public partial class AnnualGoal
    {
        public int Id { get; set; }
        public int MId { get; set; }
        public DateTime? Year { get; set; }
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Goal { get; set; }
        public bool? Status { get; set; }
        public decimal? Rate { get; set; }

        public virtual Member M { get; set; }
    }
}
