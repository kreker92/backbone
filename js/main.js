// page init
jQuery(function(){
	initOpenClick();
	initFadeGallery();
});
// init open slide
function initOpenClick() {
	var accordions = jQuery('.result-holder');
	accordions.each(function(){
		var accordion = jQuery(this);
		var items = accordion.find('.item:has(.gallery-section)');
		items.each(function(){
			var item = jQuery(this);
			console.log(item);
			var slide = item.find('.gallery-section');
			var opener = item.find('.open');
			var closing = item.find('.close');
			opener.bind('click', function(){
				if (item.hasClass('active')) {
					item.removeClass("active");
					slide.slideUp();
				}
				else {
					if(items.filter('.active').length > 0){
						items.filter('.active').removeClass('active').find('.gallery-section').slideUp();
					}
					item.addClass('active');
					slide.slideDown();
				}
				jQuery('html,body').stop().animate({
					scrollTop: jQuery(window).scrollTop() + 450
				},{
					duration: 400
				});
				return false;
			});
			closing.bind('click', function(){
				items.filter('.active').removeClass('active').find('.gallery-section').slideUp();
				jQuery('html,body').stop().animate({
					scrollTop:jQuery(window).scrollTop() - 450
				},{
					duration: 1000
				});
				return false;
			});
		})
	})
}
// init indent page
jQuery(window).bind('resize orientationchange load', function(){
	jQuery('.page').css({
		paddingTop: jQuery('#header').height()
	})
});
// init fade gallery
function initFadeGallery() {
	jQuery('.gallery-section').fadeGallery();
}
/*
 * jQuery Fade Gallery plugin
 */
(function($) {
	function FadeGallery(options) {
		this.options = $.extend({
			activeClass: 'active',
			slider: '.gallery',
			btnPrev: '.prev',
			btnNext: '.next',
			pagerLinks: '.switcher li',
			pagerList: '<ul>',
			pagerListItem: '<li><a href="#"></a></li>',
			pagerListItemText: 'a',
			pagerLinks: '.pagination li',
			generatePagination: '.switcher',
			autorotationActiveClass: 'autorotation-active',
			autoRotation: false,
			switchTime: 3000,
			animSpeed: 700
		}, options);
		this.init();
	}
	FadeGallery.prototype = {
		init: function() {
			this.findElements();
			this.attachEvents();
		},
		findElements: function() {
			var self = this;
			this.obj = $(this.options.holder);
			this.slider = this.obj.find(self.options.slider);
			this.slides = this.slider.children();
			this.btnPrev = this.obj.find(self.options.btnPrev);
			this.btnNext = this.obj.find(self.options.btnNext);
			this.len = this.slides.length;
			this.index = 0;
			this.animation = false;
			this.slides.css({opacity:0}).eq(this.index).addClass(this.options.activeClass).css({opacity:1});
			
			if(typeof this.options.generatePagination === 'string') {
				this.pagerHolder = this.obj.find(this.options.generatePagination).empty();
				this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
				for(var i = 0; i < this.len; i++) {
					$(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i+1);
				}
				this.pagerLinks = this.pagerList.children();
			} else {
				this.pagerLinks = this.obj.find(this.options.pagerLinks);
			}
		},
		attachEvents: function() {
			var self = this;
			// btnPrev click
			this.btnPrev.click(function(e){
				e.preventDefault();
				if(!self.animation){
					self.slidePrev();
				}
			});
			// btnNext click
			this.btnNext.click(function(e){
				e.preventDefault();
				if(!self.animation){
					self.slideNext();
				}
			});
			if(this.pagerLinks.length) {
				this.pagerLinksHandler = function(e) {
					e.preventDefault();
					self.index = self.pagerLinks.index(e.currentTarget);
					self.switchSlide();
				};
				this.pagerLinks.bind('click', this.pagerLinksHandler);
			}
			this.refreshState();
			this.autoRotate();
		},
		autoRotate: function() {
			var self = this;
			clearTimeout(this.timer);
			if(this.options.autoRotation) {
				this.obj.addClass(this.options.autorotationActiveClass);
				this.timer = setTimeout(function(){
					self.slideNext(true);
				}, this.options.switchTime);
			}
		},
		switchSlide: function(){
			var self = this;
			self.refreshState();
			var activeSlide = this.slides.eq(this.index);
			this.animation = true;
			this.slides.not(activeSlide).removeClass(self.options.activeClass).animate({opacity: 0}, {duration: self.options.animSpeed});
			activeSlide.addClass(self.options.activeClass).stop().animate({opacity: 1},{
				duration: self.options.animSpeed,
				complete: function() {
					self.animation = false;
					self.autoRotate();
				}
			});
		},
		slideNext: function(){
			var self = this;
			this.index++;
			if(this.index > this.len-1) self.index = 0;
			this.switchSlide();
		},
		slidePrev: function(){
			var self = this;
			this.index--;
			if(this.index < 0) self.index = self.len -1;
			this.switchSlide();
		},
		refreshState: function(){
			this.slider.css({height: this.slides.eq(this.index).outerHeight(true)});
			this.pagerLinks.removeClass(this.options.activeClass).eq(this.index).addClass(this.options.activeClass);
		}
	}
	$.fn.fadeGallery = function(options) {
		return this.each(function() {
			$(this).data('FadeGallery', new FadeGallery($.extend(options, {holder: this})));
		})
	}
}(jQuery));
/**!

	jQuery Custom Forms Plugin
	Version: 0.6.3
	Site: http://vebersol.net/demos/jquery-custom-forms/
	
	@author Vinícius Ebersol
	@license MIT License
	
*/

(function($){

	var CustomForm = function(element, options) {
		this.element = element;
		this.options = options;
		this.formElements = this.element.find('input, select');
		
		this.init();
	};
	
	CustomForm.prototype = {
		init: function() {
			this.setup();
			this.bind();
		},
		
		setup: function() {
			var _this = this;
			this.formElements.each(function() {
				_this.create($(this));
			});
		},
		
		bind: function() {
			var _this = this;
			
			$(document).bind('toggleFormElement', function(ev, element, fakeElement, className) {
				if (_this.isRadio(element)) {
					_this.toggleRadio(element, fakeElement, className);
				}
				else {
					_this.toggleCheckbox(element, fakeElement, className);
				}
			});
			
			$(document).bind('changeSelectValue', function(ev, element, fakeSelect) {
				var optionName = $(element).find('option:selected').html();
				fakeSelect.html(optionName);
			});
		},
		
		create: function(element) {
			var i,
				keyClass = this.options.keyClass.split(',');

			for (i = keyClass.length - 1; i >= 0; i--) {
				if (element.hasClass($.trim(keyClass[i]))) {
					if (element.get(0).nodeName == 'INPUT') {
						this.createCustomInput(element);
						return;
					}
					
					this.createCustomSelect(element);
				}
			}

		},
		
		createCustomSelect: function(element) {
			var _this = this,
				newValue,
				fakeSelect = this.createFakeElement(element, 'select');
			
			newValue = function() {
				$(document).trigger('changeSelectValue', [element, fakeSelect]);
			};
			
			if (this.options.enableWrapper === true) {
				element.wrap('<div class="' + this.setClass('wrapper') + '"></div>');
			}

			element.before(fakeSelect);
			element.on({
				change: function() {
					newValue();
				},
				focus: function() {
					fakeSelect.addClass(_this.setClass('focused'));
					newValue();
				},
				blur: function() {
					fakeSelect.removeClass(_this.setClass('focused'));
				},
				keyup: function() {
					newValue();
				},
				mousedown: function() {
					newValue();
				}
			});

			
			fakeSelect.attr('id', 'label_' + element.attr('id'));
			element.css({
				opacity: 0,
				position: 'relative',
				zIndex: 10,
				width: fakeSelect.outerWidth(),
				height: fakeSelect.outerHeight()
			});
		},
		
		createCustomInput: function(element) {
			var _this = this,
				toggleFormElement,
				fakeElement = this.createFakeElement(element, element.get(0).type),
				className = this.toSlug(element.attr('name'));

			fakeElement.addClass(className);
			element.addClass(className);
			
			
			element.before(fakeElement);
			element.css({
				opacity:0,
				position: 'absolute',
				left: -99999
			});
			
			toggleFormElement = function() {
				$(document).trigger('toggleFormElement', [element, fakeElement, className]);
			};
			
			if (element.attr('checked')) {
				fakeElement.addClass(this.setClass('checked'));
			}
			
			element.on({
				focus: function() {
					fakeElement.addClass(_this.setClass('focused'));
					if (_this.isRadio(element)) {
						toggleFormElement();
					}
				},
				blur: function() {
					fakeElement.removeClass(_this.setClass('focused'));
				},
				keypress: function(ev) {
					if (!ev.which && ((ev.charCode || ev.charCode === 0) ? ev.charCode: ev.keyCode)) {
						ev.which = ev.charCode || ev.keyCode;
					}
					
					if (_this.isRadio(element)) {
						toggleFormElement();
					}
					
				},
				change: function() {
					fakeElement.addClass(_this.setClass('focused'));
					if (_this.isRadio(element)) {
						toggleFormElement();
					} else {
						fakeElement.toggleClass(_this.setClass('checked'));
					}
				}
			});
			
			fakeElement.on({
				click: function() {
					if (_this.isRadio(element)) {
						toggleFormElement();
					}
					else {
						_this.toggleCheckbox(element, fakeElement, className);
					}
				}
			});
		},
		toggleRadio: function (element, fakeElement, className) {
		   $('span.' + className).removeClass(this.setClass('checked')).removeClass(this.setClass('focused'));
				element.click();
			fakeElement.addClass(this.setClass('checked')).addClass(this.setClass('focused'));
		},
		
		toggleCheckbox: function(element, fakeElement, className) {
			if (element.attr('checked')) {
				fakeElement.next('input.' + className).attr('checked', false);
				fakeElement.removeClass(this.setClass('checked'));
			}
			else {
				fakeElement.next('input.' + className).attr('checked', true);
				fakeElement.addClass(this.setClass('checked'));
			}
		},
		
		createFakeElement: function(element, type) {
			var value = (type == 'select') ? $(element).find('option:selected').html() : '',
				fakeElement = $('<span class="'+ this.setClass(type) +'">'+ value +'</span>');

			if (element.attr('disabled') !== undefined) {
				fakeElement.addClass(this.setClass('disabled'));
			}

			return fakeElement;
		},
		
		isRadio: function(element) {
			return element.get(0).type == 'radio';
		},
		
		setClass: function(name) {
			return this.options.prefix + name;
		},
		
		toSlug: function(text) {
			return text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
				
		}
	};

	var defaultOptions = {
		prefix: 'custom-form-',
		keyClass: 'cform',
		enableWrapper: false
	};
	
	
	$.fn.customForm = function(options) {
		options = $.extend(defaultOptions, options);
		return new CustomForm(this, options);
	};

})(jQuery);
// init custom form
var _forms = [];
var inputs = new Array();
var selects = new Array();
var texts = new Array();
var labels = new Array();
var radios = new Array();
var radioLabels = new Array();
var checkboxes = new Array();
var checkboxLabels = new Array();
var buttons = new Array();
var selects = new Array();
var all_selects = false;
var active_select = null;
var agt = navigator.userAgent.toLowerCase();
//this.ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
var isMac = is_mac();
var selectText = "please select";
var _timeouts = [];
var _stimeout = 500;

var IN_CFORMS = true;

function is_mac() {
	if (navigator.appVersion.indexOf("Safari") != -1)
	{
		if(!window.getComputedStyle)
		{
			return true;
		}
	}
	return false;
}

function init() {
	if(!document.getElementById) {return false;}
	getElements();
	separateElements();
	var _selects = document.getElementsByTagName('select');
	var _SelctClassName = [];
	if (_selects) {
		for (var i = 0; i < _selects.length; i++) {
			if (_selects[i].className != '' && _selects[i].className != 'outtaHere')
				_SelctClassName[i] = ' drop-'+_selects[i].className;
		}
		for (var i = 0; i < _SelctClassName.length; i++) {
			var _selectDrop = document.getElementById('optionsDiv'+i);
			if (_selectDrop) {
				if (_SelctClassName[i]) 
					_selectDrop.className += _SelctClassName[i];
			}
		}
	}
}


// getting all the required elements
function getElements() {
	for (var nf = 0; nf < document.getElementsByTagName("form").length; nf++) {
		for(var nfi = 0; nfi < document.forms[nf].getElementsByTagName("input").length; nfi++) {inputs.push(document.forms[nf].getElementsByTagName("input")[nfi]);}
		for(var nfl = 0; nfl < document.forms[nf].getElementsByTagName("label").length; nfl++) {labels.push(document.forms[nf].getElementsByTagName("label")[nfl]);}
		for(var nfs = 0; nfs < document.forms[nf].getElementsByTagName("select").length; nfs++) {selects.push(document.forms[nf].getElementsByTagName("select")[nfs]);}
	}
}

// separating all the elements in their respective arrays
function separateElements() {
	var r = 0; var c = 0; var t = 0; var rl = 0; var cl = 0; var tl = 0; var b = 0;
	for (var q = 0; q < inputs.length; q++) {
		if(inputs[q].type == "radio") {
			radios[r] = inputs[q]; ++r;
			for(var w = 0; w < labels.length; w++) {
				if((inputs[q].id) && labels[w].htmlFor == inputs[q].id)
				{
					radioLabels[rl] = labels[w];
					++rl;
				}
			}
		}
		if(inputs[q].type == "checkbox") {
			checkboxes[c] = inputs[q]; ++c;
			for(var w = 0; w < labels.length; w++) {
				if((inputs[q].id) && (labels[w].htmlFor == inputs[q].id))
				{
					checkboxLabels[cl] = labels[w];
					++cl;
				}
			}
		}
		if((inputs[q].type == "text") || (inputs[q].type == "password"))
		{
			texts[t] = inputs[q];
			++t;
		}
		if((inputs[q].type == "submit") || (inputs[q].type == "button")) {
			buttons[b] = inputs[q];
			++b;
		}
	}
}

window.onload = init;