var gui = require('nw.gui'),
    path = require('path'),
    imgur = require(path.resolve('../node-imgur')),
    eventsEmitter = imgur.eventsEmitter,
    win = gui.Window.get(),
    tray, menu, fileTypeMenu;

win.setShowInTaskbar(false);

tray = new gui.Tray({
    icon: 'public/img/logo.png',
    alticon: 'public/img/alt-logo.png'
});

tray.tooltip = 'Imgurrific';

menu = new gui.Menu();
fileTypeMenu = new gui.Menu();

fileTypeMenu.append(new gui.MenuItem({ type: 'checkbox', label: 'png', checked: true }));
fileTypeMenu.append(new gui.MenuItem({ type: 'checkbox', label: 'gif', checked: true }));
fileTypeMenu.append(new gui.MenuItem({ type: 'checkbox', label: 'mov', checked: true }));
fileTypeMenu.append(new gui.MenuItem({ type: 'checkbox', label: 'jpg', checked: true }));

menu.append(new gui.MenuItem({ type: 'normal', label: 'Open Preferences', key: 'p', modifiers: 'cmd' }));
menu.append(new gui.MenuItem({ type: 'normal', label: 'File Types', submenu: fileTypeMenu }));
menu.append(new gui.MenuItem({ type: 'separator'} ));
menu.append(new gui.MenuItem({ 
    type: 'normal', 
    label: 'Quit',
    click: quitApplication,
    key: 'q', 
    modifiers: 'cmd' 
}));

tray.menu = menu;

function sendNotification(message) {
    var options = { body: message },
        notification = new Notification('Imgur', options);
}

function quitApplication() {
    gui.App.quit();
}

imgur.watch('/Users/joshblack/Desktop');
console.log(path.resolve('.'));

eventsEmitter.on('fileAdded', function(file) {
    sendNotification(path.basename(file) + ' has been added')
});

eventsEmitter.on('linkCopied', function(file, link) {
    sendNotification('The link for ' + path.basename(file) + ' has been copied to your clipboard!');
});

eventsEmitter.on('mediaTransform', function() {
    sendNotification('Hold on for a moment while we convert your file')
});