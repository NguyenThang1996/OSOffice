namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SO_Exe_ContPayment
    {
        [Key]
        public int Payment_ID { get; set; }

        public int Contract_ID { get; set; }

        public int? Payment_Time { get; set; }

        [StringLength(50)]
        public string Payment_Values { get; set; }

        [StringLength(50)]
        public string Payment_Date { get; set; }

        public int? IsOrders { get; set; }

        public virtual SO_Exe_Contract SO_Exe_Contract { get; set; }
    }
}
