namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class OS_Sys_NotesFile
    {
        [Key]
        public int NotesFile_ID { get; set; }

        [StringLength(250)]
        public string NotesFile_Name { get; set; }

        [StringLength(50)]
        public string NotesFile_Size { get; set; }

        [Column(TypeName = "image")]
        public byte[] NotesFile_Source { get; set; }

        public int? Notes_ID { get; set; }

        public virtual OS_Exe_Notes OS_Exe_Notes { get; set; }
    }
}
