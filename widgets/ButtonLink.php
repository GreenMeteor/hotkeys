<?php

namespace humhub\modules\hotkeys\widgets;

use Yii;
use yii\helpers\Url;
use humhub\widgets\ModalButton;
use humhub\modules\content\widgets\WallEntryControlLink;
use humhub\modules\content\components\ContentActiveRecord;

class ButtonLink extends WallEntryControlLink
{
    /**
     * @var ContentActiveRecord
     */
    public $contentRecord;

    public function renderLink()
    {
        return ModalButton::asLink(Yii::t('HotkeysModule.base', 'Hotkeys'))
            ->icon('keyboard-o')
            ->script('humhub.modules.hotkeys.showShortcutsModal()');
    }
}