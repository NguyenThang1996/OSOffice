$(document).ready(function () {
    var provider;
    var docgoController = {
        init: function () {
            docgoController.registerEvent();
            docgoController.loadData();
        },
        resetform: function () {
            var d = new Date();

            var month = d.getMonth() + 1;
            var day = d.getDate();

            var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
            $("#ngaytaovbdd").val(output);
            $('#trichyeuvbdd').val('');
            $('#lvb').val(1);
            $("#sovbdd").val('');
            $('#ngaynhanvbdd').val(output);
            $('#cq').val(1);
            $('#ghichuvbdd').val('');
        },
        deletedata: function (id) {
            var checkbox = $('input[name="check"]:checked').val();
            $.ajax({
                url: '/DocGo/DeleteData',
                type: 'POST',
                data:
                {
                    id: checkbox
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        docgoController.loadData(true);
                    }
                }
            })
        },
        loadDataFile: function (id) {
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
        savedata: function () {
            var name = $('#trichyeuvbdd').val();
            var code = $('#sovbdd').val();
            var id = $('#idvbdd').val();
            var doctype = $("#lvb option:selected").val();
            var pro = $("#cq option:selected").val();
            var note = $('#ghichuvbdd').val();
            var getdate = $("#ngaynhanvbdd").val();
            var date = $("#ngaytaovbdd").val();
            var getdatee = moment($("#ngaynhanvbdd").val(), 'DD/MM/YYYY');
            var getdate = moment(getdatee).format("YYYY/MM/DD");
            var datee = moment($("#ngaytaovbdd").val(), 'DD/MM/YYYY');
            var date = moment(date).format("YYYY/MM/DD");
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
            $.ajax({
                url: '/DocGo/SaveData',
                type: 'POST',
                data:
                {
                    modeldocgo: modeldocgo,
                    modeldocgoattach: modeldocgoattach
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        docgoController.loadData(true);
                    }
                }
            })
        },
        registerEvent: function () {
            $('#check-all').click(function () {
                var c = this.checked;
                $(':checkbox').prop('checked', c);
            });
            $('#deletedocgo').off('click').on('click', function () {
                docgoController.deletedata();
            });
            $(document).off('click', ".edit-docgo").on('click', ".edit-docgo", function () {
                $('#myModal10').modal('show')
                $("h4.modal10-title").text('Sửa thông tin văn bản đi');
                var id = $(this).data('id');
                docgoController.loadDetail(id);
                docgoController.loadDataFile(id);
            });
            $('#btn-adddocgo').click(function () {
                $('#myModal10').modal('show');
                $("h4.modal10-title").text('Thêm mới thông tin văn bản đi');
                docgoController.loadData(true);
                docgoController.resetform();
            })
            $('#btn-savevbdd').off('click').on('click', function () {
                docgoController.savedata();
                alert("Lưu thành công thông tin văn bản đi");
                $('#myModal10').modal('hide');
            })
            $('#btn-searchdocgo').off('click').on('click', function () {
                docgoController.loadData(true);
            })
            $("select#cq1").change(function () {
                provider = $("#cq1 option:selected").val();
                docgoController.loadData(true);
            });
        },
        loadData: function (changePageSize) {
            var name = $("#txtsearchdocgo").val();
            $.ajax({
                url: '/DocGo/LoadData',
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
                        $('#idvbdd').val(response.max + 1);
                        var html = '';
                        var datavbdd = $('#data-vbdd').html();
                        NumberialOrder = 1;
                        $.each(data, function (i, item) {
                            var dateStringg = item.DocGetDate.substr(6);
                            var currentTimee = new Date(parseInt(dateStringg));
                            var monthh = ("0" + (currentTimee.getMonth() + 1)).slice(-2);
                            var dayy = ("0" + currentTimee.getDate()).slice(-2);
                            var yearr = currentTimee.getFullYear();
                            var getdate = dayy + "/" + monthh + "/" + yearr;
                            html += Mustache.render(datavbdd, {
                                NumberialOrder: NumberialOrder++,
                                DocName: item.DocName,
                                DocCode: item.DocCode,
                                DocGetDate: getdate,
                                Provider_ID: item.Provider_Name,
                                DocOut_ID: item.DocOut_ID
                            })
                        });
                        $('#tblbody_docgo').html(html);
                    }
                }
            })
        },

        loadDetail: function (id) {
            $.ajax({
                url: '/DocGo/GetDetail',
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
                            $('#trichyeuvbdd').val(obj.DocName);
                            $('#lvb').val(obj.DocType_ID);
                            $("#sovbdd").val(obj.DocCode);
                            $('#ngaynhanvbdd').val(getdate);
                            $('#cq').val(obj.Provider_ID);
                            $('#ghichuvbdd').val(obj.Note);
                            $('#ngaytaovbdd').val(date);
                            $('#idvbdd').val(obj.DocOut_ID);                            
                        }
                        if (obj1 != null) {
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
    docgoController.init();
});
