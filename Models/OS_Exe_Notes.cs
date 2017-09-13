namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class OS_Exe_Notes
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public OS_Exe_Notes()
        {
            OS_Sys_NotesFile = new HashSet<OS_Sys_NotesFile>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Notes_ID { get; set; }

        [Required]
        [StringLength(250)]
        public string Notes_Title { get; set; }

        [Required]
        public string Notes_Content { get; set; }

        public DateTime? Notes_Date { get; set; }

        [StringLength(250)]
        public string Notes_Partner { get; set; }

        [StringLength(250)]
        public string Notes_Opinion { get; set; }

        [StringLength(50)]
        public string IsOK { get; set; }

        public DateTime? Notes_CreateDate { get; set; }

        [StringLength(50)]
        public string Notes_Group { get; set; }

        [StringLength(50)]
        public string Notes_Note { get; set; }

        [StringLength(250)]
        public string Notes_PersonCreate { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OS_Sys_NotesFile> OS_Sys_NotesFile { get; set; }
    }
}
