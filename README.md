Run on [localhost:8080](http://localhost:8080):

    mvn spring-boot:run

Run packaged:

    mvn clean package
    java -jar target/hello-spring-websocket-0-SNAPSHOT.jar

Send message from command line:

    curl -H 'Content-Type: application/json' localhost:8080/blub -d '{"text": "Hello World!"}'
