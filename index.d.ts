import type { Socket as BaseClientSocket } from "socket.io-client";
import type { Socket as BaseServerSocket } from "socket.io";

type _Args = Record<string, readonly any[]>;

type _MkEmitArgs<O extends _Args> = {
	[K in keyof O]: [K, ...O[K]];
}[keyof O];

type _MkOnArgs<O extends _Args> = {
	[K in keyof O]: [K, (...args: O[K]) => void];
}[keyof O];

interface CommsDesc {
	readonly Upstream: _Args;
	readonly Downstream: _Args;
}

/** */
// @ts-expect-error
export interface ClientStrictSocket<C extends CommsDesc> extends BaseClientSocket {
	/** @override */
	on(...args: _MkOnArgs<C["Downstream"]>): this;

	/** @override */
	emit(...args: _MkEmitArgs<C["Upstream"]>): this;
}

/** */
// @ts-expect-error
export interface ServerStrictSocket<C extends CommsDesc> extends BaseServerSocket {
	/** @override */
	on(...args: _MkOnArgs<C["Upstream"]>): this;

	/** @override */
	emit(...args: _MkEmitArgs<C["Downstream"]>): boolean;
}