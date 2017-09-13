namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SO_Sys_ContracStyle
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SO_Sys_ContracStyle()
        {
            SO_Exe_Contract = new HashSet<SO_Exe_Contract>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ContracStyle_ID { get; set; }

        [Required]
        [StringLength(250)]
        public string ContracStyleName { get; set; }

        [StringLength(250)]
        public string Des { get; set; }

        public bool IsActived { get; set; }

        public int IsOrder { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SO_Exe_Contract> SO_Exe_Contract { get; set; }
    }
}
