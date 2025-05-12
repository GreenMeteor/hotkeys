<?php

namespace humhub\modules\hotkeys;

use Yii;
use yii\helpers\Url;
use humhub\components\Module as BaseModule;

/**
 * Hotkey enhances the HumHub rich text editor with keyboard shortcuts
 */
class Module extends BaseModule
{
    /**
     * @inheritdoc
     */
    public $resourcesPath = 'resources';

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
        $this->registerAssets();
    }

    /**
     * Register module assets
     */
    public function registerAssets()
    {
        \humhub\modules\hotkeys\assets\Asset::register(Yii::$app->view);
    }
}