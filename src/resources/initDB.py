import base64
import os
import json
dataFolder = r"data/"

result = {}
for fileName in filter(lambda f: f.endswith('.html'), os.listdir(dataFolder)):
    
    filePath = os.path.join(dataFolder,fileName)
    with open(filePath,encoding='utf-8') as f:
        html = f.read()
    encoded = base64.b64encode(html.encode()).decode()
    
    result[os.path.splitext(fileName)[0]] = encoded

with open(os.path.join(dataFolder,'result.json'), 'w') as fp:
    json.dump(result, fp)