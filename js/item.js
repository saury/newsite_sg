function detailpage(option){
	this.option = option;
	
	this.jia = function(){
		$(".buy_num").val($.trim($(".buy_num").val()));
		var patnum = new RegExp("^[0-9]+$");
		if(!patnum.test($(".buy_num").val())){
			$(".buy_num").val("0");
		}		
		$(".buy_num").val(parseInt($(".buy_num").val())+1);
		var patt = new RegExp("^[1-9]{1}[0-9]*$");
		if(!patt.test($(".buy_num").val())){
			$(".buy_num").val("1");
		}
	}
	
	this.jian = function(){
		$(".buy_num").val($.trim($(".buy_num").val()));
		var patnum = new RegExp("^[0-9]+$");
		if(!patnum.test($(".buy_num").val())){
			$(".buy_num").val("0");
		}
		
		if(parseInt($(".buy_num").val())<=1){
			$(".buy_num").val(1);
		}else{
			$(".buy_num").val(parseInt($(".buy_num").val())-1);
		}

		var patt = new RegExp("^[1-9]{1}[0-9]*$");
		if(!patt.test($(".buy_num").val())){
			$(".buy_num").val("1");
		}
	}
	
	this.buynum = function(){
		var patnum = new RegExp("^[0-9]+$");
		
		$(".buy_num").val($.trim($(".buy_num").val()));
		
		var patt = new RegExp("^[1-9]{1}[0-9]*$");
		if(!patt.test($(".buy_num").val())){
			$(".buy_num").val("1");
		}
	}
	
	this.promote = function(){
		var promote = this.option.promote;
                var symbol=this.option.symbol;
		if(promote != '0' && promote.price.exchange_price>0)
		{
                        //改变原价文字，展现促销价
                        var org_div=$(".detail-promo-price").find(".pure-g").get(0);
                        var pro_div=$(".detail-promo-price").find(".pure-g").get(1);
//                        $(org_div).find('.pure-u-1-4').html('Original Price:');
//                        $(org_div).find('.pure-u-3-4').removeClass('hight-lighted');
//                        $(org_div).find('.pure-u-3-4').addClass('line-through');
                        $(pro_div).find('.pure-u-3-4').html(symbol+Number(promote.price.exchange_price).toFixed(2));
                        //$(pro_div).show();
		}
	}

	this.skudo = function(e,event){
		if(event=='click' && $(e).hasClass("active")==false && $(e).hasClass("disabled")==false){

			//去除所有不可选
			$("dl[pid]").children().children().children(".disabled").removeClass('disabled');
                        
                        //选择
			//取消同行已经选择
			$(e).siblings(".active").removeClass("active");
		
			//选中自己
			$(e).addClass("active");
                        $(e).parent().parent().parent().removeClass("has-error");
                        
                       
					
			//过滤
			var thisp = this;

			$("label.active").each(function(i){
                            
				var p_data=$(this).data("v");
				var p_pid=$(this).data("pid");
		
				
	
			    $(".skurows").each(function(i){
					       
						   var c_vid=$(this).attr("parent_vid");
						   var c_pid=$(this).attr("pid");

						   if(c_pid==p_pid)
					       {
						      return true;
						   }
						   if(c_vid!=0 && c_vid!=undefined && c_vid!=null)
					       {
								  if($("label[renitemkey='"+c_vid+"']").hasClass("active")==false)
							      {
								      $(this).hide();
								      return true;
								  }	
			
															
						   }
								
								$(this).children().children().children(".btn.btn-default").each(function(i){
                                                                   
			
								var c_data=$(this).data("v");												
								var pat1 = new RegExp('.*'+c_data+';(|[^,]+)'+p_data+'.*');
								var pat2 = new RegExp('.*'+p_data+';(|[^,]+)'+c_data+'.*');
								var count=0;
								for(var a=0;a<thisp.option.sku_list.length;a++)
								{
                                                                if(!pat1.test(thisp.option.sku_list[a]['properties']) && !pat2.test(thisp.option.sku_list[a]['properties']))
								   {
									   count++;
								   }
                        
								 }

								   if(count==thisp.option.sku_list.length)
								   {
                                                                      
								        $(this).addClass("disabled");

								   }
		
							     });
								 
								 $(this).show();					   					  
				  }); 				
																     
			 });
			
                        var price_list=this.itemprice();//获取价格
                        if(price_list[0]>0)
                        {
                            var org_div=$(".detail-promo-price").find(".pure-g").get(0);
                            var pro_div=$(".detail-promo-price").find(".pure-g").get(1);           
                            var symbol=this.option.symbol;
                            var promote = this.option.promote;
                            if(promote != '0' && promote.price.exchange_price>0)
                            {
                                $(org_div).find('.pure-u-3-4').html(symbol+price_list[3]);
                                $(pro_div).find('.pure-u-3-4').html(symbol+price_list[2]);
                            }
                            else
                            {
                                $(org_div).find('.pure-u-3-4').html(symbol+price_list[2]);
                                $(pro_div).find('.pure-u-3-4').html(symbol+price_list[2]);
                            }
                        }
                        
			
		}else if(event=='click' && $(e).hasClass("active")==true){

			$(e).removeClass("active");
			//去除所有不可选
			$("dl[pid]").children().children().children(".disabled").removeClass('disabled');
			var e_vid=$(e).attr("renitemkey");
			var id=e_vid;

			//清除所有子属性选择
			while($("dl[parent_vid='"+id+"']").attr('class')=='skurows')
			{			 
				 var obj=$("dl[parent_vid='"+id+"']").children().children().children(".active");
				 id=obj.attr("renitemkey");
				 obj.removeClass("active");
				 obj.parent().parent().parent().hide();
			}

			//过滤
			var thisp = this;
	        
            $("label.active").each(function(i){
				var p_data=$(this).data("v");
				var p_pid=$(this).data("pid");		
	
			    $(".skurows").each(function(i){
					       
						   var c_vid=$(this).attr("parent_vid");
						   var c_pid=$(this).attr("pid");

						   if(c_pid==p_pid)
					       {
						      return true;
						   }
						   if(c_vid!=0 && c_vid!=undefined && c_vid!=null)
					       {

					              if($("label[renitemkey='"+c_vid+"']").hasClass("active")==false)
							      {
								      $(this).hide();
								      return true;
								  }		
															
						   }
								
								$(this).children().children().children(".btn.btn-default").each(function(i){
			
								var c_data=$(this).data("v");												
								var pat1 = new RegExp('.*'+c_data+';(|[^,]+)'+p_data+'.*');
								var pat2 = new RegExp('.*'+p_data+';(|[^,]+)'+c_data+'.*');
								var count=0;
								for(var a=0;a<thisp.option.sku_list.length;a++)
								{
                                                                    if(!pat1.test(thisp.option.sku_list[a]['properties']) && !pat2.test(thisp.option.sku_list[a]['properties']))
								   {
									   count++;
								   }
                        
								 }

								   if(count==thisp.option.sku_list.length)
								   {
								         $(this).addClass("disabled");

								   }
		
							     });
								 
								 $(this).show();					   					  
				  }); 				
																     
			 });
		}
	}
        
        this.itemprice=function()
        {
            var price_list = new Array();
            var skuset = '';
            $("label.active").each(function(i){
                      var p_data=$(this).data("v");
                      skuset = skuset+p_data+';';	
            });
            skuset = skuset.substr(0,skuset.length-1);
             var promote = this.option.promote;
             //console.log(promote);
			if(!isNaN(this.option.skusetinfo[skuset+'exchange_locprice'])){ //有属性的促销价                                                   
                                if(promote != '0' && promote.price.exchange_price>0)
                                {
                                    var promoteid = this.option.skuidinfo[skuset];
                                    var promoteprice = promote[promoteid];
                                    if(promoteprice&&promoteprice['exchange_price']>0 ){
                                           price_list[0]=fceil(promoteprice['price'],2).toFixed(2);
                                           price_list[1]=fceil(promoteprice['rmb_price'],2).toFixed(2);
                                           price_list[2]=fceil(promoteprice['exchange_price'],2).toFixed(2);
                                           price_list[3]=fceil(this.option.skusetinfo[skuset+'exchange_locprice'],2).toFixed(2);//有促销价时，此价格作为原价
                                    }
                                }
                                else
                                {
                                        price_list[0]=fceil(this.option.skusetinfo[skuset+'locprice'],2).toFixed(2);
                                        price_list[1]=fceil(this.option.skusetinfo[skuset+'rmb_locprice'],2).toFixed(2);
                                        price_list[2]=fceil(this.option.skusetinfo[skuset+'exchange_locprice'],2).toFixed(2);
                                }
			}
 
            return price_list;            
        }
        
}

function add_to_cart(postdata)
{
	jQuery.ajax({
		type: "post",
		dataType: "json",
		data: postdata,
		url: '/ajax/cart?m=add_product',
		success: function(data){
			if(data.error == "1"){
				alert(data.message);
			}

			else{
                flyToCart(data);
			}
		},
		error: function(msg){
			alert('add product to shopping cart failed');
		}
	});

}

//combine the badge animation with the flying to cart effet
function flyToCart(data) {

    var cart_btn = $('.detail-promo-para .btn-lg');
    //avoid combo
    if (cart_btn.attr("disabled")) return false;

    var cart_icon = cart_btn.children(".glyphicon-shopping-cart"), //add to cart button
        cart_nav = $('.navbar-search .glyphicon-shopping-cart'); //cart button on top nav

    //create the mini cart token to fly
    $("body").append('<button class="btn btn-warning btn-lg mini-cart-fly img-circle text-center"><i class="glyphicon glyphicon-shopping-cart"></i></button>');

    //init the token's top and left para
    $(".mini-cart-fly").css({
        'position': 'absolute',
        'z-index': '9999',
        'padding-left': '0',
        'padding-right': '0',
        'width': '43px',
        'top': cart_icon.offset().top,
        'left': cart_icon.offset().left
    });

    //options
    $(".mini-cart-fly").fly({
        start: {
            top: cart_icon.offset().top - $(document).scrollTop() - 12, // offset top minus scrolled height minus padding top offset
            left: cart_icon.offset().left - 17 // offset top minus minus padding left offset
        },
        end: {
            top: cart_nav.offset().top - $(document).scrollTop() - 12,
            left: cart_nav.offset().left - 17,
        },
        onEnd: function() {
            this.destroy();
        }
    });

    //disable the button
    cart_btn.attr("disabled", true);
    //run the animation and recover the button
    setTimeout(function() {
        // shine animation
        var mini_cart_num = $(".navbar-search .badge").html();
        $(".navbar-search .badge").addClass("shine").html(data.cart_num);
        setTimeout(function() {
            $(".navbar-search .badge").removeClass("shine");
        }, 200);
        item=data.item;
        shopcart_no=data.cart_num;
        //recover the button
        $('.detail-promo-para .btn-lg').removeAttr("disabled");
    }, 700);
}

function get_item_comments(id,sid,psize,bingid,lang)
{

	$(".product_comment").html("<p id=\"listloading\" style=\"text-align: center;\"><img src=\"/Images/86loading25x25.gif\"></p>");	

        //获取评论
	$.ajax({
		type: "post",
		dataType: "jsonp",
                jsonp: 'callback',
                jsonpCallback:"jsonp_comments",
		url: "http://rate.taobao.com/feedRateList.htm?callback=jsonp_comments&userNumId="+sid+"&auctionNumId="+id+"&currentPageNum="+psize,
		success: function(data){
                 $(".evaluation-item").html("");
			if(data.comments == null){
				$(".evaluation-item").html("no comment found");return false;
			}
            
                       $.each(data.comments,function(k,c){
                           //console.log(c);
                           var content=c.content.replace(/\u0001/g,'');//去除非法字符;
                           content=content.replace(/&hellip;/g,'');//去除非法字符;
                           content=content.replace(/&rdquo;/g,'');//去除非法字符;
                           content=content.replace(/&ldquo;/g,'');
                           content=content.replace(/<[^>].*?>/g,""); 
                           var sku=c.auction.sku.replace(/&nbsp;/g,' ');//去除html编码;
                           sku=sku.replace(/&nbsp/g,' ');//去除html编码;
                           var date=c.date;
                           //翻译
                           var txt='"'+content+'"';
                           txt+=sku?',"'+sku+'"':'';
                           txt+=date?',"'+date+'"':'';
                           //console.log(txt);
                           var trans_content=content;
                           var trans_sku=sku;
                           var trans_date=date;
                           //alert('http://api.microsofttranslator.com/v2/ajax.svc/TranslateArray2?appId="'+bingid+'"&texts=['+txt+']&from="zh-chs"&to="'+lang+'"&oncomplete=?');
                           $.ajax({
			    url: 'http://api.microsofttranslator.com/v2/ajax.svc/TranslateArray2?appId="'+bingid+'"&texts=['+txt+']&from="zh-chs"&to="'+lang+'"&oncomplete=?',
			    dataType: 'jsonp',
			    success:function(data){
                                //console.log(data[2]);
                                       trans_content=data[0]?data[0].TranslatedText:trans_content;
                                       trans_sku=data[1]?data[1].TranslatedText:trans_sku;
                                       trans_date=data[2]?data[2].TranslatedText:trans_date;
                                       $(".evaluation-item").append("<li class=\"cf\"><div class=\"col-md-2\"><div class=\"evaluation-item-avatar\"><img class=\"img-responsive img-circle\" src=\""+c.user.avatar+"\" alt=\"avatar\"><span>"+c.user.nick+"</span></div></div><div class=\"col-md-10\"><p>"+trans_content+"</p><small>"+trans_date+"&nbsp;&nbsp;&nbsp;&nbsp;"+trans_sku+"</small></div></li>");
                                      
				},
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    //console.log('http://api.microsofttranslator.com/v2/ajax.svc/TranslateArray2?appId="'+bingid+'"&texts=['+txt+']&from="zh-chs"&to="'+lang+'"&oncomplete=?');
                                    //console.log(errorThrown);
                                }
                                
			});

				
			//$(".product_comment").append("<table width=\"90%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-bottom:1px #dedede solid; margin-left:20px;\"><tr><td width=\"123\" height=\"100\"><div><img src=\""+c.user.avatar+"\" width=\"40\" height=\"40\" /></div><div class=\"wenzi0826-1\">"+c.user.nick+(c.user.anony == true?"<span style=\"color:#999;\">（匿名）</span>":"")+"</div><div><img src=\""+(c.user.displayRatePic?"http://a.tbcdn.cn/sys/common/icon/rank_s/"+c.user.displayRatePic:"")+"\" width=\"11\" height=\"11\" /></div></td><td><div class=\"wenzi0826-4\">"+(c.content?c.content:"")+"</div><div class=\"wenzi0826-5\">"+c.date+" "+(c.auction.sku?c.auction.sku:"")+"</div></td></tr></table>");
				});
                                //$(".product_comment").append("<div id='sale_page_box1'>"+pageNavigation(id,sid,data.maxPage,data.currentPageNum,1)+"</div>");
                                //$("#sale_page_box1").show();
		},
		error: function(msg){
			
		}
	});
        
}



	