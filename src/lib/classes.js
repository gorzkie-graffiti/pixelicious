/**
 * Tailwind class strings extracted verbatim from the recovered component bundle
 * (`_app/immutable/components/pages/_page.svelte-e11325da.js`).
 *
 * The original emitted these long literal strings inline from the compiled Svelte
 * output. They are hoisted into constants here purely so repeated buttons do not have
 * to repeat ~350 characters; the rendered `class` attributes are identical.
 */

/** Orange "pressed" button — Download, "Go to Scenario", "Get Pro". */
export const BTN_ORANGE =
	'shadow-[0px_4px_0px_rgba(167,26,1,1)] w-full disabled:cursor-not-allowed hover:bg-[#EC5B41] active:shadow-[0px_0px_0px_rgba(167,26,1,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Orange rounded-md';

/** Light-blue "pressed" button — Generate, Close, and the grid-size choices. */
export const BTN_LIGHT =
	'shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md';

/** Same button, in its selected/highlighted state (inset glow). */
export const BTN_LIGHT_ACTIVE =
	'shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md';

/** Dimmed label used on unselected grid-size buttons. */
export const BTN_LIGHT_LABEL = 'z-10 text-[#978DBA]';

/** Full-screen click-to-close backdrop shared by every modal. */
export const MODAL_OVERLAY =
	'fixed cursor-pointer top-0 left-0 z-[60] bg-Deep-blue/80 backdrop-blur-3xl w-screen h-screen';

/** Centred modal container. */
export const MODAL_POSITION =
	'fixed top-1/2 z-[70] left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center';

/** Right-hand drawer shell (`#modal`) in its open state. */
export const DRAWER_OPEN =
	'fixed h-screen w-screen sm:w-auto overflow-y-scroll z-50 p-6 shadow-lg flex flex-col transition-all duration-200 -translate-x-0 top-0 right-0 bg-Medium-Blue sm:border-l sm:border-Light-Blue text-Grey-White font-calistoga';

/** Right-hand drawer shell in its closed (off-screen) state. */
export const DRAWER_CLOSED =
	'fixed h-screen w-screen sm:w-auto overflow-y-scroll z-50 p-6 shadow-none flex flex-col transition-all duration-200 translate-x-full top-0 right-0 bg-Medium-Blue sm:border-l sm:border-Light-Blue text-Grey-White font-calistoga';

/** Dashed upload drop zone, idle. */
export const UPLOAD_IDLE =
	'cursor-pointer font-calistoga bg-Medium-Blue h-full w-full flex flex-col justify-center items-center border border-dashed border-Light-Blue rounded-md';

/** Dashed upload drop zone, while a drag hovers it (`handleDragEnter`). */
export const UPLOAD_DRAG =
	'cursor-pointer font-calistoga bg-[#251849] h-full w-full flex flex-col justify-center items-center border border-dashed border-Light-Blue rounded-md';

/** Card shell used by the palette swatch panel. */
export const CARD =
	'flex flex-col justify-center p-3 border border-Light-Blue bg-Medium-Blue rounded-md items-center w-full space-y-2';

/** Small centred modal panel. */
export const MODAL_PANEL =
	'fixed bg-Medium-Blue min-w-[256px] justify-center items-center flex flex-col border border-Light-Blue font-calistoga text-center text-Grey-White top-1/2 z-[100] left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-md';

/** Close affordance that floats under the modals. */
export const MODAL_CLOSE_BUTTON =
	'flex absolute -bottom-14 hover:scale-110 transition-all duration-200 cursor-pointer flex-col justify-center items-center';

/** Chevron rotation for the collapsible sections. */
export const CHEVRON_OPEN = 'rotate-180 transition-all duration-200';
export const CHEVRON_CLOSED = 'transition-all duration-200';
