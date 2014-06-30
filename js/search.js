/* 
1. вывод фильтров
2. подсчет найденных товаров. вывод в синей рамке.
3. вывод только первого массива с кнопкой показать еще (x).
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
		request.data = data;
		data.length ? processResult(request.data) : alert('Товар не найден.');
		request.countItems = countItems(request.data);
		console.log(request.countItems);
	})
	.fail(function(error) {
		console.log(error);
	});
}

function processResult(data) {
	var items = new Array();
	var itemSkeleton = $('.item').first().clone();
	for(i in data) {
		if(data[i].items.length) {
			request.filters.push(getFilters(data[i]);
			items[i] = new Array();
			for(j in data[i].items) {
				items[i].push(wrapItem(data[i].items[j], itemSkeleton.clone()));
			}
		}
	}
	request.items = processArrItems(items);
	
	showResult(request.items);
}

function getFilters(data) { // call for each main arr element
	filterSkeleton = getFilterSkeleton();
	return filters;
	
}

function getFilterSkeleton() {
	skeleton = jQuery('.search-result, .sort-form, .sort-links');
	return skeleton;
}

function processArrItems(arr) {
	//delete empty elements from arr
	for(i in arr) {
		arr[i].length ? '' : delete arr[i];
	}
	return arr;
}

function showResult(items) {
	// console.log(items);
	jQuery('.result-holder').empty();
	for(i in items) {
		
		for(j in items[i]) {
			jQuery(items[i][j]).clone().appendTo('.result-holder');
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
