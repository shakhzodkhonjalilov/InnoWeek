<?= $view->style('dpnblog-admin-css' , 'dpnblog:assets/css/dpnblog-admin.css' , 'slideshow') ?>
<?= $view->script('dpnblog-posts' , 'dpnblog:app/bundle/dpnblog-posts.js' , 'vue') ?>
<div class="">
<h1 class="cont-title">НОВОСТНОЙ БЛОГ INNOWEEK 2020</h1>
<div class="grey-line"></div>
<section id="posts">
    <?php foreach ($posts as $post): ?>
        <div>
            <?php if ($post->isPostStyle() == __('Default Post') && !empty($post->data['image']['src'])): ?>  
                <img class="dpnblog-height" src="<?= $post->data['image']['src'] ?>" alt="<?= $post->data['image']['alt'] ?>">
            <?php endif; ?>
            <?php if ($post->isPostStyle() == __('Video Content') && !empty($post->data['video']['image'])): ?>
                <img class="dpnblog-height" src="<?= $post->data['video']['image'] ?>" alt="<?= $post->category->title ?>">
            <?php endif; ?>
            <?php if ($post->isPostStyle() == __('Article Post') && !empty($post->data['image']['src'])): ?>
                <img class="dpnblog-height" src="<?= $post->data['image']['src'] ?>" alt="<?= $post->data['image']['alt'] ?>">
            <?php endif; ?>
            <?php if ($post->isPostStyle() == __('Image Gallery') && !empty($post->data['gallery'][0]['image'])): ?>
                <img class="dpnblog-height" src="<?= $post->data['gallery'][0]['image'] ?>" alt="<?= $post->category->title ?>">
            <?php endif; ?>
            <?php if ($post->isPostStyle() == __('Document') && !empty($post->data['image']['src'])): ?>
                <img class="dpnblog-height" src="<?= $post->data['image']['src'] ?>" alt="<?= $post->data['image']['alt'] ?>">
            <?php endif; ?>
            <article class="uk-grid uk-grid-small uk-margin">
                
        <main class="uk-width-medium-5-6">
                   
            <article>
                <div>
                    <div class="acticle-info">
                        <div class="article-info__status">
    						<div><?= $post->category->title ?></div>
                            <div style="width: 0; height: 0; opacity: 0;"></div>
    					</div>
                        <div class="article-info__text">
                            <h2><a href="<?= $view->url('@dpnblog/id', ['id' => $post->id]) ?>"><?= $post->title ?></a></h2>
                               
                                <p class=""><?= $post->excerpt ?: $post->content?></p>
                        </div>
                    </div>
                    <div class="acticle-img">
                    <?= substr($post->excerpt ?: $post->content, 0, 140)?>
                    </div>
                </div>
                
                <div class="light-line"></div>
            </article>
                   
        </main>
            </article>
            <hr />
        </div>
    <?php endforeach; ?>

    <?php
    $range     = 3;
    $total     = intval($total);
    $page      = intval($page);
    $pageIndex = $page - 1;
    ?>

    <?php if ($total > 1) : ?>
        <ul class="uk-pagination">

            <?php for($i=1;$i<=$total;$i++): ?>
                <?php if ($i <= ($pageIndex+$range) && $i >= ($pageIndex-$range)): ?>

                    <?php if ($i == $page): ?>
                    <li class="uk-active"><span><?=$i?></span></li>
                    <?php else: ?>
                    <li>
                        <a href="<?= $view->url('@dpnblog/page', ['page' => $i]) ?>"><?=$i?></a>
                    <li>
                    <?php endif; ?>

                <?php elseif($i==1): ?>

                    <li>
                        <a href="<?= $view->url('@dpnblog/page', ['page' => 1]) ?>">1</a>
                    </li>
                    <li><span>...</span></li>

                <?php elseif($i==$total): ?>

                    <li><span>...</span></li>
                    <li>
                        <a href="<?= $view->url('@dpnblog/page', ['page' => $total]) ?>"><?=$total?></a>
                    </li>

                <?php endif; ?>
            <?php endfor; ?>

        </ul>
    <?php endif ?>

</section>
</div>