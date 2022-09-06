const userAPI = async () => {
  const api = await fetch("./data.json");
  if (!api.ok) {
    alert("Couldn't find API. Please try again later");
  }
  if (api.status !== 200) {
    alert("API status: " + api.status);
  }
  return api.json();
};

const userMessage = async () => {
  let users = await userAPI();
  console.log(users);

  users = users.comments;
  let mainContainer = document.querySelector(".container");
  let threadCollection = document.createElement("div");
  threadCollection.classList.add("thread-collection");

  for (const id in users) {
    let user = users[id];

    let article = document.createElement("article");
    article.classList.add("message");

    let controls = document.createElement("div");
    controls.classList.add("controls");

    let plus = document.createElement("button");
    plus.setAttribute("type", "submit");
    plus.innerHTML = `<object data="./images/icon-plus.svg"></object>`;
    controls.appendChild(plus);

    let score = document.createElement("span");
    score.classList.add("score");
    score.innerHTML = user.score;
    controls.appendChild(score);

    let minus = document.createElement("button");
    minus.setAttribute("type", "submit");
    minus.innerHTML = `<object data="./images/icon-minus.svg"></object>`;
    controls.appendChild(minus);

    let mainMessage = document.createElement("div");
    mainMessage.classList.add("main-message");

    let header = document.createElement("header");

    let options = document.createElement("div");
    options.classList.add("options");

    let userImage = document.createElement("img");
    userImage.setAttribute("src", user.user.image.png);
    options.appendChild(userImage);

    let username = document.createElement("span");
    username.innerHTML = user.user.username;
    options.appendChild(username);

    let date = document.createElement("p");
    date.innerHTML = user.createdAt;
    options.appendChild(date);

    let reply = document.createElement("button");
    reply.classList.add("reply");
    user.id == 1 ? reply.setAttribute("onclick", "reply(this)") : "";

    reply.innerHTML = "<img src='/images/icon-reply.svg'>Reply";

    header.appendChild(options);
    header.appendChild(reply);

    let message = document.createElement("p");
    message.innerHTML = user.content;
    mainMessage.appendChild(header);
    mainMessage.appendChild(message);

    article.appendChild(controls);
    article.appendChild(mainMessage);

    mainContainer.appendChild(article);

    if (user.replies.length > 0) {
      let vr = document.createElement("div");
      vr.classList.add("vertical-rule");
      user = user.replies;
      for (var i = 0; i < user.length; i++) {
        let article = document.createElement("article");
        article.classList.add("message");

        let controls = document.createElement("div");
        controls.classList.add("controls");

        let plus = document.createElement("button");
        plus.setAttribute("type", "submit");
        plus.innerHTML = `<object data="./images/icon-plus.svg"></object>`;
        controls.appendChild(plus);

        let score = document.createElement("span");
        score.classList.add("score");
        score.innerHTML = user[i].score;
        controls.appendChild(score);

        let minus = document.createElement("button");
        minus.setAttribute("type", "submit");
        minus.innerHTML = `<object data="./images/icon-minus.svg"></object>`;
        controls.appendChild(minus);

        let mainMessage = document.createElement("div");
        mainMessage.classList.add("main-message");

        let header = document.createElement("header");

        let options = document.createElement("div");
        options.classList.add("options");

        let userImage = document.createElement("img");
        userImage.setAttribute("src", user[i].user.image.png);
        options.appendChild(userImage);

        let username = document.createElement("span");
        username.innerHTML = user[i].user.username;
        options.appendChild(username);

        let date = document.createElement("p");
        date.innerHTML = user[i].createdAt;
        options.appendChild(date);

        if (i == 1) {
          let you = document.createElement("p");
          you.classList.add("you");
          you.innerHTML = "you";

          date.parentNode.insertBefore(you, date);
          header.appendChild(options);
          header.appendChild(document.querySelector(".message-action"));
        } else {
          let reply = document.createElement("button");
          reply.classList.add("reply");
          reply.setAttribute("onclick", "reply(this)");
          reply.innerHTML = "<img src='/images/icon-reply.svg'>Reply";

          header.appendChild(options);
          header.appendChild(reply);
        }

        let message = document.createElement("p");
        message.innerHTML = `<span class="tagged">@${user[i].replyingTo} </span>`;
        message.innerHTML += user[i].content;

        mainMessage.appendChild(header);
        mainMessage.appendChild(message);

        article.appendChild(controls);
        article.classList.add("thread");
        article.appendChild(mainMessage);

        threadCollection.appendChild(article);
      }

      let replyThread = document.createElement("div");
      replyThread.classList.add("reply-thread");
      replyThread.appendChild(vr);
      replyThread.appendChild(threadCollection);
      mainContainer.appendChild(replyThread);
      let chatBox = document.querySelector(".message-reply");
      chatBox.style.display = "flex";
      replyThread.parentNode.appendChild(chatBox);
    }
  }
};

userMessage();

let remove = document.querySelector(".delete");
remove.addEventListener("click", function (e) {
  document.querySelector(".overlay").style.display = "flex";
});

cancel = (el) => {
  document.querySelector(".overlay").style.display = "none";
};

reply = (e) => {
  let reply = document.querySelector(".message-reply");
  e.parentNode.parentNode.parentNode.parentNode.insertBefore(
    reply,
    e.parentNode.parentNode.parentNode.nextElementSibling
  );
  reply.style.display = "flex";
};
