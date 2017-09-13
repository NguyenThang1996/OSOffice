$(document).ready(function () {
    var provider;
    var doccomeController = {
        init: function () {
            doccomeController.registerEvent();
            doccomeController.loadData();
        },
        resetform: function () {
            var d = new Date();

            var month = d.getMonth() + 1;
            var day = d.getDate();

            var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
            $("#ngaytaovbd").val(output);
            $('#trichyeuvbd').val('');
            $('#lvb').val(1);
            $("#sovbd").val('');
            $('#ngaynhanvbd').val(output);
            $('#cq').val(1);
            $('#ghichuvbd').val('');
        },
        deletedata: function (id) {
            var checkbox = $('input[name="check"]:checked').val();
            $.ajax({
                url: '/DocCome/DeleteData',
                type: 'POST',
                data:
                {
                    id: checkbox
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        doccomeController.loadData(true);
                    }
                }
            })
        },
        savedata: function () {
            var name = $('#trichyeuvbd').val();
            var code = $('#sovbd').val();
            var id = $('#idvbd').val();
            var doctype = $("#lvb option:selected").val();
            var pro = $("#cq option:selected").val();
            var note = $('#ghichuvbd').val();
            var getdatee = moment($("#ngaynhanvbd").val(),'DD/MM/YYYY');
            var getdate = moment(getdatee).format("YYYY/MM/DD");
            var datee= moment($("#ngaytaovbd").val(),'DD/MM/YYYY');
            var date = moment(datee).format("YYYY/MM/DD");
            console.log(date, getdate);
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
            $.ajax({
                url: '/DocCome/SaveData',
                type: 'POST',
                data:
                {
                    modeldoccome: modeldoccome,
                    modeldoccomeattach: modeldoccomeattach
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        doccomeController.loadData(true);
                    }
                }
            })
        },
        loadDataFile: function (id) {
            $.ajax({
                url: '/FileDocCome/LoadData',
                dataType: 'json',
                type: 'GET',
                data:
                {
                    id: id
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
        registerEvent: function () {
            $('#check-all').click(function () {
                var c = this.checked;
                $(':checkbox').prop('checked', c);
            });
            $('#deletedoccome').off('click').on('click', function () {
                doccomeController.deletedata();
                alert("Xóa thành công thông tin văn bản đến")
            });
            $(document).off('click', ".edit-doccome").on('click', ".edit-doccome", function () {
                $('#myModal6').modal('show')
                $("h4.modal6-title").text('Sửa thông tin văn bản đến');
                var id = $(this).data('id');
                doccomeController.loadDetail(id);
                doccomeController.loadDataFile(id);
            });
            $('#btn-adddoccome').click(function () {
                $('#myModal6').modal('show');
                $("h4.modal6-title").text('Thêm mới thông tin văn bản đến');
                doccomeController.loadData(true);
                doccomeController.resetform();
            })
            $('#btn-savevbd').off('click').on('click', function () {
                doccomeController.savedata();
                alert("Lưu thành công thông tin văn bản đến");
                $('#myModal6').modal('hide');
            })
            $('#btn-searchdoccome').off('click').on('click', function () {
                doccomeController.loadData(true);
            })
            $("select#cq1").change(function () {
                provider = $("#cq1 option:selected").val();
                doccomeController.loadData(true);
            });
        },
        loadData: function (changePageSize) {
            var name = $("#txtsearchdoccome").val();
            $.ajax({
                url: '/DocCome/LoadData',
                type: 'GET',
                data:
                {
                    name: name,
                    provider: provider
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        $('#idvbd').val(response.max + 1);
                        var html = '';
                        var datavbd = $('#data-vbd').html();
                        NumberialOrder = 1;
                        $.each(data, function (i, item) {
                            var dateStringg = item.DocGetDate.substr(6);
                            var currentTimee = new Date(parseInt(dateStringg));
                            var monthh = ("0" + (currentTimee.getMonth() + 1)).slice(-2);
                            var dayy = ("0" + currentTimee.getDate()).slice(-2);
                            var yearr = currentTimee.getFullYear();
                            var getdate = dayy + "/" + monthh + "/" + yearr;
                            html += Mustache.render(datavbd, {
                                NumberialOrder: NumberialOrder++,
                                DocName: item.DocName,
                                DocCode: item.DocCode,
                                DocGetDate: getdate,
                                Provider_ID: item.Provider_Name,
                                DocIn_ID: item.DocIn_ID
                            })
                        });
                        $('#tblbody_doccome').html(html);                        
                    }
                }
            })
        },

        loadDetail: function (id) {
            $.ajax({
                url: '/DocCome/GetDetail',
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
                        var dateString = obj.DocDate.substr(6);
                        var currentTime = new Date(parseInt(dateString));
                        var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
                        var day = ("0" + currentTime.getDate()).slice(-2);
                        var year = currentTime.getFullYear();
                        var date = day + "/" + month + "/" + year;

                        var dateStringg = obj.DocGetDate.substr(6);
                        var currentTimee = new Date(parseInt(dateStringg));
                        var monthh = ("0" + (currentTimee.getMonth() + 1)).slice(-2);
                        var dayy = ("0" + currentTimee.getDate()).slice(-2);
                        var yearr = currentTimee.getFullYear();
                        var getdate = dayy + "/" + monthh + "/" + yearr;
                        if (obj != null) {
                            $('#trichyeuvbd').val(obj.DocName);
                            $('#lvb').val(obj.DocType_ID);
                            $("#sovbd").val(obj.DocCode);
                            $('#ngaynhanvbd').val(getdate);
                            $('#cq').val(obj.Provider_ID);
                            $('#ghichuvbd').val(obj.Note);
                            $('#ngaytaovbd').val(date);
                            $('#idvbd').val(obj.DocIn_ID);
                        }
                        if(obj1 != null)
                        {
                            var html1 = '';
                            var datatlkt = $('#data-tlkt').html();
                            NumberialOrder = 1;
                            $.each(obj1, function (i, item) {
                                html1 += Mustache.render(datatlkt, {
                                    NumberialOrder: NumberialOrder++,
                                    FileName: item.FileName,
                                    FileSize: item.FileSize
                                })
                            });
                            $('#tblbody_tlkt').html(html1);
                        }
                    }

                }
            })
        },
    }
    doccomeController.init();
});
