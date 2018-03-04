var worlds = [
  {image:'https://s3-us-west-2.amazonaws.com/vrc-uploads/images/image_1200x900_2017-07-31_23-07-46.png', title:'Presentation Room', id:'wrld_78373831-0109-4808-9b63-27382f4c6975'},
  {image:'https://s3-us-west-2.amazonaws.com/vrc-uploads/images/image_1200x900_2017-11-20_15-51-22.png', title:'The HUB', id:'wrld_eb7a5096-9c93-41db-a9d7-7b349a5d4815'},
  {image:'https://files.vrchat.cloud/thumbnails/2756521966.thumbnail-500.png', title:'The Great Pug', id:'wrld_6caf5200-70e1-46c2-b043-e3c4abe69e0f'},
  {image:'https://s3-us-west-2.amazonaws.com/vrc-managed-files/thumbnails/4237452660.thumbnail-500.png', title:'Open Mic Night', id:'wrld_94ef6736-f998-4099-b456-b3a444734013'},
  {image:'https://api.vrchat.cloud/api/1/file/file_fc222f38-1131-4486-85c2-2e78c4768dc4/1/file', title:'Avatar Testing!', id:'wrld_8ef393c0-a985-4d7e-90f0-33ab10d41ee3'},
  {image:'https://files.vrchat.cloud/thumbnails/1561310256.thumbnail-500.png', title:'Void Club', id:'wrld_7e10376a-29b6-43af-ac5d-6eb72732e90c'},
  {image:'https://s3-us-west-2.amazonaws.com/vrc-uploads/images/image_1200x900_2017-08-30_17-55-46.png', title:'Gaia Night', id:'wrld_d945fde1-987a-45f9-998c-a081fad71ba1'},
  {image:'https://files.vrchat.cloud/thumbnails/856346215.thumbnail-500.png', title:'Sakura Hiroba', id:'wrld_8915143b-7573-4b02-a03d-80dd77ae5899'},
]

function debug(text) {
  console.log(text)
  $("#devconsole").append("<p>" + text + "</p>")
}

var bindingsReady = false;

function onBindingsReady(evt) {
    debug("bindings ready!")
    bindingsReady = true;
}
document.addEventListener('onBindingsReady', onBindingsReady, false);

function addWorld(worldimage, worldtitle, worldid) {
  var template
  var element
  var clone
  var node
  template = `
    <li>
      <table class="world" onClick="goToWorld(\'${worldid}\')">
        <tr>
          <th>
            <img class="worldpreview" src="${worldimage}">
          </th>
          <th>
            <h1 class="worldtitle">${worldtitle}</h1>
          </th>
        <tr>
    </li>
  `

  element = document.createElement('ul')
  element.innerHTML = template
  document.getElementById('container').append(element)
}

function populateWorlds() {
  debug("populating worlds list!")
  for (i = 0; i < worlds.length; i++) {
    addWorld(worlds[i].image, worlds[i].title, worlds[i].id)
  }
}

// borrowed from naqtn on GitHub
function goToWorld(id) {
    if (!bindingsReady) {
	      debug("tried to port, but bindings aren't ready! are we even in VRChat?");
    }
    debug("jumping to world= " + id)
    engine.call("VRCSDK2.Networking.GoToRoom", id);
}

function onDevConsole() {
  $("#devconsole").removeClass("hidden")
}

function offDevConsole() {
  $("#devconsole").addClass("hidden")
}
