<!DOCTYPE html>
<html class="<?= $params['html_class'] ?>" lang="<?= $intl->getLocaleTag() ?>">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" href="storage/favicon.ico" type="image/x-icon">
	<title>InnoWeek News - Последние и актуальные новости проекта InnoWeek</title>
	<style>
		@font-face {
			font-family: 'GilroyFont';
			src: url('/blog/storage/fonts/Gilroy-Light.eot') format("opentype");
			font-weight: lighter;
			font-style: normal;
		}

		@font-face {
			font-family: 'GilroyFont';
			src: url('/blog/storage/fonts/Gilroy-Regular.otf') format("opentype");
			font-weight: normal;
			font-style: normal;
		}

		@font-face {
			font-family: 'GilroyFont';
			src: url('/blog/storage/fonts/Gilroy-Bold.otf') format("opentype");
			font-weight: bold;
			font-style: normal;
		}

		@font-face {
			font-family: 'GilroyFont';
			src: url('/blog/storage/fonts/Gilroy-RegularItalic.otf') format("opentype");
			font-weight: normal;
			font-style: italic;
		}

		/*			.articles h1 {display: none; !important}*/

		.article__text section.uk-margin {
			display: none !important;
		}

		.uk-pagination {
			display: flex;
			justify-content: center;
			font-family: 'GilroyFont';
		}

		.uk-pagination li {
			margin: 20px 10px !important;
			font-size: 22px !important;
			font-weight: 700 !important;
			list-style: none;
		}

		.uk-pagination li a {
			color: #000;
			text-decoration: none;
		}

		.uk-pagination li a:hover {
			text-decoration: underline;
		}

		.uk-pagination li.uk-active {
			background: #0F3A75 !important;
			width: 40px;
			height: 40px;
			color: #fff;
			border-radius: 10px;
			margin-top: -10px;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			top: -7px;
		}

		.article-info__text p a {
			display: block !important;
			color: #4091D2 !important;
			font-size: 20px !important;
			font-weight: 200 !important;
			font-family: 'GilroyFont' !important;
			margin-top: 20px;
			text-transform: lowercase !important;
			margin-bottom: 0 !important;
		}

		.uk-width-1-1>section>h1.uk-margin {
			font-size: 34px !important;
		}

		hr {
			display: none;
		}

		body {
			margin: 0;
			padding: 0;
			font-family: "GilroyFont";
		}

		.container {
			margin: 0 auto;
			max-width: 1170px;
		}

		.cont-title {
			font-size: 34px;
			font-family: 'GilroyFont';
			font-weight: 700;
		}

		.header {
			height: 90px;
			background-color: #fff;
			box-shadow: 0 10px 10px rgba(0, 0, 0, .1);
		}

		.header__logo {
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flex;
			display: -o-flex;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
		}

		.header__logo a {
			display: block;
			height: 70px;
		}

		main {
			padding-top: 20px;
			font-family: 'GilroyFont';
			font-size: 34px;
			font-weight: 1000;
		}

		.grey-line {
			width: 100%;
			height: 2px;
			background-color: #C6C6C6;
			margin: -10px auto 50px auto;
		}

		article {
			transition: .35s all;
		}

		article>div {
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flex;
			display: -o-flex;
			display: flex !important;
		}

		.article-info__status {
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flex;
			display: -o-flex;
			display: flex;
		}

		.article-info__status div {
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flex;
			display: -o-flex;
			display: flex;
			height: 20px;
			align-items: center;
			justify-content: center;
			padding: 0 20px;
			margin-right: 12px;
			font-size: 14px;
			font-family: 'GilroyFont';
			font-weight: 100;
			color: #fff;
			border-radius: 12px;
			margin-bottom: 0px;
			text-transform: capitalize;
		}

		.article-info__status div:first-child {
			background-color: #B2DDB3;
		}

		.article-info__status div:last-child {
			background-color: #CACACA;
		}

		.articles article .acticle-img a {
			width: 100%;
			height: 100px;
		}

		.articles article:first-child .acticle-info {
			flex: 5 !important;
		}

		.articles article:first-child .acticle-img {
			flex: 7 !important;
		}

		.articles article:first-child .acticle-info p,
		.articles article:first-child .acticle-info h2 {
			width: 100%;
		}

		.article-info__text p {
			width: 800px;
		}


		.articles article:first-child .light-line {
			margin: 38px auto 0px auto !important;
			display: block;
		}

		.articles article:last-child {
			margin-bottom: 20px;
		}

		.articles article:last-child .light-line {
			margin: 38px auto 0px auto !important;
		}

		.articles article:first-child .acticle-info h2 {
			margin-bottom: 50px !important;
		}

		.articles article .acticle-info a {
			line-height: 30px;
			text-transform: uppercase;
			font-size: 26px;
			font-family: 'GilroyFont';
			font-weight: 600;
			margin-bottom: 35px;
			width: 80%;
			color: #000;
			text-decoration: none;
			display: block;
		}

		.articles article .acticle-info a:hover {
			color: #4091D2;
		}

		.articles article .acticle-info p {
			line-height: 26px;
			font-size: 22px;
			font-family: 'GilroyFont';
			font-weight: 100;
			width: 100%;
		}

		.articles article .acticle-info {
			flex: 8;
		}

		.articles article .acticle-img {
			flex: 3;
		}

		.light-line {
			width: 85%;
			height: 1px;
			background-color: #E8E8E8;
			margin: 50px auto 42px auto;
		}

		.footer {
			position: relative;
			background: rgb(15, 58, 117);
			padding: 35px 0px 65px;
			margin-top: 40px;
		}

		.footer__contacts {
			display: flex;
			-webkit-box-pack: justify;
			justify-content: space-between;
		}

		.footer__address {
			color: rgb(255, 255, 255);
		}

		.footer__social {
			display: flex;
			-webkit-box-align: center;
			align-items: center;
			flex-direction: column;
		}

		.footer__social label {
			font-size: 21px;
			color: rgb(255, 255, 255);
			margin-right: 15px;
			display: block;
			margin-bottom: 20px;
		}

		.footer__social a {
			width: 40px;
			height: 40px;
			display: inline-block;
			margin-right: 25px;
			-webkit-border-radius: 50%;
			border-radius: 50%;
			background-image: url(/blog/storage/social.png);
			background-repeat: no-repeat;
			margin-top: 1px;
		}

		.footer__social a.yt {
			background-position: right 0;
		}

		.footer__social a.inst {
			background-position: -65px 0;
		}

		.footer__copyright {
			text-align: right;
			color: rgb(255, 255, 255);
			font-size: 16px;
			font-weight: 300;
			line-height: 21px;
		}

		.footer__copyright span {
			margin-top: 5px;
			display: block;
		}

		a:-webkit-any-link {
			color: -webkit-link;
			cursor: pointer;
			text-decoration: underline;
		}

		.article__title {
			font-size: 38px;
			font-family: 'GilroyFont';
			font-weight: 700;
			display: none !important;
		}

		.article__text img {
			width: 80%;
			margin: 30px 10%;
			border-radius: 14px;
		}


		.article__img {
			width: 80%;
			margin: 30px 10%;
			border-radius: 14px;
		}

		.article__text {
			font-size: 22px;
			font-family: 'GilroyFont';
			font-weight: 100;
			line-height: 26px;
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flex;
			display: -o-flex;
			display: flex;
			-webkit-flex-direction: column;
			-moz-flex-direction: column;
			-ms-flex-direction: column;
			-o-flex-direction: column;
			flex-direction: column;
		}

		.article__text>p>p {
			display: block;
		}

		.created {
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flex;
			display: -o-flex;
			display: flex;
			justify-content: flex-end;
			flex-direction: column;
			text-align: right;
			margin-top: 40px;
			margin-bottom: 20px !important;
			font-size: 19px;
			font-weight: 100;
			font-family: 'GilroyFont';
			color: #797979;
		}

		.created__by {
			margin-top: 10px;
		}

		.readMore__title {
			margin-bottom: 50px;
			margin-top: 50px;
		}

		.readMore__title h2 {
			display: inline;
		}

		.readMore__title a {
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flex;
			display: -o-flex;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 32px;
			width: 170px;
			font-size: 15px;
			font-weight: 700;
			color: #fff !important;
			font-family: 'GilroyFont';
			float: right;
			text-align: center;
			background-color: #3888CF;
			border-radius: 20px;
			text-decoration: none !important;
		}

		.readMore__articles {
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flex;
			display: -o-flex;
			display: flex;
			flex-wrap: wrap;
		}

		.readMore__articles article {
			width: 370px;
			margin: 25px 10px;
		}

		.article__status {
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flex;
			display: -o-flex;
			display: flex;
			margin-top: 10px;
			margin-bottom: 10px;
		}

		.article__status div {
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flex;
			display: -o-flex;
			display: flex;
			height: 18px;
			align-items: center;
			justify-content: center;
			padding: 0 20px;
			margin-right: 12px;
			font-size: 14px;
			font-family: 'GilroyFont';
			font-weight: 100;
			color: #fff;
			border-radius: 12px;
			margin-bottom: 35px;
		}

		.article__status div:first-child {
			background-color: #B2DDB3;
		}

		.article__status div:last-child {
			background-color: #CACACA;
		}

		.article__title a {
			color: #000 !important;
			text-decoration: none !important;
			font-family: 'GilroyFont';
			font-weight: 700;
			font-size: 24px;
			line-height: 27px;
			text-transform: uppercase;
		}

		.article__title {
			margin-bottom: 20px;
		}

		.article__title__text {
			font-size: 20px;
			font-family: 'GilroyFont';
			font-weight: 100;
			line-height: 24px;
		}

		.articles article .acticle-info h2 {
			margin: 0;
			width: 80%;
			margin-bottom: 15px;
		}

		.articles article .acticle-info p {
			margin: 0;
			width: 80%;
		}

		.articles article .acticle-img {
			flex: 4;
		}

		.articles article .acticle-img img {
			width: auto;
			max-width: 400px;
			max-height: 400px;
			border-radius: 14px;
			display: block;
			float: right;
		}

		.articles article .acticle-img p {
			font-size: 0 !important;
		}

		.article-info__text p>img {
			display: none;
		}


		.articles article .article-info__text h2 {
			line-height: 24px;
			margin-top: 20px;
		}

		@media (max-width: 1024px) {
			.footer__social {
				width: 100%;
			}

			.footer__social label {
				margin-right: 0px;
			}

			.articles article .acticle-info a {
				width: 100%;
			}

			.articles article:first-child .acticle-info p,
			.articles article:first-child .acticle-info h2 {
				width: 100% !important;
			}

			.articles article .acticle-img img {
				width: 100% !important;
			}

			.article-info__status {
				margin: 20px auto;
				width: 95%;

			}

			.container {
				padding: 0 5%;
			}

			.article__img {
				width: 100%;
				margin: 30px auto;
			}

			.readMore__articles {
				display: -webkit-flex;
				display: -moz-flex;
				display: -ms-flex;
				display: -o-flex;
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex-wrap: wrap;
			}

			.readMore__articles article {
				width: 100%;
				margin: 25px auto;
			}

			.readMore__title {
				text-align: center;
			}

			.readMore__title a {
				margin: 30px auto;
				float: none;
			}

			.articles article>div {
				flex-direction: column;
			}

			.articles article>div>.acticle-img {
				order: 1;
				height: auto;
			}

			.articles article>div>.acticle-info {
				order: 2;
				height: auto;
			}


			.articles article .article-info__text {
				text-align: center;
				justify-content: center;
			}

			.articles article .article-info__text h2 {
				margin: 0 auto;
				width: auto;
				line-height: 24px;
				margin-top: 10px;
			}

			.articles article .article-info__text p {
				margin: 0 auto;
				width: auto;
			}

			.articles article .acticle-img {
				flex: 7 !important;
			}


			.articles article:first-child .acticle-info h2 {
				margin-bottom: 20px !important;
			}

			.articles article .acticle-info h2 {
				margin-bottom: 20px !important;
			}

			.cont-title {
				text-align: center;
			}

			.footer__address {
				margin-bottom: 20px;
			}

			.footer__contacts {
				display: -webkit-flex;
				display: -moz-flex;
				display: -ms-flex;
				display: -o-flex;
				display: flex;
				flex-direction: column;
				text-align: center !important;
			}

			.footer__copyright {
				text-align: center !important;
				float: none;
				margin-top: 20px;
			}
		}

		@media (max-width: 760px) {
			.footer__social a {
				margin: 0 5px;
			}
		}
	</style>

	<style>
		.articles iframe {
			display: block;
			width: 80% !important;
			margin: 40px auto;
		}
		@media screen and (max-width: 578px) {
			.articles iframe {
				width: 100% !important;
				margin: 40px auto;
			}
		}
	</style>
</head>

<body>

	<header class="header">
		<div class="header__logo">
			<a href="https://innoweek.uz"><img src="storage/logo.png"></a>
		</div>
	</header>


	<main>
		<div class="container">

			<section class="articles">
				<div id="">


					<main class="<?= $view->position()->exists('sidebar') ? 'uk-width-medium-3-4' : 'uk-width-1-1'; ?>">
						<?= $view->render('content') ?>
					</main>

				</div>
			</section>
		</div>
	</main>
	<footer class="footer" id="contacts">
		<div class="container">
			<div class="footer__contacts">
				<div class="footer__address">
					Узбекистан, г. Ташкент, Алмазарский р-н, <br> Университетская, дом 4 <br>
					<a style="margin-top: 6px; display: block; text-decoration: none; color: #fff;"
						href="mailto:innoweek@mininnovation.uz">innoweek@mininnovation.uz</a>
				</div>
				<div class="footer__social">
					<label>Следите за нами в соцсетях:</label>
					<div class="links">
						<a href="https://www.facebook.com/mininnovation.uz" class="fb" target="_blank"></a>
						<a href="https://www.instagram.com/mininnovation/" class="inst" target="_blank"></a>
						<a href="https://www.youtube.com/channel/UCaexKvx2sHABovPGSzxTOAw" class="yt" target="_blank"></a>
					</div>
				</div>
				<div class="footer__copyright">Copyright &copy; InnoWeek 2020<span>All right reserved</span></div>
			</div>
		</div>
	</footer>
	<script src="https://code.jquery.com/jquery-3.5.1.min.js"
		integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
	<script>
		$('#posts .light-line:last').css('visibility', 'hidden');
		$('.article-info__text:first p').width('90%');
		$('.article-info__text:not(:first) p').width('650px');
		$('.articles article .acticle-img img').width('100%').css('float', 'right');
		$('.articles article:first .acticle-img img').css('maxWidth', '600px');
		$('.articles article:first .acticle-img img').width('100%');
		$('.articles article:first .acticle-info').css({
			flex: '1'
		});
		$('.articles article:first .acticle-info').css('flex', '10');
	</script>
</body>

</html>