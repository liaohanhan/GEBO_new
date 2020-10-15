using System;
using System.Collections.Generic;

namespace FinalProject_GEBO.Models
{
    public partial class Schedule
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public int? MpId { get; set; }
        public DateTime? BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Title { get; set; }
        public bool? IsRemind { get; set; }

        public virtual Member Member { get; set; }
    }
}
