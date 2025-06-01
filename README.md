# AI News Search Web Application (Part 1)

An AI-powered web application that allows users to input or upload news articles in English or French. It returns a summary along with detected nationalities and people, with optional detection of organizations. Supports user authentication via AWS Cognito.

---

#### 📌 Important URLs:

Frontend Live URL: https://main.d25ickgp2g070n.amplifyapp.com

Backend Live URL: https://backend.ai-news-app.ip-ddns.com

GitHub Repo URL: https://github.com/1702538/ai-news-app-kcz

---

## 🌟 Features

- 🔐 User authentication (OIDC-based)
- 📄 Allow single file upload `.txt` or `.docx` files
- 🌍 Multi-language support (E.g., English & French)
- 👤 Detect people, nationalities and organizations
- 🧠 Summarize news using an AI backend
- 📱 Responsive frontend with Ant Design
- 🔑 HTTPS Configured with LetsEncrypt

---

## 🤖 Language Model Used

This project utilizes the **Mixtral-8x22B-Instruct** model from **Mistral AI** due to its **FREE 1 API call per second plan**.

- **Model:** `Mixtral-8x22B-Instruct`
- **Architecture:** Sparse Mixture-of-Experts (SMoE)
- **Total Parameters:** 141B
- **Active Parameters per Inference:** 39B
- **Context Window:** 64K tokens
- **License:** Apache 2.0 (commercial use permitted)
- **Usage:** Powers the backend to summarize articles and extract entities such as nationalities, people, and organizations

---

## 🚀 Technology Stack Used

| Component           | Technology / Service               | Description                          |
|:---------------------|:----------------------------------|:-------------------------------------|
| 🖥️ Frontend         | React.js + Ant Design             | UI framework and design components    |
| 🌐 Frontend API Call | Fetch API                        | Native HTTP requests in browser       |
| ⚙️ Backend          | Node.js                           | Server-side API                       |
| 🔐 Authentication    | AWS Cognito (OIDC / JWT)         | User sign-in and token management     |
| 💾 Database          | AWS DynamoDB                     | NoSQL database for app data           |
| 🤖 AI Processing     | Mistral AI API                   | Summarization and entity detection    |
| 📄 Documment Processing | Mammoth                       | Converts .docx files to text          |
| ☁️ Hosting           | AWS Elastic Beanstalk, AWS Amplify | App deployment and hosting          |
| 🌐 Domain & SSL      | CloudNS, Let’s Encrypt           | DNS management and HTTPS certificates |
| 🛠️ Tools            | Git, Visual Studio Code, Postman | Development and API testing tools      |

---

## ✨ Bonus Features Implementation

| Feature                                                                 | Implemented? | Notes                                                                 |
|:-----------------------------------------------------------------------|:--------------:|:-------------------------------------------------------------------|
| Handle multi-language news articles (e.g., English + French)           | ✅           | Mistrial AI auto-translate the text and returns in English           |
| Detect organizations/people involved too, along with nationalities     | ✅           | Mistrial AI extracts named entities including organizations, people, nationalities |
| Save the uploaded articles and analysis results to a database          | ✅           | Stored in DynamoDB                                                   |
| Add user authentication (simple login/signup)                          | ✅           | Implemented with AWS Cognito                                         |
| Use AWS services for storage (e.g., S3 for file upload)                | ✅           | Using DynamoDB qualifies as AWS storage service                      |
| WebSocket support for real-time processing updates                     | ❌           | Not implemented                                                      |

---
## 🛠️ Setup Instructions

### Software / Tools
- Git
- Visual Studio Code (or any IDE)
- Postman (For viewing API outputs)

### Accounts
- GitHub Account (For Code Repository)
- AWS Account (For managing AWS Services)
- Mistral AI Account (Free Tier - 1 API/second)
- CloudNS Account (To manage DNS Services)
- Postman Account (For API development)
- Any email account (To sign up for account on React web application)

### Pre-requisites:

- Node.js (>= 18.x)
- Antd Design (>= 5.x)
- CloudNS Account with subdomain set up
- AWS Account with the following services set up:
  - AWS Amplify
  - Amazon Elastic Beanstalk
  - Amazon Cognito
  - DynamoDB Table
    
---

### 🧑‍💻 Frontend Setup

```bash
cd ai-news-app-ui
npm install 
vim .env
# Edit .env with your values:
# REACT_APP_API_URL=http://your-api-url.com
# REACT_APP_COGNITO_CLIENT_ID=xxxxxx
# REACT_APP_COGNITO_DOMAIN=https://yourdomain.auth.region.amazoncognito.com
npm start

```

---

### ⚙️ Backend Setup

```bash
cd backend
npm install 
```

#### [To upload backend files]

**Pre-requisite:**
- Prepare the backend files by zipping the backend files into a .zip file
- Ensure that you have created the appropriate 
  - **Service role**
  - **EC2 instance profile**
  - **EC2 key pair**

#### [Create Environment on AWS Elastic Beanstalk page]

1. Go to  AWS Elastic Beanstalk on AWS Console
2. Click "**Create application**" on the main page

*Step 1 - Configure environment*

1. Select "**Web server environment**" under **Environment tier**
2. Provide "**Application Name**" under **Application information**
3. Provide "**Environment name**" under **Environment information**
4. Select "**Node.js**" under **Platform**. Other Platform settings may remain as default
5. Ensure that **"Single instance (free tier eligible)**" is selected under **Presets**
6. All other settings may remain as **default**
7. Click on **Next**
 
*Step 2 - Configure service access*

1. Select the **Service role**, **EC2 instance profile** and **EC2 key pair**
2. In the event the above are not create, create the respective roles
3. Click on **Skip to Preview** 

*Step 6 - Review*

1. Verify that all the information for the environment is correct
2. Click on **Create** to complete the setup 

#### [To upload backend files to AWS Elastic Beanstalk]

1. Find and click on the Elastic Beanstalk environment (e.g., "**app-env**")
2. Click on "**Upload and deploy**"
3. Click "**Choose file**" under **Upload application**
4. Select the .zip file and upload the .zip file
5. Provide a "**Version label**" under **Version label** (e.g., 1.0)
6. Click on **Deploy**
7. Wait for the backend environment to be deployed (Check for "**OK**" status)

---

### 📦 Configure Cloudns (To be used for HTTPS with LetsEncrypt)

*Creating new domain on Cloudns*

1. Go to Cloudns (https://www.cloudns.net) to create a  
2. Sign in / register for an account on Cloudns
3. Click on "**create zone**" under **DNS Hosting**
4. Select "**Free domain**" and provide a domain name
5. Click on **Create** to create a new domain

*Creating new web server hostname*

1. After the domain has beeen created, click on the domain
2. Click on "**CNAME**" and "**Add new record**" to add a new CNAME record
3. Under "**Host**", enter a "**name**" for the web server (Elastic Beanstalk EC2 instance)
4. Under "**Points to**", enter the **IPv4 DNS of the Elastic Beanstalk EC2 instance**
   - e.g., ec2-xx-xxx-xx-xx.ap-southeast-1.compute.amazonaws.com
6. Click on **Save**

---
### 🔒 Steps to Edit Security Group for EC2

1. Navigate to **EC2** from the AWS Console
2. Select your **EC2 instance** → **Left Sidebar** → **Network & Security** → **Security Groups**
3. Click on the **Security group ID** for the Elastic Beanstalk environment
4. Click **Edit inbound rules**

5. Add/edit the following rules by clicking **Add Rule** for each:

   | Type  | Protocol | Port Range | Source     | Description           |
   |-------|----------|------------|------------|-----------------------|
   | HTTP  | TCP      | 80         | 0.0.0.0/0  | Allow HTTP traffic     |
   | HTTPS | TCP      | 443        | 0.0.0.0/0  | Allow HTTPS traffic    |
   | HTTPS | SSH      | 22        | 0.0.0.0/0  | Allow SSH traffic    |

6. Click **Save rules**.

#### Notes:
- `0.0.0.0/0` opens the ports to all IP addresses (public internet).  
- For improved security, limit the **Source** to trusted IP ranges where possible.

---

### 🔏 Configure Elastic Beanstalk for HTTPS Access

1. Perform SSH connection to EC2 instanace for Backend Server (EC2 on AWS Elastic Beanstalk)
```
ssh -i /path/to/key.pem ec2-user@<your-ec2-public-dns>
```
2. Update EC2 system and install required packages
```
sudo yum update -y
sudo amazon-linux-extras enable epel
sudo yum install -y epel-release
sudo yum install -y nginx certbot python3-certbot-nginx
```
3. Start and enable NGINX
```
sudo systemctl start nginx
sudo systemctl enable nginx
```
4. Issue SSL certificate using Certbot with NGINX plugin
```
sudo certbot --nginx -d backend.ai-news-app.ip-ddns.com
```
5. Navigate to conf.d directory and create a new ssl.conf file
```
cd /etc/nginx/conf.d/
sudo vi ssl.conf
```
6. Enter the following code into the ssl.conf file
```
server {
          listen 443 ssl;
          server_name <full web server URL from cloudns>;

          ssl_certificate /etc/letsencrypt/live/backend.ai-news-app.ip-ddns.com/fullchain.pem;
          ssl_certificate_key /etc/letsencrypt/live/backend.ai-news-app.ip-ddns.com/privkey.pem;

          location / {
              proxy_pass http://127.0.0.1:8080;
              proxy_http_version 1.1;
              proxy_set_header Connection $connection_upgrade;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Host $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          }
}
server {
          listen 80;
          server_name <full web server URL from cloudns>;
          return 301 https://$host$request_uri;
}
```
7. Test NGINX configuration for syntax errors
```
sudo nginx -t
```
8. Reload NGINX to apply changes without downtime
```
sudo systemctl reload nginx
```

---

### 👥 Steps to Set Up AWS Cognito User Pool

1. Navigate to **Cognito** from the AWS Console
2. Click on "**Get started for free in less than five minutes**"
3. Click on "**Single-page application (SPA)**" under **Define your application**
4. Provide a "**name**" for your user pool under **Name your application**
5. Set Up Sign-in Options
   - Select how users will sign in (email, username, phone number, etc.).
6. Add a return URL
   - Enter the URL of the main React app by default
7. Click on **Create user directory**

#### Notes:

- Use the **User Pool ID** and **App Client ID** to integrate authentication into your app.  
- You can enable hosted UI or use SDKs (Amplify, AWS SDK) for sign-in, sign-up, and token handling.

---

## 📥 Deployment Notes
- Use AWS Elastic Beanstalk for backend deployment.
- Ensure proper IAM roles with DynamoDB read/write access are attached to backend EC2 instances.
- Frontend can be hosted via Amplify or static hosting (e.g., GitHub Pages).
- Configure DNS and SSL certificates for secure HTTPS access.
- Monitor Elastic Beanstalk environment health during deployments.

---

## 🔗 API Documentation (Brief)
### POST /analyze
- Submit article text for summary and entity detection.
- Request: JSON { "text": "article text" }
- Response: JSON containing summary, detected people, nationalities, and organizations.

### Authentication
- Uses AWS Cognito tokens (JWT) via OIDC.

---

## ✅ Assumptions

- Users will upload or input news articles in 1-2 langauges.
- Input files are limited to `.txt` or `.docx` formats.
- Authentication is handled via AWS Cognito with valid JWT tokens.
- The backend AI service (Mistral API) is available and responsive.
- CloudNS domain and SSL certificates are properly configured for HTTPS.

## ⚠️ Limitations

- The AI summarization and entity detection accuracy depends on the quality of the input text.
- Legacy document files (.doc) will not be supported, as Mammoth is designed to convert .docx documents
- Formatting of the results may not be accurate 100% of the time, which may cause the results to be combined into one row (for people, country and organization)
- Large files or very long articles may result in slower processing or timeouts.
- Currently supports only people, nationalities, and organizations detection.
- User authentication relies on AWS Cognito.
- API rate limits apply based on Mistral AI’s free tier (1 request/second).
- HTTPS setup requires manual SSL certificate renewal unless automated.
- Deployment and DNS management require manual intervention. No auto-provisioning of resources.

--- 

### 📊 Sample Output

![image](https://github.com/user-attachments/assets/57066269-ebc9-44b4-81a0-2dad4b1ee4c3)


