import type { Socket as BaseClientSocket } from "socket.io-client";
import type { Socket as BaseServerSocket } from "socket.io";

type Args = Record<string, readonly [arg0: any, ...args: any[]]>;
type MkArgs<O extends Args> = {
    [K in keyof O]: [K, ...O[K]];
}[keyof O];

/** */
export declare namespace Client {
    /**
     * @template R
     * Receiving. Arguments dictionary for incoming events from a server.
     *
     * @template T
     * Transmitting. Arguments dictionary for outgoing events to server.
     */
    export interface Socket<
        R extends Args,
        T extends Args,
    > extends BaseClientSocket {
        /** @override */
        on(...args: MkArgs<R>): this;

        /** @override */
        emit(...args: MkArgs<T>): this;
    }
}

/** */
export namespace Server {
    /**
     * @template R
     * Receiving. Arguments dictionary for incoming events from a client.
     *
     * @template T
     * Transmitting. Arguments dictionary for outgoing events to clients.
     */
    export interface Socket<
        R extends Args,
        T extends Args,
    > extends BaseServerSocket {
        /** @override */
        on(...args: MkArgs<R>): this;

        /** @override */
        emit(...args: MkArgs<T>): this;
    }
}