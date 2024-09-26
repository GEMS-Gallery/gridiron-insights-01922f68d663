export const idlFactory = ({ IDL }) => {
  const Player = IDL.Record({
    'id' : IDL.Nat,
    'rushingYards' : IDL.Nat,
    'touchdowns' : IDL.Nat,
    'name' : IDL.Text,
    'team' : IDL.Text,
    'receivingYards' : IDL.Nat,
    'passingYards' : IDL.Nat,
    'position' : IDL.Text,
  });
  return IDL.Service({
    'addPlayer' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'getAllPlayers' : IDL.Func([], [IDL.Vec(Player)], ['query']),
    'getPlayer' : IDL.Func([IDL.Nat], [IDL.Opt(Player)], ['query']),
    'updateStats' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
