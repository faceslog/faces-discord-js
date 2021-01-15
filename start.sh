#!/bin/bash

#Screen Info
SCREEN="faceseyes" # Name of the screen
NAME="Discord-Faces-Eyes" # Name of the server, only used to display the messages
COMMAND="npm run start" # Command to start the server

# Uncomment this line if the server and the script is not the same directory
# as the server startup command
# cd /path/to/my/server/

running(){
 if ! screen -list | grep -q "$SCREEN"
 then
  return 1
 else
  return 0
 fi
}

case "$1" in
 start)
  if ( running )
  then
echo "Server [$NAME] is already running"
  else
echo "Starting server [$NAME]"
   screen -dmS $SCREEN $COMMAND
  fi
  ;;
 status)
    if ( running )
    then
echo "Running"
    else
echo "Not running"
    fi
  ;;
 screen)
   screen -r $SCREEN
 ;;
 reload)
   screen -S $SCREEN -p 0 -X stuff `printf "reload\r"`
 ;;
 stop)
  if ( running )
  then
screen -S $SCREEN -p 0 -X stuff `printf "stop\r"`
   echo "Stopping server [$NAME]"
  else
echo "Server [$NAME] is not running"
  fi
 ;;
*)

 echo "Usage : {start|stop|status|screen|reload}"
 exit 1
 ;;
esac

exit 0
