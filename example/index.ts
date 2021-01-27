import { io as ClientIo } from "socket.io-client";
import { Server as Server, Socket as ServerBaseSocket } from "socket.io";
import type { ClientStrictSocket, ServerStrictSocket } from "../index";

export namespace Dictionaries {
	export interface D1 {
		readonly Upstream: {
			"d1-upstream-A": [number, string, {a: number}];
			"d1-upstream-B": [string, {a: number}];
			"d1-upstream-C": [{a: number, b: string, c: Function}];
		};
		readonly Downstream: {
			"d1-downstream-1": [number, {a: number}, object, ...any[]];
			"d1-downstream-2": [string];
			"d1-downstream-3": [number, number, number, string, VoidFunction];
		};
	}
}

const clientSock1 = ClientIo({}) as ClientStrictSocket<Dictionaries.D1>;
clientSock1.on("d1-downstream-1", (a0, a1, a2, a3, a4, a5) => {
	a1.a;
});
clientSock1.emit("d1-upstream-B", "", {a: 2});

new Server({}).of("ns1", (baseSock: ServerBaseSocket) => {
	const serverSock1 = baseSock as ServerStrictSocket<Dictionaries.D1>;
	serverSock1.on("d1-upstream-A", (a0, a1, a2) => {
		;
	});
	serverSock1.emit("d1-downstream-3", 1, 2, 3, "", () => undefined);
});