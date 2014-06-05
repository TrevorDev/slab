slab
====

developer interface between mobile phone and pc

Built with PhoneGap, NodeJS and SocketIO

##Slab is made to solve 2 problems

* Too many controls on the pc screen. I would like it if developers made pc apps that moved a bunch of the controls to the phone screen so if i need to change them i can look down and do so, keeping my deskop screen clean and peaceful.
* Make it easier to use a pc from the couch without having to get up.


##Guid to setup dev env

* install phonegap
	npm install -g phonegap

* install android-sdk to deploy to android (Make sure to install SDK platform for API 19 through eclipse -> window -> sdk manager)

* export android paths for phonegap
	export PATH=${PATH}:/home/trevor/workspace/androidLib/sdk/platform-tools:/home/trevor/workspace/androidLib/sdk/tools

* install nodejs

* have fun

* use xdotool to move mouse/keyboard input
