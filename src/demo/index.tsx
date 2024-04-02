import React from 'react';
import './index.less';
import { RCContextMenu } from '@xmzhou/rc-contextmenu';

const Index = () => {
    return (
        <RCContextMenu
            onChange={(k) => {
                console.log(k);
            }}
            menu={[
                {
                    key: 'format',
                    label: '格式化',
                    shortcutKeys: ['command', 'F']
                },
                {
                    key: 'run',
                    label: '运行',
                    shortcutKeys: ['command', 'Enter']
                },
                {
                    key: 'divider1',
                    type: 'divider',
                },
                {
                    key: 'copy',
                    label: '复制',
                    shortcutKeys: ['command', 'C']
                },
                {
                    key: 'cut',
                    label: '剪贴',
                    shortcutKeys: ['command', 'X']
                },
                {
                    key: 'paste',
                    label: '粘贴',
                    shortcutKeys: ['command', 'V']
                },
            ]}
        >
            <div className="demo-container" tabIndex={0}>
                <div className="demo-content">
                    我是内容区域
                </div>
            </div>
        </RCContextMenu>
    );
};

export default Index;