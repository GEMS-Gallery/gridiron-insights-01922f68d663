import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Player {
  'id' : bigint,
  'rushingYards' : bigint,
  'touchdowns' : bigint,
  'name' : string,
  'team' : string,
  'receivingYards' : bigint,
  'passingYards' : bigint,
  'position' : string,
}
export interface _SERVICE {
  'addPlayer' : ActorMethod<[string, string, string], bigint>,
  'getAllPlayers' : ActorMethod<[], Array<Player>>,
  'getPlayer' : ActorMethod<[bigint], [] | [Player]>,
  'updateStats' : ActorMethod<
    [bigint, bigint, bigint, bigint, bigint],
    boolean
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
