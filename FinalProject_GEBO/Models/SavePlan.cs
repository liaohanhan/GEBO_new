using System;
using System.Collections.Generic;

namespace FinalProject_GEBO.Models
{
    public partial class SavePlan
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public DateTime? Date { get; set; }
        public string Description { get; set; }
        public int? Money { get; set; }
        public int? Type { get; set; }

        public virtual Member Member { get; set; }
    }
}
