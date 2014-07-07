<!DOCTYPE html>
<html class="no-js" lang="ru-ru" slick-uniqueid="3">
<head>
	<title>Detectum</title>
	<meta charset="utf-8">
	<base href="http://backbone.kreker92.tmweb.ru/">
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	
	<link media="all" type="text/css" rel="stylesheet" href="css/all.css">
	
	<script type="text/javascript" src="/js/jquery.min.js"></script>
	<script type="text/javascript" src="/js/underscore-min.js"></script>
	<script type="text/javascript" src="/js/backbone-min.js"></script>
	<script type="text/javascript" src="/js/backbone.queryparams.js"></script>
	<script type="text/javascript" src="/js/main.js"></script>
	<script type="text/javascript" src="/js/search.js"></script>
	<!--[if gte IE 9]>
		<style type="text/css">
			.gradient {filter: none;}
		</style>
	<![endif]-->
	<style type="text/css">
		.selectArea.outtaHere { position: absolute; }
	</style>
</head>
<body>
	<!-- page -->
	<div class="page">
		<!-- header -->
		<div id="header">
			<div class="header-holder">
				<div class="header-row">
					<strong class="logo"><a href="/">Detectum</a></strong>
					<form class="search-form" action="#">
						<fieldset>
							<input type="text" value="лестница">
							<input type="submit" value="Найти">
						</fieldset>
					</form>
				</div>
			</div>
		</div>
		<!-- main -->
		<div id="main">
			<!-- result-section -->
			<div class="result-section">
				<div class="result-holder">
					<!-- search-wrapper -->
					<div class="search-wrapper">
						<!-- search-result -->
						<form class="search-result" action="#">
							<fieldset>
								<div class="cell">
									<input type="text" value="Велосипед">
								</div>
								<div class="cell">
									<label for="use">Применение:</label>
									<div class="selectArea size01 inp-select" id="sarea0" style="width: 220px;"><span class="left"></span><span class="disabled" style="display: none;"></span><span id="mySelectText0" class="center">Горный</span><a href="javascript:showOptions(0)" class="selectButton"></a></div>
									<select id="use" class="size01 inp-select outtaHere">
										<option>Горный</option>
										<option>Горный</option>
										<option>Горный</option>
									</select>
								</div>
								<div class="cell">
									<label for="diameter">Диаметр колес:</label>
									<div class="selectArea size02 inp-select" id="sarea1" style="width: 110px;"><span class="left"></span><span class="disabled" style="display: none;"></span><span id="mySelectText1" class="center">28”</span><a href="javascript:showOptions(1)" class="selectButton"></a></div>
									<select id="diameter" class="size02 inp-select outtaHere">
										<option>28”</option>
										<option>26”</option>
										<option>24”</option>
									</select>
								</div>
								<span class="result" style="display: block;"><strong>96</strong> найдено</span>
								<a class="link-more" href="#" style="display: none;">Показать все</a>
							</fieldset>
						</form>
						<!-- sort-form -->
						<form class="sort-form" action="#">
							<fieldset>
								<div class="cell">
									<label for="make">Марка: </label>
									<ul>
										<li><a href="#">Giant</a></li>
										<li><a href="#">TREK</a></li>
										<li><a href="#">STELS</a></li>
									</ul>
									<div class="selectArea size02 inp-select sort-select" id="sarea2" style="width: 110px;"><span class="left"></span><span class="disabled" style="display: none;"></span><span id="mySelectText2" class="center">Все</span><a href="javascript:showOptions(2)" class="selectButton"></a></div><select id="make" class="size02 inp-select sort-select outtaHere">
										<option>Все</option>
									</select>
								</div>
								<div class="cell">
									<label>Модель: </label>
									<ul>
										<li><a href="#">2012</a></li>
										<li><a href="#">2011</a></li>
										<li><a href="#">2013</a></li>
									</ul>
								</div>
								<div class="cell">
									<label for="type">Тип:</label>
									<ul>
										<li><a href="#">взрослый</a></li>
									</ul>
									<div class="selectArea size02 inp-select sort-select" id="sarea3" style="width: 110px;"><span class="left"></span><span class="disabled" style="display: none;"></span><span id="mySelectText3" class="center">Все</span><a href="javascript:showOptions(3)" class="selectButton"></a></div><select id="type" class="size02 inp-select sort-select outtaHere">
										<option>Все</option>
										<option>Все</option>
										<option>Все</option>
									</select>
								</div>
								<input type="submit" value="Еще">
							</fieldset>
						</form>
						<!-- sort-links -->
						<div class="sort-links">
							<strong class="title">Сортировать по:</strong>
							<ul>
								<li><a href="#">популярности</a></li>
								<li><a href="#">цене</a></li>
								<li><a href="#">новизне</a></li>
							</ul>
						</div>
					</div>
					<div class="result-block main">
						<!-- item -->
						<div class="item">
							<div class="photo-holder">
								<a class="open" href="#">
									<img src="img/img01.jpg" alt="Велосипед">
								</a>
							</div>
							<h2><a class="open" href="#"><strong>Велосипед</strong> Italtrike 1050 Racing team</a></h2>
							<div class="row">
								<ul class="rating">
									<li class="one-star" title="Rate this 1 star out of 5">1</li>
									<li class="two-stars active" title="Rate this 2 star out of 5">2</li>
									<li class="three-stars" title="Rate this 3 star out of 5">3</li>
									<li class="four-stars" title="Rate this 4 star out of 5">4</li>
									<li class="five-stars" title="Rate this 5 star out of 5">5</li>
								</ul>
								<a href="#">10 Отзывов</a>
							</div>
							<strong class="price">2,299 $</strong>
							<dl class="description">
								<dt>Тип: </dt>
								<dd>взрослый, </dd>
								<dt>Материал рамы: </dt>
								<dd>алюминий,</dd>
								<dt>Амортизация: </dt>
								<dd>вилка, </dd>
								<dt>Диаметр колес: </dt>
								<dd>28"</dd>
							</dl>
						</div>
						<!-- item -->
						<div class="item">
							<div class="photo-holder">
								<a class="open" href="#"><img src="img/img01.jpg" alt="Велосипед"></a>
							</div>
							<h2><a class="open" href="#"><strong>Велосипед</strong> ORBEA Occam 29 S10 (2013)</a></h2>
							<div class="row">
								<ul class="rating">
									<li class="one-star" title="Rate this 1 star out of 5">1</li>
									<li class="two-stars active" title="Rate this 2 star out of 5">2</li>
									<li class="three-stars" title="Rate this 3 star out of 5">3</li>
									<li class="four-stars" title="Rate this 4 star out of 5">4</li>
									<li class="five-stars" title="Rate this 5 star out of 5">5</li>
								</ul>
								<a href="#">10 Отзывов</a>
							</div>
							<strong class="price">2,299 $</strong>
							<dl class="description">
								<dt>Диаметр колес: </dt>
								<dd>28"</dd>
								<dt>Применение: </dt>
								<dd>горный, </dd>
								<dt>Тип: </dt>
								<dd>взрослый, </dd>
								<dt>Материал рамы: </dt>
								<dd>алюминий,</dd>
							</dl>
						</div>
						<!-- item -->
						<div class="item">
							<span class="mark">Mark</span>
							<div class="photo-holder">
								<a class="open" href="#"><img src="img/img01.jpg" alt="Велосипед"></a>
							</div>
							<h2><a class="open" href="#"><strong>Велосипед</strong> ORBEA Occam 29 S10 (2013)</a></h2>
							<div class="row">
								<ul class="rating">
									<li class="one-star" title="Rate this 1 star out of 5">1</li>
									<li class="two-stars active" title="Rate this 2 star out of 5">2</li>
									<li class="three-stars" title="Rate this 3 star out of 5">3</li>
									<li class="four-stars" title="Rate this 4 star out of 5">4</li>
									<li class="five-stars" title="Rate this 5 star out of 5">5</li>
								</ul>
								<a href="#">10 Отзывов</a>
							</div>
							<strong class="price">2,299 $</strong>
							<dl class="description">
								<dt>Диаметр колес: </dt>
								<dd>28"</dd>
								<dt>Применение: </dt>
								<dd>горный, </dd>
								<dt>Тип: </dt>
								<dd>взрослый, </dd>
								<dt>Материал рамы: </dt>
								<dd>алюминий,</dd>
							</dl>
						</div>
					</div>
				</div>
				<a class="more" href="#">Показать еще (<span>84</span>)</a>
			</div>
		</div>
	</div>
	<div class="optionsDivInvisible drop-size01 inp-select outtaHere" id="optionsDiv0" style="width: 220px; left: 437px; top: 136px; height: auto;"><ul><li><a href="javascript:showOptions(0); selectMe('use',0,0);">Горный</a></li><li><a href="javascript:showOptions(0); selectMe('use',1,0);">Горный</a></li><li><a href="javascript:showOptions(0); selectMe('use',2,0);">Горный</a></li></ul></div>
	<div class="optionsDivInvisible drop-size02 inp-select outtaHere" id="optionsDiv1" style="width: 110px; left: 849px; top: 136px; height: auto;"><ul><li><a href="javascript:showOptions(1); selectMe('diameter',0,1);">28”</a></li><li><a href="javascript:showOptions(1); selectMe('diameter',1,1);">26”</a></li><li><a href="javascript:showOptions(1); selectMe('diameter',2,1);">24”</a></li></ul></div>
	<div class="optionsDivInvisible drop-size02 inp-select sort-select outtaHere" id="optionsDiv2" style="width: 110px;"><ul><li><a href="javascript:showOptions(2); selectMe('make',0,2);">Все</a></li></ul></div>
	<div class="optionsDivInvisible drop-size02 inp-select sort-select outtaHere" id="optionsDiv3" style="width: 110px;"><ul><li><a href="javascript:showOptions(3); selectMe('type',0,3);">Все</a></li><li><a href="javascript:showOptions(3); selectMe('type',1,3);">Все</a></li><li><a href="javascript:showOptions(3); selectMe('type',2,3);">Все</a></li></ul></div>
</body>
</html>