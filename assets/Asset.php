<?php

namespace humhub\modules\hotkeys\assets;

use yii\web\AssetBundle;

/**
 * Asset bundle for the hotkeys module
 */
class Asset extends AssetBundle
{
    /**
     * @inheritdoc
     */
    public $sourcePath = '@hotkeys/resources';

    /**
     * @inheritdoc
     */
    public $js = [
        'js/humhub.hotkeys.js',
    ];

    /**
     * @inheritdoc
     */
    public $css = [
        'css/hotkeys.css',
    ];

    /**
     * @inheritdoc
     */
    public $publishOptions = [
        'forceCopy' => true
    ];

    /**
     * @inheritdoc
     */
    public $depends = [
        'humhub\assets\CoreApiAsset',
    ];
}