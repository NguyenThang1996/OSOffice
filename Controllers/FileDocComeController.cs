using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class FileDocComeController : Controller
    {
        OSOfficeEntities db = new OSOfficeEntities();
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult LoadData(int id)
        {
            var model = db.OS_Exe_DocIn.Where(c => c.DocIn_ID == id);
            return Json(new
            {
                data = model,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveData(OS_Exe_DocIn modeldoccome)
        {
            var entity = db.OS_Exe_DocIn.Find(modeldoccome.DocIn_ID);
            if (entity == null)
            {
                db.OS_Exe_DocIn.Add(modeldoccome);
                db.SaveChanges();
            }
            return Json(new
            {
                status = true,
            });
        }

	}
}