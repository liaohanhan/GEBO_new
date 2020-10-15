using System;
using System.Collections.Generic;

namespace FinalProject_GEBO.Models
{
    public partial class ItemList
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Item { get; set; }
        public bool? Status { get; set; }

        public virtual CategoryList Category { get; set; }
    }
}
