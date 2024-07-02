<h1 align="center">we4Devs 👨‍💻👩‍💻 </h1>
<h1 align="center"> 
<img align="center" src="https://raw.githubusercontent.com//Yashashwi0708/we4Devs/main/Frontend/Assets/we4Devs.png" alt="jyotiraditya-patil-996933230" height="400" width="400" />
</h1>


##### WCE ACM Hackathon Project 🚀
 https://we4devs.vercel.app/


### SafeGuard🙌

- **Team Name**: we4Devs 💻
  
- **Team Leader:** <a href="https://github.com/Yashashwi0708">Yashashwi Kailas Patil	</a> 
 
**Team Members:**
  
1. <a href="https://github.com/Yashashwi0708">Siddhesh Kitkaru</a>
 
1. <a href="https://github.com/Yashashwi0708">Smit Butle</a>

1. <a href="https://github.com/Yashashwi0708">Jyotiraditya Patil</a>


- **Domain/Theme:** Cyber Security 🔒

- **Problem Statement:** Develop a security system website that enables users to combat the spread of fraudulent messages across various communication channels 📧

- **Whole Documentation:** <a href="https://docs.google.com/document/d/1pcAZzuoEXgjS8k2VcAFIBRm0pIsiB-0j/edit">Idea Submission	</a> 📝
  
- **UI:** <a href="https://www.figma.com/file/FQkREiISbToyNUTYKyh8WJ/Fraud-Detection?type=design&node-id=0%3A1&mode=design&t=upqrdJmELEcgcdtl-1">Figma File</a> 🎨
  
- **FlowChart:** <a href="https://www.figma.com/file/hGTWKz3lEzKd1fVeFf7rLq/Use-Case-Diagram%2FFlow-Diagram?type=whiteboard&node-id=0%3A1&t=IkrpkrCPhWvtkPgO-1">Figma File</a> 🎨

# Setup on your PC 🖥️
```sh
git clone https://github.com/yashashwi0708/we4Devs
```
<h1>Frontend🌐</h1>

```sh
cd Frontend
npm i
npm run dev

use .env file as Frontend/.env 
VITE_HOST=http://localhost:5000
```
Change the API's according to your **Backend** 

<h1>Backend🌐</h1>

Note: You can run the api and bots on different servers, ensuring that proper endpoints are provided and env variables are specified correctly. More changes are coming soon...

##### Backend
```sh
cd Backend
pip -r requirements.txt
python app.py
```


##### Define a global .env file 
```sh
START_PORT=6800
END_PORT=6900
DEFAULT_URL=google.com
DEFAULT_PASSWORD=password
DOCKER_URL=unix:///var/run/docker.sock
DOCKER_VERSION=1.44
CONTAINER_BROWSER_PORT = 5800
CONTAINER_EXPIRATION_TIME = 600
MAX_CONTAINERS = 4

API_URL=https://api-inference.huggingface.co/models/Titeiiko/OTIS-Official-Spam-Model //huggingface hosted model
API_KEY=//huggingface api key
SERVER_URL=http://localhost


VERIFY_TOKEN=test
TC_KEY=//truecaller api key
WA_API_KEY=//whatsapp meta api key
WA_BASE_URL=//whatsapp message url

```

##### To start the service for telegram and discord bot
```sh
cd Bots
cd Discord
node index.js

cd Bots
cd Telegram
python main.py
```

This is still under development and not intended for production use.

Update:2

Some browser images to choose from: 

```sh
jlesage/firefox           latest    612MB   "https://github.com/jlesage/docker-firefox" //recommended
mrcolorrain/vnc-browser   alpine    527MB   "https://github.com/MRColorR/vnc-browser"
mrcolorrain/vnc-browser   debian      -     "https://github.com/MRColorR/vnc-browser"   
kasmweb/chrome
kasmweb/firefox
kasmweb/edge
kasmweb/brave
kasmweb/chromium
```
