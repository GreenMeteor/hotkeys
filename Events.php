<?php

namespace humhub\modules\hotkeys;

use Yii;
use yii\base\Event;
use humhub\modules\ui\view\components\View;
use humhub\modules\content\widgets\WallEntryLinks;

/**
 * Event handler class for hotkeys module
 */
class Events
{
    /**
     * Handles the wall entry links initialization event
     * Adds keyboard shortcuts button to the post interaction area
     * 
     * @param Event $event
     */
    public static function onWallEntryLinksInit($event)
    {
        /** @var WallEntryLinks $linksWidget */
        $linksWidget = $event->sender;

        /** @var ContentActiveRecord $contentRecord */
        $contentRecord = $linksWidget->object;

        $module = Yii::$app->getModule('hotkeys');

        $linksWidget->addWidget(widgets\Button::class, [
            'contentRecord' => $contentRecord,
        ]);
    }

    /**
     * Handles view after render event
     * Initializes module on all pages
     * 
     * @param Event $event
     */
    public static function onViewAfterRender($event)
    {
        $view = Yii::$app->view;
        $view->registerJs('humhub.modules.hotkeys.init();');
    }
}