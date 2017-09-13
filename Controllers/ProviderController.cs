using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class ProviderController : Controller
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

        public PartialViewResult ModalProvider()
        {
            return PartialView("~/Views/Shared/Modal/modalprovider.cshtml");
        }

        [HttpGet]
        public JsonResult LoadData()
        {
            int? max = 0;
            var model = db.OS_Sys_Provider.OrderBy(p => p.Provider_ID).ToList();
            if (model.Count != 0)
            {
                max = db.OS_Sys_Provider.Max(p => p.Provider_ID);
            }
            return Json(new
            {
                max = max,
                data = model,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveData(OS_Sys_Provider model)
        {
            db.OS_Sys_Provider.Add(model);
            db.SaveChanges();
            return Json(new
            {
                status = true,
            });
        }
	}
}