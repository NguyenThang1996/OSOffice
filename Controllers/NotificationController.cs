using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class NotificationController : Controller
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

        public PartialViewResult ModalNotification()
        {
            return PartialView("~/Views/Shared/Modal/modalnotification.cshtml");
        }

        [HttpGet]
        public JsonResult LoadData(string name, string status, string group)
        {

            int? max = 0;
            var model = db.OS_Exe_Notes.OrderByDescending(c => c.Notes_CreateDate).ToList();
            if (model.Count != 0)
            {
                max = db.OS_Exe_Notes.Max(c => c.Notes_ID); 
            }
            var noti = model;
            //int totalrow = model.Count();
            //if (!string.IsNullOrEmpty(pagesize))
            //    model = model.OrderBy(c => c.AccountName).Skip((totalpage - 1) * int.Parse(pagesize)).Take(int.Parse(pagesize));
            if (!string.IsNullOrEmpty(name))
                noti = model.Where(c => c.Notes_Title.Contains(name) || c.Notes_Content.Contains(name) || c.Notes_PersonCreate.Contains(name)).ToList();
            if (!string.IsNullOrEmpty(status) && status != "0")
                noti = model.Where(c => c.IsOK == status).ToList();
            if (!string.IsNullOrEmpty(group) && group != "0")
                noti = model.Where(c => c.Notes_Group == group).ToList();
            return Json(new
            {
                max = max,
                data = noti,
                status = true
            }, JsonRequestBehavior.AllowGet);// thu lai xem 
        }

        [HttpPost]
        public JsonResult DeleteData(int id)
        {
            var entity = db.OS_Exe_Notes.Find(id);
            db.OS_Exe_Notes.Remove(entity);
            db.SaveChanges();
            return Json(new
            {
                status = true
            });
        }

        [HttpPost]
        public JsonResult SaveData(OS_Exe_Notes modelnote, List<OS_Sys_NotesFile> modelnotefile)
        {
            var entity = db.OS_Exe_Notes.Find(modelnote.Notes_ID);
            if (entity == null)
            {
                db.OS_Exe_Notes.Add(modelnote);
                db.SaveChanges();
                if (modelnotefile != null)
                {
                    foreach (var item in modelnotefile)
                    {                        
                        item.Notes_ID = modelnote.Notes_ID;
                        db.OS_Sys_NotesFile.Add(item);
                        db.SaveChanges();
                    }
                }
            }
            else
            {
                if (modelnotefile != null)
                {
                    foreach (var item in modelnotefile)
                    {
                        var entity_sup = db.OS_Sys_NotesFile.Find(item.NotesFile_ID);
                        if (entity_sup == null)
                        {
                            item.Notes_ID = modelnote.Notes_ID;
                            db.OS_Sys_NotesFile.Add(item);
                            db.SaveChanges();
                        }
                    }                    
                }
                entity.Notes_Title = modelnote.Notes_Title;
                entity.Notes_Content = modelnote.Notes_Content;
                entity.Notes_Date = modelnote.Notes_Date;
                entity.Notes_Partner = modelnote.Notes_Partner;
                entity.Notes_Opinion = modelnote.Notes_Opinion;
                entity.IsOK = modelnote.IsOK;
                entity.Notes_CreateDate = modelnote.Notes_CreateDate;
                entity.Notes_Group = modelnote.Notes_Group;
                entity.Notes_Note = modelnote.Notes_Note;
                entity.Notes_PersonCreate = modelnote.Notes_PersonCreate;
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
            var note = db.OS_Exe_Notes.Where(c => c.Notes_ID == id).Select(x => new
            {
                x.Notes_Title,
                x.Notes_Content,
                x.Notes_Date,
                x.Notes_Partner,
                x.Notes_Opinion,
                x.IsOK,
                x.Notes_CreateDate,
                x.Notes_Group,
                x.Notes_Note,
                x.Notes_PersonCreate,
                x.Notes_ID
            }).FirstOrDefault();
            var notefile = db.OS_Sys_NotesFile.Where(c => c.Notes_ID == id).Select(x => new
            {
                x.NotesFile_Name,
                x.NotesFile_Size,
                x.NotesFile_Source
            });
            return Json(new
            {
                data = note,
                data1 = notefile,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetFiveNotiUnsuccess()
        {
            var model = db.OS_Exe_Notes.Where(n => n.IsOK == "2").OrderByDescending(n => n.Notes_CreateDate).Take(5);
            var count = db.OS_Exe_Notes.Where(n => n.IsOK == "2").Count();
            return Json(new
            {
                count = count,
                data = model,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }
    }
}
