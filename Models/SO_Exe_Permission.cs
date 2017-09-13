namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SO_Exe_Permission
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Account_ID { get; set; }

        [Required]
        [StringLength(250)]
        public string Username { get; set; }

        [Required]
        [StringLength(250)]
        public string Password { get; set; }

        [StringLength(50)]
        public string Permission { get; set; }

        [StringLength(250)]
        public string AccountName { get; set; }
    }
}
