humhub.module('hotkeys', function (module, require, $) {

    var modal = require('ui.modal');
    var event = require('event');

    const humhubShortcuts = [
        // ProseMirror Rich Text Editor Shortcuts (HumHub Implementation)
        { key: 'Mod+b', description: 'Toggle bold' },
        { key: 'Mod+i', description: 'Toggle italic' },

        // Text Structure
        { key: 'Mod+Shift+1', description: 'Heading 1' },
        { key: 'Mod+Shift+2', description: 'Heading 2' },
        { key: 'Mod+Shift+3', description: 'Heading 3' },
        { key: 'Mod+Shift+4', description: 'Heading 4' },
        { key: 'Mod+Shift+5', description: 'Normal text' },
        { key: 'Mod+Shift+6', description: 'Heading 5' },

        // Lists and Indentation
        { key: 'Mod+Shift+9', description: 'Ordered list' },
        { key: 'Mod+Shift+8', description: 'Bullet list' },
        { key: 'Mod+Shift+>', description: 'Blockquote' },
        { key: 'Mod+Shift+\\', description: 'Code block' },
        { key: 'Shift+Tab', description: 'Outdent list item' },

        // History
        { key: 'Mod+z', description: 'Undo' },
        { key: 'Mod+y', description: 'Redo' },

        // Line Breaks and Formatting
        { key: 'Mod+Enter', description: 'Hard break' },
        { key: 'Shift+Enter', description: 'Soft break' },

        // Table Navigation (if table plugin enabled)
        { key: 'Tab', description: 'Next cell in table' },
        { key: 'Shift+Tab', description: 'Previous cell in table' },

        // HumHub Specific
        { key: 'Ctrl+S', description: 'Submit post/comment' },
        { key: 'Cmd+S', description: 'Submit post/comment (Mac)' },

        // Mentions and Content
        { key: '@', description: 'Mention user (type @username)' },

        // Help
        { key: 'Alt+Shift+?', description: 'Show keyboard shortcuts' }
    ];

    // Group shortcuts by category for better organization
    const shortcutCategories = [
        {
            title: 'Text Formatting',
            icon: 'fa-font',
            shortcuts: [
                { key: 'Mod+b', description: 'Toggle bold' },
                { key: 'Mod+i', description: 'Toggle italic' }
            ]
        },
        {
            title: 'Text Structure',
            icon: 'fa-header',
            shortcuts: [
                { key: 'Mod+Shift+1', description: 'Heading 1' },
                { key: 'Mod+Shift+2', description: 'Heading 2' },
                { key: 'Mod+Shift+3', description: 'Heading 3' },
                { key: 'Mod+Shift+4', description: 'Heading 4' },
                { key: 'Mod+Shift+5', description: 'Normal text' },
                { key: 'Mod+Shift+6', description: 'Heading 5' }
            ]
        },
        {
            title: 'Lists & Blocks',
            icon: 'fa-list',
            shortcuts: [
                { key: 'Mod+Shift+9', description: 'Ordered list' },
                { key: 'Mod+Shift+8', description: 'Bullet list' },
                { key: 'Mod+Shift+>', description: 'Blockquote' },
                { key: 'Mod+Shift+\\', description: 'Code block' },
                { key: 'Shift+Tab', description: 'Outdent list item' }
            ]
        },
        {
            title: 'Navigation & History',
            icon: 'fa-history',
            shortcuts: [
                { key: 'Mod+z', description: 'Undo' },
                { key: 'Mod+y', description: 'Redo' },
                { key: 'Tab', description: 'Next cell in table' },
                { key: 'Shift+Tab', description: 'Previous cell in table' }
            ]
        },
        {
            title: 'Special Actions',
            icon: 'fa-magic',
            shortcuts: [
                { key: 'Mod+Enter', description: 'Hard break' },
                { key: 'Shift+Enter', description: 'Soft break' },
                { key: 'Ctrl+S', description: 'Submit post/comment' },
                { key: 'Cmd+S', description: 'Submit post/comment (Mac)' },
                { key: '@', description: 'Mention user (type @username)' },
                { key: 'Alt+Shift+?', description: 'Show keyboard shortcuts' }
            ]
        }
    ];

    var showShortcutsModal = function () {
        try {
            let content = `
                <div class="keyboard-shortcuts-container" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    <style>
                        .shortcut-header {
                            text-align: center;
                            margin-bottom: 15px;
                            padding-bottom: 10px;
                            border-bottom: 1px solid #e9ecef;
                        }
                        .shortcut-header h4 {
                            color: #2c3e50;
                            font-weight: 600;
                            margin-bottom: 5px;
                            font-size: 18px;
                        }
                        .shortcut-intro {
                            color: #6c757d;
                            font-size: 13px;
                            line-height: 1.4;
                        }
                        .shortcut-categories {
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                            gap: 12px;
                            margin-bottom: 15px;
                        }
                        .shortcut-category {
                            background: #f8f9fa;
                            border-radius: 8px;
                            padding: 12px;
                            box-shadow: 0 1px 4px rgba(0,0,0,0.05);
                        }
                        .category-header {
                            display: flex;
                            align-items: center;
                            margin-bottom: 8px;
                            padding-bottom: 6px;
                            border-bottom: 1px solid #dee2e6;
                        }
                        .category-icon {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            width: 24px;
                            height: 24px;
                            border-radius: 4px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-right: 8px;
                            font-size: 11px;
                        }
                        .category-title {
                            font-weight: 600;
                            color: #2c3e50;
                            font-size: 14px;
                        }
                        .shortcut-item {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 4px 0;
                            border-bottom: 1px solid #f1f3f4;
                        }
                        .shortcut-item:last-child {
                            border-bottom: none;
                        }
                        .shortcut-key {
                            background: linear-gradient(145deg, #ffffff, #f1f3f4);
                            border: 1px solid #dadce0;
                            border-radius: 4px;
                            padding: 2px 6px;
                            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                            font-size: 11px;
                            font-weight: 600;
                            color: #5f6368;
                            box-shadow: 0 1px 2px rgba(0,0,0,0.08);
                            white-space: nowrap;
                        }
                        .shortcut-description {
                            color: #495057;
                            font-size: 13px;
                            flex: 1;
                            margin-right: 8px;
                            line-height: 1.3;
                        }
                        .shortcut-note {
                            background: #e3f2fd;
                            border-left: 3px solid #2196f3;
                            padding: 10px;
                            border-radius: 0 6px 6px 0;
                            margin-top: 12px;
                        }
                        .shortcut-note-text {
                            color: #1565c0;
                            font-size: 12px;
                            line-height: 1.3;
                            margin: 0;
                        }
                        @media (max-width: 768px) {
                            .shortcut-categories {
                                grid-template-columns: 1fr;
                                gap: 8px;
                            }
                            .shortcut-category {
                                padding: 10px;
                            }
                            .shortcut-item {
                                flex-direction: column;
                                align-items: flex-start;
                                gap: 3px;
                                padding: 3px 0;
                            }
                        }
                    </style>
                    
                    <div class="shortcut-header">
                        <h4><i class="fa fa-keyboard-o" style="margin-right: 6px; color: #667eea;"></i>HumHub Keyboard Shortcuts</h4>
                        <div class="shortcut-intro">
                            Use these shortcuts in HumHub's rich text editor. <strong>"Mod"</strong> means <strong>Ctrl</strong> on Windows/Linux and <strong>Cmd</strong> on Mac.
                        </div>
                    </div>
                    
                    <div class="shortcut-categories">
                        ${shortcutCategories.map(category => `
                            <div class="shortcut-category">
                                <div class="category-header">
                                    <div class="category-icon">
                                        <i class="fa ${category.icon}"></i>
                                    </div>
                                    <div class="category-title">${category.title}</div>
                                </div>
                                <div class="category-shortcuts">
                                    ${category.shortcuts.map(shortcut => `
                                        <div class="shortcut-item">
                                            <div class="shortcut-description">${shortcut.description}</div>
                                            <div class="shortcut-key">${shortcut.key}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="shortcut-note">
                        <p class="shortcut-note-text">
                            <i class="fa fa-info-circle" style="margin-right: 4px;"></i>
                            <strong>Tip:</strong> These shortcuts work within the rich text editor. Ctrl+S/Cmd+S for submission works globally in HumHub forms.
                        </p>
                    </div>
                </div>`;

            modal.global.set({
                header: '<i class="fa fa-keyboard-o"></i> Keyboard Shortcuts',
                body: content,
                footer: '<button class="btn btn-primary" data-modal-close><i class="fa fa-check"></i> Got it</button>',
                size: 'medium' // Changed from 'large' to 'medium'
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