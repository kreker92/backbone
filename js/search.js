/* 
1. вывод фильтров +
2. подсчет найденных товаров. вывод в синей рамке. +
3. сделать рабочие фильтры
4. вывести все фильтры
5. сделать анимацию фильтров
n-1. подверстать фильтры по всей ширине экрана
n. вывод только первого массива с кнопкой показать еще (x).
 */

var Request = Backbone.Model.extend({
	text: '',
	data: {},
	items: new Array(),
	filters: new Array(),
	countItems: new Array()
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

function insertTextInFields(formField, text) {
	for(i in formField) {
		formField[i].val(text);
	}
}

function launchSearch(text) {
	jQuery.ajax({
		url: 'http://ci.detectum.com:8080/ci/search?q=' + text,
		dataType: 'json'
	})
	.done(function(data) {
		request.data = data.results;
		console.log(request.data);
		request.data.length ? processResult(request.data) : alert('Товар не найден.');
		
		console.log(request.countItems);
		initSticky();
	})
	.fail(function(error) {
		console.log(error);
	});
}

function processResult(data) {
	var items = new Array();
	var itemSkeleton = $('.item').first().clone();
	var index = 0; //index for arr
	for(i in data) {
		if(data[i].items.length) {
			items[i] = new Array();
			for(j in data[i].items) { //get and process items
				items[i].push(wrapItem(data[i].items[j], itemSkeleton.clone()));
			}
			request.countItems.push(data[i].items.length);
			request.filters.push(getFilters(data[i], index));
			index += 1;
		}
	}
	request.items = processArrItems(items);
	
	// request.countItems = countItems(request.data);
	
	// console.log(request.items);
	showResult(request.items, request.filters);
}

function getFilters(data, i) { // call for each main arr element
	filterSkeleton = jQuery('.search-wrapper');
	filters = processFilterData(filterSkeleton.clone(), i);
	return filters;
}

function processFilterData(body, index) {
	// console.log(request.countItems);
	console.log(index);
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

function showResult(items, filters) {
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

