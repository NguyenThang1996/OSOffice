namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SO_Exe_CusContact
    {
        [Key]
        public int CusContact_ID { get; set; }

        public int Customer_ID { get; set; }

        [StringLength(50)]
        public string ContactName { get; set; }

        public bool? IsSex { get; set; }

        [StringLength(50)]
        public string TitleName { get; set; }

        [StringLength(50)]
        public string Mobile { get; set; }

        [StringLength(50)]
        public string ContactTel { get; set; }

        [StringLength(50)]
        public string ContactEmail { get; set; }

        [StringLength(250)]
        public string ContactNote { get; set; }

        [StringLength(50)]
        public string Skype { get; set; }

        public virtual SO_Exe_Customer SO_Exe_Customer { get; set; }
    }
}
