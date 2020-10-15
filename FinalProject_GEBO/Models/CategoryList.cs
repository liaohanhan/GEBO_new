using System;
using System.Collections.Generic;

namespace FinalProject_GEBO.Models
{
    public partial class CategoryList
    {
        public CategoryList()
        {
            ItemList = new HashSet<ItemList>();
        }

        public int Id { get; set; }
        public int MemberId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<ItemList> ItemList { get; set; }
    }
}
