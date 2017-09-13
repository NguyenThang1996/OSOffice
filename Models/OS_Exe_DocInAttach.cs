namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class OS_Exe_DocInAttach
    {
        [Key]
        public int FileAttach_ID { get; set; }

        public int DocIn_ID { get; set; }

        [StringLength(250)]
        public string FileName { get; set; }

        [Column(TypeName = "image")]
        public byte[] FileSource { get; set; }

        [StringLength(250)]
        public string FileDes { get; set; }

        public int? IsOrder { get; set; }

        [StringLength(250)]
        public string FileSize { get; set; }

        public virtual OS_Exe_DocIn OS_Exe_DocIn { get; set; }
    }
}
