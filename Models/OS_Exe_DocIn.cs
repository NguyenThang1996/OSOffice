namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class OS_Exe_DocIn
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public OS_Exe_DocIn()
        {
            OS_Exe_DocInAttach = new HashSet<OS_Exe_DocInAttach>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int DocIn_ID { get; set; }

        [Required]
        public string DocName { get; set; }

        public int? DocType_ID { get; set; }

        [StringLength(50)]
        public string DocCode { get; set; }

        public DateTime? DocDate { get; set; }

        public DateTime? DocGetDate { get; set; }

        public int? Provider_ID { get; set; }

        [StringLength(250)]
        public string FilesName { get; set; }

        [Column(TypeName = "image")]
        public byte[] FilesSource { get; set; }

        [StringLength(250)]
        public string Note { get; set; }

        [StringLength(250)]
        public string FileSize { get; set; }

        public virtual OS_Sys_DocType OS_Sys_DocType { get; set; }

        public virtual OS_Sys_Provider OS_Sys_Provider { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OS_Exe_DocInAttach> OS_Exe_DocInAttach { get; set; }
    }
}
