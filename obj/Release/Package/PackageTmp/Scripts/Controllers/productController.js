$(document).ready(function () {
    var productController = {
        init: function () {
            productController.registerEvent();
            productController.loadData();
        },
        saveData: function () {
            var id = $('#idsp').val();
            var name = $('#tensp').val();
            $.ajax({
                url: '/Product/SaveData',
                type: 'POST',
                data:
                {
                    Product_ID: id,
                    ProductName: name
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        alert("Lưu thành công thông tin sản phẩm")
                        $('#myModal5').modal('hide');
                        productController.loadData();
                    }
                }
            })
        },
        resetform: function () {
            $('#tensp').val('');
        },
        registerEvent: function () {
            $('#btn-savesp').off('click').on('click', function () {
                $("h4.modal5-title").text('Thêm mới thông tin sản phẩm');
                productController.saveData();
            })
            $('#btn-addprd').click(function () {
                $('#myModal5').modal('show');
                productController.resetform();
            });
        },
        loadData: function () {
            $.ajax({
                url: '/Product/LoadData',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        $('#idsp').val(response.max + 1);
                        var html1 = '<option value="0">Sản phẩm</option>';
                        var datasp1 = $('#data-sp1').html();
                        $.each(data, function (i, item) {
                            html1 += Mustache.render(datasp1, {
                                Product_ID: item.Product_ID,
                                ProductName: item.ProductName
                            })
                        });
                        $('#sanpham1').html(html1);
                        var html = '';
                        var datasp = $('#data-sp').html();
                        $.each(data, function (i, item) {
                            html += Mustache.render(datasp, {
                                Product_ID: item.Product_ID,
                                ProductName: item.ProductName
                            })
                        });
                        $('#sanpham').html(html);
                    }
                }
            })
        },
    }
    productController.init();
});