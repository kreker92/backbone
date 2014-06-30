// page init
jQuery(function(){
	initOpenClick();
	initFadeGallery();
	initScroll();
});
// init open slide
function initOpenClick() {
	var accordions = jQuery('.result-holder');
	accordions.each(function(){
		var accordion = jQuery(this);
		var items = accordion.find('>.item:has(.gallery-section)');
		items.each(function(){
			var item = jQuery(this);
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
		paddingTop: jQuery('#header').height() + 10
	})
});
// init fade gallery
function initFadeGallery() {
	jQuery('.gallery-section').fadeGallery();
}
// init fade gallery
function initScroll() {
	$(window).scroll(function(){
		var scrollTop = $(document).scrollTop();
		if (scrollTop > 0) {
			$('#header').addClass('active-state');
		}
		else
			$('#header').removeClass('active-state');
		if($('#header').hasClass('active-state'))
			{
				$('span.result').fadeOut(500);
				$('a.link-more').fadeIn(500);
			}
		else
			{
				$('span.result').fadeIn(500);
				$('a.link-more').fadeOut(500);
			}
		});
}
/*
 * jQuery Fade Gallery plugin
 */
;(function($) {
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
	//replaceRadios();
	//replaceCheckboxes();
	replaceSelects();
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

//replacing radio buttons
function replaceRadios() {
	for (var q = 0; q < radios.length; q++) {
		radios[q].className = "outtaHere";
		var radioArea = document.createElement("div");
		if(radios[q].checked) {
			radioArea.className = "radioAreaChecked";
		}
		else
		{
			radioArea.className = "radioArea";
		}
		radioArea.id = "myRadio" + q;
		radios[q].parentNode.insertBefore(radioArea, radios[q]);
		radios[q]._ra = radioArea;

		radioArea.onclick = new Function('rechangeRadios('+q+')');
		if (radioLabels[q])
		{
			radioLabels[q].onclick = new Function('rechangeRadios('+q+')');
		}
	}
	return true;
}

//checking radios
function checkRadios(who) {
	var what = radios[who]._ra;
	for(var q = 0; q < radios.length; q++) {
		if((radios[q]._ra.className == "radioAreaChecked")&&(radios[q]._ra.nextSibling.name == radios[who].name))
		{
			radios[q]._ra.className = "radioArea";
		}
	}
	what.className = "radioAreaChecked";
}

//changing radios
function changeRadios(who) {
	if(radios[who].checked) {
		for(var q = 0; q < radios.length; q++) {
			if(radios[q].name == radios[who].name) {
				radios[q].checked = false;
			} 
			radios[who].checked = true; 
			checkRadios(who);
		}
	}
}

//rechanging radios
function rechangeRadios(who) {
	if(!radios[who].checked) {
		for(var q = 0; q < radios.length; q++) {
			if(radios[q].name == radios[who].name)	{
				radios[q].checked = false; 
			}
			radios[who].checked = true; 
			checkRadios(who);
		}
	}
}

//replacing checkboxes
function replaceCheckboxes() {
	for (var q = 0; q < checkboxes.length; q++) {
		checkboxes[q].className = "outtaHere";
		var checkboxArea = document.createElement("div");
		if(checkboxes[q].checked) {
			checkboxArea.className = "checkboxAreaChecked";
		}
		else {
			checkboxArea.className = "checkboxArea";
		}
		checkboxArea.id = "myCheckbox" + q;
		checkboxes[q].parentNode.insertBefore(checkboxArea, checkboxes[q]);
		checkboxes[q]._ca = checkboxArea;
		checkboxArea.onclick = new Function('rechangeCheckboxes('+q+')');
		if (checkboxLabels[q])
		{
			checkboxLabels[q].onclick = new Function('changeCheckboxes('+q+')');
		}
		
		checkboxes[q].onkeydown = checkEvent;
	}
	return true;
}

//checking checkboxes
function checkCheckboxes(who, action) {
	var what = checkboxes[who]._ca;
	if(action == true) {
		what.className = "checkboxAreaChecked";
		what.checked = true;
	}
	if(action == false) {
		what.className = "checkboxArea";
		what.checked = false;
	}
}

//changing checkboxes
function changeCheckboxes(who) {
	if(checkboxes[who].checked) {
		checkCheckboxes(who, false);
	}
	else {
		checkCheckboxes(who, true);
	} 
}

//rechanging checkboxes
function rechangeCheckboxes(who) {
	var tester = false;
	if(checkboxes[who].checked == true) {
		tester = false;
	}
	else {
		tester = true;
	}
	checkboxes[who].checked = tester;
	checkCheckboxes(who, tester);
}

//check event
function checkEvent(e) {
	if (!e) var e = window.event;
	if(e.keyCode == 32) {for (var q = 0; q < checkboxes.length; q++) {if(this == checkboxes[q]) {changeCheckboxes(q);}}} //check if space is pressed
}

// replacing buttons
function replaceButtons() {
	for (var i = 0; i < buttons.length; i++) {
		// button holder
		var buttonHolder = document.createElement("div");
		buttonHolder.className = "buttonSubmit";		
		buttons[i].parentNode.appendChild(buttonHolder);
		
		// left image
		var buttonLeft = document.createElement("span");
		buttonLeft.className = "left";
		buttonHolder.appendChild(buttonLeft);
		
		// append button into holder
		buttonHolder.appendChild(buttons[i]);
		
		//right image
		var buttonRight = document.createElement('span');
		buttonRight.className = "right";
		buttonHolder.appendChild(buttonRight);
	}
}
//replacing selects
function replaceSelects() {
	for(var q = 0; q < selects.length; q++) {
	if (!selects[q].replaced && selects[q].offsetWidth && (selects[q].className.indexOf('inp-select') != -1))
{
	selects[q]._number = q;
			//create and build div structure
			var selectArea = document.createElement("div");
		
			var left = document.createElement("span");
			left.className = "left";
			selectArea.appendChild(left);
		
			var disabled = document.createElement("span");
			disabled.className = "disabled";
			selectArea.appendChild(disabled);
		
			selects[q]._disabled = disabled;
		
			var center = document.createElement("span");
			var button = document.createElement("a");
			var text = document.createTextNode(selectText);
			center.id = "mySelectText"+q;
			center.id = "mySelectText"+q;
			center._q = q;

			var stWidth = selects[q].offsetWidth;
			selectArea.style.width = stWidth + "px";

			button.href = "javascript:showOptions("+q+")";
			button.onkeydown = selectEvent;
			button.className = "selectButton";
			button._q = q;
			selectArea.className = "selectArea";
			selectArea.className += " " + selects[q].className;
			selectArea.id = "sarea"+q;
			center.className = "center";
			center.appendChild(text);
			selectArea.appendChild(center);
			selectArea.appendChild(button);
		
			//hide the select field
			selects[q].className += " outtaHere";
			//insert select div
			selects[q].parentNode.insertBefore(selectArea, selects[q]);
			//build & place options div

			var optionsDiv = document.createElement("div");
		
			var optionsList = document.createElement("ul");
			optionsDiv.appendChild(optionsList);
		
			selects[q]._options = optionsList;
		
			//optionsDiv.style.width = stWidth - 4 + "px";
			optionsDiv.style.width = stWidth - 0 + "px";
			optionsDiv._parent = selectArea;
			optionsDiv.className = "optionsDivInvisible";
			if(selects[q].className.indexOf('sl1') != -1){ optionsDiv.className += ' select-drop1 ';}
			optionsDiv.id = "optionsDiv"+q;
			optionsDiv._q = q

			
			optionsDiv.onmouseover = function()
		{
			if(_timeouts[this._q])
			{
				clearTimeout(_timeouts[this._q]);
			}
		}
		optionsDiv.onmouseout = function()
		{
			_elem = document.getElementById("optionsDiv"+this._q);
			if(_elem && _elem.className.indexOf("optionsDivVisible") !=-1 )
				_timeouts[this._q] = setTimeout('showOptions(' + this._q + ')',_stimeout);
		}
		button.onmouseover = optionsDiv.onmouseover;
		button.onmouseout = optionsDiv.onmouseout;
		center.onmouseover = optionsDiv.onmouseover;
		center.onmouseout = optionsDiv.onmouseout;
			populateSelectOptions(selects[q]);
			//selectArea.appendChild(optionsDiv);
			document.getElementsByTagName("body")[0].appendChild(optionsDiv);
			selects[q].replaced = true;
		}
	}
	all_selects = true;
}
//collecting select options
function populateSelectOptions(me) {
	me._options.innerHTML = "";
	
	for(var w = 0; w < me.options.length; w++) {
		
		var optionHolder = document.createElement('li');
		var optionLink = document.createElement('a');
		var optionTxt;
		if (me.options[w].title.indexOf('image') != -1) {
			optionTxt = document.createElement('img');
			optionSpan = document.createElement('span');
			optionTxt.src = me.options[w].title;
			optionSpan = document.createTextNode(me.options[w].text);
		} else {
			optionTxt = document.createTextNode(me.options[w].text);
		}
		
		optionLink.href = "javascript:showOptions("+me._number+"); selectMe('"+me.id+"',"+w+","+me._number+");";
		if (me.options[w].title.indexOf('image') != -1) {
			optionLink.appendChild(optionTxt);
			optionLink.appendChild(optionSpan);
		} else {
			optionLink.appendChild(optionTxt);
		}
		optionHolder.appendChild(optionLink);
		me._options.appendChild(optionHolder);
		//check for pre-selected items
		if(me.options[w].selected) {
			selectMe(me.id,w,me._number);
		}
	}
	if (me.disabled) {
		me._disabled.style.display = "block";
	}
	else {
		me._disabled.style.display = "none";
	}
}
//select event
function selectEvent(e) {
	if (!e) var e = window.event;
	var thecode = e.keyCode;
	switch(thecode){
		case 40: //down
			var fieldId = this.parentNode.parentNode.id.replace(/sarea/g, "");
			var linkNo = 0;
			for(var q = 0; q < selects[fieldId].options.length; q++) {if(selects[fieldId].options[q].selected) {linkNo = q;}}
			++linkNo;
			if(linkNo >= selects[fieldId].options.length) {linkNo = 0;}
			selectMe(selects[fieldId].id, linkNo, fieldId);
			break;
		case 38: //up
			var fieldId = this.parentNode.parentNode.id.replace(/sarea/g, "");
			var linkNo = 0;
			for(var q = 0; q < selects[fieldId].options.length; q++) {if(selects[fieldId].options[q].selected) {linkNo = q;}}
			--linkNo;
			if(linkNo < 0) {linkNo = selects[fieldId].options.length - 1;}
			selectMe(selects[fieldId].id, linkNo, fieldId);
			break;
		default:
			break;
	}
}
//selecting me
function selectMe(selectFieldId,linkNo,selectNo) {
	selectField = selects[selectNo];
	for(var k = 0; k < selectField.options.length; k++) {
		if(k==linkNo) {
			selectField.options[k].selected = true;
		}
		else {
			selectField.options[k].selected = false;
		}
	}
	
	//show selected option
	textVar = document.getElementById("mySelectText"+selectNo);
	var newText;
	var optionSpan;
	if (selectField.options[linkNo].title.indexOf('image') != -1) {
		newText = document.createElement('img');
		newText.src = selectField.options[linkNo].title;
		optionSpan = document.createElement('span');
		optionSpan = document.createTextNode(selectField.options[linkNo].text);
	} else {
		newText = document.createTextNode(selectField.options[linkNo].text);
	}
	if (selectField.options[linkNo].title.indexOf('image') != -1) {
		if (textVar.childNodes.length > 1) textVar.removeChild(textVar.childNodes[0]);
		textVar.replaceChild(newText, textVar.childNodes[0]);	
		textVar.appendChild(optionSpan);	
	} else {
		if (textVar.childNodes.length > 1) textVar.removeChild(textVar.childNodes[0]);
		textVar.replaceChild(newText, textVar.childNodes[0]);	
	}
	if (selectField.onchange && all_selects)
		{
			eval(selectField.onchange());
		}
}
//showing options
function showOptions(g) {
		_elem = document.getElementById("optionsDiv"+g);
		if (active_select && active_select != _elem) {
			active_select.className = active_select.className.replace("optionsDivVisible", "optionsDivInvisible");
			active_select.style.height = "auto";
		}
		if(_elem.className.indexOf("optionsDivInvisible") != -1) {
			_elem.style.left = "-9999px";
			_elem.style.top = findPosY(_elem._parent) + 34 + 'px';
			_elem.className = _elem.className.replace("optionsDivInvisible", "optionsDivVisible");
			if (_elem.offsetHeight > 200)
			{
				_elem.style.height = "200px";
			}
			_elem.style.left = findPosX(_elem._parent) + 1 +'px';
			
			active_select = _elem;
		}
		else if(_elem.className.indexOf("optionsDivVisible") !=-1) {
			_elem.style.height = "auto";
			_elem.className = _elem.className.replace("optionsDivVisible", "optionsDivInvisible");
		}
		//_elem.onmouseout = hideOptions;
}
function findPosY(obj) {
	var posTop = 0;
	while (obj.offsetParent) {posTop += obj.offsetTop; obj = obj.offsetParent;}
	return posTop;
}
function findPosX(obj) {
	var posLeft = 0;
	while (obj.offsetParent) {posLeft += obj.offsetLeft; obj = obj.offsetParent;}
	return posLeft;
}
window.onload = init;