using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class AttachDocComeController : Controller
    {
        private OSOfficeEntities db = new OSOfficeEntities();
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult LoadData(int id)
        {
            var model = db.OS_Exe_DocInAttach.Where(c => c.DocIn_ID == id);
            return Json(new
            {
                data = model,
                status = true
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveData(OS_Exe_DocIn modeldoccome, List<OS_Exe_DocInAttach> modeldoccomeattach)
        {
            var entity = db.OS_Exe_DocIn.Find(modeldoccome.DocIn_ID);
            if (entity == null)
            {
                db.OS_Exe_DocIn.Add(modeldoccome);
                db.SaveChanges();
                if (modeldoccomeattach != null)
                {
                    foreach (var item in modeldoccomeattach)
                    {
                        item.DocIn_ID = modeldoccome.DocIn_ID;
                        db.OS_Exe_DocInAttach.Add(item);
                        db.SaveChanges();
                    }
                }
            }
            else
            {
                if (modeldoccomeattach != null)
                {
                    foreach (var item in modeldoccomeattach)
                    {
                        item.DocIn_ID = modeldoccome.DocIn_ID;
                        db.OS_Exe_DocInAttach.Add(item);
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