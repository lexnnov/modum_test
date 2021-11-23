import {createStore} from 'vuex'
import books from "./books";
import categories from "./categories";
import other from "./other";

export default createStore({
  modules: {
    books,
    categories,
    other
  }
});


