using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class DocTypeController : Controller
    {
        private OSOfficeEntities db = new OSOfficeEntities();
        public ActionResult Index()
        {
            return View();
        }
        public PartialViewResult ModalDocType()
        {
            return PartialView("~/Views/Shared/Modal/modaldoctype.cshtml");
        }

        [HttpGet]
        public JsonResult LoadData()
        {
            int? max = 0;
            var model = db.OS_Sys_DocType.OrderBy(p => p.DocType_ID).ToList();
            if (model.Count != 0)
            {
                max = db.OS_Sys_DocType.Max(p => p.DocType_ID);
            }
            return Json(new
            {
                max = max,
                data = model,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveData(OS_Sys_DocType model)
        {
            db.OS_Sys_DocType.Add(model);
            db.SaveChanges();
            return Json(new
            {
                status = true,
            });
        }
	}
}