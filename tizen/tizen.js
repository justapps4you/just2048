var tizenEvents = {
    startNewGame: function() {

    	manager.restart();
        tizenEvents.menuClose();
    },
    exit: function () {

        tizen.application.getCurrentApplication().exit();
    },
    menuState: 'closed',
    switchMenu: function() {
        if(tizenEvents.menuState === 'open'){
            tizenEvents.menuClose();
        }else{
            tizenEvents.menuOpen();
        }
    },
    menuOpen: function(){
        document.getElementsByClassName('menu-content')[0].className = 'menu-content menu-open';
        document.getElementsByClassName('div-exit-menu')[0].style.display = 'block';
        tizenEvents.menuState = 'open';
    },
    menuClose: function(){
        document.getElementsByClassName('menu-content')[0].className = 'menu-content menu-close';        
        document.getElementsByClassName('div-exit-menu')[0].style.display = 'none';
        tizenEvents.menuState = 'closed';
    }
};


//CREATING DOM ELEMENTS
///////////////////////

//0. adding CSS
var cssLink = document.createElement('link');
cssLink.setAttribute('rel','stylesheet');
cssLink.setAttribute('type','text/css');
cssLink.setAttribute('href','tizen/tizen.css');
document.body.appendChild(cssLink);

//1. creating div exit menu
var divExitMenu = document.createElement('div');
divExitMenu.className = 'div-exit-menu';
divExitMenu.style = 'width:100%;height:calc(100% - 30px);top:30px;position:fixed;display:none';
divExitMenu.addEventListener('click',tizenEvents.menuClose)
document.body.appendChild(divExitMenu);


//2. creating image menu
var menuImage = document.createElement('img');
menuImage.className = 'menu-img';
menuImage.src = 'tizen/menu.png';

var divMenuContainer =  document.createElement('div');
divMenuContainer.className = 'menu-container';
divMenuContainer.appendChild(menuImage)

document.body.appendChild(divMenuContainer);


//3. creating the menu
var ulElement = document.createElement('ul');

var liElementOne = document.createElement('li');
liElementOne.innerText = 'START NEW GAME';
liElementOne.addEventListener('click',tizenEvents.startNewGame);
ulElement.appendChild(liElementOne);

var liElementTwo = document.createElement('li');
liElementTwo.setAttribute('style','border-bottom-style:none');
liElementTwo.innerText = 'EXIT';
liElementTwo.addEventListener('click',tizenEvents.exit);
ulElement.appendChild(liElementTwo);

var divMenuContent = document.createElement('div');
divMenuContent.className = 'menu-content';
divMenuContent.appendChild(ulElement);

document.body.appendChild(divMenuContent);


//4. creating click button area
var divMenuButton =  document.createElement('div');
divMenuButton.className = 'menu-button';
divMenuButton.addEventListener('click',tizenEvents.switchMenu);
document.body.appendChild(divMenuButton);



// BACK BUTTON
/////////////////////////////

document.addEventListener('tizenhwkey', function(e) {

    if(e.keyName == "back") {
        try {
            tizen.application.getCurrentApplication().exit();
        } catch (error) {
            console.error("getCurrentApplication(): " + error.message);
        }
    }

    if(e.keyName == "menu") {
        try {
            tizenEvents.switchMenu();
        } catch (error) {
            console.error("getCurrentApplication(): " + error.message);
        }
    }
});


setTimeout(function(){
	
	document.getElementsByClassName('heading')[0].setAttribute('style','');
	document.getElementsByClassName('game-container')[0].setAttribute('style','');
	document.getElementsByClassName('container')[0].setAttribute('style','');
},1000);
