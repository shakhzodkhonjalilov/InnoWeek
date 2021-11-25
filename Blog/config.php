<?php return array (
  'application' => 
  array (
    'debug' => true,
  ),
  'database' => 
  array (
    'default' => 'sqlite',
    'connections' => 
    array (
      'sqlite' => 
      array (
        'prefix' => 'pk_',
      ),
    ),
  ),
  'system' => 
  array (
    'secret' => 'J2NR8NGeMKAAlg8WVBKuDWxFTQwTSzzp7UD4Dr7WN2iNWkMeN9l7vmslWavZzCe2',
  ),
  'system/cache' => 
  array (
    'caches' => 
    array (
      'cache' => 
      array (
        'storage' => 'auto',
      ),
    ),
    'nocache' => false,
  ),
  'system/finder' => 
  array (
    'storage' => '',
  ),
  'debug' => 
  array (
    'enabled' => true,
  ),
);