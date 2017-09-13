namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class OS_Exe_FolderAttach
    {
        [Key]
        [StringLength(50)]
        public string FolderAttach_ID { get; set; }

        public int Folder_ID { get; set; }

        [StringLength(250)]
        public string FileName { get; set; }

        [Column(TypeName = "image")]
        public byte[] FileSource { get; set; }

        [StringLength(250)]
        public string FileDes { get; set; }

        public int IsOrder { get; set; }

        public virtual OS_Exe_Folder OS_Exe_Folder { get; set; }
    }
}
