import { backend } from 'declarations/backend';

let players = [];

async function init() {
    await refreshPlayers();
    setupEventListeners();
}

async function refreshPlayers() {
    players = await backend.getAllPlayers();
    updatePlayerList();
    updatePlayerSelect();
}

function setupEventListeners() {
    document.getElementById('add-player-form').addEventListener('submit', addPlayer);
    document.getElementById('update-stats-form').addEventListener('submit', updatePlayerStats);
}

async function addPlayer(event) {
    event.preventDefault();
    const name = document.getElementById('player-name').value;
    const team = document.getElementById('player-team').value;
    const position = document.getElementById('player-position').value;

    await backend.addPlayer(name, team, position);
    await refreshPlayers();

    // Clear form fields
    event.target.reset();
}

async function updatePlayerStats(event) {
    event.preventDefault();
    const playerId = parseInt(document.getElementById('player-select').value);
    const passingYards = parseInt(document.getElementById('passing-yards').value);
    const rushingYards = parseInt(document.getElementById('rushing-yards').value);
    const receivingYards = parseInt(document.getElementById('receiving-yards').value);
    const touchdowns = parseInt(document.getElementById('touchdowns').value);

    await backend.updateStats(playerId, passingYards, rushingYards, receivingYards, touchdowns);
    await refreshPlayers();

    // Clear form fields
    event.target.reset();
}

function updatePlayerList() {
    const tbody = document.getElementById('players-body');
    tbody.innerHTML = '';

    players.forEach(player => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.team}</td>
            <td>${player.position}</td>
            <td>${player.passingYards}</td>
            <td>${player.rushingYards}</td>
            <td>${player.receivingYards}</td>
            <td>${player.touchdowns}</td>
        `;
    });
}

function updatePlayerSelect() {
    const select = document.getElementById('player-select');
    select.innerHTML = '<option value="">Select a player</option>';

    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = player.name;
        select.appendChild(option);
    });
}

init();
