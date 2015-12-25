    $(".register_button").on('click', function() {//$('ul.nav.nav-tabs:first').hide();$('form.tab-content.form-horizontal:first').hide();$('.modal-success').show();return false;
			if($(':checkbox[name="check1"]').prop('checked') == false)return false;
            var email=$("#email").val();
            var mobile=$("#mobile").val();
            var pwd=$("#pwd-reg").val();
            var pwd2=$("#pwd-reg2").val();
			var captcha=$('#reward-reg').val();
                         $.ajax({
                         type: "post",
                         dataType: "json",
                         data: {'email':email,'mobile':mobile,'pwd':pwd,'pwd2':pwd2,'m':'register','captcha':captcha},
                         url: "/ajax/user",
                         success: function(data){
                                    if(data.status=='ok')
                                    {
                                        //关闭注册层
                                        //$(".user_info").html("<li><a href=\"javascript:void(0);\">Hi "+data.u_nick+" welcome to Zmall!</a></li><li class=\"zmall-logout\"><a href=\"javascript:void(0);\"><i class=\"glyphicon glyphicon-log-out\"></i>Logout</a></li>");
                                        //$(".close").click();
                                        //购物车附加数量以及最新商品
                                        //window.location.reload();
										$('ul.nav.nav-tabs:first').hide();
										$('form.tab-content.form-horizontal:first').hide();
										$('.modal-success').show();
										setTimeout(function(){window.location.reload();},2000);
                                        
                                    }
                                    else
                                    {
                                    
                                    }
                         },
                         error: function(msg){
                             }
                       });
        });
        
        $(".signin_button").on('click', function() {
            var account=$("#account").val();
            var pwd=$("#pwd").val();
			$('#sign_error').text('');//提示栏清空
			if(account != '' && pwd != '')
			{
                         $.ajax({
                         type: "post",
                         dataType: "json",
                         data: {'account':account,'pwd':pwd,'m':'login'},
                         url: "/ajax/user",
                         success: function(data){
                                    if(data.status=='ok')
                                    {
                                        //$(".user_info").html("<li><a href=\"javascript:void(0);\">Hi "+data.u_nick+" welcome to Zmall!</a></li><li class=\"zmall-logout\"><a href=\"javascript:void(0);\"><i class=\"glyphicon glyphicon-log-out\"></i>Logout</a></li>"); 
                                        //$(".close").click();
                                         window.location.reload();
                                    }
                                    else
                                    {
										$('#sign_error').text(data.msg);
                                    }
                         },
                         error: function(msg){
                             }
                       });
			}
        });
        $(document).on('click',".zmall-logout", function() {
                         $.ajax({
                         type: "post",
                         dataType: "json",
                         data: {'m':'logout'},
                         url: "/ajax/user",
                         success: function(data){
                                    if(data.status=='ok')
                                    {
                                        //$(".user_info").html("<li><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_log\" data-active=\"login\"><i class=\"glyphicon glyphicon-log-in\"></i>Login</a></li><li><a href=\"#\" data-toggle=\"modal\" data-target=\"#modal_log\" data-active=\"register\"><i class=\"glyphicon glyphicon-plus-sign\"></i>Register</a></li>"); 
                                         window.location.reload();
                                    }
                                    else
                                    {
                                       
                                    }
                         },
                         error: function(msg){
                             }
                       });
        });
        
        $(document).on('click',".cart_delete", function() {
                         //change dom
                         var mini_cart_num = $('.navbar-search .badge').html();
                         $('.badge').html(--mini_cart_num);
                         $(this).parent().parent().slideUp();
                         //ajax call
                         $.ajax({
                         type: "post",
                         dataType: "json",
                         data: {'m':'delete_product','cart_id':$(this).attr('cart_id')},
                         url: "/ajax/cart",
                         success: function(data){
                                    if(data.status=='ok')
                                    {
                                            $('[data-toggle="popover"]').each(function() {
                                                 var element = $(this);
                                                 item=data.item;
                                                 shopcart_no=data.shopcart_no;
                                                 var overflow = shopcart_no > 5 ? (shopcart_no - 5) : 0; //超出商品显示限制条数
                                                 //element.mouseleave();
                                                 //element.mouseenter();
                                                 //$('.badge').html(shopcart_no);
                                            });
                                    }
                                    else
                                    {
                                       
                                    }
                         },
                         error: function(msg){
                             }
                       });
        });
        
        
          $(document).on('click',".addr_confirm", function() {
                        var addr_parent=$(this).parent().parent().parent().parent();
                        var name=addr_parent.find(".addr_name").val();
                        var city=addr_parent.find(".addr_city").val();
                        var address=addr_parent.find(".addr_address").val();
                        var zip=addr_parent.find(".addr_zip").val();
                        var phone=addr_parent.find(".addr_phone").val();
                        if(name==''||city==0||address==''||zip==""||phone=="")
                        {
                            alert('Address information is not integrate');
                            return false;
                        }
                        var reg = /^\d+$/;
                        if(!reg.test(zip))
                        {
                            alert('zipcode should only be numeric');
                            return false;
                        }
                        $('.new_address').hide();
                        var addr_id=$(this).attr("addr_id");
                         $.ajax({
                         type: "post",
                         dataType: "json",
                         data: {'m':'add_address','addr_id':addr_id,'name':name,'city':city,'address':address,'zip':zip,'phone':phone},
                         url: "/ajax/address",
                         success: function(data){
                             //window.location.reload();
                             $('.address_list').html(data.data);
                             $('.cart_address_list').html(data.cart_data);
    
                         },
                         error: function(msg){
                                alert('edit address failed');
                             }
                       });
        });
        
          $(document).on('click',".addr_delete", function() {
                 if(confirm('Are you sure to delete that address?'))
                 {
                         var addr_parent=$(this).parent().parent().parent().parent();
                         var addr_id=addr_parent.attr('addr_id');
                         $.ajax({
                         type: "post",
                         dataType: "json",
                         data: {'m':'delete_address','addr_id':addr_id},
                         url: "/ajax/address",
                         success: function(data){
                             //remove popup address
                             addr_parent.remove();
                             //remove cart address
                             $("label[cart_addr_id='"+addr_id+"']").remove();
                         },
                         error: function(msg){
                             alert('delete address failed');
                             }
                       });
                 }
        });
        
        $(document).on('click',".addr_edit", function() {
                         var addr_parent=$(this).parent().parent().parent().parent();
                         $(".addr_confirm").attr('addr_id',addr_parent.attr('addr_id'));
                         $('.new_address').find('.addr_name').val(addr_parent.find('.addr_name').html().trim());
                         $('.new_address').find('.filter-option').html(addr_parent.find('.td-inner').eq(1).html().trim());//city selections html changed
                         $('.new_address').find('.addr_city').val(addr_parent.attr('addr_city'));//city selections value pass
                         $('.new_address').find('.addr_address').val(addr_parent.find('.addr_address').html().trim());
                         $('.new_address').find('.addr_zip').val(addr_parent.find('.addr_zip').html().trim());
                         $('.new_address').find('.addr_phone').val(addr_parent.find('.addr_phone').html().trim());
                         $('.new_address').show(); 
        });
        
        $(document).on('click',".addr_cancel", function() {
                         $('.new_address').hide();                 
        });
        
        
        $(document).on('click',".addr_addnew", function() {
                    //清除数据
                    $(".addr_confirm").attr('addr_id',0);
                    $('.new_address').find('.addr_name').val('');
                    $('.new_address').find('.filter-option').html('');//city selections html changed
                    $('.new_address').find('.addr_city').val(0);//city selections value pass
                    $('.new_address').find('.addr_address').val('');
                    $('.new_address').find('.addr_zip').val('');
                    $('.new_address').find('.addr_phone').val('');      
                    $('.new_address').show();   
        });
        
        $(document).on('click',".addr_default", function() {
                         var addr_parent=$(this).parent().parent().parent().parent();
                         var addr_id=addr_parent.attr('addr_id');
                         $.ajax({
                         type: "post",
                         dataType: "json",
                         data: {'m':'set_default_address','addr_id':addr_id},
                         url: "/ajax/address",
                         success: function(data){
                              $('.address_list').html(data.data);
                              $('.cart_address_list').html(data.cart_data);
                              $('#account_addr').html(data.account_data);
                              $("label[cart_addr_id='"+addr_id+"']").click();                         
                         },
                         error: function(msg){
                             alert('set default address failed');
                             }
                         });            
        });
        

            $('.add_new_address').click(function()
          {
              $(".addr_addnew").click();
          });
          $(document).on('click',".cart_addr_edit", function() {
                               $(".add_new_address").click();
                               var addr_id=$(this).attr('addr_id');
                               $("label[addr_id='"+addr_id+"']").find(".addr_edit").click();
                               return false;
              });

           $(document).on('click',".cart_address_list label", function() {
                           var addr_id=$(this).attr('cart_addr_id');
                           var addr_name=$("label[addr_id='"+addr_id+"']").find(".addr_name").html().trim();
                           var addr_phone=$("label[addr_id='"+addr_id+"']").find(".addr_phone").html().trim();
                           var addr_address=$("label[addr_id='"+addr_id+"']").find(".addr_address").html().trim();
                           var addr_zip=$("label[addr_id='"+addr_id+"']").find(".addr_zip").html().trim();
                           $("#cart_consignee").html(addr_name+"("+addr_phone+")");
                           $("#cart_address").html(addr_address+" "+addr_zip);
              });
      
function base_convert(number, frombase, tobase) {
  return parseInt(number + '', frombase | 0).toString(tobase | 0);
}

function getlink(name,id){
	name = name.replace(/[^0-9a-zA-Z-]+/g, "-");
	name = name.replace(/[-]{2,}/g, "-");
	name = trim(name,'-')+'_p'+base_convert(id,10,19);
	if((name.length-249)>0)name = name.substr(name.length-249);
	return name;
}

function trim (str, charlist) {
	  var whitespace, l = 0,
	    i = 0;
	  str += '';

	  if (!charlist) {
	    whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
	  } else {
	    charlist += '';
	    whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
	  }

	  l = str.length;
	  for (i = 0; i < l; i++) {
	    if (whitespace.indexOf(str.charAt(i)) === -1) {
	      str = str.substring(i);
	      break;
	    }
	  }

	  l = str.length;
	  for (i = l - 1; i >= 0; i--) {
	    if (whitespace.indexOf(str.charAt(i)) === -1) {
	      str = str.substring(0, i + 1);
	      break;
	    }
	  }
	  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

function urlencode(str) {
	  str = (str + '').toString();
	  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
	  replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

function AutoResizeImage(maxWidth,maxHeight,objImg){
	var img = new Image();
	img.src = objImg.src;
	var hRatio;
	var wRatio;
	var Ratio = 1;
	var w = img.width;
	var h = img.height;
	wRatio = maxWidth / w;
	hRatio = maxHeight / h;
	if (maxWidth ==0 && maxHeight==0){
		Ratio = 1;
	}else if (maxWidth==0){
		if (hRatio<1) Ratio = hRatio;
	}else if (maxHeight==0){
		if (wRatio<1) Ratio = wRatio;
	}else if (wRatio<1 || hRatio<1){
		Ratio = (wRatio<=hRatio?wRatio:hRatio);
	}
	if (Ratio<1){
		w = w * Ratio;
		h = h * Ratio;
	}
	objImg.height = h;
	objImg.width = w;
}


Number.prototype.mtoFixed = function(s)
{
    return (parseInt(this * Math.pow( 10, s ) + 0.5)/ Math.pow( 10, s )).toString();
}

function FloatMul(arg1,arg2){ //乘法
	var m=0,s1=arg1.toString(),s2=arg2.toString();
	try{m+=s1.split(".")[1].length;}catch(e){}
	try{m+=s2.split(".")[1].length;}catch(e){}
	return Number(Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m));   
}

function accAdd(arg1,arg2){ //加法
    var r1,r2,m; 
    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;} 
    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;} 
    m=Math.pow(10,Math.max(r1,r2));
    return Number((FloatMul(arg1,m)+FloatMul(arg2,m))/m);
};

function FloatDiv(arg1,arg2){   //除法 
	var t1=0,t2=0,r1,r2;   
	try{t1=arg1.toString().split(".")[1].length;}catch(e){}   
	try{t2=arg2.toString().split(".")[1].length;}catch(e){}   
	with(Math){   
	r1=Number(arg1.toString().replace(".",""));   
	r2=Number(arg2.toString().replace(".",""));   
	return Number((r1/r2)*pow(10,t2-t1));   
	}   
}

function accSubtr(arg1,arg2){ //减法
	var r1,r2,m,n;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2));
	//动态控制精度长度
	n=(r1>=r2)?r1:r2;
	return Number(((FloatMul(arg1,m)-FloatMul(arg2,m))/m).toFixed(n));
}

function parseURL(url) { 
	var a = document.createElement('a'); 
	a.href = url; 
	return { 
	source: url, 
	protocol: a.protocol.replace(':',''), 
	host: a.hostname, 
	port: a.port, 
	query: a.search, 
	params: (function(){ 
	var ret = {}, 
	seg = a.search.replace(/^\?/,'').split('&'), 
	len = seg.length, i = 0, s; 
	for (;i<len;i++) { 
	if (!seg[i]) { continue; } 
	s = seg[i].split('='); 
	ret[s[0]] = s[1]; 
	} 
	return ret; 
	})(), 
	file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1], 
	hash: a.hash.replace('#',''), 
	path: a.pathname.replace(/^([^\/])/,'/$1'), 
	relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1], 
	segments: a.pathname.replace(/^\//,'').split('/') 
	}; 
	} 


function mtoFixed(s){
	return (parseInt(this * Math.pow( 10, s ) + 0.5)/ Math.pow( 10, s )).toString();
}

//精确到小数点值
function fceil(value, precision){
	var r = FloatDiv(Math.ceil(FloatMul(value,Math.pow(10, precision))) , Math.pow(10, precision));
	return Number(r.toFixed(precision));
}

function clear(txt){
	var pat1 = new RegExp("[\u0000-\u001F]",'g');
	var pat2 = new RegExp("[\u007F-\u00A1]",'g');
	txt = txt.replace(pat1," ");
	txt = txt.replace(pat2," ");
	txt = txt.replace(/\\/g,"\\\\");
	txt = txt.replace(/\"/g,"\\\"");
	txt = txt.replace(/包邮/g,"");
	txt = txt.replace(/妖/g,"");
	return encodeURIComponent(txt);
} 

function htmlspecialchars(str){  
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#039;');
    return str;
}

function clone(myObj){ 
	if(typeof(myObj) != 'object') return myObj; 
	if(myObj == null) return myObj; 
	var myNewObj = new Object(); 
	for(var i in myObj) 
	myNewObj[i] = clone(myObj[i]); 
	return myNewObj; 
}

function searchtip(){
	this.get = function(q,lang){
		var remoturl = "http://connectkeyword.alibaba.com/lenoIframeJson.htm?keyword="+q+"&varname=intelSearchData";
		if(lang != 'en')remoturl = "http://connectkeyword.alibaba.com/mutilLenoIframeJson.htm?keyword="+q+"&language="+lang+"&varname=intelSearchData";
		
		var request = $.ajax({
			url: remoturl,
			data: {q:$.trim(q)},
			dataType: "script",
			beforeSend: function(){
				window.intelSearchData=[];
			}
		});
		
		request.complete(function(){
			if(typeof window.intelSearchData=='object' && !isNaN(window.intelSearchData.length) && window.intelSearchData.length>0)show();
		})
	}
	
	function show(){
		if($("#seartip").length == 0){
			var input = $("input.defaultvalue.form_search1");
			var left = $("input.defaultvalue.form_search1").offset().left;
			var top = $("input.defaultvalue.form_search1").offset().top + $("input.defaultvalue.form_search1").height();
			var width = $("input.defaultvalue.form_search1").parent().width()-1;
			
			var html = "<div id=\"seartip\" style=\"background-color: #fff;overflow: hidden;width:"+width+"px;z-index: 9999;border: 1px solid #4d76aa;position: absolute;left: "+left+"px;top: "+top+"px;\"></div>";
			
			$("form#search").append(html);
		}
		
		if($("#seartip").length == 1){
			var li = '';
			$.each(window.intelSearchData,function(id,value){
				var pat = new RegExp("^alibaba|^aliexpress");
				if(pat.test(value.keywords))return true;
				li = li+"<li se='n' onmouseover=\"$('#seartip ul li').css('background-color','#fff');$('#seartip ul li').children().css('color','#333');$('#seartip ul li').attr('se','n');$(this).children().css('color','#fff');$(this).attr('se','y');this.style.backgroundColor='#06c';$('input.defaultvalue.form_search1').val($(this).children().text());\"><a style=\"display:block;\" href=\"/search?q="+value.keywords+"\" onclick=\"javascript:$('input.defaultvalue.form_search1').val('"+value.keywords+"')\">"+value.keywords+"</a></li>";
			});
			$("#seartip").empty();
			$("#seartip").append("<ul style=\"padding-left: 10px;padding-right: 10px;\">"+li+"</ul>");
		}
	}
	
	this.hide = function(){
		$("#seartip").replaceWith("");
	}
	
	this.chiose = function(eq){
		$('#seartip ul li').css('background-color','#fff');
		$('#seartip ul li').children().css('color','#333');
		$('#seartip ul li').attr('se','n');
		$("#seartip ul li").eq(eq).children().css('color','#fff');
		$("input.defaultvalue.form_search1").val($("#seartip ul li").eq(eq).text());
		$("#seartip ul li").eq(eq).css("background-color","#06c");
		$("#seartip ul li").eq(eq).attr('se','y');
	}
}

function array2json(jsarray){
	var jsonstr = '';
	if (typeof jsarray == 'object'){
		jsonstr = '{';
		for (var i in jsarray){
			if (typeof jsarray[i] == 'object'){
				jsonstr += '"'+i+'":{"';
				for (var j in jsarray[i]){
					jsonstr +=　j+'":"'+encodeURIComponent(jsarray[i][j])+'","';
				}
				jsonstr = jsonstr.substring(0,jsonstr.length-2);
				jsonstr += '},';
			}else{
				jsonstr += '"'+i+'":"'+ encodeURIComponent(jsarray[i]) + '",';
			}
		}
		jsonstr = jsonstr.substring(0,jsonstr.length-1);
		jsonstr += '}';
	}
	return jsonstr;
}

//账户中心充值页面js
//打开银行转账表单
$(document).on('click',".add_int", function(){
	$(this).parent().parent().hide();
	$(this).parent().parent().next().show();
	$(this).parent().parent().parent().parent().children().eq(0).children().eq(1).attr('class','pure-u-1-3 text-center active');
})

//打开atm转账表单
$(document).on('click',".add_atm", function(){
	var key = $(this).attr('key');
	var val = $(this).attr('val');
	$(".transfer_name").attr('value',val);
	$(".transfer_key").attr('value',key);
	$(this).parent().parent().parent().parent().parent().hide();
	$(this).parent().parent().parent().parent().parent().next().show();
	$(this).parent().parent().parent().parent().parent().parent().parent().children().eq(0).children().eq(1).attr('class','pure-u-1-3 text-center active');

})

var can_submit=1;
var can_cancel=1;

//取消atm表单填写
$(document).on('click',".cancel_atm", function(){
        if(can_cancel==0)
        {
            return false;
        }
	$("input[name=transAmount_atm]").attr('checked',false);
	$("input[id=transAmountNum_atm]").val('');
	$("input[id=codeNum_atm]").val('');
	$("input[id=transNum_atm]").val('');
	$("input[id=transTime_atm]").val('');
	$("input[id=realName_atm]").val('');
	$(this).parent().parent().parent().parent().parent().children().eq(0).children().eq(1).attr('class','pure-u-1-3 text-center')
	$(this).parent().parent().parent().prev().show();
	$(this).parent().parent().parent().hide();
})

//填写好转账单后点击跳转至账户中心
$(document).on('click',".recharge_complete", function(){
    window.location.href='/myaccount/records';
});



//确认atm表单填写
$(document).on('click',".sure_atm", function(){
        if(can_submit==0)
        {
            return false;
        }
        can_submit=0;
	var transAmountNum=$("input[id=transAmountNum_atm]").val();
	if(transAmountNum<=0){
		alert("Amount must be greater than S$0 !");
                can_submit=1;
		return false;
	}
	
	$("#Transfer_Amount").html('S$'+transAmountNum);
	var transfer =$("input[name=transAmount_atm]").val();//选择收款账户
	if(transfer==0){
		alert("Please select a transfer account!");
                can_submit=1;
		return false;
	}
	
	
	var codeNum = $("input[id=codeNum_atm]").val();//账户账号
	if(!codeNum){
		alert("Account Number cannot be empty!");
                can_submit=1;
		return false;
	}
	
	var transNum = $("input[id=transNum_atm]").val();//转账流水号
	if(!transNum){
		alert("Transaction Number cannot be empty!");
                can_submit=1;
		return false;
	}
	$("#Transaction_No").html(transNum);
	
	var transTime = $("input[id=transTime_atm]");//转账时间
	transTime = transTime[0].value;
	if(!transTime){
		alert("Transferred Time cannot be empty!");
                can_submit=1;
		return false;
	}
	$('#Transferred_Time').html(transTime);
	
	var realName = $("input[id=realName_atm]").val();//用户真实姓名
	if(!realName){
		alert("Real Name cannot be empty!");
                can_submit=1;
		return false;
	}
	$('#Real_Name').html(realName);
	var dom =$(this);
        can_cancel=0;
	$.ajax({
		type: "post",
		dataType: "json",
		data: {"type":"atm","transfer":transfer,"transAmountNum":transAmountNum,"codeNum":codeNum,"transNum":transNum,"transTime":transTime,"realName":realName},
		url: "/ajax/recharge?m=bank_submit",
		success: function(data){
			if(data[0]=='suc'){
				dom.parent().parent().parent().parent().parent().children().eq(0).children().eq(2).attr('class','pure-u-1-3 text-center active')
				dom.parent().parent().parent().next().show();
				dom.parent().parent().parent().hide();
				$('.zmall_account_'+data[6]).show();
				$('#atm_Transfer_Amount').html(data[3]);
				$('#atm_Transaction_No').html(data[4]);
				$('#atm_Transferred_Time').html(data[5]);
				$('#atm_Real_Name').html(data[2]);
				
			}else if(data[0]=='fail'){
				alert('The transaction number you have entered already exists,please contact us via email');
				window.location.href='/myaccount/records';
			}else{
				alert(data[0]);
                                can_submit=1;
				return false;
			}
		},
		error: function(msg){
		}
	});
})

//头部搜索栏js
$(document).on('click','.check_url',function(){
	var textfield = $.trim($("input[name=textfield]").val());
	if(!textfield){
		return false;
	}else{
		location.href="/search?q="+encodeURI(encodeURI($.trim(textfield)));
		return true;
	}
})


function check(e) {
    var re = /^\d+(?=\.{0,1}\d+$|$)/
    if (e.value != "") {
        if (!re.test(e.value)) {
            alert("请输入正确的数字");
            e.value = "";
            e.focus();
        }
    }
} 














