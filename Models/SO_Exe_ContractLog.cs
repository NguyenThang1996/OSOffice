namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SO_Exe_ContractLog
    {
        [Key]
        [StringLength(50)]
        public string Log_ID { get; set; }

        public DateTime CrreatedDate { get; set; }

        [Required]
        [StringLength(50)]
        public string Users_ID { get; set; }

        public int ContractFile_ID { get; set; }

        public virtual SO_Exe_ContractFile SO_Exe_ContractFile { get; set; }
    }
}
