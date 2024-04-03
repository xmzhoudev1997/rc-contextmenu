import React, { useState } from 'react';
import './index.less';
import { RCContextMenu } from '@xmzhou/rc-contextmenu';

const Index = () => {
    const [visible, setVisble] = useState(false);
    return (
        <div className="demo-container" onScroll={() => setVisble(false)}>
            <RCContextMenu
                visible={visible}
                onVisibleChange={setVisble}
                onChange={(k) => {
                    console.log('触发菜单', k);
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
                <div className="demo-content" tabIndex={0}>
                    我是内容区域
                </div>
            </RCContextMenu>
        </div>
    );
};

export default Index;