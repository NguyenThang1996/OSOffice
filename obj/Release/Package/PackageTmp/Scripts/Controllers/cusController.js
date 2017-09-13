$(document).ready(function () {
    var grcus;
    var pro;
    var cusController = {
        init: function () {
            cusController.registerEvent();
            cusController.loadData();
        },
        resetform: function () {
            $('#ten').val('');
            $('#tenta').val('');
            $("#nhomkh").val(1);
            $('#diachi').val('');
            $('#dt').val('');
            $('#fax').val('');
            $('#web').val('');
            $('#email').val('');
            $('#mst').val('');
            $('#tknh').val('');
            $('#tennh').val('');
            $('#sohd').val('');
            $('#ghichu').val('');
            $('#dichvu').val('');
            $("#tinh").val(1);
            $('#ngaytao').val();
            $('#tenvt').val('');
            $('input:radio[name="group_cus"][value="1"]').prop('checked', true);
            $('.tenht').val('');
            $('.dtht').val('');
            $('.emailht').val('');
            $('.ghichuht').val('');
        },
        deletedata: function(id)
        {
            var checkbox = $('input[name="check"]:checked').val();
            $.ajax({
                url: '/Customer/DeleteData',
                type: 'POST',
                data:
                {
                    id: checkbox
                },
                dataType: 'json',
                success: function(response)
                {
                    if(response.status == true)
                    {
                        cusController.loadData(true);
                    }
                }
            })
        },        
        savedata: function () {            
            var id = $('#idkh').val();
            var numorder = $('#stt').val();
            var name = $('#ten').val();
            var engname = $('#tenta').val();
            var grcus = $("#nhomkh option:selected").val();
            var address = $('#diachi').val();
            var tel = $('#dt').val();
            var fax = $('#fax').val();
            var web = $('#web').val();
            var email = $('#email').val();
            var mst = $('#mst').val();
            var shortname = $('#tenvt').val();
            var bankid = $('#tknh').val();
            var bankname = $('#tennh').val();
            var ctrid = $('#sohd').val();
            var note = $('#ghichu').val();
            var service = $('#dichvu').val();
            var province = $("#tinh option:selected").val()
            var creadate = $('#ngaytao').val();
            var isflag = $('input[name=group_cus]:checked').val();            
            var modelcus = {
                Customer_ID: id,
                CusName: name,
                EngName: engname,
                ShortName: shortname,
                CusGroup_ID: grcus,
                Address: address,
                Tel: tel,
                Fax: fax,
                Website: web,
                Email: email,
                Taxcode: mst,
                AccountID: bankid,
                BankName: bankname,
                ContactNo: ctrid,
                Note: note,
                Service: service,
                Province_ID: province,
                CreateDate: creadate,
                IsFlag: isflag,
            };
            var modelcussup = [];
            $("#tbl_customer>tbody>tr").each(function () {
                var namesup = $(this).find(".tenht").val();
                var telsup = $(this).find(".dtht").val();
                var emailsup = $(this).find(".emailht").val();
                var notesup = $(this).find(".ghichuht").val();
                modelcussup.push({ContactName: namesup, ContactTel: telsup, ContactEmail: emailsup, ContactNote: notesup });
            });
            $.ajax({
                url: '/Customer/SaveData',
                type: 'POST',
                data:
                {
                    modelcus: modelcus,
                    modelcussup: modelcussup                  
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        cusController.loadData(true);
                    }
                }
            })
        },
        registerEvent: function () {            
            $('#check-all').click(function () {
                var c = this.checked;
                $(':checkbox').prop('checked', c);
            });
            $('#deletecus').off('click').on('click', function () {
                cusController.deletedata();
            });
            $(document).off('click', ".edit-cus").on('click', ".edit-cus", function () {
                $('#myModal').modal('show')
                $("h4.modal-title").text('Sửa thông tin khách hàng');
                var id = $(this).data('id');
                cusController.loadDetail(id);
            });
            $('#btn-addcus').click(function () {
                $('#myModal').modal('show');
                $("h4.modal-title").text('Thêm mới thông tin khách hàng');
                cusController.loadData(true);
                cusController.resetform();
            })
            $('#btn-savekh').off('click').on('click', function () {
                cusController.savedata();
                alert("Lưu thành công thông tin khách hàng")
                $('#myModal').modal('hide');
            })
            $('#btn-searchcus').off('click').on('click', function () {
                cusController.loadData(true);
            })
            $("select#nhomkh1").change(function () {
                grcus = $("#nhomkh1 option:selected").val();
                cusController.loadData(true);
            });
            $("select#tinh1").change(function () {
                pro = $("#tinh1 option:selected").val();
                cusController.loadData(true);
            });
            $("select#show").change(function () {
                pagesize = $("#show option:selected").val();
                cusController.loadData(true);
            });
        },    
        loadData: function (changePageSize) {
            var name = $("#txtsearchcus").val();                        
            $.ajax({
                url: '/Customer/LoadData',
                type: 'GET',
                data:
                {
                    pro: pro,
                    grcus: grcus,
                    name: name,
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        $('#idkh').val(response.max + 1);     
                        setTimeout(function () {
                            var html1 = '';
                            var datatenkh = $('#data-tenkh').html();
                            $.each(data, function (i, item) {
                                html1 += Mustache.render(datatenkh, {
                                    CusName: item.CusName,
                                    Customer_ID: item.Customer_ID
                                })
                            });
                            $('#kh').html(html1);
                        })

                        var html = '';
                        var datakh = $('#data-kh').html();
                        NumberialOrder = 1;
                        $.each(data, function (i, item) {
                            html += Mustache.render(datakh, {
                                NumberialOrder: NumberialOrder++,
                                CusName: item.CusName,
                                Address: item.Address,
                                Tel: item.Tel,
                                Email: item.Email,
                                Customer_ID: item.Customer_ID
                            })
                        });
                        $('#tblbody_cus').html(html);
                                            
                    }
                }
            })
        },
        loadDetail: function (id) {
            $.ajax({
                url: '/Customer/GetDetail',
                type: 'GET',
                data:
                {
                    id: id,
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var obj = response.data;
                        var obj1 = response.data1;
                        if (obj != null) {
                            $('#idkh').val(obj.Customer_ID);
                            $('#ten').val(obj.CusName);
                            $('#diachi').val(obj.Address);
                            $('#dt').val(obj.Tel);
                            $('#tenta').val(obj.EngName);
                            $('#tenvt').val(obj.ShortName);
                            $('#email').val(obj.Email);
                            $('#fax').val(obj.Fax);
                            $('#web').val(obj.Website);
                            $('#mst').val(obj.TaxCode);
                            $('#tknh').val(obj.AccountID);
                            $('#tennh').val(obj.BankName);
                            $('#ghichu').val(obj.Note);
                            $('#sohd').val(obj.ContactNo);
                            $('#dichvu').val(obj.Service);
                            $('#ngaytao').val(obj.CreateDate);
                            $('#nhomkh').val(obj.CusGroup_ID);
                            $('#tinh').val(obj.Province_ID);
                            $('input:radio[name="group_cus"][value="' + obj.IsFlag + '"]').prop('checked', true);
                            var tr = "";
                            var n = 0;
                            if (obj1 != null)
                            {
                                $.each(obj1, function (i, item) {
                                    n++;
                                    tr += "<tr id='addrr0'><td style='text-align: center; vertical-align: middle; color: #000000;'> " + n + " </td><td><input type='text' value=" + item.ContactName + " class='form-control tenht' style='text-align: center; vertical-align: middle; color: #000000;'></td><td><input type='text' value=" + item.ContactTel + " class='form-control dtht' style='text-align: center; vertical-align: middle; color: #000000;'></td><td><input type='text' value=" + item.ContactEmail + " class='form-control emailht' style='text-align: center; vertical-align: middle; color: #000000;'></td><td><textarea style='text-align: center; vertical-align: middle; color: #000000;' class='form-control ghichuht' rows='1'>" + item.ContactNote + " </textarea></td><td style='text-align: center; vertical-align: middle; color: #000000;'><button type='button' class='btn btn-danger glyphicon glyphicon-remove row-remove'></button></td></tr>";
                                })
                                $('#tbl_customer tbody').html(tr);
                            }
                            
                        }                            
                    }

                }
            })
        },
    }
    cusController.init();
});
