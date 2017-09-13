$(document).ready(function () {
    var attachdoccomeController = {
        init: function () {
            attachdoccomeController.registerEvent();
            attachdoccomeController.loadData();
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

            var fp2 = $("#fUpload2");
            var lg2 = fp2[0].files.length; // get length
            var items2 = fp2[0].files;
            var modeldoccomeattach = [];
            if (lg2 > 0) {
                for (var i2 = 0; i2 < lg2; i2++) {
                    var fileName2 = items2[i2].name; // get file name
                    var fileSize2 = items2[i2].size; // get file size 
                    modeldoccomeattach.push({ FileName: fileName2, FileSize: fileSize2 });
                }
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
            };

            $.ajax({
                url: '/AttachDocCome/SaveData',
                type: 'POST',
                data:
                {
                    modeldoccome: modeldoccome,
                    modeldoccomeattach: modeldoccomeattach
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {                        
                        attachdoccomeController.loadData();
                    }
                }
            })
        },
        resetform: function () {
            $('#tentinh').val('');
        },
        registerEvent: function () {
            $('#btn-savetlkt').off('click').on('click', function () {
                attachdoccomeController.savedata();
                alert("Cập nhật thành công thông tin tài liệu kèm theo");
            })
            //$('#btn-addctr').off('click').on('click', function () {
            //    attachdoccomeController.loadData();
            //});
        },
        loadData: function () {
            var idvbd = $('#idvbd').val();
            $.ajax({
                url: '/AttachDocCome/LoadData',
                dataType: 'json',
                type: 'GET',
                data:
                {
                    id: idvbd
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
    attachdoccomeController.init();
});