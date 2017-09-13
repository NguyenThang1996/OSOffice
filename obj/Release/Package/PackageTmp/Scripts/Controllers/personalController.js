$(document).ready(function () {
    var per;
    var personalController = {
        init: function () {
            personalController.registerEvent();
            personalController.loadData();
        },
        savedata: function () {
            var id = $('#idns').val();
            var name = $('#tenns').val();
            var username = $('#taikhoan').val();
            var pass = $('#matkhau').val();
            var permission = $('input[name=permission]:checked').val();
            var modelpersonal = {
                Account_ID: id,
                AccountName: name,
                Username: username,
                Password: pass,
                Permission: permission
            };

            $.ajax({
                url: '/Personal/SaveData',
                type: 'POST',
                data:
                {
                    modelpersonal: modelpersonal,
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        personalController.loadData();
                    }
                }
            })
        },
        resetform: function () {
            $('#tenns').val('');
            $('#taikhoan').val('');
            $('#matkhau').val('');
            $('input:radio[name="permission"][value="staff"]').prop('checked', true);
        },
        registerEvent: function () {
            $('#btn-savens').off('click').on('click', function () {
                personalController.savedata();
                $('#myModal4').modal('hide');
            })
            $('#btn-addpsn').click(function () {
                $('#myModal4').modal('show');
                $("h4.modal4-title").text('Thêm mới thông tin nhân sự');
                personalController.resetform();
            });
            $('#check-all').click(function () {
                var c = this.checked;
                $(':checkbox').prop('checked', c);
            });
            $('#deletepsn').off('click').on('click', function () {
                personalController.deletedata();
            });
            $(document).off('click', ".edit-psn").on('click', ".edit-psn", function () {
                $('#myModal4').modal('show')
                $("h4.modal4-title").text('Sửa thông tin nhân sự');
                var id = $(this).data('id');
                personalController.loadDetail(id);
            });
            $('#btn-searchpsn').off('click').on('click', function () {
                personalController.loadData(true);
            })
            $("select#quyen").change(function () {
                per = $("#quyen option:selected").val();
                personalController.loadData(true);
            });
            $("select#show").change(function () {
                pagesize = $("#show option:selected").val();
                personalController.loadData(true);
            });
        },

        loadData: function (changePageSize) {
            var name = $("#txtsearchpsn").val();
            $.ajax({
                url: '/Personal/LoadData',
                dataType: 'json',
                type: 'GET',
                data: {
                    name: name,
                    per: per,
                },
                success: function (response) {
                    $('#idns').val(response.max + 1);
                    if (response.status == true) {
                        var data = response.data;                        
                        var html = '';
                        var datans = $('#data-ns').html();
                        NumberialOrder = 1;
                        $.each(data, function (i, item) {
                            var permission;
                            if (item.Permission == "admin")
                            {
                                permission = "Quản trị viên"
                            }
                            else
                            {
                                permission = "Nhân viên";
                            }
                            html += Mustache.render(datans, {
                                NumberialOrder: NumberialOrder++,
                                AccountName: item.AccountName,
                                Username: item.Username,
                                Permission: permission,
                                Account_ID: item.Account_ID,
                                Password: item.Password
                            })
                        });
                        $('#tblbody_personal').html(html);

                        //personalController.paging(response.total, function () {
                        //    personalController.loadData(true);
                        //}, changePageSize)
                    }
                }
            })
        },
        loadDetail: function (id) {
            $.ajax({
                url: '/Personal/GetDetail',
                type: 'GET',
                data:
                {
                    id: id,
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        var obj = response.data;
                        if (obj != null || obj1 != null) {
                            $('#idns').val(obj.Account_ID);
                            $('#tenns').val(obj.AccountName);
                            $('#taikhoan').val(obj.Username);
                            $('#matkhau').val(obj.Password);
                            $('input:radio[name="permission"][value="' + obj.Permission + '"]').prop('checked', true);
                        }
                    }

                }
            })
        },
        deletedata: function (id) {
            var checkbox = $('input[name="check"]:checked').val();
            $.ajax({
                url: '/Personal/DeleteData',
                type: 'POST',
                data:
                {
                    id: checkbox
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status == true) {
                        personalController.loadData(true);
                    }
                }
            })
        },
        //paging: function (total, callback, changePageSize) {
        //    var totalpage = Math.ceil(total / pagesize)
        //    if ($('#pagination a').length === 0 || changePageSize === true) {
        //        $('#pagination').empty();
        //        $('#pagination').removeData("twbs-pagination");
        //        $('#pagination').unbind("page");
        //    }
        //    $('#pagination').twbsPagination({
        //        totalPages: totalpage,
        //        visiblePages: 4,
        //        first: 'Đầu',
        //        last: 'Cuối',
        //        next: 'Tiếp',
        //        prev: 'Trước',
        //        //onPageClick: function (event, page) {
        //        //    pageindex = page,
        //        //    setTimeout(callback, 200)
        //        //}
        //    });
        //},
    }
    personalController.init();
});