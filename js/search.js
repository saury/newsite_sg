
function getaobaolist(urijson,pagesize,pageno,retry,is_mobile_request){
	var catid=urijson.cat;
	var path=urijson.ppath;
	//alert(path);return false;
	var by=urijson.sort;
	var keyword=urijson.q;
	var uri = '';
	var start='';
	var title = "";
	var brand = "";
	var itemids = "";
	var select_name=urijson.select_name;
	var select_id=urijson.select_id;
	var discount_s0421 = parseInt( (new Date(2014, 04, 12, 17, 00, 00)).getTime()/ 1000 );
	var discount_e0421 = parseInt( (new Date(2014, 5, 5, 14, 00, 00)).getTime()/ 1000 );
	var now = parseInt( (new Date()).getTime()/ 1000 );
    var tip_name=new Array(); 
    var tip_value=new Array();
	$.each(urijson, function( key, value ) {
		uri = uri+'&'+key+'='+value;
	});
	//http://list.taobao.com/itemlist/default.htm?"+uri+"&_input_charset=utf-8&json=on&pSize="+pagesize+"&callback=?
	var urlForRquest = "http://world.taobao.com/search/json.htm?"+uri+"&_input_charset=utf-8&json=on&callback=?";
	var request = $.ajax({
		url:urlForRquest,
		dataType: 'jsonp',
		beforeSend: function(){
			$("#sale_box_4").html("<p id=\"listloading\" style=\"text-align: center;\"><img src=\"/Images/loading.gif\"></p>");
			$("#sale_box_3").html("<p id=\"listloading\" style=\"text-align: center;\"><img src=\"/Images/loading.gif\"></p>");
		},
		success:function(json){
			console.log(urlForRquest);
			console.log(json);
			console.log(json.findNum);
	    if(json.status==undefined)//防淘宝安全机制
	    {
		  if(retry==0)
		  {
			retry++;
			getaobaolist(urijson,pagesize,pageno,retry,is_mobile_request,s);
		  }
		  
		}
		if(json.itemListlength==0 && json.itemList.length == 0){
		var fr = refreshLocation();
		return false;
		}
		
//		if(is_mobile_request != 1)
//		{
//				if(json.selectedCondition.selectedPropertyList)
//				{	var pathu = ""+path+"";
//					$.each(json.selectedCondition.selectedPropertyList,function(k,item){
////						console.log(item.valueList);
//						$.each(item.valueList,function(k1,item1){
//							tip_name.push(item1.name);
//							tip_value.push(item1.value);
//						});
//						if((k+1)==json.selectedCondition.selectedPropertyList.length){
//							$.ajax({
//								type: "post",
//								dataType: "json",
//								data: {'tip_name':tip_name,'tip_value':tip_value},
//								url: "/ajax/search?m=tip_translate",
//								success: function(arr){
//									$.each(arr,function(key,val){
//										var preg_s = new RegExp(val.tip_value  + "(;)?");
//										$("#fonund_title_wenzi1_1").append("<a href='/search?q="+keyword+"&path="+pathu.replace(preg_s,'')+"&by="+by+"'><span class='prod-filter-remove'><i class='glyphicon glyphicon-remove'></i>"+val.tip_name+"</span></a>   ");
//
//									})
//								},
//								error: function(msg){
//				                				
//								}
//							});
//						}
//						
//					});
//				}
//		}
		var tip_name=new Array();
		if(json.autoNav.auxCategory[0]){
			var tip=json.autoNav.auxCategory[0].split(",");
			tip_name.push(tip[1]);
			var tip_html = "<li class='active' org_value='"+tip[1]+"'></li>";
			$("#all_tip").after(tip_html);
		}
		var crumbs_name=new Array();
		var crumbs_html="";
		if(json.autoNav.selectedProperties){
			$.each(json.autoNav.selectedProperties,function(key,item){
				$.each(item.subVids,function(k,v){
					crumbs_name.push(v.vname);
					crumbs_html+="<a href='javascript:void(0)' ppath='"+item.pid+":"+v.vid+"' class='cancel_crumbs' ><span class='prod-filter-remove' org_value='"+v.vname+"'><i class='glyphicon glyphicon-remove'></i></span></a>"
				});
			});
			$("#crumbs").append(crumbs_html);
		}
		
		var code = json.status.code;
		var url = json.status.url;
		var daohang = "<a style='float:left;' href=\"/\">首页 </a>";
		$("#daohang").prepend(daohang);
		if(code=='200'){
			//console.log(code);
			//显示图片,设置标题数据,显示价格
			if(json.itemList == undefined || json.itemList == null){
				$("#searching").empty();
				$("#searching").load("/themes/dg/no_results.htm");
				return false;
			}else{
				$("#sale_box_4").empty();
					var itemListlen = json.itemListlength || json.itemList.length;//itemList.length;
					var itemyu = itemListlen % 4;
					if(itemListlen == 0)
					{
						$("#searching").empty();
						$("#searching").load("/themes/dg/no_results.htm");
						return false;
					}
					var productCount = json.findNum;
					var islastpage = true;
					if(json.page.currentPage > productCount / json.page.pageSize && itemListlen < 40 ){
						islastpage = false;
					}
					var sellerInfo = "";
					var title=new Array();
					var price=new Array();
					var o_price=new Array();
					var image=new Array();
					var itemId=new Array();
					var list=new Array();
					var loc=new Array();
					$.each( json.itemList, function( key, item ) {
						//屏蔽店铺等级小于5的店铺
						if(item['ratesum']>5){
							loc[key]=item['loc'];
							title[key]=item['tip'];
							image[key]=item['image'];
							itemId[key]=item['itemId'];
							if(item['currentPrice']){
									price[key]=item['currentPrice'];
									o_price[key]=item['price'];
								}else{
									price[key]=item['price'];
									o_price[key]=item['price'];
								}
						}else{
							title[key]='1';
						}
					});
//					console.log(title);
					
					$.ajax({
						type: "post",
						dataType: "json",
						data: {"title":title,"price":price,"o_price":o_price,"loc":loc,"num_iids":itemId},
						url: "/ajax/shop",
						success: function(arr){
//							console.log(title.length);
//							console.log(arr['price'].length);
							for(var j = 0;j<arr['sell_loc'].length;j++){
								if(arr['sell_loc'][j]['num']==1&&arr['en_title'][j]!='1'){
									$(".item_box").append("<div class='col-md-3'>"+
											"<a href='/item/"+itemId[j]+".html' target='_blank'>"+
							                "<div class='indexMain-floor-item-wrap'>"+
							                    "<img src='"+image[j]+"_210x210.jpg' class='img-responsive'>"+
							                    "<span title='"+arr['en_title'][j]+"'>"+arr['en_title'][j]+"</span>"+
							                    "<p>S$"+arr['price'][j]+"<em>S$"+arr['o_price'][j]+"</em></p>"+
							                "</div>"+
							                "</a>"+
							            "</div>");
								}
							}
							$(".search_loading").hide();
						},
						error: function(msg){
		                				
						}
					});

				var lefthtml = new String("");
				var list_name = new Array();
				var list_value = new Array();
				//页面左侧的筛选框
				if(json.autoNav.navCategory){
					$.each(json.autoNav.navCategory,function( key, item ){
						lefthtml+="<div class='prod-filter'><dl><dt><b org_value='"+item.cname+"'></b></dt><hr></hr><dd><ul class='list-unstyled small'>";
						list_name.push(item.cname);
						$.each(item.subCids,function( k, v ){
							list_value.push(v.cname);
							lefthtml+= "<li data-value='"+v.cid+"' class='cat' org_value='"+v.cname+"'><div class='zm-checkbox xs'><input type='checkbox'><i class='glyphicon glyphicon-ok'></i></div></li>";
						});
						lefthtml+="</ul></dd></dl></div>";
					});
				}
				
				if(json.autoNav.property){
					$.each(json.autoNav.property,function(key,item){
						lefthtml+="<div class='prod-filter'><dl><dt><b org_value='"+item.pname+"'></b><a href='#' data-toggle='modal' data-target='#filter"+key+"' data-backdrop='false' class='btn btn-link btn-xs flr'>More</a></dt><hr></hr><dd><ul class='list-unstyled small'>"
						list_name.push(item.pname);
						var count = item.subVids.length;
						$.each(item.subVids,function(k,v){
							if(k<5&&(k!=(count-1))){
								list_value.push(v.vname);
								lefthtml+="<li data-value='"+item.pid+":"+v.vid+"' class='ppath' org_value='"+v.vname+"'><div class='zm-checkbox xs'><input type='checkbox'><i class='glyphicon glyphicon-ok'></i></div></li>";
							}else if((k==5)||((count<=6)&&(k==(count-1)))){
								list_value.push(v.vname);
								lefthtml+="<li data-value='"+item.pid+":"+v.vid+"' class='ppath' org_value='"+v.vname+"'><div class='zm-checkbox xs'><input type='checkbox'><i class='glyphicon glyphicon-ok'></i></div></li></ul></dd></dl><div class='prod-filter-detail' id='filter"+key+"' style='width: "+(158)*(Math.ceil(count/6))+"px;'><dl><dt><b org_value='"+item.pname+"'></b><a href='#' class='btn btn-link btn-xs flr' data-dismiss='modal' aria-label='Close'><i class='ifont glyphicon-remove'></i></a></dt><hr></hr><dd>";
							}
						});
						$.each(item.subVids,function(k,v){
							if((!(k%6))&&(k!=count)){
								list_value.push(v.vname);
								lefthtml+="<ul class='list-unstyled small fll'><li data-value='"+item.pid+":"+v.vid+"' class='ppath' org_value='"+v.vname+"'><div class='zm-checkbox xs'><input type='checkbox'><i class='glyphicon glyphicon-ok'></i></div></li>";
							}else if((!((k+1)%6))||(k==count)){
								list_value.push(v.vname);
								lefthtml+="<li data-value='"+item.pid+":"+v.vid+"' class='ppath' org_value='"+v.vname+"'><div class='zm-checkbox xs'><input type='checkbox'><i class='glyphicon glyphicon-ok'></i></div></li></ul>";
							}else{
								list_value.push(v.vname);
								lefthtml+="<li data-value='"+item.pid+":"+v.vid+"' class='ppath' org_value='"+v.vname+"'><div class='zm-checkbox xs'><input type='checkbox'><i class='glyphicon glyphicon-ok'></i></div></li>";
							}
						});
						lefthtml+="</dd></dl></div></div>";
					});
				}
				$('#leftlist').append(lefthtml);
				$.ajax({
					type: "post",
					dataType: "json",
					data: {"list_name":list_name,"list_value":list_value,"tip_name":tip_name,"crumbs_name":crumbs_name},
					url: "/ajax/search?m=trans_list",
					success: function(arr){
						$.each(arr.list_name,function(key,item){
							$("b[org_value='"+key+"']").append(item.trim());
						});
						$.each(arr.list_value,function(key,item){
							$("li[org_value='"+key+"']").append(item.trim());
						});
						$.each(arr.tip_name,function(key,item){
							$("li[org_value='"+key+"']").append(item.trim());
						});
						$.each(arr.crumbs,function(key,item){
							//alert(item);
							$("span[org_value='"+key+"']").append(item);
						});
						$('#leftlist').show();
					},
					error: function(msg){
	                				
					}
				});
/**				if(json.cat && json.cat.catList){
                    $.each(json.cat.catList,function(k,item){
                        if(k==0){
                            lefthtml+="<dl class='dl-horizontal' k='catList'><dt org_value='分类'>分类</dt><dd><ul class='list-inline'>";
                            list_name.push("分类");
                        }
                        if(k>0&&k<=11){
                            lefthtml+="<li><a href='/search?q="+keyword+"&cid="+item.value+"' target='_self' org_value='"+item.name+"' >"+item.name+"</a></li>";
                        }
                        if(k==12){
                        	lefthtml+="<li class='more'><a href='javascript:void(0);'><strong class='ft-warning'>More…</strong></a><li>"
                        }
                        if(k>=12){
                            lefthtml+="<li style='display:none'><a href='/search?q="+keyword+"&cid="+item.value+"' target='_self' org_value='"+item.name+"' >"+item.name+"</a></li>";
                        }
                        list_value.push(item.name);
                    });
                    lefthtml+="</ul></div></td></tr></tbody></table></ul></dd></dl>";
                }
                if(json.cat && json.cat.catGroupList){
                    $.each(json.cat.catGroupList,function(k1,item1){
                        lefthtml+="<dl class='dl-horizontal'  k='catGroupList'><dt org_value='"+item1.groupName+"'>"+item1.groupName+"</dt><dd><ul class='list-inline'>";
                        list_name.push(item1.groupName);
                        $.each(item1.catList,function(k,item){
                        	if(k<=11){
                                lefthtml+="<li><a href='/search?q="+keyword+"&cid="+item.value+"' target='_self' org_value='"+item.name+"'>"+item.name+"</a></li>";
                        	}
                        	if(k==12){
                            	lefthtml+="<li class='more'><a href='javascript:void(0);'><strong class='ft-warning'>More…</strong></a><li>"
                        	}
                        	if(k>=12){
                                lefthtml+="<li style='display:none'><a href='/search?q="+keyword+"&cid="+item.value+"' target='_self' org_value='"+item.name+"'>"+item.name+"</a></li>";
                        	}
                            list_value.push(item.name);
                        });
                        lefthtml+="</ul></div></td></tr></tbody></table></ul></dd></dl>";
                    });
                }

                if(json.propertyList){
                    $.each(json.propertyList,function(k1,item1){
                        if(item1.propertyList)
                        {
                            $.each(item1.propertyList,function(k,item){
                            if(k==0){
                                lefthtml+="<dl class='dl-horizontal'  k='propertyList'><dt org_value='"+item1.name+"'>"+item1.name+"</dt><dd><ul class='list-inline'>";
                                list_name.push(item1.name);
                            }
                            if(item1.name == "品牌"){
                                brand +=item.name+",";
                                if(k>0&&k<=11){
                                    lefthtml+="<li><a href='/search?q="+keyword+"&cid="+catid+"&path="+item.value+";"+path+"&amp;by=' target='_self' >"+item.name+"</a></li>";
                                }
                                if(k==12){
                                	lefthtml+="<li class='more'><a href='javascript:void(0);'><strong class='ft-warning'>More…</strong></a><li>"
                            	}
                                if(k>=12){
                                    lefthtml+="<li style='display:none'><a href='/search?q="+keyword+"&cid="+catid+"&path="+item.value+";"+path+"&amp;by=' target='_self' >"+item.name+"</a></li>";
                                }
                            }else{
                            	if(k<11){
                                	lefthtml+="<li><a href='/search?q="+keyword+"&cid="+catid+"&path="+item.value+";"+path+"&amp;by=' target='_self' org_value='"+item.name+"'>"+item.name+"</a></li>";
                            	}
                            	if(k==12){
                                	lefthtml+="<li class='more'><a href='javascript:void(0);'><strong class='ft-warning'>More…</strong></a><li>"
                            	}
                            	if(k>=12){
                                	lefthtml+="<li style='display:none'><a href='/search?q="+keyword+"&cid="+catid+"&path="+item.value+";"+path+"&amp;by=' target='_self' org_value='"+item.name+"'>"+item.name+"</a></li>";
                            	}
                                list_value.push(item.name);
                            }
                            });
                        }
                        lefthtml+="</ul></div></td></tr></tbody></table></ul></dd></dl>";
                    });
                }
			$(".list_box").html(lefthtml);**/
//				var ar=new Array();
//				ar['0']=new Array();
//				ar['0']['0']='sa';
//				var catList = JSON.stringify(ar);
//				var catGroupList = JSON.stringify(json.cat.catGroupList);
//				var propertyList = JSON.stringify(json.propertyList);
				
				
//				$.ajax({
//					type: "post",
//					dataType: "json",
//					data: {"list_value":list_value,"list_name":list_name},
//					url: "/ajax/search?m=search_list",
//					success: function(data){
//						 $.each(data.list_name,function(k,item){
//							 $("dt[org_value='"+k+"']").html(item);
//						 });
//						 $.each(data.list_value,function(k,item){
//							 $("a[org_value='"+k+"']").html(item);
//						 });
//						 $(".list_box").show();
//					},
//					error: function(msg){
//	                				
//					}
//				});
				
				$(".list_box").html(lefthtml);
				pagecount = Math.ceil(accDiv(productCount,pagesize));
				if(!(pagecount<=400))pagecount = 400;
				var now_url=window.location.href;
				$(".sale_page_box1").html(New_paging(pagecount,pageno,now_url,'&'));
//				$(".sale_page_box1").append(pageNavigation('/search?q='+keyword+'&path='+path+'&by='+by,productCount,pagecount,pageno,pagesize,3,'&'))
//									.show();
				
//				$.ajax({
//					url: '/ajax/productFilter',
//					type:'post',
//					data:{"title":encodeURIComponent(title),"brand":encodeURIComponent(brand),"itemids":encodeURIComponent(itemids),"sellerInfo":encodeURIComponent(sellerInfo)},
//					dataType: 'json',
//					success:function(json){
//					    if(json.promote_list)
//						{
//							for(var i in json.promote_list)
//							{
//							    $(".promote_img_"+json.promote_list[i]).html("<img src='/Images/celebrate.png'/>");
//
//							}
//						}
//						
//						if(json.tk)
//						{
//							for(var i in json.tk)
//							{
//								$("#sale_box_4 > div:eq("+(json.tk[i]-i)+")").remove();
//							}
//						}
//						if($("#sale_box_4 > div").length % 4 >0)
//						{
//							$("#sale_box_4 > div:gt("+($("#sale_box_4 > div").length-1-$("#sale_box_4 > div").length % 4)+")").remove();
//						}
//						if(json.bk)
//						{
//							for(var i in json.bk)
//							{
//								$("li > a:contains('"+json.bk[i]+"')").parent("li").remove();
//							}
//						}
//				
//					}
//				});
			}
		}else if(code=='302'){
			var ver = url.replace(/^.*?&ver=([^&]+)&.*?$/ig, "$1");
			if(ver!='' && ver!=undefined && ver!=null){
				urijson.ver = ver;
				getaobaolist(urijson);
			}else{
				var fr = refreshLocation();
				//$("#searching").empty();
				//$("#searching").load("/themes/dg/no_results.htm");
				return false;
			}
		}else{
			var fr = refreshLocation();
			//$("#searching").empty();
			//$("#searching").load("/themes/dg/no_results.htm");
			return false;
		}
		},
		error:function(json){
			//console.log(aaaaa);
			console.log(json);
		}
	});
}

function New_paging(pagecount,page_Num,pageurl,mark){
	var page_info ="";
	if(page_Num==1){
		page_info="<ul class='pagination'>"+
	        "<li class='disabled'><a href='#' aria-label='Previous'><span>&laquo;Last page</span></a></li>"+
	        "<li class='active'><a href='#'>1</a></li>";
		for(var j=2;j<=5;j++){
			if((j!=0)&&(j<=pagecount)){
				page_info+="<li><a href='"+pageurl+mark+"page="+j+"'>"+j+"</a></li>"
			}
		}
		if(pagecount!=1){
		    page_info+="<li><a href='"+pageurl+mark+"page=2' aria-label='Next'><span aria-hidden='true'>Next page&raquo;</span></a></li></ul>";
		}else{
		    page_info+="<li class='disabled'><a href='#' aria-label='Next'><span aria-hidden='true'>Next page&raquo;</span></a></li></ul>";
		}
	}else if(page_Num==pagecount){
		page_info="<ul class='pagination'>"+
        "<li><a href='"+pageurl+mark+"page="+(page_Num-1)+"' aria-label='Previous'><span aria-hidden='true'>&laquo;Last page</span></a></li>"+
        "<li><a href='"+pageurl+mark+"page="+(page_Num-4)+"'>1</a></li>"+
        "<li><a href='"+pageurl+mark+"page="+(page_Num-3)+"'>2</a></li>"+
        "<li><a href='"+pageurl+mark+"page="+(page_Num-2)+"'>3</a></li>"+
        "<li><a href='"+pageurl+mark+"page="+(page_Num-1)+"'>4</a></li>"+
        "<li class='active'><a href='#'>"+page_Num+"</a></li>"+
        "<li class='disabled'><a href='#' aria-label='Next'><span aria-hidden='true'>Next page&raquo;</span></a></li></ul>";
	}else {
		page_info="<ul class='pagination'><li><a href='"+pageurl+mark+"page="+(page_Num-1)+"' aria-label='Previous'><span aria-hidden='true'>&laquo;Last page</span></a></li>";
		for(var i=(page_Num-2);i<=(page_Num+2);i++){
			if((i!=0)&&(i<=pagecount)){
				if(i!=page_Num){
					page_info+="<li><a href='"+pageurl+mark+"page="+i+"'>"+i+"</a></li>";
				}else{
					page_info+="<li class='active'><a href='#'>"+i+"</a></li>";
				}
			}
		}
		page_info+="<li><a href='"+pageurl+mark+"page="+(page_Num-1)+"' aria-label='Next'><span aria-hidden='true'>Next page&raquo;</span></a></li></ul>";
	}
	page_info+="<div class='pagination-info'>"+
                "<span>"+pagecount+" pages total</span>"+
                "<span class='pagination-direct'>Turn to <input id='page_value' type='text' maxlength='3'> page</span>"+
                "<a href='javascript:void(0);' class='btn btn-warning go_page'>GO</a>"+
            "</div>"
    $(document).on('click','.go_page',function(){
    	var p_val=$('#page_value').val();
    	window.location.href=pageurl+mark+"page="+p_val; 
    })    
	return page_info;
}




//function pageNavigation(pageurl,rsnum,pages,pagecount,pagesize,showlong,mark){
//	var pcount = pages;
//	var page_info = "<ul class='pagination'>";
//	if ((pcount > 1) && (pcount == pagecount) ){
//		page_info = page_info + '<li><a aria-label="Previous" href="'+pageurl+mark+'page='+Math.round(pagecount-1)+'" class="page_next_1_off" onmouseover="this.className=\'page_next_1_on\';" onmouseout="this.className=\'page_next_1_off\';">上一页</a></li>';
//	}else if ((pagecount != 1) && (pcount != pagecount)){
//		page_info = page_info + '<li><a aria-label="Previous" href="'+pageurl+mark+'page='+Math.round(pagecount-1)+'" class="page_next_1_off" onmouseover="this.className=\'page_next_1_on\';" onmouseout="this.className=\'page_next_1_off\';">上一页</a></li>';
//	}
//	if (pagecount > 3){
//		page_info = page_info + '<div id="page_next_2">...</div>';
//	}
//	var endpage = '';
//	if (pcount > pagecount+showlong){
//		endpage = pagecount+showlong;
//	}else{
//		endpage = pcount;
//	}
//	for (var n = (pagecount-2); n <= endpage; n++){
//		if (!(n < 1)){
//			if (n == Math.round(pagecount)){
//				page_info = page_info + '<a href="javascript:void(0)" class="page_next_1_on" onmouseover="this.className=\'page_next_1_off\';" onmouseout="this.className=\'page_next_1_on\';">'+n+'</a>';
//			}else if(n < Math.round(pagecount)){
//				page_info = page_info + '<a href="'+pageurl+mark+'page='+n+'" class="page_next_1_off" onmouseover="this.className=\'page_next_1_on\';" onmouseout="this.className=\'page_next_1_off\';">'+n+'</a>';
//			}else{
//				page_info = page_info + '<a href="'+pageurl+mark+'page='+n+'" class="page_next_1_off" onmouseover="this.className=\'page_next_1_on\';" onmouseout="this.className=\'page_next_1_off\';">'+n+'</a>';
//			}
//		}
//	}
//	if (pagecount+showlong < pcount){
//		page_info = page_info + '<div id="page_next_2">....</div>';
//	}
//	if ((pagecount == 1) && (pcount != pagecount) && (pcount != 0)){
//		page_info = page_info + '<li><a aria-label="Previous" href="'+pageurl+mark+'page='+Math.round(pagecount + 1)+'" class="page_next_1_off" onmouseover="this.className=\'page_next_1_on\';" onmouseout="this.className=\'page_next_1_off\';">下一页</a></li>';
//	}else if ((pagecount != 1) && (pcount != pagecount)){
//		page_info = page_info + '<li><a aria-label="Previous" href="'+pageurl+mark+'page='+Math.round(pagecount + 1)+'" class="page_next_1_off" onmouseover="this.className=\'page_next_1_on\';" onmouseout="this.className=\'page_next_1_off\';">下一页</a></li>';
//	}
//	page_info = page_info +"</ul>";
//	page_info = page_info + '<span>'+pcount+' pages total</span>';
//	page_info = page_info + '<div id="page_next_2"><input name="page1" type="text" id="form_next_1" class="jump" style="width:30px;" value="1" id="jump"></div>';
//	page_info = page_info + '<div id="page_next_2">page</div>';
//	page_info = page_info + '<div id="page_next_1_off" style="float: left; width: 50px; margin-left: 50px;"><div style="border:1px solid #ccc"><input type="button" style="border:1;width:48px;height:25px;cursor:pointer;font-size:14px;background-color:#ffffff;" value="GO" onclick="window.location.href=\''+pageurl+mark+'page=\'+$(\'.jump\').val()"></div></div>';
//	return page_info;
//}

function show(t,e){
	if($(e).attr("class") == "display")
	{
		$(e).parent("dt").next("dd").children("ul").hide("fast");
		$(e).attr("class","undisplay");
		showmore(e,$(e).parent("dt").next("dd").children("ul").children("li").children("a").children("strong"),'hide');
	}
	else
	{
		$(e).parent("dt").next("dd").children("ul").show("fast");
		$(e).attr("class","display");
	}
}

function showmore(event,e,state){
	if(!$(".selected_more").not(":hidden").prev("li").is($(e).parents("li"))){
		$(".selected_more").not(":hidden").prev("li").children("a").css("background-image","url(/Images/dot-arrow-r01.gif)");
		$(".selected_more").not(":hidden").hide();
	}

	if(state=='hide'){
		$(e).parents("li").next("table").hide();
		$(e).parent().css("background-image","url(/Images/dot-arrow-r01.gif)");
		try{event.stopPropagation()}catch(e){};
		return;
	}
	
	if($(e).parents("li").next("table").is(":hidden")){
		$(e).parent().css("background-image","url(/Images/dot-arrow-d01.gif)");
	}else{
		$(e).parent().css("background-image","url(/Images/dot-arrow-r01.gif)");
	}
	
	$(e).parents("li").next("table").css("top",event.pageYOffset);
	$(e).parents("li").next("table").css("left",event.clientX);
	$(e).parents("li").next("table").toggle("fast");
	try{event.stopPropagation()}catch(e){};
	return;
}

function accMul(arg1,arg2){
	var m=0,s1=arg1.toString(),s2=arg2.toString();
	try{m+=s1.split(".")[1].length}catch(e){}
	try{m+=s2.split(".")[1].length}catch(e){}
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}

function accDiv(arg1,arg2){
	var t1=0,t2=0,r1,r2;
	try{t1=arg1.toString().split(".")[1].length}catch(e){}
	try{t2=arg2.toString().split(".")[1].length}catch(e){}
	with(Math){
	r1=Number(arg1.toString().replace(".",""));
	r2=Number(arg2.toString().replace(".",""));
	return (r1/r2)*pow(10,t2-t1);
	}
}


function refreshLocation()
{
	var refreshedtimes = parseInt($.cookie('refreshedtimes'));
	$.cookie('refreshedtimes',++refreshedtimes);
	if(refreshedtimes < 3) 
	{
		setTimeout(window.location.reload(true),1000);
	}
	else
	{
		$("#searching").empty();
		if(refreshedtimes == 3)
		{	
			$("#searching").html("<div style=\" width:980px; height:500px;text-align:center; font-size:14px;\"><img style=\"margin-top:140px;\" src=\"/Images/noinfopic.jpg\" /><br /><strong>现在访问用户太多啦！点击<a href=\"javascript:window.location.reload();\" target=\"_blank\">刷新</a>试试</strong> </div>");
		}
		else if(refreshedtimes > 3)
		{
			$("#searching").load("/themes/dg/no_results.htm");
		}
	}
	return false;
}