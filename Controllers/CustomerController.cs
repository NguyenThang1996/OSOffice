using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;
using System.Web.Script.Serialization;
using System.Net;
using PagedList;
using PagedList.Mvc;

namespace OSOffice.Controllers
{
    public class CustomerController : Controller
    {
        private OSOfficeEntities db = new OSOfficeEntities();


        public ActionResult Index()
        {
            if (Session["Username"] == null)
            {
                return RedirectToAction("Index", "Permission");
            }
            return View();
        }

        [HttpGet]
        public JsonResult LoadData(string name, string grcus, string pro)
        {
            int? max = 0;

            var model = db.SO_Exe_Customer.Select(x => new
            {
                x.Customer_ID,
                x.IsFlag,
                x.CusGroup_ID,
                x.CusName,
                x.EngName,
                x.ShortName,
                x.Address,
                x.Tel,
                x.Fax,
                x.Email,
                x.Website,
                x.IsLogo,
                x.TaxCode,
                x.AccountID,
                x.BankName,
                x.Note,
                x.Parent_ID,
                x.CreateDate,
                x.Users_ID,
                x.Province_ID,
                x.Service,
                x.ContactNo,
                x.SO_Exe_CusContact
            }).OrderBy(n => n.CusName).ToList();

            var customer = model;
            if (model.Count != 0)
            {
                max = db.SO_Exe_Customer.Max(c => c.Customer_ID);
                if (!string.IsNullOrEmpty(name))
                {

                    customer = model.Where(c => c.Tel != null).Where(c => c.CusName.Contains(name) || c.Tel.Contains(name)).ToList();
                    if (customer.Count == 0)
                    {
                        customer = model.Where(c => c.SO_Exe_CusContact.Count(x => x.ContactTel.Contains(name)) > 0).ToList();
                    }
                }
                if (!string.IsNullOrEmpty(grcus) && grcus != "0")
                    customer = model.Where(c => c.CusGroup_ID == grcus).ToList();
                if (!string.IsNullOrEmpty(pro) && pro != "0")
                    customer = model.Where(c => c.Province_ID == pro).ToList();
                int totalrow = model.Count();           
            }
            return Json(new
            {
                max = max,
                data = customer,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteData(int id)
        {
            var entity = db.SO_Exe_Customer.Find(id);
            db.SO_Exe_Customer.Remove(entity);
            db.SaveChanges();
            return Json(new
            {
                status = true
            });
        }

        public PartialViewResult ModalCustomer()
        {
            return PartialView("~/Views/Shared/Modal/modalcustomer.cshtml");
        }

        [HttpPost]
        public JsonResult SaveData(SO_Exe_Customer modelcus, List<SO_Exe_CusContact> modelcussup)
        {
            var entity = db.SO_Exe_Customer.Find(modelcus.Customer_ID);
            if (entity == null)
            {
                db.SO_Exe_Customer.Add(modelcus);
                db.SaveChanges();
                if (modelcussup != null)
                {
                    foreach (var item in modelcussup)
                    {
                        if (item.ContactName != null || item.ContactTel != null && item.ContactEmail != null && item.ContactNote != null)
                        {
                            item.Customer_ID = modelcus.Customer_ID;
                            db.SO_Exe_CusContact.Add(item);
                            db.SaveChanges();
                        }
                    }
                }
            }
            else
            {
                if (modelcussup != null)
                {
                    foreach (var item in modelcussup)
                    {
                        var entity_sup = db.SO_Exe_CusContact.Find(item.CusContact_ID);
                        if (entity_sup == null)
                        {
                            item.Customer_ID = modelcus.Customer_ID;
                            db.SO_Exe_CusContact.Add(item);
                            db.SaveChanges();
                        }
                        else
                        {
                            entity_sup.ContactName = item.ContactName;
                            entity_sup.ContactTel = item.ContactTel;
                            entity_sup.ContactEmail = item.ContactEmail;
                            entity_sup.ContactNote = item.ContactNote;
                        }
                    }
                }
                entity.CusName = modelcus.CusName;
                entity.Address = modelcus.Address;
                entity.Tel = modelcus.Tel;
                entity.Email = modelcus.Email;
                entity.EngName = modelcus.EngName;
                entity.ShortName = modelcus.ShortName;
                entity.CusGroup_ID = modelcus.CusGroup_ID;
                entity.IsFlag = modelcus.IsFlag;
                entity.CreateDate = modelcus.CreateDate;
                entity.Address = modelcus.Address;
                entity.Province_ID = modelcus.Province_ID;
                entity.ContactNo = modelcus.ContactNo;
                entity.Tel = modelcus.Tel;
                entity.Fax = modelcus.Fax;
                entity.Email = modelcus.Email;
                entity.Website = modelcus.Website;
                entity.AccountID = modelcus.AccountID;
                entity.BankName = modelcus.BankName;
                entity.TaxCode = modelcus.TaxCode;
                entity.Service = modelcus.Service;
                db.SaveChanges();
            }
            return Json(new
            {
                status = true,
            });
        }
        [HttpGet]
        public JsonResult GetDetail(int id)
        {
            var customer = db.SO_Exe_Customer.Where(c => c.Customer_ID == id).Select(x => new
            {
                x.Customer_ID,
                x.IsFlag,
                x.CusGroup_ID,
                x.CusName,
                x.EngName,
                x.ShortName,
                x.Address,
                x.Tel,
                x.Fax,
                x.Email,
                x.Website,
                x.IsLogo,
                x.TaxCode,
                x.AccountID,
                x.BankName,
                x.Note,
                x.Parent_ID,
                x.CreateDate,
                x.Users_ID,
                x.Province_ID,
                x.Service,
                x.ContactNo,
            }).FirstOrDefault();
            var cuscontact = db.SO_Exe_CusContact.Where(c => c.Customer_ID == id).Select(x => new
            {
                x.CusContact_ID,
                x.ContactName,
                x.ContactTel,
                x.ContactEmail,
                x.ContactNote
            });
            return Json(new
            {
                data = customer,
                data1 = cuscontact,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteContact(int id)
        {
            var entity = db.SO_Exe_CusContact.Find(id);
            db.SO_Exe_CusContact.Remove(entity);
            db.SaveChanges();
            return Json(new
            {
                status = true
            });
        }
    }
}