//Arrays to store bookmarked items and items to display on saveForLater page.
let bookmarks = [];
let itemsToDisplay = [];

//Function to update bookmarks. Each new checked item is added to session storage, each unchecked item existing in the list is removed.
const saveBookmark = () => {
    bookmarks = JSON.parse(sessionStorage.getItem("bookmarks"));
    let checkboxes = document.querySelectorAll('.bookmark');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            if (bookmarks.indexOf(checkboxes[i].id) == -1) {
                bookmarks.push(checkboxes[i].id);
                console.log(`${checkboxes[i].id} was bookmarked.`);
            }
        } else {
            for (j = 0; j < bookmarks.length; j++) {
                if (checkboxes[i].id == bookmarks[j]) {
                    console.log(`${bookmarks[j]} was removed from bookmarks.`);
                    bookmarks.splice(j,1);
                }
            }
        }
    }
    sessionStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    alert(`There are ${bookmarks.length} items in your bookmarks.`);
}

//Function to toggle the like button appearance.
const likeButton = (x) => {
    x.classList.toggle("fa-solid");
}

//Function to create bookmarks array in session storage on a new session, or to retrieve existing data.
const loadPage = () => {
    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        sessionStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        sessionStorage.setItem("hasCodeRunBefore", true);
    } else {
        bookmarks = JSON.parse(sessionStorage.getItem("bookmarks"));
    }
}

//Function that converts checkbox id to image path and pushes it to a different array.
const convertToImage = (id) => {
    switch(id) {
        case "cbImage1":
            itemsToDisplay.push("images/1 Gargoyle.png");
            break;
        case "cbImage2":
            itemsToDisplay.push("images/2 Scurry.png");
            break;
        case "cbImage3":
            itemsToDisplay.push("images/3 Bat.png");
            break;
        case "cbImage4":
            itemsToDisplay.push("images/4 Scallop.png");
            break;
        case "cbImage5":
            itemsToDisplay.push("images/5 Flame.png");
            break;
        case "cbImage6":
            itemsToDisplay.push("images/6 Bouquet.png");
            break;
    }
}

//Function that takes existing bookmarks and creates an image element on the page for each bookmarked item.
const showImages = () => {
        bookmarks = JSON.parse(sessionStorage.getItem("bookmarks"));

        for (i = 0; i < bookmarks.length; i++) {
            convertToImage(bookmarks[i]);
        }

        let imageContainer = document.getElementById("imageContainer");
        for (j = 0; j < itemsToDisplay.length; j++) {
            let img = new Image();
            img.src = itemsToDisplay[j];
            imageContainer.appendChild(img);
        }
}

/*
---------------------------------------------------------------------------------------------------------------
Code for comments on index page.
*/

//array to store comments
let comments = [];

//Class definition for a comment
class Comment {
    constructor(name, email, comment) {
        this.name = name;
        this.email = email;
        this.comment = comment;
    }
}

/*Function that checks on page load if this is the first time loading the page or if previous data exists.
If this is the first session the local storage values for storing comments are initialised. If it is not the
first session the page will attempt to load existing data and display it as a table.
*/

const loadIndex = () => {
    if (localStorage.getItem("hasCommentCodeRanBefore") === null) {
        localStorage.setItem("comments", JSON.stringify(comments));
        localStorage.setItem("hasCommentCodeRanBefore", true);
    } else {
        showComments();
}
}

//Function to display table with comment data.
const showComments = () => {
    comments = JSON.parse(localStorage.getItem("comments"));

    document.getElementById("txtName").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtComment").value = "";

    let col = [];
    for (let i = 0; i < comments.length; i++) {
        for (let key in comments[i]) {
            if (col.indexOf(key) === -1) {
                 col.push(key)
            }
        }
    }

    const table = document.createElement("table");
    let tr = table.insertRow(-1);

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = col[i].toUpperCase();
        tr.appendChild(th);
    }

    for (let i = 0; i < comments.length; i++) {
        tr = table.insertRow(-1);
        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = comments[i][col[j]];
        }
        
        let btnLike = document.createElement('button');
        btnLike.innerText = "Like";
        btnLike.setAttribute("id", `btnLike${[i]}`);
        tr.appendChild(btnLike);

        btnLike.addEventListener("click", () => {
            if (btnLike.innerText == "Like") {
                btnLike.innerText = "Liked";
            } else if (btnLike.innerText == "Liked") {
                btnLike.innerText = "Like";
            }
        })
    }

    const divComments = document.getElementById("comments");
    divComments.innerHTML = "";
    divComments.appendChild(table);
    
}

//Function to add a new entry to the comments data.
const saveComment = () => {
    comments = JSON.parse(localStorage.getItem("comments"));
    let newComment = new Comment(
        document.getElementById("txtName").value,
        document.getElementById("txtEmail").value,
        document.getElementById("txtComment").value
    );
    comments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(comments));
    showComments();
}