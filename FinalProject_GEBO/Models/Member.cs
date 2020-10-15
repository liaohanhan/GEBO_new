using System;
using System.Collections.Generic;

namespace FinalProject_GEBO.Models
{
    public partial class Member
    {
        public Member()
        {
            AnnualGoal = new HashSet<AnnualGoal>();
            DiaryAnswer = new HashSet<DiaryAnswer>();
            SavePlan = new HashSet<SavePlan>();
            Schedule = new HashSet<Schedule>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Account { get; set; }
        public string Password { get; set; }

        public virtual ICollection<AnnualGoal> AnnualGoal { get; set; }
        public virtual ICollection<DiaryAnswer> DiaryAnswer { get; set; }
        public virtual ICollection<SavePlan> SavePlan { get; set; }
        public virtual ICollection<Schedule> Schedule { get; set; }
    }
}
