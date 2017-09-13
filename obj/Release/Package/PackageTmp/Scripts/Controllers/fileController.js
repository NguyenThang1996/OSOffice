$(document).ready(function () {
    var fileController = {
        init: function () {
            fileController.registerEvent();
            fileController.loadData();
        },
        savedata: function () {
            var id = $('#idhd').val();
            var nocode = $('#sohd').val();
            var customer = $("#kh option:selected").val();
            var subjects = $("#loaihd option:selected").val();
            var signdate = $('#ngayky').val();
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
                Des: des
            };

            $.ajax({
                url: '/File/SaveData',
                type: 'POST',
                data:
                {
                    modelcontract: modelcontract,
                    modelcontractfile: modelcontractfile
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        alert("Cập nhật thành công thông tin tệp đính kèm")
                        fileController.loadData();
                    }
                }
            })
        },
        resetform: function () {
            $('#tentinh').val('');
        },
        registerEvent: function () {
            $('#btn-savefile').off('click').on('click', function () {
                fileController.savedata();
            })
            //$('#btn-addctr').off('click').on('click', function () {
            //    fileController.loadData();
            //});
        },
        loadData: function () {
            var idhd = $('#idhd').val();
            $.ajax({
                url: '/File/LoadData',
                dataType: 'json',
                type: 'GET',
                data:
                {
                    id: idhd
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
    }
    fileController.init();
});