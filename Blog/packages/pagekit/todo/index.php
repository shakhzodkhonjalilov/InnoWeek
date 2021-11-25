<?php

use Pagekit\Application;

// packages/pagekit/todo/index.php

return [

    'name' => 'todo',

    'type' => 'extension',

    // array of namespaces to autoload from given folders
    'autoload' => [
        'Pagekit\\Todo\\' => 'src'
    ],


    // array of routes
    'routes' => [

        // identifier to reference the route from your code
        '@todo' => [

            // which path this extension should be mounted to
            'path' => '/todo',

            // which controller to mount
            'controller' => 'Pagekit\\Todo\\Controller\\TodoController'
        ]
    ],


    // called when Pagekit initializes the module
    'main' => function (Application $app) {
        #echo "It's alive";
    }
];

?>
