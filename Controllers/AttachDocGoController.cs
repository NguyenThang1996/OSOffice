using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class AttachDocGoController : Controller
    {
        private OSOfficeEntities db = new OSOfficeEntities();
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult LoadData(int id)
        {
            var model = db.OS_Exe_DocOutAttach.Where(c => c.DocOut_ID == id);
            return Json(new
            {
                data = model,
                status = true
            }, JsonRequestBehavior.AllowGet);
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
            }
            return Json(new
            {
                status = true,
            });
        }
    }
}