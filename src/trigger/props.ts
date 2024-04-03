import { ReactElement, ReactNode } from "react";

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
     * 右击菜单受控开闭
     */
    visible?: boolean;
    /**
     * 触发点击事件
     */
    onChange?: (key: string, data: RC_CONTEXT_MENU) => void;
    /**
     * 右击菜单开闭触发
     */
    onVisibleChange?: (v: boolean) => void;
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