import { AuthOptions } from "next-auth";
declare module "lodash-move";

declare module "*.css";

declare module "lodash-move";

import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      id: string;
    };
  }
}
declare module "lodash-move";
declare interface Array<T> {
  at(index: number): T;
}

Array.prototype.at = function (index: number) {
  if (index < 0) return this[this.length + index];
  return this[index];
};
