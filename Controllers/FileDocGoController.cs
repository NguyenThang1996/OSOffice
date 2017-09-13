using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class FileDocGoController : Controller
    {
        OSOfficeEntities db = new OSOfficeEntities();
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult LoadData(int id)
        {
            var model = db.OS_Exe_DocOut.Where(c => c.DocOut_ID == id);
            return Json(new
            {
                data = model,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveData(OS_Exe_DocOut modeldocgo)
        {
            var entity = db.OS_Exe_DocOut.Find(modeldocgo.DocOut_ID);
            if (entity == null)
            {
                db.OS_Exe_DocOut.Add(modeldocgo);
                db.SaveChanges();
            }
            return Json(new
            {
                status = true,
            });
        }

    }
}