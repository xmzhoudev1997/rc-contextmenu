import React, { FC } from "react";
import useData from './hook';
import { RC_CONTEXT_MENU_API, RC_CONTEXT_MENU_DIVIDER, RC_CONTEXT_MENU_ITEM } from "./props";
import classNames from 'classnames';
import './index.less';


const SPECIAL_KEY_MAP = {
    command: '⌘',
    option: '⌥',
    shift: '⇧',
    enter: '↵',
}

const Index: FC<RC_CONTEXT_MENU_API> = ({
    children, className, menu = [], width = 200, shortcut = false,
    onChange = () => { },
}) => {
    const {
        left, top, show, child, containerRef,
        handleContainerClose,
    } = useData(children, menu, width, onChange, shortcut);
    const shortcutRender = (shortcutKeys: string[]) => {
        return shortcutKeys.map(d => {
            if (Object.keys(SPECIAL_KEY_MAP).includes(d.toLowerCase())) {
                return <div className="xm-context-menu-shortcut-item">{(SPECIAL_KEY_MAP as any)[d.toLowerCase()]}</div>
            }
            return <div className="xm-context-menu-shortcut-item">{d.toUpperCase()}</div>
        })
    }
    return (
        <>
            {child}
            {<ul
                className={classNames(
                    'xm-context-menu',
                    className,
                )}
                ref={containerRef}
                tabIndex={0}
                role="menu"
                style={{
                    left,
                    top,
                    width,
                    display: show ? 'block' : 'none'
                }}
                onBlur={handleContainerClose}
                onContextMenu={e => e.preventDefault()}
            >
                {
                    menu.map(d => {
                        let node = null;
                        if ((d as RC_CONTEXT_MENU_DIVIDER).type === 'divider') {
                            node = <li className="xm-context-menu-divider" key={d.key} />;
                        } else {
                            node = <li
                                className="xm-context-menu-item"
                                key={d.key}
                                role="menuitem"
                                onClick={() => {
                                    onChange(d.key, d);
                                    handleContainerClose();
                                }}
                            >
                                <div className="xm-context-menu-icon">{(d as RC_CONTEXT_MENU_ITEM).icon}</div>
                                <div className="xm-context-menu-name">{(d as RC_CONTEXT_MENU_ITEM).label}</div>
                                <div className="xm-context-menu-shortcut">{shortcutRender((d as RC_CONTEXT_MENU_ITEM).shortcutKeys || [])}</div>
                            </li>
                        }
                        return d.render ? d.render(d, node) : node;
                    })
                }
            </ul>
            }
        </>
    );
};

export default Index;