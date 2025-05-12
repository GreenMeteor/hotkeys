<?php

use humhub\modules\hotkeys\Events;
use humhub\modules\hotkeys\Module;
use humhub\modules\ui\view\components\View;
use humhub\modules\content\widgets\WallEntryLinks;
//use humhub\modules\content\widgets\WallEntryControls;

return [
    'id' => 'hotkeys',
    'class' => Module::class,
    'namespace' => 'humhub\modules\hotkeys',
    'events' => [
        //['class' => WallEntryControls::class, 'event' => WallEntryControls::EVENT_INIT, 'callback' => [Events::class, 'onWallEntryControlsInit']],
        ['class' => WallEntryLinks::class, 'event' => WallEntryLinks::EVENT_INIT, 'callback' => [Events::class, 'onWallEntryLinksInit']],
        ['class' => View::class, 'event' => View::EVENT_AFTER_RENDER, 'callback' => [Events::class, 'onViewAfterRender']],
    ]
];