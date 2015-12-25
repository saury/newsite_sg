 //js file which handles admin order section
    
    //修改商品状态
    $(".change_product_status").click(function()
        {
            var p_status=$(this).parent().parent().find('.product_status').val();
            if(p_status==0)
            {
                alert('请选择要修改的状态');
                return false;
            }
            
            var p_id=$(this).attr('p_id');
            var taobao_id='';
            if(p_status==1)
            {
                var action='add_buyer_record';
                //检查是否输入了淘宝订单号
                var taobao_id=$(this).parent().parent().find('.taobao_id').val();
                if(taobao_id.length<15)
                {
                    alert('请输入正确的淘宝订单号');
                    return false;
                }
            }
            else
             {
                 var action='invalid_product';
             }
                if(confirm('确认要修改状态吗？'))
                {
                    $.ajax({
                            type: "post",
                            dataType: "json",
                            data:{'p_id':p_id,'taobao_id':taobao_id},
                            url: "./?act=ajax&do=order&m="+action,
                            success: function(data){
                                alert(data.msg);
                                $("label[p_id='"+p_id+"']").remove();
                            },
                            error: function(msg){
                                alert ('操作失败');
                            }
                    });
                }
    
        });

//修改商品重量
$(".product_weight").blur(function(){
        var val=$(this).val();
        var p_id=$(this).attr('p_id');
        var patnum = new RegExp("^[0-9]+$");
        if(!patnum.test(val)){
            $(this).val(0);
            return false;
        }
        else
        {
            $.ajax({
		type: "post",
		dataType: "json",
		data: {'p_id':p_id,'p_real_weight':val},
		url: "./?act=ajax&do=order&m=change_product_weight",
		success: function(data){
               
		},
		error: function(msg){
		}
            });
        }
        
    });
 
    //确认商品到货
     $(".confirm_arrive").click(function(){
          var obj=this;
          var p_id=$(obj).attr('p_id');
          //console.log($(obj).parent().parent().parent().find(".ft-danger"));
          //return false;
          if(confirm("确认该商品已经到货了吗？"))
          {
                $.ajax({
		type: "post",
		dataType: "json",
		data: {'p_id':p_id},
		url: "./?act=ajax&do=order&m=product_arrived",
		success: function(data){
                       if(data.status!='ok')
                       {
                           alert(data.msg);
                           return false;
                       }
                       else
                       {
                           //console.log($(obj).parent().parent().parent().find(".ft-danger"));
                           $(obj).parent().parent().parent().find(".ft-danger").html(data.data);
                           $(obj).parent().parent().parent().find(".arrive_result").show();
                           $(obj).parent().parent().parent().find(".pre_arrive").hide();
                       }
		},
		error: function(msg){
                      alert('操作失败！');
		}
            });
          }  
    });
    
       //取消商品到货
     $(".cancel_arrive").click(function(){
          var obj=this;
          var p_id=$(obj).attr('p_id');
          //console.log($(obj).parent().parent().parent().find(".ft-danger"));
          //return false;
          if(confirm("确认此商品退货？商品将变成无效状态"))
          {
                $.ajax({
		type: "post",
		dataType: "json",
		data: {'p_id':p_id},
		url: "./?act=ajax&do=order&m=cancel_purchase",
		success: function(data){
                       if(data.status!='ok')
                       {
                           alert(data.msg);
                           return false;
                       }
                       else
                       {
                           $(obj).parent().parent().parent().find(".return_result").show();
                           $(obj).parent().parent().parent().find(".pre_arrive").hide();
                       }
		},
		error: function(msg){
                      alert('操作失败！');
		}
            });
          }  
    });
    
  //取消商品订购  
  $(".cancel_purchase").click(function()
        {   
            var p_id=$(this).attr('p_id');
 
                if(confirm('确认要取消订购吗？商品将变成无效状态并退款给用户'))
                {
                    $.ajax({
                            type: "post",
                            dataType: "json",
                            data:{'p_id':p_id},
                            url: "./?act=ajax&do=order&m=cancel_purchase",
                            success: function(data){
                                alert(data.msg);
                                $("div[p_id='"+p_id+"']").remove();
                            },
                            error: function(msg){
                                alert ('操作失败');
                            }
                    });
                }
                else
                {
                    return false;
                }
    
        });
        
    //商品丢失  
  $(".product_losing").click(function()
        {   
            var p_id=$(this).attr('p_id');
 
                if(confirm('确认该商品丢失吗？商品将变成无效状态并退款给用户'))
                {
                    $.ajax({
                            type: "post",
                            dataType: "json",
                            data:{'p_id':p_id},
                            url: "./?act=ajax&do=order&m=product_losing",
                            success: function(data){
                                if(data.status!='ok')
                                {
                                    alert(data.msg);
                                    return false;
                                }
                                else
                                {
                                    alert(data.msg);
                                    window.location.reload();
                                }
                                
                            },
                            error: function(msg){
                                alert ('操作失败');
                            }
                    });
                }
                else
                {
                    return false;
                }
        });
        
 //修改快递单号       
        $(".express_change").click(function()
        {
            var parent=$(this).parent().parent().parent().parent();
            parent.find('.express_no').attr('disabled',false);
            parent.find('.express_company').hide();
            parent.find('.express_company_select').show();
            $(this).hide();
            $(this).siblings('.express_cancel').show();
        });
  //取消修改快递单号        
        $(".express_cancel").click(function()
        {
            var parent=$(this).parent().parent().parent().parent();
            parent.find('.express_no').attr('disabled',true);
            parent.find('.express_no').val(parent.find('.express_def_no').val());
            parent.find('.express_company').show();
            parent.find('.express_company_select').hide();
            $(this).hide();
            $(this).siblings('.express_change').show();
        });
        
  //提交修改快递单号        
        $(".express_submit").click(function()
        {
            var parent=$(this).parent().parent().parent().parent();
            //判断是否可以提交
            if(parent.find('.express_no').attr('disabled')!='disabled')
            {
                var express_no=parent.find('.express_no').val();
                var express_company=parent.find('.express_company_select').val();
                var p_id=$(this).attr('p_id');
                   $.ajax({
                            type: "post",
                            dataType: "json",
                            data:{'p_id':p_id,'express_no':express_no,'express_company':express_company},
                            url: "./?act=ajax&do=order&m=change_buyer_record",
                            success: function(data){
                                    parent.find('.express_company').val(express_company);
                                    parent.find('.express_company').show();
                                    parent.find('.express_company_select').hide();
                                    parent.find('.express_change').show();
                                    parent.find('.express_cancel').hide();
                            },
                            error: function(msg){
                                alert ('操作失败');
                            }
                    });
            }
        }); 
        
     //打印发货单
        $(".print_delivery_bill").click(function()
        {
            var p_ids='';
            //判断是否选择了商品
            $(".delivery_checkbox").each(function(){
                if($(this).prop('checked')==true)
                {
                    p_ids+=$(this).attr('p_id')+",";
                }
            });
            if(p_ids=='')
            {
                alert('请选择商品!');
                return false;
            }
            else
            {
               p_ids=p_ids.substr(0,p_ids.length-1);
               window.open('./?act=order_center&m=print_delivery_bill&p_ids='+p_ids);//新窗口打开发货页面
            }
        }); 
        
     //打印面单
        $(".print_express_bill").click(function()
        {
            var p_ids='';
            //判断是否选择了商品
            $(".delivery_checkbox").each(function(){
                if($(this).prop('checked')==true)
                {
                    p_ids+=$(this).attr('p_id')+",";
                }
            });
            if(p_ids=='')
            {
                alert('请选择商品!');
                return false;
            }
            else
            {
               p_ids=p_ids.substr(0,p_ids.length-1);
               window.open('./?act=order_center&m=print_express_bill&p_ids='+p_ids);//新窗口打开面单打印页面
            }
        });   
        
        
             
        //发货
        $(".goods_deliver").click(function()
        {
            var p_ids='';
            var global_express_no=$("#global_express_no").val();
            //判断是否选择了商品
            $(".delivery_checkbox").each(function(){
                if($(this).prop('checked')==true)
                {
                    p_ids+=$(this).attr('p_id')+",";
                }
            });
            if(p_ids=='')
            {
                alert('请选择商品!');
                return false;
            }
            else if(global_express_no=='')
            {
                alert('请填写国际物流单号!');
                return false;
            }
            else
            {
                if(confirm('确认要发货吗？'))
                {
                    p_ids=p_ids.substr(0,p_ids.length-1);
                    $.ajax({
                            type: "post",
                            dataType: "json",
                            data:{'p_ids':p_ids,'global_express_no':global_express_no},
                            url: "./?act=ajax&do=order&m=goods_deliver",
                            success: function(data){ //发货成功
                                 alert('发货成功！');
                                 window.location.reload();
                            },
                            error: function(msg){
                                alert ('操作失败');
                            }
                    });
                }
                else
                {
                    return false;
                }

            }
        });
        
        //发货撤回  
        $(".cancel_deliver").click(function()
        {   
            var p_id=$(this).attr('p_id'); 
                if(confirm('要取消发货吗？该商品将回到已到货状态'))
                {
                    $.ajax({
                            type: "post",
                            dataType: "json",
                            data:{'p_id':p_id},
                            url: "./?act=ajax&do=order&m=cancel_deliver",
                            success: function(data){
                                alert(data.msg);
                                $("label[p_id='"+p_id+"']").remove();
                            },
                            error: function(msg){
                                alert ('操作失败');
                            }
                    });
                }
                else
                {
                    return false;
                }
        });

        $(".confirm_reject").click(function()
       {
              var reply=$("#reject_reply").val();
              var id=$(this).attr('id');
              if(reply==0)
              {
                  alert('请选择拒绝理由!');
                  return false;
              }
              if(confirm('确认要拒绝受理吗？'))
              {
                  $.ajax({
                    type: "post",
                    dataType: "json",
                    data: {'id':id,'reply':reply},
                    url: "./?act=ajax&do=order&m=rights_reject",
                    success: function(data){
                        alert('操作成功');
                        window.location.reload();
                    },
                    error: function(msg){
                            alert('操作失败');
                    }
                 });
              }
              
    }); 
    
    $(".refuse_rights_application").click(function()
    {
         var id=$(this).attr('id');
         $(".confirm_reject").attr('id',id);          
    }); 
    
    //同意维权退款
    $(".agree_rights_application").click(function()
    {
         var id=$(this).attr('id');
         var rights_type=$(this).attr('rights_type');
         var need_return=0;
         //console.log($(".inlineRadio_"+id));
         //return false;
         $(".inlineRadio_"+id).each(function(){
             if($(this).prop('checked')==true)
             {
                 need_return=1;
             }
         });
         if(need_return==0&&rights_type==1)
         {
             alert('请选择是否要退货！');
             return false;
         }
          if(confirm('确认要同意退款吗？商品将变为无效状态并退钱到用户余额'))
              {
                  $.ajax({
                    type: "post",
                    dataType: "json",
                    data: {'id':id,'need_return':need_return},
                    url: "./?act=ajax&do=order&m=return_agree",
                    success: function(data){
                        alert('操作成功');
                        window.location.reload();
                    },
                    error: function(msg){
                            alert('操作失败');
                    }
                 });
           }         
    }); 
