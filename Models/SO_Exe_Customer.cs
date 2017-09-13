namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SO_Exe_Customer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SO_Exe_Customer()
        {
            SO_Exe_Contract = new HashSet<SO_Exe_Contract>();
            SO_Exe_CusContact = new HashSet<SO_Exe_CusContact>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Customer_ID { get; set; }

        public int? IsFlag { get; set; }

        [StringLength(50)]
        public string CusGroup_ID { get; set; }

        [Required]
        [StringLength(250)]
        public string CusName { get; set; }

        [StringLength(250)]
        public string EngName { get; set; }

        [StringLength(50)]
        public string ShortName { get; set; }

        [StringLength(250)]
        public string Address { get; set; }

        [StringLength(50)]
        public string Tel { get; set; }

        [StringLength(50)]
        public string Fax { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        [StringLength(50)]
        public string Website { get; set; }

        [Column(TypeName = "image")]
        public byte[] IsLogo { get; set; }

        [StringLength(50)]
        public string TaxCode { get; set; }

        [StringLength(50)]
        public string AccountID { get; set; }

        [StringLength(250)]
        public string BankName { get; set; }

        [Column(TypeName = "ntext")]
        public string Note { get; set; }

        [StringLength(50)]
        public string Parent_ID { get; set; }

        public DateTime? CreateDate { get; set; }

        [StringLength(50)]
        public string Users_ID { get; set; }

        [StringLength(50)]
        public string Province_ID { get; set; }

        [Column(TypeName = "ntext")]
        public string Service { get; set; }

        [StringLength(500)]
        public string ContactNo { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SO_Exe_Contract> SO_Exe_Contract { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SO_Exe_CusContact> SO_Exe_CusContact { get; set; }
    }
}
