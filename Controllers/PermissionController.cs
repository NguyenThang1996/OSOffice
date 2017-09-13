using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using OSOffice.Models;

namespace OSOffice.Controllers
{
    public class PermissionController : Controller
    {
        private OSOfficeEntities db = new OSOfficeEntities();
        public ActionResult Index()
        {
            if (Session["Username"] != null)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        [HttpPost]
        public ActionResult Index(SO_Exe_Permission model)
        {
            if(model.Username != null && model.Password != null)
            {
                var usercheck = db.SO_Exe_Permission.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);
                if (usercheck != null)
                {
                    Session["User_ID"] = usercheck.Account_ID;
                    Session["AccountName"] = usercheck.AccountName;
                    Session["Username"] = usercheck.Username;
                    Session["Password"] = usercheck.Password;
                    Session["Permission"] = usercheck.Permission;
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ViewBag.errorlogin = "Sai tên tài khoản hoặc mật khẩu, vui lòng kiểm tra lại !";
                }
            }

            return View();
         
        }

        public ActionResult CheckLogout()
        {
            Session["User_ID"] = null;
            Session["Username"] = null;
            Session["Password"] = null;
            return RedirectToAction("Index", "Permission");
        }
    }
}