if [ $1 -eq 1 ] ;
then
  addService hello_spring_websocket || echo "hello_spring_websocket could not be registered"
fi
