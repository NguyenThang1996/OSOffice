$(document).ready(function () {
    var contracstyleController = {
        init: function () {
            contracstyleController.registerEvent();
            contracstyleController.loadData();
        },
        saveData: function () {
            var id = $('#idnhomhd').val();
            var name = $('#tennhomhd').val();
            $.ajax({
                url: '/ContracStyle/SaveData',
                type: 'POST',
                data:
                {
                    ContracStyle_ID: id,
                    ContracStyleName: name
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        contracstyleController.loadData();
                    }
                }
            })
        },
        resetform: function () {
            $('#tennhomhd').val('');
        },
        registerEvent: function () {
            $('#btn-savenhomhd').off('click').on('click', function () {
                contracstyleController.saveData();
                alert("Lưu thành công thông tin nhóm hợp đồng")
                $('#myModal3').modal('hide');
            })
            $('#btn-addctrstl').click(function () {
                $('#myModal3').modal('show');
                $("h4.modal3-title").text('Thêm mới thông tin nhóm hợp đồng');
                contracstyleController.resetform();
            });
        },
        loadData: function () {
            $.ajax({
                url: '/ContracStyle/LoadData',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        $('#idnhomhd').val(response.max + 1);
                        var html1 = '<option value="0">Nhóm</option>';
                        var datanhomhd1 = $('#data-nhomhd1').html();
                        $.each(data, function (i, item) {
                            html1 += Mustache.render(datanhomhd1, {
                                ContracStyle_ID: item.ContracStyle_ID,
                                ContracStyleName: item.ContracStyleName
                            })
                        });
                        $('#nhomhd1').html(html1);
                        var html = '';
                        var datanhomhd = $('#data-nhomhd').html();
                        $.each(data, function (i, item) {
                            html += Mustache.render(datanhomhd, {
                                ContracStyle_ID: item.ContracStyle_ID,
                                ContracStyleName: item.ContracStyleName
                            })
                        });
                        $('#nhomhd').html(html);
                    }
                }
            })
        },
    }
    contracstyleController.init();
});