import type { Socket as BaseClientSocket } from "socket.io-client";
import type { Socket as BaseServerSocket } from "socket.io";

interface CommsDesc {
	readonly Upstream:   Record<string, readonly any[]>;
	readonly Downstream: Record<string, readonly any[]>;
}

/** */
// @ts-expect-error
export interface ClientStrictSocket<C extends CommsDesc> extends BaseClientSocket {

	/** @override */
	on<E extends keyof C["Downstream"]>(eventName: E, callback: (...args: C["Downstream"][E]) => void): this;

	/** @override */
	emit<E extends keyof C["Upstream"]>(eventName: E, ...args: C["Upstream"][E]): this;
}

/** */
// @ts-expect-error
export interface ServerStrictSocket<C extends CommsDesc> extends BaseServerSocket {

	/** @override */
	on<E extends keyof C["Upstream"]>(eventName: E, callback: (...args: C["Upstream"][E]) => void): this;

	/** @override */
	emit<E extends keyof C["Downstream"]>(eventName: E, ...args: C["Downstream"][E]): boolean;
}