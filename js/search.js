/*
 * jQuery SelectBox Styler v1.0.1
 * http://dimox.name/styling-select-boxes-using-jquery-css/
 *
 * Copyright 2012 Dimox (http://dimox.name/)
 * Released under the MIT license.
 *
 * Date: 2012.10.07
 *
 */
(function($) {
	$.fn.selectbox = function() {
		$(this).each(function() {
			var select = $(this);
			if (select.prev('span.selectbox').length < 1) {
				function doSelect() {
					var option = select.find('option');
					var optionSelected = option.filter(':selected');
					var optionText = option.filter(':first').text();
					if (optionSelected.length) optionText = optionSelected.text();
					var ddlist = '';
					for (i = 0; i < option.length; i++) {
						var selected = '';
						var disabled = ' class="disabled"';
						if (option.eq(i).is(':selected')) selected = ' class="selected sel"';
						if (option.eq(i).is(':disabled')) selected = disabled;
						ddlist += '<li' + selected + '>'+ option.eq(i).text() +'</li>';
					}
					var classForDiv = '';
					if(select.hasClass('hidden')) classForDiv = 'hidden';
					var selectbox =
						$('<span class="' + classForDiv + ' selectbox" style="display:inline-block;position:relative">'+
								'<div class="select" style="float:left;position:relative;z-index:10000"><div class="text">' + optionText + '</div>'+
									'<span class="trigger"></span>'+
								'</div>'+
								'<div class="dropdown" style="position:absolute;z-index:9999;overflow:auto;overflow-x:hidden;list-style:none">'+
									'<ul>' + ddlist + '</ul>'+
								'</div>'+
							'</span>');
					select.before(selectbox).css({position: 'absolute', top: -9999, right: -9999});
					var divSelect = selectbox.find('div.select');
					var divText = selectbox.find('div.text');
					var dropdown = selectbox.find('div.dropdown');
					var li = dropdown.find('li');
					var selectHeight = selectbox.outerHeight();
					if (dropdown.css('left') == 'auto') dropdown.css({left: '-1px'});
					if (dropdown.css('top') == 'auto') dropdown.css({top: selectHeight});
					var liHeight = li.outerHeight();
					var position = dropdown.css('top');
					dropdown.hide();
					/* при клике на псевдоселекте */
					divSelect.click(function() {
						/* умное позиционирование */
						var topOffset = selectbox.offset().top;
						var bottomOffset = $(window).height() - selectHeight - (topOffset - $(window).scrollTop());
						if (bottomOffset < 0 || bottomOffset < liHeight * 6)	{
							dropdown.height('auto').css({top: 'auto', bottom: position});
							if (dropdown.outerHeight() > topOffset - $(window).scrollTop() - 20 ) {
								dropdown.height(Math.floor((topOffset - $(window).scrollTop() - 20) / liHeight) * liHeight);
							}
						} else if (bottomOffset > liHeight * 6) {
							dropdown.height('auto').css('width', dropdown.parent().outerWidth()-2).css({bottom: 'auto', top: position});
							if (dropdown.outerHeight() > bottomOffset - 20 ) {
								dropdown.height(Math.floor((bottomOffset - 20) / liHeight) * liHeight);
							}
						}
						$('span.selectbox').css({zIndex: 1}).removeClass('focused');
						selectbox.css({zIndex: 2});
						if (dropdown.is(':hidden')) {
							$('div.dropdown:visible').hide();
							dropdown.show();
						} else {
							dropdown.hide();
						}
						return false;
					});
					/* при наведении курсора на пункт списка */
					li.hover(function() {
						$(this).siblings().removeClass('selected');
					});
					var selectedText = li.filter('.selected').text();
					/* при клике на пункт списка */
					li.filter(':not(.disabled)').click(function() {
						var liText = $(this).text();
						if ( selectedText != liText ) {
							$(this).addClass('selected sel').siblings().removeClass('selected sel');
							option.removeAttr('selected').eq($(this).index()).attr('selected', true);
							selectedText = liText;
							divText.text(liText);
							select.change();
						}
						dropdown.hide();
					});
					dropdown.mouseout(function() {
						dropdown.find('li.sel').addClass('selected');
					});
					/* фокус на селекте */
					select.focus(function() {
						$('span.selectbox').removeClass('focused');
						selectbox.addClass('focused');
					})
					/* меняем селект с клавиатуры */
					.keyup(function() {
						divText.text(option.filter(':selected').text());
						li.removeClass('selected sel').eq(option.filter(':selected').index()).addClass('selected sel');
					});
					/* прячем выпадающий список при клике за пределами селекта */
					$(document).on('click', function(e) {
						if (!$(e.target).parents().hasClass('selectbox')) {
							dropdown.hide().find('li.sel').addClass('selected');
							selectbox.removeClass('focused');
						}
					});
				}
				doSelect();
				// обновление при динамическом изменении
				select.on('refresh', function() {
					select.prev().remove();
					doSelect();
				})
			}
		});
	}
})(jQuery)

/* 
* Сделать вывод и сохранение данных фильтров для каждого набора для обработки кнопки "показать еще". (Ждем Access Origin) +
* сделать кнопку "показать еще" +
* сделать кнопку "показать все" (убирать анимацию с result на show more) +
* вывод в input text фильтра категории товара (не строки поиска) +
* заставить работать (выпадать) списки +
* выводить карточку товара с навигацией
* сделать itemLimit динамической (зависит от ширины экрана) +
* вывести все фильтры +
* сделать рабочие фильтры +
* сделать анимацию фильтров +-
* выводить активные фильтры при подробном запросе +
* сделать активные short-селекты !!!
* подверстать фильтры по всей ширине экрана +
* оптимизировать код !
* stickyTitles работает с косяками (ломается при подгузке остальных товаров)
	- при обновлении страницы нужно чуть подкрутить для появления в шапке экрана [возможно, сделать хак на сдвиг на 1 пиксель при обновлении страницы])
	- нужно делать reload при подгузке остальных товаров
* брать html из скрипта, а не клон из макета +
 */

/* ----  Main model  ---- */

var Request = Backbone.Model.extend({
	text: '',
	data: {},
	items: new Array(),
	filters: new Array(),
	params: new Array(), // active filters
	countItems: new Array(),
	itemsLimit: 12, // need to determine with approaching the site
	showMoreBtns: new Array()
});

var Router = Backbone.Router.extend({
	routes: {
		"?q=:query": "search"
	},
	search: function(query) {
		launchSearch(query);
		insertTextInFields([jQuery('.search-form input[type="text"]')], query);
	}
});

var request = new Request();
var app = new Router();

jQuery(document).ready(function() {
	
	var form = jQuery('.search-form'); // fixed form on top
	initFormSubmit(form);
	
	Backbone.history.start({
		pushState: true
	});
	
	request.itemsLimit = parseInt(jQuery(document).outerWidth() / jQuery('.item').outerWidth()) * 3; // dinamic items limit
	
});

/* ----  Functions for Main search and Filters  ---- */

function initFormSubmit(form) {
	form.on('submit', function() {
		request.set({ text: jQuery(this).find('input[type="text"]').val() });
		
		Backbone.history.navigate('?q=' + request.get('text') + '', {trigger: true});
		
		return false;
	});
}

function initFilters() {
	jQuery('.search-wrapper').each(function(i, e) {
		initFilterBlock(i, this);
		detectFilterBlockHeight(this);
		// jQuery(this).find('select').change(function() { // init select
			// setFilterVal(this, i);
		// });
	});
}

function detectFilterBlockHeight(block) {
	jQuery(block).parent().css('height', jQuery(block).outerHeight());
}

function setFilterCellWidth(el) {
	var width = 0;
	el.children().each(function() {
		console.log(jQuery(this).css('display'));
		(jQuery(this).css('position') != 'absolute' || jQuery(this).css('display') != 'none' ) ? width = width + jQuery(this).outerWidth() : '';
	});
	el.css('width', width);
}

function initFilterBlock(blockId, el) {
	// jQuery(el).find('.cell').each(function(i, e) {
		// setFilterCellWidth(jQuery(e));
	// });
	
	jQuery(el).find('select').change(function() { // init select
		setFilterVal(this, blockId);
	});
	jQuery(el).find('input[type="radio"]').change(function() {
		var val = jQuery(this).val();
		var select = jQuery(this).parent().parent().parent().parent().find('select');
		select.trigger('change');
		select.find('option').each(function() {
			if(jQuery(this).val() == val) {
				jQuery(this).trigger('click');
				jQuery(this).attr('selected', 'selected');
				jQuery(this).parent().parent().find('div.select .text').text(val);
				jQuery(this).parent().parent().find('div.dropdown li').each(function() {
					if(jQuery(this).hasClass('selected') && jQuery(this).hasClass('sel')) {
						jQuery(this).removeClass('selected');
						jQuery(this).removeClass('sel');
					} else if(jQuery(this).text() == val) {
						jQuery(this).addClass('selected');
						jQuery(this).addClass('sel');
					}
				});
			}
		});
	});
}

function setFilterVal(selected, index) {
	// console.log(selected);
	if(jQuery(selected).val() == 'Не важно' && jQuery(selected).parent().parent().parent().hasClass('search-result')) {
		moveSelectFromSearchResult(jQuery(selected).parent());
		getItemsWithFilters(selected, index, jQuery(selected).attr('name'), jQuery(selected).val(), false);
		// setFilterCellWidth(jQuery(selected).parent());
	} else if(jQuery(selected).val() != 'Не важно' && !jQuery(selected).parent().parent().parent().hasClass('search-result')) {
		moveSelectToSearchResult(jQuery(selected).parent());
		getItemsWithFilters(selected, index, jQuery(selected).attr('name'), jQuery(selected).val(), true);
		// setFilterCellWidth(jQuery(selected).parent());
	}
	
	// console.log(jQuery(selected).attr('name') + ': ' + jQuery(selected).val());
	// console.log(selected);
}

/* ----  Ajax functions  ---- */

function launchSearch(text) { // main search
	jQuery.ajax({
		url: 'http://ci.detectum.com/search.json',
		data: { q: text, limit: request.itemsLimit },
		dataType: 'json'
	})
	.done(function(data) {
		request.data = data;
		request.data.length ? processMainSearchResult(request.data) : alert('Товар не найден.');
		initSticky();
		initShowMoreBtns();
		initSelectBox();
		initFilters();
		scrollToTop();
		initSort();
	})
	.fail(function(error) {
		alert('Неизвестная ошибка. См. консоль.');
		console.log(error);
	});
}

function getItemsWithFilters(filter, i, name, val, newParam) {
	if(newParam) {
		request.data[i].params.push({name: name, value: val});
	} else {
		request.data[i].params = jQuery.grep(request.data[i].params, function(el) {
			if(el.name != name) return el;
		});
	}
	
	// console.log(i + ': ' + JSON.stringify(request.data[i].params));
	
	var data = { params: request.data[i].params, category_id: request.data[i].category_id, parent_cat: request.data[i].parent_cat, razbors: request.data[i].razbors };
	var limit = request.itemsLimit;
	
	jQuery.ajax({
		type: 'POST',
		url: 'http://ci.detectum.com/filter.json?limit=' + limit + '',
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8"
	})
	.done(function(data) {
		// console.log(data);
		processFilteredItems(data, i);
	})
	.fail(function(error) {
		// alert('Неизвестная ошибка. См. консоль.');
		console.log(error);
	});
}

function initShowMoreBtns() {
	jQuery('.more').each(function() {
		initBtn(jQuery(this));
	});
}

function initBtn(btn) {
	var i = btn.attr('data-result-block-id');
	
	var data = { params: request.data[i].params, category_id: request.data[i].category_id, parent_cat: request.data[i].parent_cat, razbors: request.data[i].razbors };
	
	var offset = btn.attr('data-offset');
	var limit = '0';
	
	btn.on('click', function() {
		var showMoreBtn = jQuery(this);
		showLoading(showMoreBtn);
		jQuery.ajax({
			type: 'POST',
			url: 'http://ci.detectum.com/filter.json?offset=' + request.itemsLimit + '&limit=' + limit + '',
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8"
		})
		.done(function(data) {
			request.data.push(data)
			request.data.length ? processShowMore(data.items, i) : alert('Все товары уже отображены.');
			hideShowMoreBtn(showMoreBtn);
		})
		.fail(function(error) {
			alert('Неизвестная ошибка. См. консоль.');
			console.log(error);
		});
		
		return false;
	});
	
	var linkMore = this;
	btn.parent().prev().find('.link-more').click(function() {
		btn.trigger('click');
		return false;
	});
}

function initSort() {
	jQuery('.sort-links a').click(function() {
		return false;
	});
}

/* ---  Process Content  ---- */

function constructItemSkeleton() {
	var img = '<img src="//blog.ihc.ru/wp-content/themes/patus/images/no-image-half-landscape.png" alt="" />';
	var header = '';
	var rating = '<ul class="rating"><li class="one-star" title="Rate this 1 star out of 5">1</li><li class="two-stars" title="Rate this 2 star out of 5">2</li><li class="three-stars" title="Rate this 3 star out of 5">3</li><li class="four-stars" title="Rate this 4 star out of 5">4</li><li class="five-stars" title="Rate this 5 star out of 5">5</li></ul>';
	var reviews = '<a href="#">0 отзывов</a>';
	var row = '<div class="row">' + rating + reviews +'</div>';
	var price = '<strong class="price"></strong>';
	var description = '<dl class="description"></dl>';
	var btns = '<div class="btn-box"><a class="btn" href="#">Купить</a><a href="#">Добавить в вишлист</a></div>';
	var gallerySection = jQuery(document.createElement('div')).addClass('gallery-section')
		.append('<div class="holder"></div>')
		.append('<a class="prev" href="#">Назад</a>')
		.append('<a class="next" href="#">Вперед</a>')
		.append('<a class="close" href="#">Закрыть</a>');
		
	jQuery(gallerySection).find('.holder').append('<ul class="gallery"><li>' + img + '<div class="holder">' + '<h3>' + header + '</h3>' + row + description + btns + '</div>' + '</li></ul>');
	
	var skeleton = jQuery(document.createElement('div'));
	jQuery(skeleton).addClass('item')
		.append('<div class="photo-holder"><a class="open" href="#">' + img + '</a></div>')
		.append('<h2><a class="open" href="#">' + header + '</a></h2>')
		.append(row)
		.append(price)
		.append(description)
		.append(gallerySection);
	
	return skeleton;
}

function constructShowMoreBtnSkeleton() {
	var skeleton = jQuery(document.createElement('a')).addClass('more')
		.attr('href', '#')
		.html('Показать еще (<span></span>)');
		
	return skeleton;
}

function constructFilterSkeleton() {
	var resultMore = '<span class="result"><strong></strong> найдено</span><a class="link-more" href="#show_all">Показать все</a>';
	var resultFields = '<fieldset><div class="cell"><input class="category-name" type="text" value="" disabled /></div>' + resultMore + '</fieldset>';
	var searchFilelds = '<fieldset></fieldset>';
	var sortLinks = '<strong class="title">Сортировать по:</strong><ul><li><a href="#popular">популярности</a></li><li><a href="#price">цене</a></li><li><a href="#date">новизне</a></li></ul>';
	var skeleton = jQuery(document.createElement('div')).addClass('search-wrapper')
		.append('<form class="search-result" action="#">' + resultFields + '</form>')
		.append('<form class="sort-form" action="#">' + searchFilelds + '</form>')
		.append('<div class="sort-links">' + sortLinks + '</div>');
		
	return skeleton;
}

function processShowMore(data, showMoreBtnId) {
	var items = new Array();
	var itemSkeleton = constructItemSkeleton();
	for(i in data) {
		items.push(wrapItem(data[i], itemSkeleton.clone()));
	}
	showLoadedItems(items, showMoreBtnId);
}

function showLoadedItems(items, showMoreBtnId) { // findng last item and insert new after it. need to reinitialise stickies!
	for(i in items) {
		var item = items[i];
		jQuery('.more[data-result-block-id="' + showMoreBtnId + '"]').parent().find('.item').last().after(item);
	}
	// initSticky();
}

function insertTextInFields(formField, text) { // insert query-words in search form
	for(i in formField) {
		formField[i].val(text);
	}
}

function processMainSearchResult(data) {
	clearOldInfoFromRequestArrays();
	
	var items = new Array();
	
	var itemSkeleton = constructItemSkeleton(); 			// var itemSkeleton = jQuery('.item').first().clone();
	var showMoreSkeleton = constructShowMoreBtnSkeleton(); 	// var showMoreSkeleton = jQuery('.more').first().clone();
	
	jQuery('.more, .followWrap, .result-block').remove();
	
	// var index = 0; //index for arr
	for(i in data) {
		items[i] = new Array();
		for(j in data[i].items) { //get and process items
			items[i].push(wrapItem(data[i].items[j], itemSkeleton.clone()));
		}
		
		request.countItems.push(data[i].total);
		request.filters.push(getFilters(data[i], i));
		request.showMoreBtns.push(setshowMoreBtns(showMoreSkeleton.clone(), data[i].total-request.itemsLimit, i));
		
		request.params.push(getParams(data[i].params, i));
		
		// index += 1;
	}
	request.items = processArrItems(items);
	
	showResult(request.items, request.filters, request.showMoreBtns, request.params);
}

function getFilters(itemsBlockData, i) { // call for each main arr element
	// filterSkeleton = jQuery('.search-wrapper');
	var filterSkeleton = constructFilterSkeleton();
	var filters = processFilterData(filterSkeleton.clone(), i, itemsBlockData);
	return filters;
}

function getParams(params, index) {
	var paramsArr = new Array();
	var paramSkeleton = jQuery(constructFilterSkeleton()).find('.search-result fieldset');
	jQuery.each(params, function(i, e) {
		paramsArr.push(processParamsData(this, paramSkeleton, index));
	});
	
	// console.log(paramsArr);
	return paramsArr;
}

function processParamsData(data, body, index) {
	var params = '';
	body.find('.cell .selectbox').parent().remove();
	
	params += '<div class="cell"><label data-filter-id="' + index + '" for="label'+ index +'">'+ data.name +'</label><select name="' + data.name + '" class="label'+ index +'"><option>' + data.value + '</option><option class="none">Не важно</option></select></div>';
	
	return params;
}

function processFilteredItems(data, blockId) {
	var block = jQuery('.result-block[data-result-block-id="' + blockId + '"]');
	block.find('div, .more').remove();
	// block.append('<pre>' + JSON.stringify(data) + '</pre>');
	var items = new Array();
	var itemSkeleton = constructItemSkeleton();
	for(i in data.items) {
		items.push(wrapItem(data.items[i], itemSkeleton.clone()));
	}
	request.items[blockId] = items;
	showFilteredResult(items, data, blockId)
}

function showFilteredResult(items, data, blockId) {
	
	setItemsTotal(blockId, data.total);
	request.filters[blockId] = jQuery(getFilters(data, blockId).find('.sort-form'));
	jQuery('.search-wrapper.filter' + blockId + ' .sort-form').remove();
	jQuery(request.filters[blockId]).insertAfter('.search-wrapper.filter' + blockId + ' .search-result');
	initFilterBlock(blockId, '.sort-form');
	initOneSelectbox(jQuery('.search-wrapper.filter' + blockId + ' .sort-form'));
	
	var block = jQuery('.result-block[data-result-block-id="' + blockId + '"]');
	for(i in items) {
		var item = items[i];
		block.append(item);
	}
	
	var showMoreSkeleton = constructShowMoreBtnSkeleton();
	request.showMoreBtns[blockId] = setshowMoreBtns(showMoreSkeleton.clone(), data.total-request.itemsLimit, blockId);
	if(request.showMoreBtns[blockId]) {
		jQuery('.result-block.n' + blockId + '').append('<div class="clr"></div>').append(request.showMoreBtns[blockId]);
	}
	if(jQuery('.result-block.n' + blockId + ' .more').length) initBtn(jQuery('.result-block.n' + blockId + ' .more'));
}

function setItemsTotal(blockId, total) {
	request.countItems[blockId] = total;
	jQuery('.search-wrapper.filter' + blockId + ' .result strong').text(total);
}

function processFilterData(body, blockIndex, itemsBlockData) {
	// body.append('<pre>' + JSON.stringify(itemsBlockData.filters) + '</pre>'); // check data
	body.find('.category-name').val(itemsBlockData.category);
	body.find('.result strong').text(request.countItems[blockIndex]); // insert countItems
	// body.find('.result strong').text(''); // insert countItems
	body.find('.sort-form').empty();
	// body.find('.search-result .cell').each(function() {
		// if(jQuery(this).find('select').length) {
			// jQuery(this).remove();
		// }
	// });
	
	var filters = jQuery(document.createElement('fieldset'));
	var index = 0;
	
	jQuery.each(itemsBlockData.filters.top, function(i, e) { // collecting filters
		// use html object, not string!
		filters.append('<div class="cell"><label data-filter-id="' + index + '" for="label'+ index +'">'+ i +'</label></div>');
		jQuery.each(this, function(j, f) {
			if(j == 0) {
				filters.children().last().append('<ul class="short label'+ index +'"></ul>');
			}
			filters.find('ul.label' + index + '').append('<li><label><input type="radio" name="' + i + '" value="' + this + '" />'+ this +'</label></li>');
		});
		// console.log(itemsBlockData.filters.all[i].length );
		if(itemsBlockData.filters.all[i] != undefined) {
			var hiddenClass = '';
			if(itemsBlockData.filters.all[i].length <= itemsBlockData.filters.top[i].length) hiddenClass = 'hidden';
			jQuery.each(itemsBlockData.filters.all[i], function(j, f) {
				if(j == 0) {
					filters.children().last().append('<select name="' + i + '" class="' + hiddenClass + ' label'+ index +'"><option class="none">Не важно</option></select>');
				}
				filters.find('select.label' + index + '').append('<option>'+ this +'</option>');
			});
		}
		index += 1;
	});
	// append filters in itemsBlockData
	body.find('.sort-form').append(filters);
	// console.log(itemsBlockData.filters);
	return body;
}

function showResult(items, filters, showMoreBtns, params) {
	
	jQuery('.result-holder').empty();
	for(i in items) {
		// i > 0 ? jQuery(filters[i]).clone().appendTo('.result-holder').addClass('filter' + i + '') : '';
		jQuery(filters[i]).clone().appendTo('.result-holder').addClass('filter' + i + '');
		
		jQuery.each(params[i], function(j, el) {
			// console.log(i + ' ' + jQuery(el).find('label').text());
			jQuery(el).insertBefore('.search-wrapper.filter' + i + ' .search-result .result');
		});
		
		for(j in items[i]) {
			// j == false ? jQuery('<div class="result-block extra"></div>').appendTo('.result-holder') : '';
			if(j == false) {
				if(i == false) {
					jQuery('<div data-result-block-id="' + i + '" class="result-block main n' + i + '"></div>').appendTo('.result-holder');
				} else {
					jQuery('<div data-result-block-id="' + i + '" class="result-block extra n' + i + '"></div>').appendTo('.result-holder');
				}
			}
			jQuery(items[i][j]).clone().appendTo('.result-block.n' + i + '');
		}
		if(showMoreBtns[i]) {
			jQuery('.result-block.n' + i + '').append('<div class="clr"></div>').append(showMoreBtns[i]);
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

function setshowMoreBtns(skeleton, offset, index) {
	var resBtn = 0;
	jQuery(skeleton).attr('data-offset', offset).attr('data-result-block-id', index).find('span').text(offset);
	offset > 0 ? resBtn = jQuery(skeleton) : resBtn = 0;
	return resBtn;
}


/* ----  Animation Functions  ---- */

function initSticky() {
	var headerHeight = jQuery('#header').outerHeight();
	var newStickies = new stickyTitles(jQuery(".search-wrapper"), headerHeight);
	newStickies.load();
	
	// jQuery(window).on("scroll", function() {
		// newStickies.scroll();
	// }); 
}

function stickyTitles(stickies, fromTop) { // filters fixed moving
	
    this.load = function() {
		if(stickies.first().parent().hasClass('followWrap')) {
			console.log('reloading stickies!');
			stickies.each(function(i) {
				var thisSticky = jQuery(this).unwrap();
				thisSticky.removeClass('toggled');
			});
		}
        stickies.each(function(i){
            var thisSticky = jQuery(this).wrap('<div class="followWrap" />');
			if(thisSticky.parent().next().find('.more').length) {
				thisSticky.addClass('toggled');
			}
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
				
			if(jQuery(this).hasClass('toggled')) {
				if(!thisSticky.hasClass('active') && thisSticky.hasClass('fixed') && !thisSticky.hasClass('absolute') && scrollTop > 0) {
					thisSticky.addClass('active');
					thisSticky.find('span.result').fadeOut(500);
					thisSticky.find('a.link-more').fadeIn(500);
				} else if(thisSticky.hasClass('active') && (!thisSticky.hasClass('fixed') || thisSticky.hasClass('absolute'))) {
					thisSticky.removeClass('active');
					thisSticky.find('span.result').fadeIn(500);
					thisSticky.find('a.link-more').fadeOut(500);
				}
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

function initSelectBox() {
	if(jQuery('.selectbox').length) {
		jQuery('.search-wrapper select').trigger('refresh'); 
	} else {
		jQuery('.search-wrapper select').selectbox();
	}
}

function initOneSelectbox(el) {
	el.find('select').selectbox();
}

/* ----  Additional Functions  ---- */

function processArrItems(arr) {
	//delete empty elements from arr
	var resArr = new Array();
	arr = jQuery.map(arr, function(e, i) {
		return [e]
	});
	for(i in arr) {
		if(arr[i] != undefined) {
			resArr.push(arr[i]);
		}
	}
	return resArr;
}

function hideShowMoreBtn(el) {
	el.hide();
	el.parent().prev().find('span.result').fadeIn(500);
	el.parent().prev().find('a.link-more').fadeOut(500);
	el.parent().prev().find('.search-wrapper').removeClass('toggled'); // turn off the switching
}

function showLoading(el) {
	el.click(function() {
		return false;
	});
	el.text('Загрузка ... ');
}

function clearOldInfoFromRequestArrays() { // cleaning arrays from old info
	request.countItems.length = 0; 
	request.filters.length = 0;
	request.showMoreBtns.length = 0;
	request.params.length = 0;
}

function scrollToTop() {
	window.scrollTo(0, 0);
}

function moveSelectToSearchResult(filter) {
	filter.find('ul');
	filter.appendTo(filter.parent().parent().parent().find('.search-result fieldset'));
}

function moveSelectFromSearchResult(filter) {
	filter.find('ul.short li input:checked').each(function() {
		jQuery(this).attr('checked', false);
	});
	filter.parent().parent().parent().find('.sort-form fieldset').append(filter);
}
