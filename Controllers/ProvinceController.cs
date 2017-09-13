using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class ProvinceController : Controller
    {
        private OSOfficeEntities db = new OSOfficeEntities();
        // GET: Province
        public ActionResult Index()
        {
            return View();
        }
        public PartialViewResult ModalProvince()
        {
            return PartialView("~/Views/Shared/Modal/modalprovince.cshtml");
        }

        [HttpGet]
        public JsonResult LoadData()
        {
            int? max = 0;
            var model = db.SO_Sys_Province.OrderBy(p => p.ProvinceName).ToList();
            if(model.Count != 0)
            {
                max = db.SO_Sys_Province.Max(p => p.Province_ID);
            }
            return Json(new
            {
                max = max,
                data = model,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveData(SO_Sys_Province model)
        {
            db.SO_Sys_Province.Add(model);
            db.SaveChanges();         
            return Json(new
            {
                status = true,
            });
        }
    }
}