import Bool "mo:base/Bool";
import Func "mo:base/Func";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor {
  // Define the Player type
  type Player = {
    id: Nat;
    name: Text;
    team: Text;
    position: Text;
    passingYards: Nat;
    rushingYards: Nat;
    receivingYards: Nat;
    touchdowns: Nat;
  };

  // Create a stable variable to store players
  stable var nextId: Nat = 0;
  stable var playersEntries: [(Nat, Player)] = [];

  // Create a HashMap to store players
  var players = HashMap.HashMap<Nat, Player>(0, Nat.equal, Nat.hash);

  // Initialize the HashMap with stable data
  system func preupgrade() {
    playersEntries := Iter.toArray(players.entries());
  };

  system func postupgrade() {
    players := HashMap.fromIter<Nat, Player>(playersEntries.vals(), 0, Nat.equal, Nat.hash);
  };

  // Function to add a new player
  public func addPlayer(name: Text, team: Text, position: Text) : async Nat {
    let id = nextId;
    let player: Player = {
      id;
      name;
      team;
      position;
      passingYards = 0;
      rushingYards = 0;
      receivingYards = 0;
      touchdowns = 0;
    };
    players.put(id, player);
    nextId += 1;
    id
  };

  // Function to update player statistics
  public func updateStats(id: Nat, passingYards: Nat, rushingYards: Nat, receivingYards: Nat, touchdowns: Nat) : async Bool {
    switch (players.get(id)) {
      case (null) {
        return false;
      };
      case (?player) {
        let updatedPlayer: Player = {
          id = player.id;
          name = player.name;
          team = player.team;
          position = player.position;
          passingYards;
          rushingYards;
          receivingYards;
          touchdowns;
        };
        players.put(id, updatedPlayer);
        return true;
      };
    };
  };

  // Function to get all players
  public query func getAllPlayers() : async [Player] {
    Iter.toArray(players.vals())
  };

  // Function to get a player by ID
  public query func getPlayer(id: Nat) : async ?Player {
    players.get(id)
  };
}
