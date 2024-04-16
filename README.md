<h1 align="center">we4Devs 👨‍💻👩‍💻 </h1>
<h1 align="center"> 
<img align="center" src="https://raw.githubusercontent.com//Yashashwi0708/we4Devs/main/Frontend/Assets/we4Devs.png" alt="jyotiraditya-patil-996933230" height="400" width="400" />
</h1>


##### WCE ACM Hackathon Project 🚀

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
```
Change the API's according to your **Backend** 

<h1>Backend🌐</h1>

Note: You can run the api, browser service(docker), and bots on different servers, ensuring that proper endpoints are provided and env variables are specified correctly. More changes are coming soon...

##### To run the spam and browser service
```sh
cd SpamModel
pip install requirements.txt
python app.py
```

##### To start the backend API (along with whatsapp bot)
```sh
cd Backend
npm i
node main.js
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

##### Define a global .env file 
```sh

API_URL= //huggingface hosted model
API_KEY= //huggingface api key
VERIFY_TOKEN=test
DOCKER_URL= //where docker service is running example https://localhost:5000
TC_KEY= //truecaller api key
WA_API_KEY= //whatsapp meta api key
WA_BASE_URL= //whatsapp message url

START_PORT=6800 //start range for browser containers
END_PORT=6900 //end range for browser containers
DEFAULT_URL=https://www.google.com
DEFAULT_PASSWORD=password
DOCKER_URL=unix://home/smit/.docker/desktop/docker.sock
DOCKER_VERSION=1.44

```

This is still under development and not intended for production use.

