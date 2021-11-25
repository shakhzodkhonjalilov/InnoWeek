<?php

namespace Pagekit\Todo\Controller;

use Pastheme\Blog\Model\Post;

/**
 *
 */
class TodoController
{

    public function indexAction()
    {
        $posts = Post::findAll();


        return [
            '$data' => $posts
        ];

    }

}
