$(document).ready(function () {
    var providerController = {
        init: function () {
            providerController.registerEvent();
            providerController.loadData();
        },
        saveData: function () {
            var id = $('#idcq').val();
            var name = $('#tencq').val();
            $.ajax({
                url: '/Provider/SaveData',
                type: 'POST',
                data:
                {
                    Provider_ID: id,
                    Provider_Name: name
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        alert("Thêm thành công thông tin cơ quan")
                        $('#myModal9').modal('hide');
                        providerController.loadData();
                        //$('#myModal').modal('show');
                    }
                }
            })
        },
        resetform: function () {
            $('#tencq').val('');
        },
        registerEvent: function () {
            $('#btn-savecq').off('click').on('click', function () {
                providerController.saveData();
            })
            $('#btn-addprovider').click(function () {
                $('#myModal9').modal('show');
                $("h4.modal9-title").text('Thêm mới thông tin cơ quan');
                providerController.resetform();
            });
        },
        loadData: function () {
            $.ajax({
                url: '/Provider/LoadData',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var data = response.data;
                        $('#idcq').val(response.max + 1);
                        //var html2 = '';
                        //var datacq2 = $('#data-cq2').html();
                        //$.each(data, function (i, item) {
                        //    html2 += Mustache.render(datacq2, {
                        //        Provider_ID: item.Provider_ID,
                        //        Provider_Name: item.Provider_Name
                        //    })
                        //});
                        //$('#cq2').html(html2);
                        //var html3 = '<option value="0">Cơ quan ban hành</option>';
                        //var datacq3 = $('#data-cq3').html();
                        //$.each(data, function (i, item) {
                        //    html3 += Mustache.render(datacq3, {
                        //        Provider_ID: item.Provider_ID,
                        //        Provider_Name: item.Provider_Name
                        //    })
                        //});
                        //$('#cq3').html(html3);
                        
                        var html1 = '<option value="0">Cơ quan</option>';
                        var datacq1 = $('#data-cq1').html();
                        $.each(data, function (i, item) {
                            html1 += Mustache.render(datacq1, {
                                Provider_ID: item.Provider_ID,
                                Provider_Name: item.Provider_Name
                            })
                        });
                        $('#cq1').html(html1);
                        var html = '';
                        var datacq = $('#data-cq').html();
                        $.each(data, function (i, item) {
                            html += Mustache.render(datacq, {
                                Provider_ID: item.Provider_ID,
                                Provider_Name: item.Provider_Name
                            })
                        });
                        $('#cq').html(html);

                    }
                }
            })
        },
    }
    providerController.init();
});