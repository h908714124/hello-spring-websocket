Run on [localhost:8080](http://localhost:8080):

    gradle bootRun

Run packaged:

    gradle build
    java -jar build/libs/gs-messaging-stomp-websocket-0.1.0.jar

Send message from command line:

    curl -H 'Content-Type: application/json' localhost:8080/blub -d '{"text": "Hello World!"}'

