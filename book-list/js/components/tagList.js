import { tagsDescOrder } from "../utils.js";

const tagsContainer = document.querySelector(".tags");
const mostPopularCount = 4;

function showMoreCta(sortedTags) {
  const li = document.createElement("li");
  const moreTags = document.createElement("a");
  moreTags.href = "#";
  moreTags.classList.add("more-tags");
  moreTags.textContent = "Mai multe";
  li.append(moreTags);

  moreTags.addEventListener("click", (e) => {
    const restOfTags = sortedTags.slice(mostPopularCount, sortedTags.length);

    restOfTags.forEach((tag) => addTag(tag));

    // Sterge link-ul "Mai multe"
    e.target.parentNode.remove();
  });

  tagsContainer.append(li);
}

function addTag(tag) {
  const li = document.createElement("li");
  const tagLink = document.createElement("a");
  tagLink.classList.add("tag");
  tagLink.href = "#";
  tagLink.textContent = `${tag.tagName} x`;
  li.append(tagLink);
  tagsContainer.append(li);
}

function tagList(tags) {
  const sortedTags = [...tags].sort(tagsDescOrder);
  const mostPopular = sortedTags.slice(0, mostPopularCount);

  mostPopular.forEach((tag) => addTag(tag));

  showMoreCta(sortedTags);
}

export default tagList;
