import { resizeImage } from "../utils.js";
const booksLists = document.querySelector(".books-lists");
const booksPerList = 5;
const viewMoreIncrement = 2;

function listHeading(listName) {
  const h3 = document.createElement("h3");
  const a = document.createElement("a");
  a.href = "#";
  a.textContent = `• ${listName}`;
  a.classList.add("list-title");
  h3.append(a);

  return h3;
}

function bookMarkup(props, i = 0) {
  /* article.book */
  const book = document.createElement("article");
  book.classList.add("book");
  if (props.read) book.classList.add("read");

  /* img.cover */
  const coverImg = document.createElement("img");
  coverImg.classList.add("cover");
  coverImg.src = resizeImage(props.coverImg);
  coverImg.alt = `Coperta cărții ${props.title} - ${props.author}`;

  /* h4.title*/
  const title = document.createElement("h4");
  title.classList.add("title");
  title.textContent = `${i + 1}. ${props.title}`;

  /* p.author */
  const author = document.createElement("p");
  author.classList.add("author");
  author.textContent = props.author;

  book.append(coverImg, title, author);
  return book;
}

export function booksListMarkup(books) {
  const list = document.createElement("div");
  list.classList.add("list");

  books
    .slice(0, booksPerList)
    .forEach((book, i) => list.append(bookMarkup(book, i)));

  return list;
}

function viewMoreCta(books) {
  const small = document.createElement("small");
  const viewMore = document.createElement("a");
  let count = booksPerList;

  function showCount(count) {
    const countText = count > booksPerList ? count : "primele " + count;
    small.textContent = `Se afișează ${countText} din ${books.length} cărți. `;

    viewMore.href = "#";
    viewMore.textContent = "Mai mult";
    small.append(viewMore);
  }
  showCount(count);

  viewMore.addEventListener("click", (e) => {
    e.preventDefault();
    const list = e.target.closest(".list-wrapper").querySelector(".list");
    count = list.querySelectorAll(".book").length;
    const moreBooks = books.slice(count, count + viewMoreIncrement);

    for (const newBook of moreBooks) {
      count = list.querySelectorAll(".book").length;
      list.append(bookMarkup(newBook, count));
      const newCount = list.querySelectorAll(".book").length;
      if (newCount + viewMoreIncrement <= books.length) {
        showCount(newCount);
      } else {
        small.remove();
      }
    }
  });

  return small;
}

export function bookList(list) {
  const { listName, books } = list;

  const listWrapper = document.createElement("section");
  listWrapper.classList.add("list-wrapper");
  listWrapper.append(listHeading(listName));
  listWrapper.append(booksListMarkup(books));

  if (books.length > booksPerList) listWrapper.append(viewMoreCta(books));

  booksLists.append(listWrapper);
}
