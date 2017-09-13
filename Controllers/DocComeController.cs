using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class DocComeController : Controller
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
        public JsonResult LoadData(string name, string provider)
        {
            int? max = 0;

            var model = db.OS_Exe_DocIn.Select(x => new
            {
                x.DocIn_ID,
                x.DocName,
                x.DocType_ID,
                x.DocCode,
                x.DocDate,
                x.DocGetDate,
                x.Provider_ID,
                x.FilesName,
                x.FileSize,
                x.FilesSource,
                x.Note,
                x.OS_Sys_Provider.Provider_Name
            }).OrderByDescending(n => n.DocDate).ToList();

            var doccome = model;
            if (model.Count != 0)
            {
                max = db.OS_Exe_DocIn.Max(c => c.DocIn_ID);
                if (!string.IsNullOrEmpty(name))
                {
                    doccome = model.Where(c => c.DocName.Contains(name)).ToList();
                }
                if (!string.IsNullOrEmpty(provider) && provider != "0")
                    doccome = model.Where(c => c.Provider_ID.ToString() == provider).ToList();
                int totalrow = model.Count();           
            }

            return Json(new
            {
                max = max,
                data = doccome,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteData(int id)
        {
            var entity = db.OS_Exe_DocIn.Find(id);
            db.OS_Exe_DocIn.Remove(entity);
            db.SaveChanges();
            return Json(new
            {
                status = true
            });
        }

        public PartialViewResult ModalDocCome()
        {
            return PartialView("~/Views/Shared/Modal/modaldoccome.cshtml");
        }

        [HttpPost]
        public JsonResult SaveData(OS_Exe_DocIn modeldoccome, List<OS_Exe_DocInAttach> modeldoccomeattach)
        {
            var entity = db.OS_Exe_DocIn.Find(modeldoccome.DocIn_ID);
            if (entity == null)
            {
                db.OS_Exe_DocIn.Add(modeldoccome);
                db.SaveChanges();
                if (modeldoccomeattach != null)
                {
                    foreach (var item in modeldoccomeattach)
                    {

                        item.DocIn_ID = modeldoccome.DocIn_ID;
                        db.OS_Exe_DocInAttach.Add(item);
                        db.SaveChanges();
                    }
                }
            }
            else
            {
                if (modeldoccomeattach != null)
                {
                    foreach (var item in modeldoccomeattach)
                    {

                        item.DocIn_ID = modeldoccome.DocIn_ID;
                        db.OS_Exe_DocInAttach.Add(item);
                        db.SaveChanges();
                    }
                }
                entity.DocName = modeldoccome.DocName;
                entity.DocType_ID = modeldoccome.DocType_ID;
                entity.DocCode = modeldoccome.DocCode;
                entity.DocDate = modeldoccome.DocDate;
                entity.DocGetDate = modeldoccome.DocGetDate;
                entity.Provider_ID = modeldoccome.Provider_ID;
                entity.FilesName = modeldoccome.FilesName;
                entity.FilesSource = modeldoccome.FilesSource;
                entity.FileSize = modeldoccome.FileSize;
                entity.Note = modeldoccome.Note;
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
            var doccome = db.OS_Exe_DocIn.Where(c => c.DocIn_ID == id).Select(x => new
            {
                x.DocIn_ID,
                x.DocName,
                x.DocType_ID,
                x.DocCode,
                x.DocDate,
                x.DocGetDate,
                x.Provider_ID,
                x.FilesName,
                x.FilesSource,
                x.Note,
            }).FirstOrDefault();
            var doccomeattach = db.OS_Exe_DocInAttach.Where(c => c.DocIn_ID == id).Select(x => new
            {
                x.FileName,
                x.FileSource,
                x.FileSize
            });
            return Json(new
            {
                data = doccome,
                data1 = doccomeattach,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }
    }
}