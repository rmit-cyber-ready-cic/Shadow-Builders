import time as t
import json
import datetime
import random
import AWSIoTPythonSDK
import AWSIoTPythonSDK.MQTTLib as AWSIoTPyMQTT
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient


// Certificates for IOT Device
ENDPOINT = "<prefix>.iot.<region>.amazonaws.com"
CLIENT_ID = "<unique client id>"


PATH_TO_CERT = "certificates/<certificate file>"
PATH_TO_KEY = "certificates/<private key file>"
PATH_TO_ROOT = "certificates/AmazonRootCA1.pem"

MESSAGE = "Hello World"
TOPIC = "test/testing"

// Asset information for scenes
deviceNames = ['ACV01','ACV02','ACV03','ACV04','ACV05']
devicepriority=['High','Medium','Low']
aud_link='<Sumerian Auditorium Scene>'
room_link='<Sumerian room Scene>'
RANGE = 40
i=0

myAWSIoTMQTTClient = AWSIoTPyMQTT.AWSIoTMQTTClient(CLIENT_ID)
myAWSIoTMQTTClient.configureEndpoint(ENDPOINT, 8883)
myAWSIoTMQTTClient.configureCredentials(PATH_TO_ROOT, PATH_TO_KEY, PATH_TO_CERT)

myAWSIoTMQTTClient.connect()
print('Begin Publish')
for i in range(0,RANGE):	
    t.sleep(0.5)
    if(i%2==0):
        location="Auditorium"
        link=aud_link
    else:
        location="Room 1"
        link=room_link

    message = {
    	"Priority":random.choice(devicepriority),
	"Location":location,
    	"Asset Name":random.choice(deviceNames),
	"link":link,
    	"Temperature":random.randint(15, 35),
    	"Time":datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
	}
    myAWSIoTMQTTClient.publish(TOPIC, json.dumps(message), 1)
    print("Published: '" + json.dumps(message) + "' to the topic: " + "'test/testing'")
    t.sleep(0.1)
print('Publish End')
myAWSIoTMQTTClient.disconnect()
