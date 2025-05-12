humhub.module('hotkeys', function (module, require, $) {

    var modal = require('ui.modal');
    var event = require('event');

    const proseMirrorShortcuts = [
        { key: 'Mod-b', description: 'Toggle bold' },
        { key: 'Mod-i', description: 'Toggle italic' },
        { key: 'Mod-`', description: 'Toggle code' },
        { key: 'Mod-Shift-0', description: 'Normal text' },
        { key: 'Mod-Shift-1', description: 'Heading 1' },
        { key: 'Mod-Shift-2', description: 'Heading 2' },
        { key: 'Mod-Shift-3', description: 'Heading 3' },
        { key: 'Mod-Shift-4', description: 'Heading 4' },
        { key: 'Mod-Shift-5', description: 'Heading 5' },
        { key: 'Mod-Shift-6', description: 'Heading 6' },
        { key: 'Mod-Shift-7', description: 'Ordered list' },
        { key: 'Mod-Shift-8', description: 'Bullet list' },
        { key: 'Mod-Shift-9', description: 'Blockquote' },
        { key: 'Mod-[', description: 'Decrease indent' },
        { key: 'Mod-]', description: 'Increase indent' },
        { key: 'Mod-z', description: 'Undo' },
        { key: 'Mod-y', description: 'Redo' },
        { key: 'Mod-Shift-z', description: 'Redo (alternative)' },
        { key: 'Mod-k', description: 'Insert link' },
        { key: 'Mod-Enter', description: 'Hard break' },
        { key: 'Mod-Alt-0', description: 'Join up' },
        { key: 'Tab', description: 'Next cell in table' },
        { key: 'Shift-Tab', description: 'Previous cell in table' }
    ];

    var showShortcutsModal = function () {
        try {
            let content = `
                <div class="keyboard-shortcuts-container">
                    <h4>ProseMirror Rich Text Editor Keyboard Shortcuts</h4>
                    <p>These shortcuts can be used in the rich text editor. 
                    <em>"Mod"</em> refers to <em>Ctrl</em> on Windows/Linux and <em>Cmd</em> on Mac.</p>
                    <table class="table table-hover">
                        <thead><tr><th>Shortcut</th><th>Description</th></tr></thead>
                        <tbody>
                        ${proseMirrorShortcuts.map(s => `<tr><td><kbd>${s.key}</kbd></td><td>${s.description}</td></tr>`).join('')}
                        </tbody>
                    </table>
                </div>`;

            modal.global.set({
                header: 'Keyboard Shortcuts',
                body: content,
                footer: '<button class="btn btn-default" data-modal-close>Close</button>',
                size: 'normal'
            }).show();
        } catch (e) {
            console.error('Hotkeys Module: Failed to show modal:', e);
        }
    };

    var init = function () {
        try {
            event.on('humhub:ready', function() {
                console.log('Hotkeys module initialized');
            });

            event.on('humhub:richtext:ready', function (evt, richtext) {
                const $toolbar = richtext.$toolbar;
                if ($toolbar && !$toolbar.find('.keyboard-shortcuts-btn').length) {
                    const $shortcutBtn = $(`
                        <button type="button" 
                                class="btn btn-sm btn-default keyboard-shortcuts-btn" 
                                title="Keyboard Shortcuts" 
                                aria-label="Keyboard Shortcuts">
                            <i class="fa fa-keyboard-o"></i>
                        </button>`);

                    $shortcutBtn.on('click', function (e) {
                        e.preventDefault();
                        showShortcutsModal();
                    });

                    $toolbar.append($shortcutBtn);
                }
            });

            $(document).on('keydown', function (e) {
                if (e.altKey && e.shiftKey && e.which === 191) {
                    e.preventDefault();
                    showShortcutsModal();
                }
            });
        } catch (e) {
            console.error('Hotkeys Module: Initialization failed:', e);
        }
    };

    module.export({
        init: init,
        showShortcutsModal: showShortcutsModal
    });
});