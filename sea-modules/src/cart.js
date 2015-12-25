define(function(require, exports, module) {
    var $ = jQuery = require('$');
    var buttonJs = require('./depends/bootstrap/button.js');

    var change_num = 1; //1代表可以更改购物车数量;
    var symbol = "<?php echo $currency_array[$currency_type]['symbol'];?>";
    var free_price = "<?php echo $free_price;?>"; //最低多少免运费

    $(".cart_item_delete").click(function() {
        if (confirm('Delete item from shopping cart?')) {
            var cart_id = $(this).attr('cart_id');
            $.ajax({
                type: "post",
                dataType: "json",
                data: {
                    'm': 'delete_product',
                    'cart_id': cart_id
                },
                url: "/ajax/cart",
                success: function(data) {
                    if (data.status == 'ok') {
                        $(".cart-tbody[cart_id='" + cart_id + "']").remove();
                        cal_fee();
                    } else {
                        alert('Delete item from shopping cart failed');
                    }
                },
                error: function(msg) {
                    alert('Delete item from shopping cart failed');
                }
            });
            return false;
        } else {
            return false;
        }
    });

    $("#check_all").click(function() {
        var status = $(this).find("input[type='checkbox']").prop('checked');
        $('.cart_checkbox').each(function() {
            var sub_status = $(this).find("input[type='checkbox']").prop('checked');
            if (status != sub_status) $(this).parent().parent().parent().button('toggle');
        });
        setTimeout(function() {
            cal_fee();
        }, 0);
    });
    $(".cart_item").click(function() {
        setTimeout(function() {
            cal_fee();
        }, 0);
    });

    $(".glyphicon-plus").click(function() {
        if (change_num > 0) {
            var val = $(this).parent().siblings('.cart_p_num').val();
            val++;
            if (val > 999)
                val = 999;
            $(this).parent().siblings('.cart_p_num').val(val);
            update_shopping_cart(val, this);
        }
    });

    $(".glyphicon-minus").click(function() {
        if (change_num > 0) {
            var val = $(this).parent().siblings('.cart_p_num').val();
            val--;
            if (val < 1) {
                $(this).parent().siblings('.cart_p_num').val(1);
                return false;
            }
            $(this).parent().siblings('.cart_p_num').val(val);
            update_shopping_cart(val, this);
        }
    });

    $(".cart_p_num").blur(function() {

        var val = $(this).val();
        var patt = new RegExp("^[1-9]{1}[0-9]*$");
        if (!patt.test(val)) {
            val = 1;
            $(this).val(val);
            $(this).focus();
        }
        if (val > 999) {
            val = 999;
            $(this).val(val);
        }
        update_shopping_cart(val, this);

    });

    function update_shopping_cart(val, obj) {
        change_num = 0;
        if ($(obj).hasClass('cart_p_num')) {
            var cart_id = $(obj).parent().attr('cart_id');
            $(obj).attr('disabled', true);
        } else {
            var cart_id = $(obj).parent().parent().attr('cart_id');
            $(obj).parent().siblings('.cart_p_num').attr('disabled', true);
        }
        $.ajax({
            type: "post",
            dataType: "json",
            url: "/ajax/cart?m=update_shopping_cart&num=" + val + "&cart_id=" + cart_id,
            success: function(data) {
                if (data.status == 'ok') {
                    change_num = 1;
                    $(".cart_p_num").attr('disabled', false);
                    $(".cart-tbody[cart_id='" + cart_id + "']").find('.cart_p_subtotal').html(symbol + "<span class='p_subtotal'>" + data.p_total + "</span>");
                    //$("#product_total_"+cart_id).html(data.p_total);
                    setTimeout(function() {
                        cal_fee();
                    }, 0);
                }
            },
            error: function(msg) {
                //alert("未知错误");
            }
        });
    }


    function cal_fee() {
        var delivery_option = $("#delivery_option").val(); //选择的配送方式
        var cart_ids = '';
        $(".cart_checkbox").each(function() {
            if ($(this).find("input[type='checkbox']").prop('checked') == true) {
                cart_ids += $(this).attr('cart_id') + ",";
            }
        });
        if (delivery_option > 0) {
            if (cart_ids != '') {
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "/ajax/cart?m=cal_fee&cart_ids=" + cart_ids + "&op=" + delivery_option,
                    success: function(data) {
                        if (data.status == 'ok') {
                            if (delivery_option == 1 && data.p_total < 30) {
                                $('.p_freight').tooltip({
                                    title: 'free for orders over S$30.00', //content
                                    trigger: 'mamual',
                                    placement: 'top'
                                }).tooltip('show');
                            } else {
                                //function to destroy
                                $('.p_freight').tooltip('destroy');
                            }

                            $(".cart_submit").removeClass("disabled");
                            $(".p_freight").html(symbol + data.freight);
                            $(".total_price").html(symbol + data.total_price);
                        }
                    },
                    error: function(msg) {}
                });
            } else {
                $(".p_freight").html(symbol + '0.00');
                $(".total_price").html(symbol + '0.00');
                $(".cart_submit").addClass("disabled");
            }

        } else {
            $(".p_freight").html(symbol + '0.00');
            $(".total_price").html(symbol + '0.00');
            $(".cart_submit").addClass("disabled");
        }
    }

    $("#delivery_option").change(function() {
        setTimeout(function() {
            cal_fee();
        }, 0);
    });

    $(".cart_submit").click(function() {
        var delivery_option = $("#delivery_option").val();
        var cart_ids = '';
        var addr_id = 0;
        $(".cart_checkbox").each(function() {
            if ($(this).find("input[type='checkbox']").prop('checked') == true) {
                cart_ids += $(this).attr('cart_id') + ",";
            }
        });

        $(".cart_address_list label").each(function() {
            if ($(this).hasClass('active')) {
                addr_id = $(this).attr('cart_addr_id');
            }
        });
        if (cart_ids == '') {
            alert('please select your goods');
            return false;
        }
        if (addr_id == 0) {
            alert('please choose your shipping address');
            return false;
        }
        if (delivery_option == 0) {
            alert('please choose your delivery option');
            return false;
        }
        $("#selected_cart_ids").val(cart_ids);
        $("#selected_addr_id").val(addr_id);
        $("#selected_delivery_option").val(delivery_option);
        $("#cart_form")[0].submit();
    });
});
