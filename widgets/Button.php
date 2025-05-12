<?php

namespace humhub\modules\hotkeys\widgets;

use Yii;
use humhub\components\Widget;
use humhub\modules\content\models\ContentActiveRecord;

/**
 * Widget to render the hotkeys button in wall entry links
 */
class Button extends Widget
{
    /**
     * @var ContentActiveRecord
     */
    public $contentRecord;

    /**
     * Renders the keyboard shortcuts button
     */
    public function run()
    {
        return $this->render('button', [
            'contentRecord' => $this->contentRecord,
        ]);
    }
}