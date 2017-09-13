$(document).ready(function () {
    var filedoccomeController = {
        init: function () {
            filedoccomeController.registerEvent();
            filedoccomeController.loadData();
        },
        savedata: function () {
            var name = $('#trichyeuvbdd').val();
            var code = $('#sovbdd').val();
            var id = $('#idvbdd').val();
            var doctype = $("#lvb option:selected").val();
            var pro = $("#cq option:selected").val();
            var note = $('#ghichuvbdd').val();
            var getdate = $("#ngaynhanvbdd").val();
            var date = $("#ngaytaovbdd").val();

            var fp3 = $("#fUpload3");
            var lg3 = fp3[0].files.length; // get length
            var items3 = fp3[0].files;
            if (lg3 > 0) {
                var fileName3 = items3[0].name; // get file name
                var fileSize3 = items3[0].size; // get file size 
            }

            var modeldocgo = {
                DocOut_ID: id,
                DocName: name,
                DocType_ID: doctype,
                DocCode: code,
                DocDate: date,
                DocGetDate: getdate,
                Provider_ID: pro,
                Note: note,
                FilesName: fileName3,
                FileSize: fileSize3
            };

            $.ajax({
                url: '/FileDocGo/SaveData',
                type: 'POST',
                data:
                {
                    modeldocgo: modeldocgo,
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
            var idvbd = $('#idvbdd').val();
            $.ajax({
                url: '/FileDocGo/LoadData',
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