namespace OSOffice.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class OSOfficeEntities : DbContext
    {
        public OSOfficeEntities()
            : base("name=OSOfficeEntities")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        public virtual DbSet<OS_Exe_DocIn> OS_Exe_DocIn { get; set; }
        public virtual DbSet<OS_Exe_DocInAttach> OS_Exe_DocInAttach { get; set; }
        public virtual DbSet<OS_Exe_DocOut> OS_Exe_DocOut { get; set; }
        public virtual DbSet<OS_Exe_DocOutAttach> OS_Exe_DocOutAttach { get; set; }
        public virtual DbSet<OS_Exe_Folder> OS_Exe_Folder { get; set; }
        public virtual DbSet<OS_Exe_FolderAttach> OS_Exe_FolderAttach { get; set; }
        public virtual DbSet<OS_Exe_Notes> OS_Exe_Notes { get; set; }
        public virtual DbSet<OS_Sys_DocType> OS_Sys_DocType { get; set; }
        public virtual DbSet<OS_Sys_NotesFile> OS_Sys_NotesFile { get; set; }
        public virtual DbSet<OS_Sys_Provider> OS_Sys_Provider { get; set; }
        public virtual DbSet<SO_Exe_ContPayment> SO_Exe_ContPayment { get; set; }
        public virtual DbSet<SO_Exe_Contract> SO_Exe_Contract { get; set; }
        public virtual DbSet<SO_Exe_ContractFile> SO_Exe_ContractFile { get; set; }
        public virtual DbSet<SO_Exe_ContractLog> SO_Exe_ContractLog { get; set; }
        public virtual DbSet<SO_Exe_CusContact> SO_Exe_CusContact { get; set; }
        public virtual DbSet<SO_Exe_Customer> SO_Exe_Customer { get; set; }
        public virtual DbSet<SO_Exe_Permission> SO_Exe_Permission { get; set; }
        public virtual DbSet<SO_Sys_ContracStyle> SO_Sys_ContracStyle { get; set; }
        public virtual DbSet<SO_Sys_Product> SO_Sys_Product { get; set; }
        public virtual DbSet<SO_Sys_Province> SO_Sys_Province { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OS_Exe_Folder>()
                .Property(e => e.FolderParent)
                .IsUnicode(false);

            modelBuilder.Entity<OS_Exe_FolderAttach>()
                .Property(e => e.FolderAttach_ID)
                .IsUnicode(false);

            modelBuilder.Entity<OS_Exe_Notes>()
                .HasMany(e => e.OS_Sys_NotesFile)
                .WithOptional(e => e.OS_Exe_Notes)
                .WillCascadeOnDelete();

            modelBuilder.Entity<OS_Sys_DocType>()
                .HasMany(e => e.OS_Exe_DocIn)
                .WithOptional(e => e.OS_Sys_DocType)
                .WillCascadeOnDelete();

            modelBuilder.Entity<OS_Sys_Provider>()
                .HasMany(e => e.OS_Exe_DocIn)
                .WithOptional(e => e.OS_Sys_Provider)
                .WillCascadeOnDelete();

            modelBuilder.Entity<SO_Exe_ContPayment>()
                .Property(e => e.Payment_Values)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_ContPayment>()
                .Property(e => e.Payment_Date)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Contract>()
                .Property(e => e.IsInCome)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Contract>()
                .Property(e => e.IsVAT)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Contract>()
                .Property(e => e.IsStatus)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Contract>()
                .Property(e => e.IsPayment)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Contract>()
                .Property(e => e.Users_ID)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Contract>()
                .HasMany(e => e.SO_Exe_ContractFile)
                .WithOptional(e => e.SO_Exe_Contract)
                .WillCascadeOnDelete();

            modelBuilder.Entity<SO_Exe_ContractLog>()
                .Property(e => e.Log_ID)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_ContractLog>()
                .Property(e => e.Users_ID)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_CusContact>()
                .Property(e => e.Mobile)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_CusContact>()
                .Property(e => e.ContactEmail)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_CusContact>()
                .Property(e => e.ContactNote)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_CusContact>()
                .Property(e => e.Skype)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Customer>()
                .Property(e => e.CusGroup_ID)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Customer>()
                .Property(e => e.Fax)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Customer>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Customer>()
                .Property(e => e.Website)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Customer>()
                .Property(e => e.Parent_ID)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Customer>()
                .Property(e => e.Users_ID)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Customer>()
                .Property(e => e.Province_ID)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Customer>()
                .HasMany(e => e.SO_Exe_Contract)
                .WithOptional(e => e.SO_Exe_Customer)
                .WillCascadeOnDelete();

            modelBuilder.Entity<SO_Exe_Permission>()
                .Property(e => e.Username)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Exe_Permission>()
                .Property(e => e.Password)
                .IsUnicode(false);

            modelBuilder.Entity<SO_Sys_Province>()
                .HasMany(e => e.SO_Exe_Contract)
                .WithOptional(e => e.SO_Sys_Province)
                .HasForeignKey(e => e.Product_ID);
        }
    }
}
