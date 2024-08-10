document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("newPostModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeBtn = document.getElementsByClassName("closeBtn")[0];

    openModalBtn.onclick = () => {
        modal.style.display = "block";
    }

    closeBtn.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    const user = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem('user', JSON.stringify(user));
    alert("Registration successful! You can now log in.");
    window.location.href = 'login.html';
    return false;
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
        alert("Login successful!");
        window.location.href = 'main.html';
    } else {
        alert("Invalid email or password!");
    }

    return false;
}

function togglePasswordVisibility() {
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => {
        field.type = this.checked ? 'text' : 'password';
    });
}

const showPasswordRegister = document.getElementById('showPassword');
if (showPasswordRegister) {
    showPasswordRegister.addEventListener('change', togglePasswordVisibility);
}

const showLoginPassword = document.getElementById('showLoginPassword');
if (showLoginPassword) {
    showLoginPassword.addEventListener('change', togglePasswordVisibility);
}

function submitPostForm(event) {
    event.preventDefault();

    const postTitle = document.getElementById("postTitle").value;
    const postContent = document.getElementById("postContent").value;
    const postImage = document.getElementById("postImage").files[0];

    const post = document.createElement('div');
    post.className = 'post';

    const postTitleElement = document.createElement('h3');
    postTitleElement.innerText = postTitle;
    post.appendChild(postTitleElement);

    const postContentElement = document.createElement('p');
    postContentElement.innerText = postContent;
    post.appendChild(postContentElement);

    if (postImage) {
        const postImageElement = document.createElement('img');
        postImageElement.src = URL.createObjectURL(postImage);
        post.appendChild(postImageElement);
    }

    document.getElementById('postsContainer').appendChild(post);

    document.getElementById("newPostForm").reset();
    const modal = document.getElementById("newPostModal");
    if (modal) {
        modal.style.display = "none";
    }

    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const newPostForm = document.getElementById('newPostForm');
    if (newPostForm) {
        newPostForm.addEventListener('submit', submitPostForm);
    }
});
