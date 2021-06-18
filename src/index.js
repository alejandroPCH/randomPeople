import Template from '@templates/Template.js';
import '@styles/main.css'
//@ means that i am using an alias, to see the configuration go to webpack.config

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
