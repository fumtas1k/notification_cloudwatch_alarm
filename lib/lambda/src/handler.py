import json
import logging
import os

from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError


HOOK_URL = os.environ['kmsEncryptedHookUrl']
SLACK_CHANNEL = os.environ['slackChannel']

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info("Event: " + str(event))
    message = json.loads(event['Records'][0]['Sns']['Message'])
    logger.info("Message: " + str(message))

    alarm_name = message['AlarmName']
    new_state = message['NewStateValue']
    reason = message['NewStateReason']
    description = message['AlarmDescription']
    namespace = message['Trigger']['Namespace']
    metric_name = message['Trigger']['MetricName']

    attachments = [{
        "color": "#f23535",
        "pretext": "<!channel>",
        "text": f":rotating_light: *<https://ap-northeast-1.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-1#alarm:name={alarm_name}|CloudWatch {new_state} | {alarm_name} | {namespace}_{metric_name}>*\n\n{reason}\n\n*Alarm Description*\n{description}"
    }]

    slack_message = {
        'channel': SLACK_CHANNEL,
        'attachments': attachments,
    }

    req = Request(HOOK_URL, json.dumps(slack_message).encode('utf-8'))
    try:
        response = urlopen(req)
        response.read()
        logger.info(f"Message posted to {slack_message['channel']}")
    except HTTPError as e:
        logger.error(f"Request failed: {e.code} {e.reason}")
    except URLError as e:
        logger.error("Server connection failed: {e.reason}")
