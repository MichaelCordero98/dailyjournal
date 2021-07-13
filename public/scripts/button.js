var updateButton = document.getElementById("update");
updateButton.addEventListener('click', function() {
  var main = document.getElementById("main");
  var postTitle = updateButton.getAttribute("data-value");
  var postContent = updateButton.getAttribute("data-value2");
  var index = updateButton.getAttribute("data-value3");

  console.log(postTitle);
  console.log(postContent);
  main.innerHTML = "";

  var header = document.createElement('h1');
  header.innerHTML = "Edit";

  var form = document.createElement('form');
  form.setAttribute("action", "/posts/" + postTitle);
  form.setAttribute("method", "post");

  var div = document.createElement('div');
  div.classList.add("form-group");

  var title = document.createElement('label');
  title.innerHTML = "Title";

  var titleForm = document.createElement('textarea');
  titleForm.classList.add("form-control");
  titleForm.setAttribute("rows", "1");
  titleForm.setAttribute("cols", "80");
  titleForm.setAttribute("name", "postTitle");
  titleForm.innerHTML = postTitle;

  var post = document.createElement("label");
  post.innerHTML = "Post";

  var postArea = document.createElement("textarea");
  postArea.classList.add("form-control");
  postArea.setAttribute("name", "postBody");
  postArea.setAttribute("rows", "5");
  postArea.setAttribute("cols", "80");
  postArea.innerHTML = postContent;

  var oldTitle = document.createElement("textarea");
  oldTitle.classList.add("none");
  oldTitle.setAttribute("name", "oldTitle");
  oldTitle.innerHTML = postTitle;

  var button = document.createElement("button");
  button.classList.add("btn", "btn-primary");
  button.setAttribute("type", "submit");
  button.setAttribute("name", "index");
  button.setAttribute("value", index);
  button.innerHTML = "Publish";

  main.appendChild(header);
  main.appendChild(form);

  form.appendChild(div);
  form.appendChild(button);

  div.appendChild(title);
  div.appendChild(titleForm);
  div.appendChild(post);
  div.appendChild(postArea);
  div.appendChild(oldTitle);
})
