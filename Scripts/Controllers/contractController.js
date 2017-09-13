$(document).ready(function () {
    var product;
    var isflag;
    var grctr;
    var statuspay;
    var contractController = {
        init: function () {
            contractController.registerEvent();
            contractController.loadData();
        },
        resetform: function () {
            var d = new Date();

            var month = d.getMonth() + 1;
            var day = d.getDate();

            var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
            $("#ngaytao").val(output);
            $('#sohd').val('');
            $("#kh").val(1);
            $("#loaihd").val(1);
            $('#ngayky').val('');
            $("#nhomhd").val(1);
            $('#noidung').val('');
            $('#gthd').val('');
            $('#bangchu').val('');
            $('#doanhthu').val('');
            $('#thuevat').val('');
            $("#sanpham").val(1);
            $("#hinhthuctt").val(1);
            $('#kybenA').val('');
            $('#kybenB').val('');
            $("#trangthaith").val(1);
            $("#xuathd").val(1);
            $("#trangthaiqt").val(1);
            $('#thoihanhd').val('')
            $('input:radio[name="isflag"][value="1"]').prop('checked', true);
            $('#tinhtranghd').val('');
            $('.lan').val('');
            $('.giatri').val('');
            $('.ngaythanhtoan').val('');
            $('#tbl_access tbody').html("");
        },
        deletedata: function (id) {
            var checkbox = $('input[name="check"]:checked').val();
            $.ajax({
                url: '/Contract/DeleteData',
                type: 'POST',
                data:
                {
                    id: checkbox
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        contractController.loadData(true);
                    }
                }
            })
        },
        savedata: function () {
            var id = $('#idhd').val();
            var nocode = $('#sohd').val();
            var customer = $("#kh option:selected").val();
            var subjects = $("#loaihd option:selected").val();            
            var contracstyle = $("#nhomhd option:selected").val();
            var contents = $('#noidung').val();
            var isvalue = $('#gthd').val();
            var moneytext = $('#bangchu').val();
            var isincome = $('#doanhthu').val();
            var isvat = $('#thuevat').val();
            var product = $("#sanpham option:selected").val();
            var ispaytype = $("#hinhthuctt option:selected").val();
            var signnameA = $('#kybenA').val();
            var signnameB = $('#kybenB').val();
            var isstatus = $("#trangthaith option:selected").val();
            var isinvoice = $("#xuathd option:selected").val();
            var ispayment = $("#trangthaiqt option:selected").val();
            var outofdate = $('#thoihanhd').val()
            var isflag = $('input[name=isflag]:checked').val();          
            var des = $('#tinhtranghd').val();
            var datecreatee = moment($("#ngaytao").val(), 'DD/MM/YYYY');
            var datecreate = moment(datecreatee).format("YYYY/MM/DD");
            var signdatee = moment($("#ngayky").val(), 'DD/MM/YYYY');
            var signdate = moment(signdatee).format("YYYY/MM/DD");
            $("#ulList").empty();
            var fp = $("#fUpload");
            var lg = fp[0].files.length; // get length
            var items = fp[0].files;
            var modelcontractfile = [];
            if (lg > 0) {
                for (var i = 0; i < lg; i++) {
                    var fileName = items[i].name; // get file name
                    var fileSize = items[i].size; // get file size 
                    modelcontractfile.push({ FileName: fileName, FileSize: fileSize });
                }
            }
            var modelcontract = {
                Contract_ID: id,
                NoCode: nocode,
                SignDate: signdate,
                Subjects: subjects,
                IsFlag: isflag,
                ContracStyle_ID: contracstyle,
                Customer_ID: customer,
                Product_ID: product,
                Contents: contents,
                IsValue: isvalue,
                MoneyText: moneytext,
                IsInCome: isincome,
                IsVAT: isvat,
                IsPayType: ispaytype,
                SignNameA: signnameA,
                SignNameB: signnameB,
                IsStatus: isstatus,
                IsInvoice: isinvoice,
                IsPayment: ispayment,
                OutOfDate: outofdate,
                Des: des,
                CreateDate: datecreate
            };
            var modelcontractaccess = [];
            $("#tbl_access>tbody>tr").each(function () {
                var id = $(this).find(".idtdtt").val();
                var round = $(this).find(".lan").val();
                var value = $(this).find(".giatri").val();
                var paydate = $(this).find(".ngaythanhtoan").val();
                modelcontractaccess.push({Payment_ID:id, Payment_Time: round, Payment_Values: value, Payment_Date: paydate });
            });
            $.ajax({
                url: '/Contract/SaveData',
                type: 'POST',
                data:
                {
                    modelcontract: modelcontract,
                    modelcontractfile: modelcontractfile,
                    modelcontractaccess: modelcontractaccess
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        contractController.loadData(true);
                    }
                }
            })
        },
        
        registerEvent: function () {
            $('#check-all').click(function () {
                var c = this.checked;
                $(':checkbox').prop('checked', c);
            });
            $('#deletectr').off('click').on('click', function () {
                contractController.deletedata();
                alert("Xóa thành công thông tin hợp đồng")
            });
            $(document).off('click', ".edit-ctr").on('click', ".edit-ctr", function () {
                $('#myModal2').modal('show')
                $("h4.modal2-title").text('Sửa thông tin hợp đồng');
                var id = $(this).data('id');
                contractController.loadDataFile(id);
                contractController.loadDetail(id);
            });
            $('#btn-addctr').click(function () {
                $('#myModal2').modal('show');
                $("h4.modal2-title").text('Thêm mới thông tin hợp đồng');
                contractController.loadData(true);
                contractController.resetform();
            })
            $('#btn-savectr').off('click').on('click', function () {                
                contractController.savedata();
                alert("Lưu thành công thông tin hợp đồng")
                $('#myModal2').modal('hide');
            })
            $('#btn-searchctr').off('click').on('click', function () {
                contractController.loadData(true);
            })
            $("select#sanpham1").change(function () {
                product = $("#sanpham1 option:selected").val();
                contractController.loadData(true);
            });
            $("select#phanloai").change(function () {
                isflag = $("#phanloai option:selected").val();
                contractController.loadData(true);
            });
            $("select#nhomhd1").change(function () {
                grctr = $("#nhomhd1 option:selected").val();
                contractController.loadData(true);
            });
            $("select#ttqt1").change(function () {
                statuspay = $("#ttqt1 option:selected").val();
                contractController.loadData(true);
            });
            $("select#show").change(function () {
                pagesize = $("#show option:selected").val();
                contractController.loadData(true);
            });
        },
        loadData: function (changePageSize) {
            var name = $("#txtsearchctr").val();
            $.ajax({
                url: '/Contract/LoadData',
                type: 'GET',
                data:
                {
                    product: product,
                    name: name,
                    isflag: isflag,
                    statuspay: statuspay,
                    grctr: grctr,
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        $('#idhd').val(response.max + 1);
                        var html = '';
                        var datahd = $('#data-hd').html();
                        NumberialOrder = 1;
                        $.each(data, function (i, item) {
                            var ispayment;
                            var isflag;
                            if (item.IsPayment == 1)
                                ispayment = "Chưa thanh toán";
                            else if (item.IsPayment == 2)
                                ispayment = "Đã tạm ứng";
                            else
                                ispayment = "Đã thanh toán xong";
                            if (item.IsFlag == 1)
                                isflag = "Hợp đồng thu";
                            else
                                isflag = "Hợp đồng chi";
                            var dateStringg = item.SignDate.substr(6);
                            var currentTimee = new Date(parseInt(dateStringg));
                            var monthh = ("0" + (currentTimee.getMonth() + 1)).slice(-2);
                            var dayy = ("0" + currentTimee.getDate()).slice(-2);
                            var yearr = currentTimee.getFullYear();
                            var signdate = dayy + "/" + monthh + "/" + yearr;
                            html += Mustache.render(datahd, {
                                NumberialOrder: NumberialOrder++,
                                NoCode: item.NoCode,
                                SignDate: signdate,
                                CusName: item.CusName,
                                IsFlag: isflag,
                                ContracStyleName: item.ContracStyleName,
                                IsPayment: ispayment,
                                Contract_ID: item.Contract_ID
                            })
                        });
                        $('#tblbody_contract').html(html);
                    }
                }
            })
        },
        loadDataFile: function (id) {
            $.ajax({
                url: '/File/LoadData',
                dataType: 'json',
                type: 'GET',
                data:
                {
                    id: id
                },
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        var html = '';
                        var datafile = $('#data-file').html();
                        NumberialOrder = 1;
                        $.each(data, function (i, item) {
                            html += Mustache.render(datafile, {
                                NumberialOrder: NumberialOrder++,
                                FileName: item.FileName,
                                FileSize: item.FileSize
                            })
                        });
                        $('#tblbody_file').html(html);
                    }
                }
            })
        },
        loadDetail: function (id) {
            $.ajax({
                url: '/Contract/GetDetail',
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
                        var dateString = obj.CreateDate.substr(6);
                        var currentTime = new Date(parseInt(dateString));
                        var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
                        var day = ("0" + currentTime.getDate()).slice(-2);
                        var year = currentTime.getFullYear();
                        var datecreate = day + "/" + month + "/" + year;

                        var dateStringg = obj.SignDate.substr(6);
                        var currentTimee = new Date(parseInt(dateStringg));
                        var monthh = ("0" + (currentTimee.getMonth() + 1)).slice(-2);
                        var dayy = ("0" + currentTimee.getDate()).slice(-2);
                        var yearr = currentTimee.getFullYear();
                        var signdate = dayy + "/" + monthh + "/" + yearr;

                        if (obj != null) {
                            $('#idhd').val(obj.Contract_ID);
                            $('#sohd').val(obj.NoCode);
                            $('#kh').val(obj.Customer_ID);
                            $('#loaihd').val(obj.Subjects);
                            $('#ngayky').val(signdate);
                            $('#nhomhd').val(obj.ContracStyle_ID);
                            $('#noidung').val(obj.Contents);
                            $('#gthd').val(obj.IsValue);
                            $('#bangchu').val(obj.MoneyText);
                            $('#doanhthu').val(obj.IsInCome);
                            $('#thuevat').val(obj.IsVAT);
                            $('#sanpham').val(obj.Product_ID);
                            $('#hinhthuctt').val(obj.IsPayType);
                            $('#kybenA').val(obj.SignNameA);
                            $('#kybenB').val(obj.SignNameB);
                            $('#trangthaith').val(obj.IsStatus);
                            $('#xuathd').val(obj.IsInvoice);
                            $('#trangthaiqt').val(obj.IsPayment);
                            $('#tinhtranghd').val(obj.Des);
                            $('#thoihanhd').val(obj.OutOfDate);
                            $('#ngaytao').val(datecreate);
                            $('input:radio[name="isflag"][value="' + obj.IsFlag + '"]').prop('checked', true);
                            var tr = "";
                            var n = 0;
                            if (obj1 != null) {
                                $.each(obj1, function (i, item) {
                                    n++;
                                    tr += "<tr><td class='hidden'><input type='text' value=" + item.Payment_ID + " class='form-control idtdtt' style='text-align: center; vertical-align: middle; color: #000000;'></td><td style='text-align: center; vertical-align: middle; color: #000000;'> " + n + " </td><td><input type='text' value=" + item.Payment_Time + " class='form-control lan' style='text-align: center; vertical-align: middle; color: #000000;'></td><td><input type='text' value=" + item.Payment_Values + " class='form-control giatri' style='text-align: center; vertical-align: middle; color: #000000;'></td><td><input type='text' value=" + item.Payment_Date + " class='form-control emailht' style='text-align: center; vertical-align: middle; color: #000000;'></td><td style='text-align: center; vertical-align: middle; color: #000000;'><button type='button' class='btn btn-danger glyphicon glyphicon-remove row-remove'></button></td></tr>";
                                })
                                $('#tbl_access tbody').html(tr);
                            }
                        }
                    }

                }
            })
        }
    }
    contractController.init();
});
