$(document).ready(function () {
    var provinceController = {
        init: function () {
            provinceController.registerEvent();
            provinceController.loadData();
        },
        saveData: function () {
            var id = $('#idtinh').val();
            var name = $('#tentinh').val();
            $.ajax({
                url: '/Province/SaveData',
                type: 'POST',
                data:
                {
                    Province_ID: id,
                    ProvinceName: name
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        alert("Thêm thành công thông tin tỉnh / thành phố")
                        $('#myModal1').modal('hide');
                        provinceController.loadData();
                        //$('#myModal').modal('show');
                    }
                }
            })
        },
        resetform: function () {
            $('#tentinh').val('');            
        },
        registerEvent: function () {
            $('#btn-savetinh').off('click').on('click', function () {
                provinceController.saveData();                
            })
            $('#btn-addpro').click(function () {
                $('#myModal1').modal('show');
                $("h4.modal1-title").text('Thêm mới thông tin tỉnh / thành phố');
                provinceController.resetform();
            });
        },
        loadData: function () {            
            $.ajax({
                url: '/Province/LoadData',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        var html = '';
                        var datatinh = $('#data-tinh').html();
                        $.each(data, function (i, item) {
                            html += Mustache.render(datatinh, {
                                ProvinceName: item.ProvinceName,
                                Province_ID: item.Province_ID
                            })
                        });
                        var html1 = '<option value="0">Tỉnh</option>';
                        var datatinh1 = $('#data-tinh1').html();
                        $.each(data, function (i, item) {
                            html1 += Mustache.render(datatinh1, {
                                ProvinceName: item.ProvinceName,
                                Province_ID: item.Province_ID
                            })
                        });
                        $('#idtinh').val(response.max + 1);
                        $('#tinh').html(html);
                        $('#tinh1').html(html1);
                    }
                }
            })
        },
    }
    provinceController.init();
});