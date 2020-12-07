import {registerApplication, start} from 'single-spa'

// In this file you will register each application and
// and determine when it will need to be loaded in,
// this example it is all based on url location

registerApplication(
  'navBar', 
  () => import('./src/navBar/navBar.app.js').then(module => module.navBar),
  () => true
);

registerApplication(
  // Name of our single-spa application
  'home',
  // Our loading function
  () => import('./src/home/home.app.js'),
  // Our activity function
  () => location.pathname === "" || 
    location.pathname === "/" || 
    location.pathname.startsWith('/home')
);



// Create a function that will check the location and
// see if it matches the given pretext. This makes it so we do not
// have to hardcode the location like above
function pathPrefix(prefix) {
  return function(location) {
      return location.pathname.startsWith(prefix);
  }
}


registerApplication(
  'angularJS', 
  () => import ('./src/angularJS/angularJS.app.js'), 
  pathPrefix('/angularJS')
);

start()