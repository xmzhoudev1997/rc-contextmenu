import { cloneElement, useEffect, useMemo, useRef } from "react";
import { RC_CONTEXT_MENU_API, RC_CONTEXT_MENU_DIVIDER, RC_CONTEXT_MENU_ITEM } from "./props";
import { useSetState } from 'ahooks';

interface State {
    left: number,
    top: number,
    show: boolean,
}

const SPECIAL_KEY_MAP = {
    command: 'metaKey',
    option: 'altKey',
    shift: 'shiftKey',
    ctrl: 'ctrlKey',
}

export default (
    children: RC_CONTEXT_MENU_API['children'],
    menu: RC_CONTEXT_MENU_API['menu'],
    width: Required<RC_CONTEXT_MENU_API>['width'],
    onChange: Required<RC_CONTEXT_MENU_API>['onChange'],
    shortcut: Required<RC_CONTEXT_MENU_API>['shortcut'],
    onVisibleChange: Required<RC_CONTEXT_MENU_API>['onVisibleChange'],
    visible: RC_CONTEXT_MENU_API['visible'],
) => {
    const [state, setState] = useSetState<State>({
        left: 0,
        top: 0,
        show: false,
    });
    const finalOpen = visible ?? state.show;
    const containerRef = useRef<HTMLUListElement>(null);
    const totalHeight = useMemo(() => {
        let height = 8;
        menu?.forEach(d => {
            if ((d as RC_CONTEXT_MENU_DIVIDER).type === 'divider') {
                height += 9;
                return;
            }
            height += 30;
        })
        return height;
    }, [menu])
    const handleOpenContextMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        const x = e.clientX;
        const y = e.clientY;
        const pageX = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const pageY = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const obj: State = {
            left: x,
            top: y,
            show: true,
        }
        if (pageX < x + width) {
            obj.left = x - width;
        }
        if (pageY < y + totalHeight) {
            obj.top = y - totalHeight;
        }
        setState(obj);
        onVisibleChange(true);
    }
    const handleContainerClose = () => {
        onVisibleChange(false);
        setState({
            left: 0,
            top: 0,
            show: false,
        });
    }
    const handleContainerShortcut= (e: React.KeyboardEvent) => {
        console.log(e);
        if(!shortcut) {
            return;
        }
        e.preventDefault();
        menu?.forEach(d => {
            const keys = (d as RC_CONTEXT_MENU_ITEM).shortcutKeys || [];
            const flag = !!keys.length && keys.every((k) => {
                if (Object.keys(SPECIAL_KEY_MAP).includes(k.toLowerCase())) {
                    return (e as any)[(SPECIAL_KEY_MAP as any)[k.toLowerCase()]]
                }
                return e.key.toLowerCase() === k.toLocaleLowerCase();
            });
            if (flag) {
                onChange(d.key, d);
            }
        });
    }
    const child = cloneElement(children, {
        onContextMenu: handleOpenContextMenu,
        onScroll: handleContainerClose,
        onKeyDown: handleContainerShortcut,
    });
    useEffect(() => {
        if (!finalOpen) {
            return;
        }
        if (containerRef.current) {
            containerRef.current.focus();
        }
    }, [finalOpen])
    return {
        child,
        containerRef,
        ...state,
        finalOpen,
        handleContainerClose,
    };
}