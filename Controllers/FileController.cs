using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class FileController : Controller
    {
        private OSOfficeEntities db = new OSOfficeEntities();
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult LoadData(int id)
        {
            var model = db.SO_Exe_ContractFile.Where(c => c.Contract_ID == id);
            return Json(new
            {
                data = model,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveData(SO_Exe_Contract modelcontract, List<SO_Exe_ContractFile> modelcontractfile)
        {
            var entity = db.SO_Exe_Contract.Find(modelcontract.Contract_ID);
            if (entity == null)
            {
                db.SO_Exe_Contract.Add(modelcontract);
                db.SaveChanges();
                if (modelcontractfile != null)
                {
                    foreach (var item in modelcontractfile)
                    {
                        item.Contract_ID = modelcontract.Contract_ID;
                        db.SO_Exe_ContractFile.Add(item);
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