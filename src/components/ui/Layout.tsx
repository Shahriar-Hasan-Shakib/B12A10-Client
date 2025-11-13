import React, { type ReactElement } from 'react';

interface DataObject extends Record<string, DataValue> { }
type DataValue = string | number | boolean | null | undefined | React.ReactElement | DataObject | DataValue[];
interface StyleObject extends Record<string, StyleValue> { }
type StyleValue = string | StyleObject;
interface LayoutProps { tag?: string; data: DataObject; style?: StyleObject; }

const detectTag = (key = ''): string => {
    const tags: Record<string, string> = {
        nav: 'nav', header: 'header', footer: 'footer', main: 'main', section: 'section',
        h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', ul: 'ul', ol: 'ol', li: 'li', p: 'p', span: 'span',
        button: 'button', a: 'a', img: 'img', table: 'table'
    };
    return tags[key.toLowerCase()] || 'div';
};
const getType = (v: DataValue): string => {
    if (v == null) return 'null';
    if (Array.isArray(v)) return 'array';
    if (React.isValidElement(v)) return 'element';
    if (typeof v === 'object') return 'object';
    return typeof v === 'string' || typeof v === 'number' ? 'primitive' : 'null';
};

export const Layout = ({ tag = 'section', data, style = {} }: LayoutProps): ReactElement => {
    const Container = detectTag(tag) as React.ElementType;
    const render = (tag: string = '', val: DataValue, sty: StyleValue, key: string = '', parentItem = ''): ReactElement | null => {
        const Tag = detectTag(tag) as React.ElementType;
        const container = typeof sty === 'object' ? (sty?.container as string || '') : '';
        const item = typeof sty === 'object' ? (sty?.item as string || '') : (sty || '');
        const itemClass = typeof item === 'string' ? item : '';
        const combinedItem = `${parentItem} ${itemClass}`.trim();

        switch (getType(val)) {
            case 'array': {
                const arrayVal = val as DataValue[];
                if (arrayVal.length === 0) return null;
                if (arrayVal[0] && React.isValidElement(arrayVal[0])) {
                    return (<Tag key={key} className={container}>{(arrayVal as React.ReactElement[]).map((elem, i: number) => cloneElement(elem, combinedItem, key + i))}</Tag>);
                }
                if (arrayVal[0] && typeof arrayVal[0] === 'object') {
                    return (<Tag key={key} className={container}>{arrayVal.map((elem, i: number) => render('div', elem, typeof item === 'object' ? item : '', key + i, itemClass))}</Tag>);
                }
                return <Tag key={key} className={combinedItem}>{arrayVal}</Tag>;
            }
            case 'object': {
                const objVal = val as DataObject;
                return (<Tag key={key} className={container}>{Object.entries(objVal).map(([k, v]) => {
                    const styObj = typeof sty === 'object' ? sty as DataObject : {};
                    const styKey = styObj[k] as StyleValue;
                    const fallback = typeof item === 'object' ? item : '';
                    return render(k, v, styKey || fallback, key + k, itemClass);
                })}</Tag>);
            }
            case 'element': return cloneElement(val as React.ReactElement, combinedItem, key);
            case 'primitive': return <Tag key={key} className={combinedItem}>{val as React.ReactNode}</Tag>;
            default: return null;
        }
    };

    const styleObj = typeof style === 'object' ? style as DataObject : {};
    const containerClass = typeof style === 'object' ? (styleObj?.container as string || '') : '';

    return (
        <Container className={containerClass}>
            {Object.entries(data).map(([k, v], i) => {
                const styKey = styleObj[k] as StyleValue;
                return render(k, v, styKey || '', `root-${k}-${i}`, '');
            })}
        </Container>
    );
};

function cloneElement(item: React.ReactElement, className = '', key: number | string) {
    const itemProps = item.props as { className?: string };
    return React.cloneElement(item, { key, className: `${itemProps.className || ''} ${className}`.trim() } as Partial<unknown>);
}


