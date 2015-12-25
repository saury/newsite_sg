$(function() {
    //zmall modual init
    var zmModual = (function() {
        var navOffset = 80;
        //checkbox toggle
        $(".zm-checkbox input").change(function() {
            var ele = $(this);
            if (this.checked) {
                ele.parent().children("i").css("display", "block");
            } else {
                ele.parent().children("i").css("display", "none");
            }
        });
        //scrollspy for brands page
        $('#brandNav').parents("body").addClass('zmBrandsPage');//add class name to the body to active the scrollspy
        $('.zmBrandsPage').scrollspy({
            target: '#brandNav',
            offset: navOffset + 1
        });
        //disable all the form's submit function
        $("form").submit(function() {
            return false;
        });
        //general affix overflow
        function callAffixOverflow() {
            $('[data-affix="overflow"]').each(function() {
                var ele = $(this);
                var offsetTop = ele.offset().top + ele.height() - $(window).height();// - parseInt(ele.css("margin-top").split("px")[0]);//element's marginTop
                //affix top = offset to top + own height - window's height
                ele.affix("destroy"); //destroy the affix function berfore
                if (offsetTop < 0) return false; //no affix while it is not overflow
                ele.affix({
                    offset: {
                        top: function() {
                            return offsetTop; // distance to the top
                        }
                    }
                });
            });
        };

        //left menu affix in account page
        $('[data-affix="aside"]').each(function() {
            var ele = $(this);
            ele.affix({
                offset: {
                    top: ele.offset().top - navOffset - 18, //no accuracy
                    bottom: function() {
                        return (this.bottom = $('footer').outerHeight(!0) + 44) //no accuracy
                    }
                }
            });
        });

        //active the tab inside the modal
        function activeModalTab() {
            $('[data-target^="#modal_"]').each(function() {
                var ele = $(this);
                var modal_target = ele.attr("data-target"); //get the whole modal target
                var opt = ele.attr("data-active"); //get the tab option
                var single = ele.attr("modal-single"); //check if single tab needed
                ele.on("click", function() {
                    //trigger the tab wanted
                    var _ele = $(modal_target + " .nav-tabs li a[href='#" + opt + "']");
                    _ele.trigger("click");
                    //hide the other tabs if needed 
                    if (single) {
                        var p_ele = _ele.parent();
                        p_ele.attr("class", "pure-u-1-1 active"); //adjust the tab's width
                        p_ele.siblings().remove(); //hide tabs
                    }
                });
            });
            // adjust the size if needed
            $('[data-toggle="tab"]').each(function() {
                var ele = $(this);
                var p_ele = ele.parents(".modal-dialog");
                var size = ele.attr("modal-size");
                ele.on("click", function() {
                    if (size) {
                        p_ele.addClass("modal-" + size);
                    } else {
                        p_ele.attr("class", "modal-dialog");
                    };
                });
            });
        };

        // filter modal
        $('[data-target^="#filter"]').each(function() {
            var ele = $(this);
            ele.on("click", function() {
                ele.parent().parent().css('visibility','hidden'); //hide the default filter panel
            });
        });
        // revert the default filter panel
        $('.prod-filter-detail').on('hide.bs.modal', function () {
          $(this).siblings().css('visibility','');
        });

        // function for setting the html template of the cart details
        function setCartContent(item, overflow) {
            //hide the "You have xx more items" when the num is 0
            var _overflowStr = '';
            if (overflow) _overflowStr = '<div class="mini-cart-hint cf"><p class="fll">You have <em>' + overflow + '</em> more items</p><p class="flr">Total: <em>S$234.23</em></p></div>';
            else _overflowStr = '';
            var _item=''; 
            $.each(item, function(i,data) {
                 _item +='<li class="mini-cart-item pure-g"><div class="pure-u-1-6"><img src="'+data.cart_p_image+'" class="img-responsive"></div><div class="pure-u-7-12"><p>'+data.cart_p_name+'</p><span>'+data.cart_p_attr+'</span></div><div class="pure-u-1-4 text-right"><em>'+data.cart_p_exchange_price+'</em><a href="#" class="btn-block cart_delete" cart_id="'+data.cart_id+'"><i class="ifont">&#xe60e;</i></a></div><li>';
            });
            
            //var _item = '<li class="mini-cart-item pure-g"><div class="pure-u-1-6"><img src="img/brands-thumb.jpg" class="img-responsive"></div><div class="pure-u-7-12"><p>Content content content</p><span>color: 1 Size: M</span></div><div class="pure-u-1-4 text-right"><em>S$234.56</em><a href="#" class="btn btn-warning hollow btn-xs">Delete</a></div><li>';
            // for (var i = 0; i < item.length; i++) {
            //     _item += "<li>"+item[i]+"</li>";
            // }

            //return the whole cart list string
            return '<ul class="list-unstyled mini-cart">' +
                _item +
                '</ul>' +
                _overflowStr +
                '<a class="btn btn-warning btn-sm flr" href="/shoppingcart/cart">Checking my cart</a>';
        };

        //function for the floor jumping
        function scrollToPosition(dom) {
            $("html, body").animate({
                scrollTop: dom.offset().top - navOffset + "px"
            }, {
                duration: 300,
                easing: "swing"
            });
            return false;
        };

        // select cascade
        function selectCascade(target, cnt) {
                var select = $('[select-cascade="' + target + '"]'); //targets
        var p_sel = select.eq(0); // 1st select
        var c_sel = select.eq(1); // 2st select
        var p_opt_arr = [];
        var c_opt = '<option value="0">Please select...</option>'; // default options
        var p_opt = c_opt; // default options
        for (var i in cnt) {
            p_opt_arr.push(i); // push the key to the options array
        }
        p_opt_arr.forEach(function(item) {
            p_opt += "<option value='" + (p_opt_arr.indexOf(item)+1) + "'>" + item + "</option>"; //loop and pack the options
        });

        //init the selects
        p_sel.empty().append(p_opt);
        c_sel.empty().append(c_opt);
        c_sel.prop('disabled', true);
        select.selectpicker('refresh');

        //cascading work when value changes
        p_sel.on('change', function() {
            var sel_val = $(this).val() - 1;
            for (var j in cnt) {
                // change according to the key
                if (p_opt_arr[sel_val] == j) {
                    c_sel.prop('disabled', false); //make the 2nd select selectable
                    c_opt = '<option value="0">Please select...</option>'; //init the option again
                    cnt[j].forEach(function(item) {
                        c_opt += "<option value='" + (cnt[j].indexOf(item)+1) + "'>" + item + "</option>"; //loop and pack the options
                    });
                    c_sel.empty().append(c_opt);
                    c_sel.selectpicker('refresh');
                }
                // recover the 2nd select to unselectable if the first's got no value or 0
                else if ($(this).val() == ''||$(this).val() == '0') {
                    c_sel.empty().append(c_opt);
                    c_sel.prop('disabled', true); //disable the select
                    c_sel.selectpicker('refresh');
                }
            }
        });

    };
        //return all the functions
        return {
            navOffset: navOffset,
            setCartCnt: setCartContent,
            scroll: scrollToPosition,
            activeMTab: activeModalTab,
            callAOF: callAffixOverflow,
            selCas:selectCascade
        };
    })();
    // bootstrap dropdown
    $('.dropdown-toggle').dropdown();
    // bootstrap carousel
    $('.carousel').carousel();
    // bootstrap popover
    $('[data-toggle="popover"]').each(function() {
        var element = $(this);
        var tiktak = function() {};
//        console.log(item);
//        console.log(shopcart_no);
        //var item = ["aaa", "bbb", "ccc", "ddd", "eee", "fff"]; //商品内容
        var overflow = shopcart_no > 5 ? (shopcart_no - 5) : 0; //超出商品显示限制条数
        element.on("mouseenter", function() {
            element.popover({
                trigger: 'manual',
                placement: 'bottom',
                html: 'true',
                content: zmModual.setCartCnt(item, overflow)
            });
            clearTimeout(tiktak);
            element.popover("show");
            element.siblings(".popover").on("mouseleave", function() {
                //element.popover('hide');
                element.popover('destroy');
            });
        }).on("mouseleave", function() {
           //item = ["aaa", "bbb", "ccc", "ddd", "eee"];
            overflow = shopcart_no > 5 ? (shopcart_no - 5) : 0;
            tiktak = setTimeout(function() {
                if (!$(".popover:hover").length) {
                    //element.popover("hide");
                    element.popover('destroy');
                }
            }, 500);
        });
    });
    //reset all the form value
    $("input[type=reset]").trigger("click");
    // init the href
    $(document).on("click", "[data-href]", function() {
        var ele = $(this);
        var linkHref = ele.attr("data-href");
        var newWindow = ele.attr("data-newWin");
        if (linkHref && newWindow) window.open(linkHref); //open in new window;
        else if (linkHref) window.location.href = linkHref; //open in self window;
        return false;
    });
    //nav scroll watch  
    $(window).scroll(function() {
        //hide the part of the nav when scrolled height > 80px
        if ($(document).scrollTop() > zmModual.navOffset) {
            $("header").addClass("hide");
        } else {
            //recover  
            $("header").removeClass("hide");
        }
    });
    // adjust the mainbody to make the footer always stick to the bottom
    var doc_height = $(document).height(),
        footerBottom_to_docTop = $('footer').offset().top + $('footer').height() + parseInt($('footer').css('padding-top')) + parseInt($('footer').css('padding-bottom'))
    var footer_suspend = doc_height - footerBottom_to_docTop;
    if(footer_suspend>0){
        $('.indexMain').css('min-height',$('.indexMain').height()+footer_suspend);
    }
    //active the tab inside the modal
    zmModual.activeMTab();
    //hover to show the category detail in banner left side
    $(".indexMain-category li").each(function() {
        var element = $(this);
        var tiktak = function() {};
        element.on("mouseenter", function() {
            tiktak = setTimeout(function() {
                element.children(".indexMain-catDtl").addClass("active");
            }, 500)
        }).on("mouseleave", function() {
            clearTimeout(tiktak);
            element.children(".indexMain-catDtl").removeClass("active");
        });
    });
    //floor jump
    //go down
    $(document).on("click",".indexMain-floor-elevator .glyphicon-chevron-down",function() {
        var ele = $(".indexMain-floor-elevator .glyphicon-chevron-down");
        var index = ele.index(this) + 1;
        var dom = $("#floor_" + (index + 1));
        //to bottom if it's the last icon-down
        if (index == ele.length) {
            dom = $("footer");
        }
        zmModual.scroll(dom);
        return false;
    });
    //go up
    $(document).on("click",".indexMain-floor-elevator .glyphicon-chevron-up",function() {
        var ele = $(".indexMain-floor-elevator .glyphicon-chevron-up");
        var index = ele.index(this);
        var dom = $("#floor_" + (index));
        //back to top if it's the 1st icon-up
        if (index == 0) {
            dom = $("html");
        }
        zmModual.scroll(dom);
        return false;
    });
    //brands floor nav - click jump
    $("#brandNav a").each(function() {
        var element = $(this);
        var dom = element.attr("href");
        element.click(function() {
            zmModual.scroll($(dom));
            return false; //prevent default anchor jumping
        })
    });
    //item detail gallary (optional)
    $('.carousel-stage').jcarousel({
        // Configuration goes here
    }).on('jcarousel:targetin', 'li', function(event, carousel) {
        // lazyload
        var element = $(this).find("img");
        var src_cur = element.attr("ssrc");
        element.attr("src", src_cur);
    });
    //active toggle
    // $('[active-toggle="true"]').each(function() {
    //     var ul_ele = $(this);
    //     ul_ele.children("li").each(function() {
    //         var li_ele = $(this);
    //         li_ele.on("click", function() {
    //             li_ele.toggleClass("active");
    //             li_ele.find("i").toggleClass("glyphicon-ok");
    //         });
    //     });
    // });
    //call Affix Overflow
    zmModual.callAOF();
    // gallary photo override
    $("[gallary-override]").each(function() {
        var ele = $(this),
            target = $(".detail-gallary-override");
        var arg = ele.attr("gallary-override"),//override the gallary photo or not
            src_400 = ele.children("img").attr("src");
        ele.on("click", function() {
            if (arg == "true") {
                target.children("img").attr("src",src_400.replace("40x40","400x400"));
                target.show();
            }
            else target.hide();
        });
    });
    //account page
    //left menu accordion
    $('.collapse').on('show.bs.collapse', function() {
        var prntEle = $(this).parent();
        prntEle.find(".glyphicon-chevron-down").addClass("rotate");
        prntEle.siblings().children('.collapse').collapse('hide');
    }).on('hide.bs.collapse', function() {
        $(this).parent().find(".glyphicon-chevron-down").removeClass("rotate");
    });
    //lightbox for item detail
    // delegate calls to data-toggle="lightbox"
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
    //delete the collections
//    $(document).on('click', '.acc-collect-op', function() {
//        var parentEle = $(this).parent().parent();
//        if (confirm("Delete it?")) {
//            parentEle.fadeOut();
//            setTimeout(function() {
//                parentEle.remove();
//            }, 400);
//        }
//        return false;
//    });
    // date picker general
    $('[data-active*="date_picker"]').each(function() {
        var ele = $(this);
        var date_type = ele.attr("data-active").split("_").pop(); //get the last child of the array
        switch (date_type) {
            case "birth": //birthday date picker
                ele.datetimepicker({
                    viewMode: 'years', //show the year 1st
                    // defaultDate: "",
                    format: 'YYYY-MM-DD',
                    pickTime: false
                });
                break;
            default:
                ele.datetimepicker({
                    viewMode: 'days',
                    showToday: true,
                    format: 'YYYY-MM-DD HH:mm',
                });
                break;
        }
    });

    // mock up data
    var select_cnt = {
        "Return": ["Merchandise does not match description", "Broken", "Poor Quality"],
        "Missing": ["Did not receive merchandise（More than 10 days）"]
    };
    // call cascading function
    zmModual.selCas("cascade1",select_cnt);//(target:"cascade1", data:select_cnt)
    // hide the img upload dom when the "Missing" is choosen
    $('[select-cascade="cascade1"]').eq(0).on("change",function(){
        if($(this).val()=="2"){
            $("." + $(this).attr("select-hide")).addClass("sr-only");
        }
        else{
            $("." + $(this).attr("select-hide")).removeClass("sr-only");
        }
    });
    //call normal tooltips
    $('[data-toggle="tooltip"]').tooltip();
    //call lazyload
    $(".lazy-sec img").lazyload();
});
