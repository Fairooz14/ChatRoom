// const socket = io();
// let currentRoom = '';

// const form = document.getElementById('form');
// const input = document.getElementById('input');
// const roomInput = document.getElementById('room');
// const joinButton = document.getElementById('join');

// joinButton.addEventListener('click', function () {
//     const room = roomInput.value;
//     if (room) {
//         socket.emit('join room', room);
//         currentRoom = room;
//         document.getElementById('messages').innerHTML = ''; // Clear previous messages
//     }
// });

// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     if (input.value && currentRoom) {
//         socket.emit('chat message', {
//             room: currentRoom,
//             msg: input.value
//         });
//         input.value = '';
//     }
// });

// socket.on('chat message', function (msg) {
//     const item = document.createElement('li');
//     item.textContent = msg;
//     document.getElementById('messages').appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
// });

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js').then((registration) => {
//             console.log('ServiceWorker registration successful with scope: ', registration
//                 .scope);
//         }, (error) => {
//             console.log('ServiceWorker registration failed: ', error);
//         });
//     });
// }