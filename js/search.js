/* 
1. Сделать вывод и сохранение данных фильтров для каждого набора для обработки кнопки "показать еще".
2. сделать кнопку "показать еще"
3. вывести все фильтры
4. сделать рабочие фильтры
5. сделать анимацию фильтров
n-1. подверстать фильтры по всей ширине экрана
 */

var Request = Backbone.Model.extend({
	text: '',
	data: {},
	items: new Array(),
	filters: new Array(),
	countItems: new Array(),
	itemsLimit: 4, // need to determine with approaching the site
	showMoreBtns: new Array()
});

var Router = Backbone.Router.extend({
	routes: {
		"?q=:query": "search"
	},
	search: function(query) {
		launchSearch(query);
		insertTextInFields([jQuery('.search-form input[type="text"]'), jQuery('.search-result  input[type="text"]')], query);
	}
});

var request = new Request();
var app = new Router();

jQuery(document).ready(function() {
	
	var form = jQuery('.search-form');
	setFormSubmit(form);
	
	Backbone.history.start({
		pushState: true
	});
	
});

function setFormSubmit(form) {
	form.on('submit', function() {
		request.set({ text: jQuery(this).find('input[type="text"]').val() });
		
		Backbone.history.navigate('?q=' + request.get('text') + '', {trigger: true});
		
		return false;
	});
}

function initShowMoreBtns() {
	jQuery('.more').each(function(i, e) {
		var data = { params: request.data[i].params, category_id: request.data[i].category_id, parent_cat: request.data[i].parent_cat };
		var offset = jQuery(this).attr('data-offset');
		var limit = '0';
		console.log(data); 
		jQuery(this).on('click', function() {
			jQuery.ajax({
				type: 'POST',
				url: 'http://ci.detectum.com/filter.json?offset=' + offset + '&limit=' + limit + '',
				data: data,
				dataType: 'json'
			})
			.done(function(data) {
				request.data.push(data)
				request.data.length ? processShowMore(data) : alert('Все товары уже отображены.');
			})
			.fail(function(error) {
				console.log(error);
			});
			
			// request.set({ offset: jQuery(this).attr('data-offset') });
			return false;
		});
	});
}

function processShowMore(items) {
	
}

function insertTextInFields(formField, text) {
	for(i in formField) {
		formField[i].val(text);
	}
}

function launchSearch(text) {
	jQuery.ajax({
		url: 'http://ci.detectum.com/search.json',
		data: { q: text, limit: request.itemsLimit },
		dataType: 'json'
	})
	.done(function(data) {
		request.data = data;
		// console.log(request.data);
		request.data.length ? processResult(request.data) : alert('Товар не найден.');
		// console.log(request.countItems);
		initSticky();
		initShowMoreBtns();
	})
	.fail(function(error) {
		console.log(error);
	});
}

function processResult(data) {
	var items = new Array();
	var itemSkeleton = jQuery('.item').first().clone();
	var showMoreSkeleton = jQuery('.more').first().clone();
	jQuery('.more').remove();
	var index = 0; //index for arr
	for(i in data) {
		// if(data[i].items.length) {
			items[i] = new Array();
			for(j in data[i].items) { //get and process items
				items[i].push(wrapItem(data[i].items[j], itemSkeleton.clone()));
			}
			request.countItems.push(data[i].total);
			request.filters.push(getFilters(data[i], index));
			index += 1;
			request.showMoreBtns.push(setshowMoreBtns(showMoreSkeleton.clone(), data[i].total-request.itemsLimit));
		// }
	}
	request.items = processArrItems(items);
	
	
	// request.countItems = countItems(request.data);
	
	// console.log(request.items);
	showResult(request.items, request.filters, request.showMoreBtns);
}

function getFilters(data, i) { // call for each main arr element
	filterSkeleton = jQuery('.search-wrapper');
	filters = processFilterData(filterSkeleton.clone(), i);
	return filters;
}

function processFilterData(body, index) {
	// console.log(request.countItems);
	// console.log(index);
	body.find('.result strong').text(request.countItems[index]); // insert countItems
	return body;
}

function processArrItems(arr) {
	//delete empty elements from arr
	var resArr = new Array();
	arr = $.map(arr, function(e, i) {
		return [e]
	});
	for(i in arr) {
		if(arr[i] != undefined) {
			resArr.push(arr[i]);
		}
	}
	return resArr;
}

function showResult(items, filters, showMoreBtns) {
	// console.log(filters);
	jQuery('.result-holder').empty();
	for(i in items) {
		// i > 0 ? jQuery(filters[i]).clone().appendTo('.result-holder').addClass('filter' + i + '') : '';
		jQuery(filters[i]).clone().appendTo('.result-holder').addClass('filter' + i + '');
		for(j in items[i]) {
			// j == false ? jQuery('<div class="result-block extra"></div>').appendTo('.result-holder') : '';
			if(j == false) {
				if(i == false) {
					jQuery('<div class="result-block main n' + i + '"></div>').appendTo('.result-holder');
				} else {
					jQuery('<div class="result-block extra n' + i + '"></div>').appendTo('.result-holder');
				}
			}
			jQuery(items[i][j]).clone().appendTo('.result-block.n' + i + '');
		}
		if(showMoreBtns[i]) {
			jQuery('.result-block.n' + i + '').append(showMoreBtns[i]);
		}
	}
}

function wrapItem(item, itemSkeleton) {
	// itemSkeleton.find('img').attr('src', '');
	itemSkeleton.find('h2 a').text(item.name);
	itemSkeleton.find('img').attr('src', '//blog.ihc.ru/wp-content/themes/patus/images/no-image-half-landscape.png');
	itemSkeleton.find('.price').text('');
	itemSkeleton.find('.rating').find('.active').removeClass('active');
	itemSkeleton.find('.row > a').text('0 отзывов');
	
	itemSkeleton.find('dl.description').empty();
	for(j in item.top_params) {
		itemSkeleton.find('dl.description').append('<dt><strong>' + item.top_params[j].name + '</strong>: </dt><dd>' + item.top_params[j].value + ' </dd>');
	}
	return itemSkeleton;
}

function setshowMoreBtns(skeleton, offset) {
	var resBtn = 0;
	jQuery(skeleton).attr('data-offset', offset).find('span').text(offset);
	offset > 0 ? resBtn = jQuery(skeleton) : resBtn = 0;
	return resBtn;
} 

function countItems(data) {
	var arr = new Array();
	for(i in data) {
		data[i].items.length ? arr.push(data[i].items.length) : '';
	}
	return arr;
}

function fadeBtnShowAll() {
	
	this.fadeNum = function() {
		// el.removeClass('active');
		// thisSticky.find('span.result').fadeIn(500);
		// thisSticky.find('a.link-more').fadeOut(500);
	}
	
	this.fadeBtn = function() {
		// el.addClass('active');
		// thisSticky.find('span.result').fadeOut(500);
		// thisSticky.find('a.link-more').fadeIn(500);
	}
}

function initSticky() {
	var headerHeight = jQuery('#header').outerHeight();
	var newStickies = new stickyTitles(jQuery(".search-wrapper"), headerHeight);
	newStickies.load();
	
	jQuery(window).on("scroll", function() {
		newStickies.scroll();
	}); 
}

function stickyTitles(stickies, fromTop) {
	
    this.load = function() {
        stickies.each(function(){
            var thisSticky = jQuery(this).wrap('<div class="followWrap" />');
            thisSticky.parent().height(thisSticky.outerHeight());

            jQuery.data(thisSticky[0], 'pos', thisSticky.offset().top);
        });
    }

    this.scroll = function() {
		var scrollTop = jQuery(document).scrollTop()
		if(!scrollTop) { 
			stickies.first().removeClass('active')
			stickies.first().find('span.result').fadeIn(500)
			stickies.first().find('a.link-more').fadeOut(500)
			// console.log(stickies.first().hasClass('active'));
		}
		
        stickies.each(function(i){
            var thisSticky = jQuery(this),
                nextSticky = stickies.eq(i+1),
                prevSticky = stickies.eq(i-1),
                pos = jQuery.data(thisSticky[0], 'pos');

			if(!thisSticky.hasClass('active') && thisSticky.hasClass('fixed') && !thisSticky.hasClass('absolute') && scrollTop > 0) { 
				thisSticky.addClass('active');
				thisSticky.find('span.result').fadeOut(500);
				thisSticky.find('a.link-more').fadeIn(500);
			} else if(thisSticky.hasClass('active') && (!thisSticky.hasClass('fixed') || thisSticky.hasClass('absolute'))) {
				thisSticky.removeClass('active');
				thisSticky.find('span.result').fadeIn(500);
				thisSticky.find('a.link-more').fadeOut(500);
			}
			
            if (pos <= jQuery(window).scrollTop() + fromTop) {
				
                thisSticky.addClass("fixed");

                if (nextSticky.length > 0 && thisSticky.offset().top >= jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight()) {

                    thisSticky.addClass("absolute").css("top", jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight() - fromTop);

                }

            } else {

				
                thisSticky.removeClass("fixed");

                if (prevSticky.length > 0 && jQuery(window).scrollTop() + fromTop <= jQuery.data(thisSticky[0], 'pos')  - prevSticky.outerHeight()) {

                    prevSticky.removeClass("absolute").removeAttr("style");

                }

            }
        });         
    }
}

