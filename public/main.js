

(function(){
    const app = document.querySelector(".app");
    const socket = io();

    let usersListUI = document.querySelector(".user-list .users");
    let totalUsersUI = document.getElementById("user-count");
    let totalUsersSidebarUI = document.querySelector(".user-list h4");
    let userListSidebar = document.querySelector(".user-list");
    let uname;

    const colors = [
        "#2196F3", "#32c787", "#00BCD4", "#ff5652", "#ffc107",
        "#ff85af", "#FF9800", "#39bbb0", "#fcba03", "#fc0303",
        "#de5454", "#b9de54", "#54ded7", "#54ded7", "#1358d6",
        "#d611c6"
    ];

    app.querySelector(".join-screen #join-user").addEventListener("click", function(){
        let username = app.querySelector(".join-screen #username").value;
        if(username.length == 0){
            return;
        }
        socket.emit("newuser", username);
        uname = username;
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    });

    app.querySelector(".chat-screen #send-message").addEventListener("click", function(){
        let message = app.querySelector(".chat-screen #message-input").value;
        if(message.length == 0){
            return;
        }
        renderMessage("my", {
            username: uname,
            text: message
        });
        socket.emit("chat", {
            username: uname,
            text: message
        });
        app.querySelector(".chat-screen #message-input").value = "";
    });

    app.querySelector(".chat-screen #exit-chat").addEventListener("click", function(){
        socket.emit("exituser", uname);
        window.location.href = window.location.href;
    });

    app.querySelector(".chat-screen #toggle-user-list").addEventListener("click", function(){
        userListSidebar.classList.toggle("active");
    });

    document.addEventListener("click", function(event) {
        if (!userListSidebar.contains(event.target) && !app.querySelector("#toggle-user-list").contains(event.target)) {
            if (userListSidebar.classList.contains("active")) {
                userListSidebar.classList.remove("active");
            }
        }
    });

    socket.on("update", function(update){
        renderMessage("update", update);
    });

    socket.on("chat", function(message){
        renderMessage("other", message);
    });

    socket.on("userList", function(users){
        updateUsersList(users);
    });

    function renderMessage(type, message){
        let messageContainer = app.querySelector(".chat-screen .messages");
        let el = document.createElement("div");

        if(type == "my"){
            el.setAttribute("class", "message my-message");
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
        } else if(type == "other"){
            el.setAttribute("class", "message other-message");
            el.innerHTML = `
                <div>
                    <div class="name" style="color:${nameColor(message.username)};">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
        } else if(type == "update"){
            el.setAttribute("class", "update");
            el.innerText = message;
        }

        messageContainer.appendChild(el);
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

    function updateUsersList(users){
        usersListUI.innerHTML = "";
        users.forEach(user => {
            let li = document.createElement("li");
            li.innerText = user;
            li.style.color = nameColor(user); // Apply color to the username
            usersListUI.appendChild(li);
        });
        totalUsersUI.innerText = `Total: ${users.length}`;
        totalUsersSidebarUI.innerText = `Total: ${users.length}`;
    }


    // Function to generate a color based on the username
    function nameColor(username) {
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = 31 * hash + username.charCodeAt(i);
        }
        let index = Math.abs(hash % colors.length);
        return colors[index];
    }
})();







