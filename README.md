Run on [localhost:8080](http://localhost:8080):

    mvn spring-boot:run

Run packaged:

    mvn clean package
    java -jar target/hello-spring-websocket-0-SNAPSHOT.jar

Send message from command line:

    curl -H 'Content-Type: application/json' localhost:8080/blub -d '{"text": "Hello World!"}'

Create RPM:

    mvn clean package rpm:rpm

Install/upgrade RPM:

    sudo dnf install $(find target/rpm/hello-spring-websocket/RPMS/noarch -name "*.rpm")

Run as service:

    systemctl start hello_spring_websocket.service

Stopping the service:

    systemctl stop hello_spring_websocket.service
