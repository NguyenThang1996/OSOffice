$(document).ready(function () {
    var doctypeController = {
        init: function () {
            doctypeController.registerEvent();
            doctypeController.loadData();
        },
        saveData: function () {
            var id = $('#idlvb').val();
            var name = $('#tenlvb').val();
            $.ajax({
                url: '/DocType/SaveData',
                type: 'POST',
                data:
                {
                    DocType_ID: id,
                    DocType_Name: name
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        alert("Thêm thành công thông tin loại văn bản")
                        $('#myModal8').modal('hide');
                        doctypeController.loadData();
                        //$('#myModal').modal('show');
                    }
                }
            })
        },
        resetform: function () {
            $('#tenlvb').val('');
        },
        registerEvent: function () {
            $('#btn-savelvb').off('click').on('click', function () {
                doctypeController.saveData();
            })
            $('#btn-adddoctype').click(function () {
                $('#myModal8').modal('show');
                $("h4.modal8-title").text('Thêm mới thông tin loại văn bản');
                doctypeController.resetform();
            });
        },
        loadData: function () {
            $.ajax({
                url: '/DocType/LoadData',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        $('#idlvb').val(response.max + 1);
                        var html = '';
                        var datalvb = $('#data-lvb').html();
                        $.each(data, function (i, item) {
                            html += Mustache.render(datalvb, {
                                DocType_ID: item.DocType_ID,
                                DocType_Name: item.DocType_Name
                            })
                        });
                        $('#lvb').html(html);
                    }
                }
            })
        },
    }
    doctypeController.init();
});