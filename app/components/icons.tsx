/**
 * Inline Lucide icon data.
 *
 * These are the exact node definitions from lucide, narrowed to the
 * 28 icons this site actually renders. They used to be loaded as a
 * 350KB UMD bundle from a CDN and swapped in at runtime by
 * `lucide.createIcons()`, which meant a blocked CDN silently blanked every
 * icon AND nothing rendered at all without JavaScript. Inlining them makes the
 * icons part of the server-rendered HTML, removes the third-party request
 * entirely, and cuts the payload to a few kilobytes.
 *
 * To add an icon: copy its `[tag, attrs]` nodes out of the lucide package
 * (or the lucide site) and add another entry below. `icons.test.ts` fails if
 * a component references a name that is not defined here.
 */

/** The SVG element names Lucide icons are built from. */
export type SvgTag = 'path' | 'rect' | 'circle' | 'polyline' | 'line' | 'polygon' | 'ellipse';

export type SvgAttrs = Record<string, string | number>;

/** One child node inside an icon. */
export type SvgNode = [SvgTag, SvgAttrs];

/** The root `<svg>` element plus the nodes drawn inside it. */
export type IconData = [['svg', SvgAttrs], SvgNode[]];

/** Kebab-case icon name -> the root svg node plus its children. */
export const ICONS: Record<string, IconData> = {
  'arrow-down-right': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"m7 7 10 10"}],
    ['path', {"d":"M17 7v10H7"}],
    ],
  ],
  'arrow-up-right': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M7 7h10v10"}],
    ['path', {"d":"M7 17 17 7"}],
    ],
  ],
  'external-link': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M15 3h6v6"}],
    ['path', {"d":"M10 14 21 3"}],
    ['path', {"d":"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}],
    ],
  ],
  'file-text': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],
    ['path', {"d":"M14 2v4a2 2 0 0 0 2 2h4"}],
    ['path', {"d":"M10 9H8"}],
    ['path', {"d":"M16 13H8"}],
    ['path', {"d":"M16 17H8"}],
    ],
  ],
  'github': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"}],
    ['path', {"d":"M9 18c-4.51 2-5-2-7-2"}],
    ],
  ],
  'folder-git-2': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"}],
    ['circle', {"cx":"13","cy":"12","r":"2"}],
    ['path', {"d":"M18 19c-2.8 0-5-2.2-5-5v8"}],
    ['circle', {"cx":"20","cy":"19","r":"2"}],
    ],
  ],
  'gauge': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"m12 14 4-4"}],
    ['path', {"d":"M3.34 19a10 10 0 1 1 17.32 0"}],
    ],
  ],
  'globe-lock': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13"}],
    ['path', {"d":"M2 12h8.5"}],
    ['path', {"d":"M20 6V4a2 2 0 1 0-4 0v2"}],
    ['rect', {"width":"8","height":"5","x":"14","y":"6","rx":"1"}],
    ],
  ],
  'grid-3x3': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['rect', {"width":"18","height":"18","x":"3","y":"3","rx":"2"}],
    ['path', {"d":"M3 9h18"}],
    ['path', {"d":"M3 15h18"}],
    ['path', {"d":"M9 3v18"}],
    ['path', {"d":"M15 3v18"}],
    ],
  ],
  'graduation-cap': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"}],
    ['path', {"d":"M22 10v6"}],
    ['path', {"d":"M6 12.5V16a6 3 0 0 0 12 0v-3.5"}],
    ],
  ],
  'lock': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['rect', {"width":"18","height":"11","x":"3","y":"11","rx":"2","ry":"2"}],
    ['path', {"d":"M7 11V7a5 5 0 0 1 10 0v4"}],
    ],
  ],
  'trash-2': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M3 6h18"}],
    ['path', {"d":"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],
    ['path', {"d":"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],
    ['line', {"x1":"10","x2":"10","y1":"11","y2":"17"}],
    ['line', {"x1":"14","x2":"14","y1":"11","y2":"17"}],
    ],
  ],
  'waves': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],
    ['path', {"d":"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],
    ['path', {"d":"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],
    ],
  ],
  'x': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M18 6 6 18"}],
    ['path', {"d":"m6 6 12 12"}],
    ],
  ],
  'plane': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"}],
    ],
  ],
  'square-terminal': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"m7 11 2-2-2-2"}],
    ['path', {"d":"M11 13h4"}],
    ['rect', {"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],
    ],
  ],
  'braces': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"}],
    ['path', {"d":"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"}],
    ],
  ],
  'code': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['polyline', {"points":"16 18 22 12 16 6"}],
    ['polyline', {"points":"8 6 2 12 8 18"}],
    ],
  ],
  'linkedin': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],
    ['rect', {"width":"4","height":"12","x":"2","y":"9"}],
    ['circle', {"cx":"4","cy":"4","r":"2"}],
    ],
  ],
  'mail': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['rect', {"width":"20","height":"16","x":"2","y":"4","rx":"2"}],
    ['path', {"d":"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],
    ],
  ],
  'music-4': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M9 18V5l12-2v13"}],
    ['path', {"d":"m9 9 12-2"}],
    ['circle', {"cx":"6","cy":"18","r":"3"}],
    ['circle', {"cx":"18","cy":"16","r":"3"}],
    ],
  ],
  'phone': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}],
    ],
  ],
  'piggy-bank': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"}],
    ['path', {"d":"M2 9v1c0 1.1.9 2 2 2h1"}],
    ['path', {"d":"M16 11h.01"}],
    ],
  ],
  'route': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['circle', {"cx":"6","cy":"19","r":"3"}],
    ['path', {"d":"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"}],
    ['circle', {"cx":"18","cy":"5","r":"3"}],
    ],
  ],
  'trophy': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M6 9H4.5a2.5 2.5 0 0 1 0-5H6"}],
    ['path', {"d":"M18 9h1.5a2.5 2.5 0 0 0 0-5H18"}],
    ['path', {"d":"M4 22h16"}],
    ['path', {"d":"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"}],
    ['path', {"d":"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"}],
    ['path', {"d":"M18 2H6v7a6 6 0 0 0 12 0V2Z"}],
    ],
  ],
  'menu': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['line', {"x1":"4","x2":"20","y1":"12","y2":"12"}],
    ['line', {"x1":"4","x2":"20","y1":"6","y2":"6"}],
    ['line', {"x1":"4","x2":"20","y1":"18","y2":"18"}],
    ],
  ],
  'moon': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['path', {"d":"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"}],
    ],
  ],
  'sun': [
    ['svg', {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round"}],
    [
    ['circle', {"cx":"12","cy":"12","r":"4"}],
    ['path', {"d":"M12 2v2"}],
    ['path', {"d":"M12 20v2"}],
    ['path', {"d":"m4.93 4.93 1.41 1.41"}],
    ['path', {"d":"m17.66 17.66 1.41 1.41"}],
    ['path', {"d":"M2 12h2"}],
    ['path', {"d":"M20 12h2"}],
    ['path', {"d":"m6.34 17.66-1.41 1.41"}],
    ['path', {"d":"m19.07 4.93-1.41 1.41"}],
    ],
  ],
};

export type IconName = keyof typeof ICONS;

/** Narrows a loose string to a known icon before <Icon /> looks it up. */
export function hasIcon(name: string): name is IconName {
  return Object.prototype.hasOwnProperty.call(ICONS, name);
}
