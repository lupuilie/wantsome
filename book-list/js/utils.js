export function resizeImage(url, size = 250) {
  // redimensioneaza imaginile de pe elefant
  return url.split("1500/1500").join(`${size}/${size}`);
}

export function tagsDescOrder(a, b) {
  return b.count - a.count;
}

export function makeTagsList(tags = [], list = []) {
  list.books.forEach((book) => {
    book.tags.forEach((tag) => {
      const tagIndex = tags.findIndex((tagsItem) => tagsItem.tagName === tag);
      if (tagIndex === -1) return tags.push({ tagName: tag, count: 1 });
      tags[tagIndex].count++;
    });
  });
}
