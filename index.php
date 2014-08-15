<!DOCTYPE html>
<html class="no-js" lang="ru-ru" slick-uniqueid="3">
<head>
	<title>Detectum</title>
	<meta charset="utf-8">
	<base href="http://backbone.kreker92.tmweb.ru/">
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	
	<link media="all" type="text/css" rel="stylesheet" href="css/all.css">
	<link media="all" type="text/css" rel="stylesheet" href="css/selectbox.css">
	<link media="all" type="text/css" rel="stylesheet" href="css/jquery-ui.css">
	
	<script type="text/javascript" src="/js/jquery.min.js"></script>
	<script type="text/javascript" src="/js/underscore-min.js"></script>
	<script type="text/javascript" src="/js/backbone-min.js"></script>
	<script type="text/javascript" src="/js/backbone.queryparams.js"></script>
	<script type="text/javascript" src="/js/jquery-ui.js"></script>
	
	<?php 
	// <script type="text/javascript" src="/js/jquery.selectbox.js"></script>
	?>
	<?php 
	// <script type="text/javascript" src="/js/main.js"></script>
	?>
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
							<input autofocus="autofocus" id="q" name="q" type="text" value="лестница" />
							<input type="submit" value="Найти" />
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
									<input class="category-name" type="text" value="Велосипед" disabled>
								</div>
								<div class="cell">
									<label for="use">Применение:</label>
									<select class="use" class="size01 inp-select">
										<option>Не важно</option>
										<option>Горный</option>
										<option>Городской</option>
										<option>BMX</option>
									</select>
								</div>
								<div class="cell">
									<label for="diameter">Диаметр колес:</label>
									<select class="diameter" class="size02 inp-select">
										<option>Не важно</option>
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
									<select class="make" class="size02 inp-select sort-select">
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
									<select class="type" class="size02 inp-select sort-select">
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
							<!-- gallery-section -->
							<div class="gallery-section">
								<div class="holder">
									<ul class="gallery">
										<li>
											<img src="img/img02.jpg" alt="Велосипед ORBEA Occam 29 S10 (2013)">
											<div class="holder">
												<h3>Велосипед ORBEA Occam 29 S10 (2013)</h3>
												<div class="row">
													<ul class="rating style02">
														<li class="one-star" title="Rate this 1 star out of 5">1</li>
														<li class="two-stars active" title="Rate this 2 star out of 5">2</li>
														<li class="three-stars" title="Rate this 3 star out of 5">3</li>
														<li class="four-stars" title="Rate this 4 star out of 5">4</li>
														<li class="five-stars" title="Rate this 5 star out of 5">5</li>
													</ul>
													<a href="#">10 Отзывов</a>
												</div>
												<dl class="description">
													<dt>Диаметр колес: </dt>
													<dd>28"</dd>
													<dt>Применение: </dt>
													<dd>горный, </dd>
													<dt>Вес: </dt>
													<dd>4,5 кг.</dd>
													<dt>Руль: </dt>
													<dd>изогнутый. </dd>
													<dt>Вилка: </dt>
													<dd>жесткая. </dd>
													<dt>Передний тормоз: </dt>
													<dd>нет. </dd>
													<dt>Задний тормоз: </dt>
													<dd>нет.</dd>
													<dt>Конструкция вилки : </dt>
													<dd>жесткая.</dd>
													<dt>Конструкция руля :</dt>
													<dd>изогнутый. </dd>
													<dt>Крылья : </dt>
													<dd>есть</dd>
													<dt>Передний тормоз : </dt>
													<dd>отсутствует.</dd>
													<dt>Тип : </dt>
													<dd>детский</dd>
													<dt>Тип : </dt>
													<dd>трехколесный. </dd>
													<dt>Цвет : </dt>
													<dd>розовый</dd>
												</dl>
												<div class="btn-box">
													<a class="btn" href="#">Купить</a>
													<a href="#">Добавить в вишлист</a>
												</div>
											</div>
										</li>
										<li>
											<img src="img/img02.jpg" alt="Велосипед ORBEA Occam 29 S10 (2013)">
											<div class="holder">
												<h3>Велосипед Stinger HORNET (X38549)</h3>
												<div class="row">
													<ul class="rating style02">
														<li class="one-star" title="Rate this 1 star out of 5">1</li>
														<li class="two-stars active" title="Rate this 2 star out of 5">2</li>
														<li class="three-stars" title="Rate this 3 star out of 5">3</li>
														<li class="four-stars" title="Rate this 4 star out of 5">4</li>
														<li class="five-stars" title="Rate this 5 star out of 5">5</li>
													</ul>
													<a href="#">10 Отзывов</a>
												</div>
												<dl class="description">
													<dt>Диаметр колес: </dt>
													<dd>28"</dd>
													<dt>Применение: </dt>
													<dd>горный, </dd>
													<dt>Вес: </dt>
													<dd>4,5 кг.</dd>
													<dt>Руль: </dt>
													<dd>изогнутый. </dd>
													<dt>Вилка: </dt>
													<dd>жесткая. </dd>
													<dt>Передний тормоз: </dt>
													<dd>нет. </dd>
													<dt>Задний тормоз: </dt>
													<dd>нет.</dd>
													<dt>Конструкция вилки : </dt>
													<dd>жесткая.</dd>
													<dt>Конструкция руля :</dt>
													<dd>изогнутый. </dd>
													<dt>Крылья : </dt>
													<dd>есть</dd>
													<dt>Передний тормоз : </dt>
													<dd>отсутствует.</dd>
													<dt>Тип : </dt>
													<dd>детский</dd>
													<dt>Тип : </dt>
													<dd>трехколесный. </dd>
													<dt>Цвет : </dt>
													<dd>розовый</dd>
												</dl>
												<div class="btn-box">
													<a class="btn" href="#">Купить</a>
													<a href="#">Добавить в вишлист</a>
												</div>
											</div>
										</li>
									</ul>
								</div>
								<a class="prev" href="#">Назад</a>
								<a class="next" href="#">Вперед</a>
								<a class="close" href="#">Закрыть</a>
							</div>
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
							<!-- gallery-section -->
							<div class="gallery-section">
								<div class="holder">
									<ul class="gallery">
										<li>
											<img src="img/img02.jpg" alt="Велосипед ORBEA Occam 29 S10 (2013)">
											<div class="holder">
												<h3>Велосипед ORBEA Occam 29 S10 (2013)</h3>
												<div class="row">
													<ul class="rating style02">
														<li class="one-star" title="Rate this 1 star out of 5">1</li>
														<li class="two-stars active" title="Rate this 2 star out of 5">2</li>
														<li class="three-stars" title="Rate this 3 star out of 5">3</li>
														<li class="four-stars" title="Rate this 4 star out of 5">4</li>
														<li class="five-stars" title="Rate this 5 star out of 5">5</li>
													</ul>
													<a href="#">10 Отзывов</a>
												</div>
												<dl class="description">
													<dt>Диаметр колес: </dt>
													<dd>28"</dd>
													<dt>Применение: </dt>
													<dd>горный, </dd>
													<dt>Вес: </dt>
													<dd>4,5 кг.</dd>
													<dt>Руль: </dt>
													<dd>изогнутый. </dd>
													<dt>Вилка: </dt>
													<dd>жесткая. </dd>
													<dt>Передний тормоз: </dt>
													<dd>нет. </dd>
													<dt>Задний тормоз: </dt>
													<dd>нет.</dd>
													<dt>Конструкция вилки : </dt>
													<dd>жесткая.</dd>
													<dt>Конструкция руля :</dt>
													<dd>изогнутый. </dd>
													<dt>Крылья : </dt>
													<dd>есть</dd>
													<dt>Передний тормоз : </dt>
													<dd>отсутствует.</dd>
													<dt>Тип : </dt>
													<dd>детский</dd>
													<dt>Тип : </dt>
													<dd>трехколесный. </dd>
													<dt>Цвет : </dt>
													<dd>розовый</dd>
												</dl>
												<div class="btn-box">
													<a class="btn" href="#">Купить</a>
													<a href="#">Добавить в вишлист</a>
												</div>
											</div>
										</li>
										<li>
											<img src="img/img02.jpg" alt="Велосипед ORBEA Occam 29 S10 (2013)">
											<div class="holder">
												<h3>Велосипед Stinger HORNET (X38549)</h3>
												<div class="row">
													<ul class="rating style02">
														<li class="one-star" title="Rate this 1 star out of 5">1</li>
														<li class="two-stars active" title="Rate this 2 star out of 5">2</li>
														<li class="three-stars" title="Rate this 3 star out of 5">3</li>
														<li class="four-stars" title="Rate this 4 star out of 5">4</li>
														<li class="five-stars" title="Rate this 5 star out of 5">5</li>
													</ul>
													<a href="#">10 Отзывов</a>
												</div>
												<dl class="description">
													<dt>Диаметр колес: </dt>
													<dd>28"</dd>
													<dt>Применение: </dt>
													<dd>горный, </dd>
													<dt>Вес: </dt>
													<dd>4,5 кг.</dd>
													<dt>Руль: </dt>
													<dd>изогнутый. </dd>
													<dt>Вилка: </dt>
													<dd>жесткая. </dd>
													<dt>Передний тормоз: </dt>
													<dd>нет. </dd>
													<dt>Задний тормоз: </dt>
													<dd>нет.</dd>
													<dt>Конструкция вилки : </dt>
													<dd>жесткая.</dd>
													<dt>Конструкция руля :</dt>
													<dd>изогнутый. </dd>
													<dt>Крылья : </dt>
													<dd>есть</dd>
													<dt>Передний тормоз : </dt>
													<dd>отсутствует.</dd>
													<dt>Тип : </dt>
													<dd>детский</dd>
													<dt>Тип : </dt>
													<dd>трехколесный. </dd>
													<dt>Цвет : </dt>
													<dd>розовый</dd>
												</dl>
												<div class="btn-box">
													<a class="btn" href="#">Купить</a>
													<a href="#">Добавить в вишлист</a>
												</div>
											</div>
										</li>
									</ul>
								</div>
								<a class="prev" href="#">Назад</a>
								<a class="next" href="#">Вперед</a>
								<a class="close" href="#">Закрыть</a>
							</div>
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
							<!-- gallery-section -->
							<div class="gallery-section">
								<div class="holder">
									<ul class="gallery">
										<li>
											<img src="img/img02.jpg" alt="Велосипед ORBEA Occam 29 S10 (2013)">
											<div class="holder">
												<h3>Велосипед ORBEA Occam 29 S10 (2013)</h3>
												<div class="row">
													<ul class="rating style02">
														<li class="one-star" title="Rate this 1 star out of 5">1</li>
														<li class="two-stars active" title="Rate this 2 star out of 5">2</li>
														<li class="three-stars" title="Rate this 3 star out of 5">3</li>
														<li class="four-stars" title="Rate this 4 star out of 5">4</li>
														<li class="five-stars" title="Rate this 5 star out of 5">5</li>
													</ul>
													<a href="#">10 Отзывов</a>
												</div>
												<dl class="description">
													<dt>Диаметр колес: </dt>
													<dd>28"</dd>
													<dt>Применение: </dt>
													<dd>горный, </dd>
													<dt>Вес: </dt>
													<dd>4,5 кг.</dd>
													<dt>Руль: </dt>
													<dd>изогнутый. </dd>
													<dt>Вилка: </dt>
													<dd>жесткая. </dd>
													<dt>Передний тормоз: </dt>
													<dd>нет. </dd>
													<dt>Задний тормоз: </dt>
													<dd>нет.</dd>
													<dt>Конструкция вилки : </dt>
													<dd>жесткая.</dd>
													<dt>Конструкция руля :</dt>
													<dd>изогнутый. </dd>
													<dt>Крылья : </dt>
													<dd>есть</dd>
													<dt>Передний тормоз : </dt>
													<dd>отсутствует.</dd>
													<dt>Тип : </dt>
													<dd>детский</dd>
													<dt>Тип : </dt>
													<dd>трехколесный. </dd>
													<dt>Цвет : </dt>
													<dd>розовый</dd>
												</dl>
												<div class="btn-box">
													<a class="btn" href="#">Купить</a>
													<a href="#">Добавить в вишлист</a>
												</div>
											</div>
										</li>
										<li>
											<img src="img/img02.jpg" alt="Велосипед ORBEA Occam 29 S10 (2013)">
											<div class="holder">
												<h3>Велосипед Stinger HORNET (X38549)</h3>
												<div class="row">
													<ul class="rating style02">
														<li class="one-star" title="Rate this 1 star out of 5">1</li>
														<li class="two-stars active" title="Rate this 2 star out of 5">2</li>
														<li class="three-stars" title="Rate this 3 star out of 5">3</li>
														<li class="four-stars" title="Rate this 4 star out of 5">4</li>
														<li class="five-stars" title="Rate this 5 star out of 5">5</li>
													</ul>
													<a href="#">10 Отзывов</a>
												</div>
												<dl class="description">
													<dt>Диаметр колес: </dt>
													<dd>28"</dd>
													<dt>Применение: </dt>
													<dd>горный, </dd>
													<dt>Вес: </dt>
													<dd>4,5 кг.</dd>
													<dt>Руль: </dt>
													<dd>изогнутый. </dd>
													<dt>Вилка: </dt>
													<dd>жесткая. </dd>
													<dt>Передний тормоз: </dt>
													<dd>нет. </dd>
													<dt>Задний тормоз: </dt>
													<dd>нет.</dd>
													<dt>Конструкция вилки : </dt>
													<dd>жесткая.</dd>
													<dt>Конструкция руля :</dt>
													<dd>изогнутый. </dd>
													<dt>Крылья : </dt>
													<dd>есть</dd>
													<dt>Передний тормоз : </dt>
													<dd>отсутствует.</dd>
													<dt>Тип : </dt>
													<dd>детский</dd>
													<dt>Тип : </dt>
													<dd>трехколесный. </dd>
													<dt>Цвет : </dt>
													<dd>розовый</dd>
												</dl>
												<div class="btn-box">
													<a class="btn" href="#">Купить</a>
													<a href="#">Добавить в вишлист</a>
												</div>
											</div>
										</li>
									</ul>
								</div>
								<a class="prev" href="#">Назад</a>
								<a class="next" href="#">Вперед</a>
								<a class="close" href="#">Закрыть</a>
							</div>
						</div>
					</div>
				</div>
				<a class="more" href="#">Показать еще (<span>84</span>)</a>
			</div>
		</div>
	</div>
</body>
</html>