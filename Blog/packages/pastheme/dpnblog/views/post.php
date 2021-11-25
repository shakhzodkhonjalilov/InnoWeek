<?= $view->style('dpnblog-admin-css', 'dpnblog:assets/css/dpnblog-admin.css', ['uikit-slideshow']) ?>
<?= $view->script('dpnblog-posts', 'dpnblog:app/bundle/dpnblog-posts.js', ['vue', 'uikit-slideshow']) ?>

<section>
    <?php
    switch ($post->post_style) {
        case 1:
            echo $view->render('dpnblog/post_style/video.php');
            break;
        case 2:
            echo $view->render('dpnblog/post_style/article.php');
            break;
        case 3:
            echo $view->render('dpnblog/post_style/gallery.php');
            break;
        case 4:
            echo $view->render('dpnblog/post_style/document.php');
            break;
        default:
            echo $view->render('dpnblog/post_style/default.php');
    }
    ?>
    
    <article id="posts" class="uk-article">
    <div class="article__title" style><?= $post->title ?></div>
   <?php if ($image = $post->get('image.src')): ?>
    <img src="<?= $image ?>"  class="article__img" alt="<?= $post->get('image.alt') ?>">
    <?php endif ?>

	

    <div class="article__text"><?= $post->content ?></div>

    			<div class="created">
                    <div class="created__at">
                        Опубликовано: <?= $post->date->format('Y-m-d')?>
                    </div>
                    <div class="created__by">
                        Автор: <?= $this->escape($post->user->name)?>
                    </div>
                </div>
				
				
			

</article>
    
</section>
