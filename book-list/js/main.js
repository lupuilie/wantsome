import data from "./data.js";
import { bookList } from "./components/bookList.js";
import tagList from "./components/tagList.js";
import { makeTagsList } from "./utils.js";

/**
 * Aici nu stiu daca am procedat bine...
 * In data am 2 liste, in fiecare am mai multe elemente si fiecare din
 * ele are un array (tags) prin care ar trebui sa trec si sa generez o lista cu
 * elemente unice si totodata sa stiu si de cate ori sunt afisate in toate listele
 */

const tags = [];

for (const list of data) {
  bookList(list);
  makeTagsList(tags, list);
}

/**
 * Execut tagList o singura data, daca as pune functia in for, s-ar executa de 2 ori
 * si probabil asta nu ar avea nici un beneficiu
 */
tagList(tags);
