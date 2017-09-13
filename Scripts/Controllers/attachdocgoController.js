$(document).ready(function () {
    var attachdocgoController = {
        init: function () {
            attachdocgoController.registerEvent();
            attachdocgoController.loadData();
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

            var fp4 = $("#fUpload4");
            var lg4 = fp4[0].files.length; // get length
            var items4 = fp4[0].files;
            var modeldocgoattach = [];
            if (lg4 > 0) {
                for (var i4 = 0; i4 < lg4; i4++) {
                    var fileName4 = items4[i4].name; // get file name
                    var fileSize4 = items4[i4].size; // get file size 
                    modeldocgoattach.push({ FileName: fileName4, FileSize: fileSize4 });
                }
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
            };

            $.ajax({
                url: '/AttachDocGo/SaveData',
                type: 'POST',
                data:
                {
                    modeldocgo: modeldocgo,
                    modeldocgoattach: modeldocgoattach
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        attachdocgoController.loadData();
                    }
                }
            })
        },
        resetform: function () {
            $('#tentinh').val('');
        },
        registerEvent: function () {
            $('#btn-savetlkt').off('click').on('click', function () {
                attachdocgoController.savedata();
                alert("Cập nhật thành công thông tin tài liệu kèm theo");
            })
            //$('#btn-addctr').off('click').on('click', function () {
            //    attachdocgoController.loadData();
            //});
        },
        loadData: function () {
            var idvbdd = $('#idvbdd').val();
            $.ajax({
                url: '/AttachDocGo/LoadData',
                dataType: 'json',
                type: 'GET',
                data:
                {
                    id: idvbdd
                },
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        var html = '';
                        var datatlkt = $('#data-tlkt').html();
                        NumberialOrder = 1;
                        $.each(data, function (i, item) {
                            html += Mustache.render(datatlkt, {
                                NumberialOrder: NumberialOrder++,
                                FileName: item.FileName,
                                FileSize: item.FileSize
                            })
                        });
                        $('#tblbody_tlkt').html(html);
                    }
                }
            })
        },
    }
    attachdocgoController.init();
});