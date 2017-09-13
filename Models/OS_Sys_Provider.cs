namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class OS_Sys_Provider
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public OS_Sys_Provider()
        {
            OS_Exe_DocIn = new HashSet<OS_Exe_DocIn>();
            OS_Exe_DocOut = new HashSet<OS_Exe_DocOut>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Provider_ID { get; set; }

        [Required]
        [StringLength(250)]
        public string Provider_Name { get; set; }

        [StringLength(250)]
        public string Provider_Des { get; set; }

        public bool? Provider_Active { get; set; }

        public int? Provider_Orders { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OS_Exe_DocIn> OS_Exe_DocIn { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OS_Exe_DocOut> OS_Exe_DocOut { get; set; }
    }
}
