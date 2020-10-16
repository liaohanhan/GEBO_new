using System;
using System.Collections.Generic;

namespace FinalProject_GEBO.Models
{
    public partial class SaveReport
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public DateTime Date { get; set; }
        public int? Budget { get; set; }
    }
}
