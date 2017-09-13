using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class DocGoController : Controller
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

            var model = db.OS_Exe_DocOut.Select(x => new
            {
                x.DocOut_ID,
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

            var docgo = model;
            if (model.Count != 0)
            {
                max = db.OS_Exe_DocOut.Max(c => c.DocOut_ID);
                if (!string.IsNullOrEmpty(name))
                {
                    docgo = model.Where(c => c.DocName.Contains(name)).ToList();
                }
                if (!string.IsNullOrEmpty(provider) && provider != "0")
                    docgo = model.Where(c => c.Provider_ID.ToString() == provider).ToList();
                int totalrow = model.Count();              
            }

            return Json(new
            {
                max = max,
                data = docgo,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteData(int id)
        {
            var entity = db.OS_Exe_DocOut.Find(id);
            db.OS_Exe_DocOut.Remove(entity);
            db.SaveChanges();
            return Json(new
            {
                status = true
            });
        }

        public PartialViewResult ModalDocGo()
        {
            return PartialView("~/Views/Shared/Modal/modaldocgo.cshtml");
        }

        [HttpPost]
        public JsonResult SaveData(OS_Exe_DocOut modeldocgo, List<OS_Exe_DocOutAttach> modeldocgoattach)
        {
            var entity = db.OS_Exe_DocOut.Find(modeldocgo.DocOut_ID);
            if (entity == null)
            {
                db.OS_Exe_DocOut.Add(modeldocgo);
                db.SaveChanges();
                if (modeldocgoattach != null)
                {
                    foreach (var item in modeldocgoattach)
                    {

                        item.DocOut_ID = modeldocgo.DocOut_ID;
                        db.OS_Exe_DocOutAttach.Add(item);
                        db.SaveChanges();
                    }
                }
            }
            else
            {
                if (modeldocgoattach != null)
                {
                    foreach (var item in modeldocgoattach)
                    {

                        item.DocOut_ID = modeldocgo.DocOut_ID;
                        db.OS_Exe_DocOutAttach.Add(item);
                        db.SaveChanges();
                    }
                }
                entity.DocName = modeldocgo.DocName;
                entity.DocType_ID = modeldocgo.DocType_ID;
                entity.DocCode = modeldocgo.DocCode;
                entity.DocDate = modeldocgo.DocDate;
                entity.DocGetDate = modeldocgo.DocGetDate;
                entity.Provider_ID = modeldocgo.Provider_ID;
                entity.FilesName = modeldocgo.FilesName;
                entity.FilesSource = modeldocgo.FilesSource;
                entity.FileSize = modeldocgo.FileSize;
                entity.Note = modeldocgo.Note;
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
            var docgo = db.OS_Exe_DocOut.Where(c => c.DocOut_ID == id).Select(x => new
            {
                x.DocOut_ID,
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
            var docgoattach = db.OS_Exe_DocOutAttach.Where(c => c.DocOut_ID == id).Select(x => new
            {
                x.FileName,
                x.FileSource,
                x.FileSize
            });
            return Json(new
            {
                data = docgo,
                data1 = docgoattach,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }
    }
}