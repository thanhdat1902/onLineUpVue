import { createStore } from 'vuex';
import auth from './modules/auth';
// import createLogger from '../../../src/plugins/logger';

// const debug = process.env.NODE_ENV !== 'production';
const store = createStore({
  modules: {
    auth,
  },
  //   plugins: debug ? [createLogger()] : [],
});
export default store;
