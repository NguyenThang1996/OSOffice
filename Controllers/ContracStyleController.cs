using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class ContracStyleController : Controller
    {
        private OSOfficeEntities db = new OSOfficeEntities();
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult ModalContracStyle()
        {
            return PartialView("~/Views/Shared/Modal/modalcontracstyle.cshtml");
        }

        [HttpGet]
        public JsonResult LoadData()
        {
            int? max = 0;
            var model = db.SO_Sys_ContracStyle.OrderBy(c => c.ContracStyleName).ToList();
            if(model.Count != 0)
            {
                max = db.SO_Sys_ContracStyle.Max(c => c.ContracStyle_ID);
            }
            return Json(new
            {                max = max,
                data = model,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveData(SO_Sys_ContracStyle model)
        {
            db.SO_Sys_ContracStyle.Add(model);
            db.SaveChanges();
            return Json(new
            {
                status = true,
            });
        }
	}
}