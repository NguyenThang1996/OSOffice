using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;
using System.IO;

namespace OSOffice.Controllers
{    
    public class PersonalController : Controller
    {
        private OSOfficeEntities db = new OSOfficeEntities();

        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase file)
        {
            try
            {
                if (file.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/Files"), fileName);
                    file.SaveAs(path);
                }
                ViewBag.Message = "Upload successful";
                return RedirectToAction("Index");
            }
            catch
            {
                ViewBag.Message = "Upload failed";
                return RedirectToAction("Upload");
            }
        }

        public ActionResult Downloads()
        {
            var dir = new System.IO.DirectoryInfo(Server.MapPath("~/Files"));
            System.IO.FileInfo[] fileNames = dir.GetFiles("*.*");
            List<string> items = new List<string>();

            foreach (var file in fileNames)
            {
                items.Add(file.Name);
            }

            return View(items);
        }  

        public ActionResult Index()
        {
            if (Session["Username"] == null)
            {
                return RedirectToAction("Index", "Permission");
            }
            if (Session["Permission"].ToString() != "admin")
            {
                return RedirectToAction("NoEntry", "Personal");
            }
            return View();
        }

        public ActionResult NoEntry()
        {
            if (Session["Permission"].ToString() == "admin")
            {
                return RedirectToAction("Index", "Personal");
            }
            return View(); 
        }

        public PartialViewResult ModalPersonal()
        {
            return PartialView("~/Views/Shared/Modal/modalpersonal.cshtml");
        }

        [HttpGet]
        public JsonResult LoadData(string name, string per)
        {

            int? max = 0;
            var model = db.SO_Exe_Permission.OrderBy(c => c.AccountName).ToList();
            var person = model;
            if(model.Count != 0)
            {
                max = db.SO_Exe_Permission.Max(c => c.Account_ID);
            }
            //int totalrow = model.Count();
            //if (!string.IsNullOrEmpty(pagesize))
            //    model = model.OrderBy(c => c.AccountName).Skip((totalpage - 1) * int.Parse(pagesize)).Take(int.Parse(pagesize));
            if (!string.IsNullOrEmpty(name))
                person = model.Where(c => c.AccountName.Contains(name)).ToList();
            if (!string.IsNullOrEmpty(per) && per != "0")
                person = model.Where(c => c.Permission == per).ToList();
            return Json(new
            {
                max = max,
                data = person,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveData(SO_Exe_Permission modelpersonal)
        {
            var entity = db.SO_Exe_Permission.Find(modelpersonal.Account_ID);
            if (entity == null)
            {
                db.SO_Exe_Permission.Add(modelpersonal);
                db.SaveChanges();                
            }
            else
            {
                entity.AccountName = modelpersonal.AccountName;
                entity.Username = modelpersonal.Username;
                entity.Password = modelpersonal.Password;
                entity.Permission = modelpersonal.Permission;
                db.SaveChanges();
            }
            return Json(new
            {
                status = true,
            });
        }

        [HttpPost]
        public JsonResult DeleteData(int id)
        {
            var entity = db.SO_Exe_Permission.Find(id);
            db.SO_Exe_Permission.Remove(entity);
            db.SaveChanges();
            return Json(new
            {
                status = true
            });
        }

        [HttpGet]
        public JsonResult GetDetail(int id)
        {
            var personal = db.SO_Exe_Permission.Find(id);
            return Json(new
            {
                data = personal,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }
    }
}