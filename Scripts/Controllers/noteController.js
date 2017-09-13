$(document).ready(function () {
    var status;
    var group;
    var noteController = {
        init: function () {
            noteController.registerEvent();
            noteController.loadData();
            noteController.loadDataUnsuccess();
        },
        resetform: function () {
            var d = new Date();

            var month = d.getMonth() + 1;
            var day = d.getDate();

            var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();
            $("#tentb").val('');
            $("#ngaytao").val(output);
            $("#noidung").val('');
            $('#nhomtb').val(1);
            $("#canhanlq").val('');
            $("#trangthai").val(2);
            $("#ngaydukien").val('');
            $("#ykien").val('');
            $("#ghichu").val('');
        },
        deletedata: function (id) {
            var checkbox = $('input[name="check"]:checked').val();
            $.ajax({
                url: '/Notification/DeleteData',
                type: 'POST',
                data:
                {
                    id: checkbox
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        noteController.loadData(true);
                        noteController.loadDataUnsuccess();
                    }
                }
            })
        },
        savedata: function () {
            var id = $("#idtb").val();
            var name = $("#tentb").val();
            var content = $("#noidung").val();
            var groupnote = $('#nhomtb').val();
            var partner = $("#canhanlq").val();
            var statusnote = $("#trangthai").val();
            var opinion = $("#ykien").val();
            var note = $("#ghichu").val();
            var personcreate = $("#nguoitao").val();
            var datecreatee = moment($("#ngaytao").val(), 'DD/MM/YYYY');
            var datecreate = moment(datecreatee).format("YYYY/MM/DD");
            var dateendd = moment($("#ngaydukien").val(), 'DD/MM/YYYY');
            var dateend = moment(dateendd).format("YYYY/MM/DD");
            var modelnote = {
                Notes_ID: id,
                Notes_Title: name,
                Notes_Content: content,
                Notes_Date: dateend,
                Notes_Partner: partner,
                Notes_Opinion: opinion,
                IsOK: statusnote,
                Notes_CreateDate: datecreate,
                Notes_Group: groupnote,
                Notes_Note: note,
                Notes_PersonCreate: personcreate
            };
            var fp = $("#fUpload");
            var lg = fp[0].files.length; // get length
            var items = fp[0].files;
            var modelnotefile = [];
            if (lg > 0) {
                for (var i = 0; i < lg; i++) {
                    var fileName = items[i].name; // get file name
                    var fileSize = items[i].size; // get file size 
                    modelnotefile.push({ NotesFile_Name: fileName, NotesFile_Size: fileSize });
                }
            }
            $.ajax({
                url: '/Notification/SaveData',
                type: 'POST',
                data:
                {
                    modelnote: modelnote,
                    modelnotefile: modelnotefile
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        noteController.loadData();
                        noteController.loadDataUnsuccess();
                    }
                }
            })
        },
        registerEvent: function () {
            $('#check-all').click(function () {
                var c = this.checked;
                $(':checkbox').prop('checked', c);
            });
            $('#deletenote').off('click').on('click', function () {
                noteController.deletedata();
                alert("Xóa thành công thông tin ghi chú / thông báo")
            });
            $(document).off('click', ".edit-note").on('click', ".edit-note", function () {
                $('#myModal10').modal('show')
                $("h4.modal10-title").text('Sửa thông tin ghi chú / thông báo');
                var id = $(this).data('id');
                noteController.loadDetail(id);
            });
            $('#btn-addnote').click(function () {
                $('#myModal10').modal('show');
                $("h4.modal10-title").text('Thêm mới thông tin ghi chú / thông báo');
                noteController.loadData(true);
                noteController.resetform();
            })
            $('#btn-savetb').off('click').on('click', function () {
                noteController.savedata();
                alert("Lưu thành công thông tin ghi chú / thông báo")
                $('#myModal10').modal('hide');
            })
            $('#btn-searchnote').off('click').on('click', function () {
                noteController.loadData(true);
            })
            $("select#trangthai1").change(function () {
                status = $("#trangthai1 option:selected").val();
                noteController.loadData(true);
            });
            $("select#nhomtb1").change(function () {
                group = $("#nhomtb1 option:selected").val();
                noteController.loadData(true);
            });
            $("select#show").change(function () {
                pagesize = $("#show option:selected").val();
                noteController.loadData(true);
            });
        },
        loadDataUnsuccess: function () {
            $.ajax({
                url: '/Notification/GetFiveNotiUnsuccess',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        var count = response.count;
                        var html = '';
                        var datatbcht = $('#data-tbcht').html();
                        $.each(data, function (i, item) {
                            var dateString = item.Notes_CreateDate.substr(6);
                            var currentTime = new Date(parseInt(dateString));
                            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
                            var day = ("0" + currentTime.getDate()).slice(-2);
                            var year = currentTime.getFullYear();
                            var date = day + "/" + month + "/" + year;
                            html += Mustache.render(datatbcht, {
                                Notes_Title: item.Notes_Title,
                                Notes_CreateDate: date,
                                Notes_ID: item.Notes_ID
                            })
                        });
                        $('#tbcht').html(html + "<li><a style='font-weight: bold!important; font-size: 18px!important' href='/Notification/Index'>Xem chi tiết (" + count + ")</a></li>");
                        if (count > 0)
                            $('#sotbcht').html("<span class='notification-counter'>" + count + "</span>");
                        else
                            $('#sotbcht').html('');
                    }
                }
            })
        },
        loadData: function () {
            var name = $("#txtsearchnote").val();
            $.ajax({
                url: '/Notification/LoadData',
                type: 'GET',
                data:
                {
                    group: group,
                    status: status,
                    name: name,
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        $('#idtb').val(response.max + 1);
                        var html = '';
                        var datatb = $('#data-tb').html();
                        NumberialOrder = 1;
                        $.each(data, function (i, item) {
                            var dateString = item.Notes_CreateDate.substr(6);
                            var currentTime = new Date(parseInt(dateString));
                            var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
                            var day = ("0" + currentTime.getDate()).slice(-2);
                            var year = currentTime.getFullYear();
                            var date = day + "/" + month + "/" + year;
                            var status;
                            if (item.IsOK == 1)
                                status = "Đã hoàn thành";
                            else
                                status = "Chưa hoàn thành";
                            html += Mustache.render(datatb, {
                                NumberialOrder: NumberialOrder++,
                                Notes_Title: item.Notes_Title,
                                Notes_Content: item.Notes_Content,
                                Notes_Partner: item.Notes_Partner,
                                Notes_CreateDate: date,
                                Notes_ID: item.Notes_ID,
                                IsOK: status,
                            })
                        });
                        $('#tblbody_note').html(html);

                    }
                }
            })
        },
        loadDetail: function (id) {
            $.ajax({
                url: '/Notification/GetDetail',
                type: 'GET',
                data:
                {
                    id: id,
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var obj = response.data;
                        var dateString = obj.Notes_CreateDate.substr(6);
                        var currentTime = new Date(parseInt(dateString));
                        var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
                        var day = ("0" + currentTime.getDate()).slice(-2);
                        var year = currentTime.getFullYear();
                        var datecreate = day + "/" + month + "/" + year;

                        var dateStringg = obj.Notes_Date.substr(6);
                        var currentTimee = new Date(parseInt(dateStringg));
                        var monthh = ("0" + (currentTimee.getMonth() + 1)).slice(-2);
                        var dayy = ("0" + currentTimee.getDate()).slice(-2);
                        var yearr = currentTimee.getFullYear();
                        var dateend = dayy + "/" + monthh + "/" + yearr;
                        if (obj != null) {
                            $("#tentb").val(obj.Notes_Title);
                            $("#ngaytao").val(datecreate);
                            $("#noidung").val(obj.Notes_Content);
                            $('#nhomtb').val(obj.Notes_Group);
                            $("#canhanlq").val(obj.Notes_Partner);
                            $("#trangthai").val(obj.IsOK);
                            $("#ngaydukien").val(dateend);
                            $("#ykien").val(obj.Notes_Opinion);
                            $("#ghichu").val(obj.Notes_Note);
                            $("#nguoitao").val(obj.Notes_PersonCreate);
                            $("#idtb").val(obj.Notes_ID);
                        }
                    }

                }
            })
        },


    }
    noteController.init();
});
