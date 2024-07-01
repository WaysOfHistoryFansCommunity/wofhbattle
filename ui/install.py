import json
import requests
import os

gameserver = "https://battle2.waysofhistory.com/"
mainjson = "project/wofh1_4/main.json"

# Load file from link and save
def loadFileFromServer(filename : str):
    print(f'File Load {filename}')
    response = requests.get(gameserver + filename)

    if response.status_code == 200:
        directory = os.path.dirname(filename)
        os.makedirs(directory, exist_ok=True)

        with open(filename, 'wb') as f:
            f.write(response.content)
    else:
        print(f'File {filename} load error - StatusCode: {response.status_code}')

# Load JSON data
with open(mainjson, 'r') as file:
    data = json.load(file)

# Load Models
print("Load Models")
for modelInfo in data['visualSessionContent']['models']:
    modelInfoUrl = modelInfo[1]['mesh'][0]
    if(modelInfoUrl != ""):  
        if(not os.path.exists(modelInfoUrl)):
            print(f'Load Model {modelInfoUrl}')
            loadFileFromServer(modelInfoUrl)
        else:
            print(f'Model {modelInfoUrl} already exists')

# Load Textures
print("Load Textures")
for textureInfo in data['visualSessionContent']['textures']:
    if "urls" in textureInfo[1]:
        for textureInfoUrl in textureInfo[1]['urls']:
            if(textureInfoUrl):
                if(isinstance(textureInfoUrl, list)):
                    textureInfoUrlStr = textureInfoUrl[0]
                    if(textureInfoUrlStr != ""): 
                        if(not os.path.exists(textureInfoUrlStr)):
                            print(f'Load Texture {textureInfoUrlStr}')
                            loadFileFromServer(textureInfoUrlStr)
                        else:
                            print(f'Texture {textureInfoUrlStr} already exists')
                elif(isinstance(textureInfoUrl, str)):
                    if(textureInfoUrl != ""): 
                        if(not os.path.exists(textureInfoUrl)):
                            print(f'Load Texture {textureInfoUrl}')
                            loadFileFromServer(textureInfoUrl)
                        else:
                            print(f'Texture {textureInfoUrl} already exists')