<?php

use yii\helpers\Html;
use humhub\libs\Helpers;

/* @var $contentRecord \humhub\modules\content\models\ContentActiveRecord */
?>

<span class="wall-entry-controls-item">
    <?= Html::a(
        '<i class="fa fa-keyboard-o"></i> ' . Yii::t('HotkeysModule.base', 'Hotkeys'),
        '#',
        [
            'class' => 'hotkeys-modal-button',
            'title' => Yii::t('HotkeysModule.base', 'Show keyboard shortcuts'),
            'data-action-click' => 'hotkeys.showShortcutsModal',
        ]
    ); ?>
</span>