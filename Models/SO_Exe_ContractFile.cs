namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SO_Exe_ContractFile
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SO_Exe_ContractFile()
        {
            SO_Exe_ContractLog = new HashSet<SO_Exe_ContractLog>();
        }

        [Key]
        public int ContractFile_ID { get; set; }

        public int? Contract_ID { get; set; }

        public int? IsFlag { get; set; }

        [StringLength(250)]
        public string FileName { get; set; }

        [Column(TypeName = "image")]
        public byte[] FileSource { get; set; }

        public double? FileSize { get; set; }

        public int? IsOrder { get; set; }

        public virtual SO_Exe_Contract SO_Exe_Contract { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SO_Exe_ContractLog> SO_Exe_ContractLog { get; set; }
    }
}
