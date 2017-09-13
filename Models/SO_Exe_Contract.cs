namespace OSOffice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SO_Exe_Contract
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SO_Exe_Contract()
        {
            SO_Exe_ContPayment = new HashSet<SO_Exe_ContPayment>();
            SO_Exe_ContractFile = new HashSet<SO_Exe_ContractFile>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Contract_ID { get; set; }

        [Required]
        [StringLength(50)]
        public string NoCode { get; set; }

        public DateTime? SignDate { get; set; }

        [StringLength(250)]
        public string Subjects { get; set; }

        [StringLength(50)]
        public string IsFlag { get; set; }

        public int? ContracStyle_ID { get; set; }

        public int? Customer_ID { get; set; }

        public int? Product_ID { get; set; }

        [Column(TypeName = "ntext")]
        public string Contents { get; set; }

        [StringLength(50)]
        public string IsValue { get; set; }

        [StringLength(500)]
        public string MoneyText { get; set; }

        [StringLength(50)]
        public string IsInCome { get; set; }

        [StringLength(50)]
        public string IsVAT { get; set; }

        public int? IsPayType { get; set; }

        [StringLength(50)]
        public string OutOfDate { get; set; }

        [StringLength(50)]
        public string SignNameA { get; set; }

        [StringLength(50)]
        public string SignNameB { get; set; }

        [StringLength(50)]
        public string IsStatus { get; set; }

        public int? IsInvoice { get; set; }

        [StringLength(50)]
        public string IsPayment { get; set; }

        public bool? IsLock { get; set; }

        public DateTime? CreateDate { get; set; }

        [StringLength(50)]
        public string Users_ID { get; set; }

        [StringLength(500)]
        public string Des { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SO_Exe_ContPayment> SO_Exe_ContPayment { get; set; }

        public virtual SO_Exe_Customer SO_Exe_Customer { get; set; }

        public virtual SO_Sys_ContracStyle SO_Sys_ContracStyle { get; set; }

        public virtual SO_Sys_Province SO_Sys_Province { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SO_Exe_ContractFile> SO_Exe_ContractFile { get; set; }
    }
}
