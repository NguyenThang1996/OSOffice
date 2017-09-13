namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class OS_Exe_Folder
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public OS_Exe_Folder()
        {
            OS_Exe_FolderAttach = new HashSet<OS_Exe_FolderAttach>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Folder_ID { get; set; }

        [Required]
        [StringLength(250)]
        public string FolderName { get; set; }

        [StringLength(50)]
        public string FolderParent { get; set; }

        [StringLength(250)]
        public string FolderDes { get; set; }

        public int? FolderOrders { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OS_Exe_FolderAttach> OS_Exe_FolderAttach { get; set; }
    }
}
