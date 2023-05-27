const url =
  "https://rainydays-cma.flywheelsites.com/wp-json/wp/v2/posts/?_embed&per_page=100";

async function getPosts() {
  try {
    const response = await fetch(url);
    const posts = await response.json();
    console.log(posts);

    posts.forEach((post) => {
      const featuredMedia = post._embedded["wp:featuredmedia"];
      const title = post.title.rendered;
      const date = new Date(post.date);
      const author = post._embedded.author[0].name;

      if (featuredMedia && featuredMedia.length > 0) {
        const featuredImage = featuredMedia[0];
        displayPost(featuredImage, title, date, author);
      } else {
        displayPostWithoutImage(title, date, author);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function displayPost(featuredImage, title, date, author) {
  const imageElement = document.createElement("img");
  imageElement.src = featuredImage.source_url;
  imageElement.alt = featuredImage.alt_text;

  const titleElement = document.createElement("p");
  titleElement.textContent = title;

  const dateElement = document.createElement("p");
  dateElement.textContent = "Published on: " + date.toLocaleDateString();

  const authorElement = document.createElement("p");
  authorElement.textContent = "Author: " + author;

  const postContainer = document.createElement("div");
  postContainer.appendChild(imageElement);
  postContainer.appendChild(titleElement);
  postContainer.appendChild(dateElement);
  postContainer.appendChild(authorElement);

  document.body.appendChild(postContainer);
}

function displayPostWithoutImage(title, date, author) {
  const titleElement = document.createElement("p");
  titleElement.textContent = title;

  const dateElement = document.createElement("p");
  dateElement.textContent = "Published on: " + date.toLocaleDateString();

  const authorElement = document.createElement("p");
  authorElement.textContent = "Author: " + author;

  const postContainer = document.createElement("div");
  postContainer.appendChild(titleElement);
  postContainer.appendChild(dateElement);
  postContainer.appendChild(authorElement);

  document.body.appendChild(postContainer);
}

getPosts();

// You can only able to retrieve 100 post per page,after that use pagination as Wordpress wpjson post pagination.

// Eg : http://example.com/wp-json/wp/v2/posts?per_page=100&page=6

// This will fetch the 6th page and which contains 100 post ranging between 500 and 600 posts.
