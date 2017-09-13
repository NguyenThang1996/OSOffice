using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class ContractController : Controller
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

        public PartialViewResult ModalContract()
        {
            return PartialView("~/Views/Shared/Modal/modalcontract.cshtml");
        }

        [HttpGet]
        public JsonResult LoadData(string name, string grctr, string statuspay, string isflag, string product)
        {
            int? max = 0;

            var model = db.SO_Exe_Contract.Select(x => new
            {
                x.Contract_ID,
                x.NoCode,
                x.SignDate,
                x.SO_Exe_Customer.CusName,
                x.IsFlag,
                x.ContracStyle_ID,
                x.SO_Sys_ContracStyle.ContracStyleName,
                x.IsPayment,
                x.Product_ID,
                x.IsStatus,
                x.CreateDate
            }).OrderByDescending(n => n.CreateDate).ToList();
            var contract = model;
            if(model.Count != 0)
            {
                max =  db.SO_Exe_Contract.Max(c => c.Contract_ID);
                if (!string.IsNullOrEmpty(name))
                    contract = model.Where(c => c.NoCode.Contains(name) || c.CusName.Contains(name)).ToList();
                if (!string.IsNullOrEmpty(isflag) && isflag != "0")
                    contract = model.Where(c => c.IsFlag == isflag).ToList();
                if (!string.IsNullOrEmpty(grctr) && grctr != "0")
                    contract = model.Where(c => c.ContracStyle_ID.ToString() == grctr).ToList();
                if (!string.IsNullOrEmpty(statuspay) && statuspay != "0")
                    contract = model.Where(c => c.IsPayment == statuspay).ToList();
                if (!string.IsNullOrEmpty(product) && product != "0")
                    contract = model.Where(c => c.Product_ID.ToString() == product).ToList();
            }
            return Json(new
            {
                max = max,
                data = contract,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteData(int id)
        {
            var entity = db.SO_Exe_Contract.Find(id);
            db.SO_Exe_Contract.Remove(entity);
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
        public JsonResult SaveData(SO_Exe_Contract modelcontract, List<SO_Exe_ContractFile> modelcontractfile, List<SO_Exe_ContPayment> modelcontractaccess)
        {
            var entity = db.SO_Exe_Contract.Find(modelcontract.Contract_ID);
            if (entity == null)
            {
                db.SO_Exe_Contract.Add(modelcontract);
                db.SaveChanges();
                if (modelcontractfile != null)
                {
                    foreach (var item in modelcontractfile)
                    {
                        item.Contract_ID = modelcontract.Contract_ID;
                        db.SO_Exe_ContractFile.Add(item);
                        db.SaveChanges();
                    }
                }
                if(modelcontractaccess != null)
                {
                    foreach (var item1 in modelcontractaccess)
                    {
                        if (item1.Payment_Time != null || item1.Payment_Values != null || item1.Payment_Date != null)
                        {
                            item1.Contract_ID = modelcontract.Contract_ID;
                            db.SO_Exe_ContPayment.Add(item1);
                            db.SaveChanges();
                        }
                    }               
                }
            }
            else
            {
                if (modelcontractfile != null)
                {
                    foreach (var item in modelcontractfile)
                    {
                        item.Contract_ID = modelcontract.Contract_ID;
                        db.SO_Exe_ContractFile.Add(item);
                        db.SaveChanges();
                    }
                }
                if (modelcontractaccess != null)
                {
                    foreach (var item  in modelcontractaccess)
                    {
                        var entity_access = db.SO_Exe_ContPayment.Find(item.Payment_ID);
                        if(entity_access == null)
                        {
                            item.Contract_ID = modelcontract.Contract_ID;
                            db.SO_Exe_ContPayment.Add(item);
                            db.SaveChanges();
                        }                        
                    }
                }
                entity.NoCode = modelcontract.NoCode;
                entity.SignDate = modelcontract.SignDate;
                entity.Subjects = modelcontract.Subjects;
                entity.IsFlag = modelcontract.IsFlag;
                entity.ContracStyle_ID = modelcontract.ContracStyle_ID;
                entity.Customer_ID = modelcontract.Customer_ID;
                entity.Product_ID = modelcontract.Product_ID;
                entity.Contents = modelcontract.Contents;
                entity.IsValue = modelcontract.IsValue;
                entity.MoneyText = modelcontract.MoneyText;
                entity.IsInCome = modelcontract.IsInCome;
                entity.IsVAT = modelcontract.IsVAT;
                entity.IsPayType = modelcontract.IsPayType;
                entity.OutOfDate = modelcontract.OutOfDate;
                entity.SignNameA = modelcontract.SignNameA;
                entity.SignNameB = modelcontract.SignNameB;
                entity.IsStatus = modelcontract.IsStatus;
                entity.IsInvoice = modelcontract.IsInvoice;
                entity.IsPayment = modelcontract.IsPayment;
                entity.IsLock = modelcontract.IsLock;
                entity.CreateDate = modelcontract.CreateDate;
                entity.Users_ID = modelcontract.Users_ID;
                entity.Des = modelcontract.Des;
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
            var contract = db.SO_Exe_Contract.Where(c => c.Contract_ID == id).Select(x => new
            {
                x.Contract_ID,
                x.NoCode,
                x.SignDate,
                x.Subjects,
                x.IsFlag,
                x.ContracStyle_ID,
                x.Customer_ID,
                x.Product_ID,
                x.Contents,
                x.IsValue,
                x.MoneyText,
                x.IsInCome,
                x.IsVAT,
                x.IsPayType,
                x.OutOfDate,
                x.SignNameA,
                x.SignNameB,
                x.IsStatus,
                x.IsInvoice,
                x.IsPayment,
                x.IsLock,
                x.CreateDate,
                x.Users_ID,
                x.Des
            }).FirstOrDefault();
            var contractaccess = db.SO_Exe_ContPayment.Where(c => c.Contract_ID == id).OrderBy(c => c.Payment_Time).Select(x => new
            {
                x.Payment_ID,
                x.Contract_ID,
                x.Payment_Time,
                x.Payment_Values,
                x.Payment_Date
            });
            return Json(new
            {
                data = contract,
                data1 = contractaccess,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }
    }
}