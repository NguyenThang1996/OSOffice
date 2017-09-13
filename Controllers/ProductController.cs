using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class ProductController : Controller
    {
        private OSOfficeEntities db = new OSOfficeEntities();
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult ModalProduct()
        {
            return PartialView("~/Views/Shared/Modal/modalproduct.cshtml");
        }

        [HttpGet]
        public JsonResult LoadData()
        {
            int? max = 0;
            var model = db.SO_Sys_Product.OrderBy(c => c.ProductName).ToList();
            if (model.Count != 0)
            {
                max = db.SO_Sys_Product.Max(c => c.Product_ID);
            }
            return Json(new
            {
                max = max,
                data = model,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveData(SO_Sys_Product model)
        {
            db.SO_Sys_Product.Add(model);
            db.SaveChanges();
            return Json(new
            {
                status = true,
            });
        }
	}
}