$(document).ready(function () {
    var filedoccomeController = {
        init: function () {
            filedoccomeController.registerEvent();
            filedoccomeController.loadData();
        },
        savedata: function () {
            var name = $('#trichyeuvbd').val();
            var code = $('#sovbd').val();
            var id = $('#idvbd').val();
            var doctype = $("#lvb option:selected").val();
            var pro = $("#cq option:selected").val();
            var note = $('#ghichuvbd').val();
            var getdate = $("#ngaynhanvbd").val();
            var date = $("#ngaytaovbd").val();

            var fp1 = $("#fUpload1");
            var lg1 = fp1[0].files.length; // get length
            var items1 = fp1[0].files;
            if (lg1 > 0) {
                var fileName1 = items1[0].name; // get file name
                var fileSize1 = items1[0].size; // get file size 
            }

            var modeldoccome = {
                DocIn_ID: id,
                DocName: name,
                DocType_ID: doctype,
                DocCode: code,
                DocDate: date,
                DocGetDate: getdate,
                Provider_ID: pro,
                Note: note,
                FilesName: fileName1,
                FileSize: fileSize1
            };

            $.ajax({
                url: '/FileDocCome/SaveData',
                type: 'POST',
                data:
                {
                    modeldoccome: modeldoccome,
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        filedoccomeController.loadData();
                    }
                }
            })
        },
        resetform: function () {
            $('#tentinh').val('');
        },
        registerEvent: function () {
            $('#btn-savevbdk').off('click').on('click', function () {
                filedoccomeController.savedata();
                alert("Cập nhật thành công thông tin văn bản đính kèm");
            })
            //$('#btn-addctr').off('click').on('click', function () {
            //    filedoccomeController.loadData();
            //});
        },
        loadData: function () {
            var idvbd = $('#idvbd').val();
            $.ajax({
                url: '/FileDocCome/LoadData',
                dataType: 'json',
                type: 'GET',
                data:
                {
                    id: idvbd
                },
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        var html1 = '';
                        var datavbdk = $('#data-vbdk').html();
                        NumberialOrder = 1;
                        $.each(data, function (i, item) {
                            html1 += Mustache.render(datavbdk, {
                                NumberialOrder: NumberialOrder++,
                                FilesName: item.FilesName,
                                FileSize: item.FileSize
                            })
                        });
                        $('#tblbody_vbdk').html(html1);
                    }
                }
            })
        },
    }
    filedoccomeController.init();
});