var worlds = [
  {image:'https://s3-us-west-2.amazonaws.com/vrc-uploads/images/image_1200x900_2017-07-31_23-07-46.png', title:'Presentation Room', id:'wrld_78373831-0109-4808-9b63-27382f4c6975'},
  {image:'https://s3-us-west-2.amazonaws.com/vrc-uploads/images/image_1200x900_2017-11-20_15-51-22.png', title:'The HUB', id:'wrld_eb7a5096-9c93-41db-a9d7-7b349a5d4815'},
  {image:'https://files.vrchat.cloud/thumbnails/2756521966.thumbnail-500.png', title:'The Great Pug', id:'wrld_6caf5200-70e1-46c2-b043-e3c4abe69e0f'},
  {image:'https://s3-us-west-2.amazonaws.com/vrc-managed-files/thumbnails/4237452660.thumbnail-500.png', title:'Open Mic Night', id:'wrld_94ef6736-f998-4099-b456-b3a444734013'},
  {image:'https://api.vrchat.cloud/api/1/file/file_fc222f38-1131-4486-85c2-2e78c4768dc4/1/file', title:'Avatar Testing!', id:'wrld_8ef393c0-a985-4d7e-90f0-33ab10d41ee3'},
  {image:'https://files.vrchat.cloud/thumbnails/1561310256.thumbnail-500.png', title:'Void Club', id:'wrld_7e10376a-29b6-43af-ac5d-6eb72732e90c'},
  {image:'https://s3-us-west-2.amazonaws.com/vrc-uploads/images/image_1200x900_2017-08-30_17-55-46.png', title:'Gaia Night', id:'wrld_d945fde1-987a-45f9-998c-a081fad71ba1'},
  {image:'https://files.vrchat.cloud/thumbnails/856346215.thumbnail-500.png', title:'Sakura Hiroba', id:'wrld_8915143b-7573-4b02-a03d-80dd77ae5899'},
];

var bindingsReady = false;

function onBindingsReady(evt) {
  debug("bindings ready!");
  bindingsReady = true;
}
document.addEventListener('onBindingsReady', onBindingsReady, false);

// Something doesn't play nice with the $ selector, so we need noConflict
jQuery.noConflict();

// we can't see the console.log in game, so let's use our own function for output!
function debug(text) {
  console.log(text);
  // append our output to the dev console
  jQuery("#devconsole").append("<p>" + text + "</p>");
}

// if anything breaks, let's print it to our own homebrew console
window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
  debug("ERROR: " + errorMsg + " on line " + lineNumber + " in file " + url);
  return false;
}

// notify the user when the page has finished loading, then populate the worlds list
document.addEventListener("DOMContentLoaded", function() {
  debug("page successfully loaded!");
  // call the populate function
  populateWorlds();
});

function addWorld(worldimage, worldtitle, worldid) {
  /*
  this is the template to display a world!
  I would have used a template literal, but the VRChat JS engine doesn't like them, so old style it is
  */
  var template = "<table class=\"world\" onClick=\"goToWorld(\'" + worldid + "\');\"><tr><th><img class=\"worldpreview\" src=\"" + worldimage + "\"></th><th style=\"width:100%;padding-left:30px;\"><h1 class=\"worldtitle\">" + worldtitle + "</h1></th><tr>";
  // create a new list element
  var element = document.createElement('li');
  // make the innerHTML of our new list element the previously filled out template, then append it to the list
  element.innerHTML = template;
  jQuery("#worldlist").append(element);
}

function populateWorlds() {
  debug("populating worlds list!");
  // for every entry in the worlds list, call addWorld to append it
  for (i = 0; i < worlds.length; i++) {
    addWorld(worlds[i].image, worlds[i].title, worlds[i].id);
  }
}

// borrowed from naqtn on GitHub
function goToWorld(id) {
  /*
  if the bindings aren't ready, that means that:
  1. we tried to port before the engine has had time to load (unlikely, but possible)
  2. the engine isn't available at all and we're not in VRChat
  */
  if (!bindingsReady) {
    // so if we haven't got the bindings, warn in the debug console...
    debug("tried to port, but bindings aren't ready! are we even in VRChat?");
    /// and break out of the function
    return;
  }
  // otherwise, output to the dev console about a (supposed) success
  debug("jumping to world= " + id);
  // and then call the engien function
  engine.call("VRCSDK2.Networking.GoToRoom", id);
}

// turn the dev console on
function onDevConsole() {
  jQuery("#devconsole").removeClass("hidden");
}

// turn the dev console off
function offDevConsole() {
  jQuery("#devconsole").addClass("hidden");
}

// evaluate the dev console's input for debugging
function evalDevConsole() {
  eval(jQuery("#devconsoleinput").val());
  jQuery("#devconsoleinput").val('');
}
