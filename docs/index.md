## 安装
```shell
npm install @xmzhou/rc-contextmenu
```
## 说明
* <font color="red"> 暂不支持菜单项嵌套</font>，未来会支持
* 请确保`children`能够响应`onContextMenu`事件和`onScroll`事件
* 组件只会监听第一层元素的`onScroll`用以关闭右击菜单，如果需要实现滚动即关闭，可以设置组件的key来间接实现
* 如果需要监听快捷键响应，请确保设置了`children`的`tabIndex`或`children`可响应键盘事件
* 目前功能键仅支持`command`，`option`, `shift`，如果更多请联系作者

## 实例
<code src="@/demo/index.tsx"></code>

## API
``` typescript
export interface RC_CONTEXT_MENU_API {
    /**
     * 触发容器
     */
    children: ReactElement;
    /**
     * 弹出框功能菜单
     */
    menu?: RC_CONTEXT_MENU[];
    /**
     * 右键菜单样式
     */
    className?: string;
    /**
     * 菜单宽度
     * @default 200
     */
    width?: number;
    /**
     * 自动响应快捷键触发
     */
    shortcut?: boolean;
    /**
     * 触发点击事件
     */
    onChange?: (key: string, data: RC_CONTEXT_MENU) => void;
}


export type RC_CONTEXT_MENU = RC_CONTEXT_MENU_ITEM | RC_CONTEXT_MENU_DIVIDER;

export interface RC_CONTEXT_MENU_ITEM {
    /**
     * 菜单项唯一键
     */
    key: string;
    /**
     * 菜单项标题
     */
    label: ReactNode;
    /**
     * 菜单项样式	
     */
    className?: string;
    /**
     * 是否禁用	
     */
    disabled?: boolean;
    /**
     * 菜单图标
     */
    icon?: ReactNode;
    /**
     * 快捷键
     */
    shortcutKeys?: string[];
    /**
     * 自定义渲染函数
     */
    render?: (d: RC_CONTEXT_MENU, node: ReactNode) => ReactNode;
}

export interface RC_CONTEXT_MENU_DIVIDER {
    /**
     * 菜单项唯一键
     */
    key: string;
    /**
     * 分割线
     */
    type: 'divider';
    /**
     * 自定义渲染函数
     */
    render?: (d: RC_CONTEXT_MENU, node: ReactNode) => ReactNode;
}
```