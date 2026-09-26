/**
 * jsdom has no layout engine: getClientRects() is always empty and
 * checkVisibility() does not exist. The focus trap uses checkVisibility to
 * tell a visible control from a display:none one (Tailwind's `hidden`), so
 * without a stand-in every control would look hidden and the trap would find
 * nothing to focus.
 *
 * The stub answers the same question from computed style, which is the part
 * of checkVisibility's behaviour the trap depends on.
 */
if (!('checkVisibility' in Element.prototype)) {
    Object.defineProperty(Element.prototype, 'checkVisibility', {
        configurable: true,
        writable: true,
        value(this: Element) {
            if (this.hasAttribute('hidden')) return false;
            return window.getComputedStyle(this).display !== 'none';
        },
    });
}
