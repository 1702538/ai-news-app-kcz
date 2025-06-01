# AI News Search Web Application

An AI-powered web application that allows users to input or upload news articles in English or French. It returns a summary along with detected nationalities and people, with optional detection of organizations. Supports user authentication via AWS Cognito.

---

## 🚀 Features

- 🔐 User authentication (OIDC-based)
- 📄 Allow single file upload `.txt`, `.doc`, or `.docx` files
- 🌍 Multi-language support (E.g., English & French)
- 👤 Detect people and nationalities
- 🧠 Summarize news using an AI backend
- 📱 Responsive frontend with Ant Design
- 🔑 HTTPS Configured with LetsEncrypt

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
- CLOUDNS Account (To manage DNS Services)
- Postman Account (For API development)
- Any email account (To sign up for account on React web application)

### Pre-requisites:

- Node.js (>= 18.x)
- Antd Design (>= 5.x)
- CLOUDNS Account with subdomain set up
- AWS Account with the following services set up:
  - AWS Amplify
  - Amazon Elastic Beanstalk
  - Amazon Cognito
  - DynamoDB Table
    
---

### 📦 Frontend Setup

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

### 📦 Backend Setup

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
2. Click on "CNAME" and "Add new record" to add a new CNAME record
3. Under "Host", enter a "name" for the web server (Elastic Beanstalk EC2 instance)
4. Under Points to, enter the IPv4 DNS of the Elastic Beanstalk EC2 instance (e.g., ec2-xx-xxx-xx-xx.ap-southeast-1.compute.amazonaws.com)
5. Click on **Save**

---

### 📦 Configure EC2 Instance for HTTPS Access

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





## 🛠 Setup Instructions

## ☁️ AWS Services Setup

This application relies on several AWS services to enable user authentication and backend AI processing.

### 1. 🔐 AWS Cognito

| Item                | Description                                                                                                      |
|---------------------|------------------------------------------------------------------------------------------------------------------|
| **User Pool**       | Create a Cognito User Pool to manage user registration, sign-in, and profiles.                                   |
| **App Client**      | Create an App Client under the User Pool without a client secret for use in the frontend.                        |
| **Domain**          | Set up a Cognito Hosted UI domain or use your custom domain for authentication flows.                            |
| **Callback URLs**   | Configure callback URLs to point to your frontend app (e.g., `http://localhost:3000` for development, or production URL). |
| **OAuth 2.0 Settings** | Enable authorization code grant flow and specify allowed scopes (`openid`, `profile`, `email`).                 |
 
### 2. 🖥️ Backend API Hosting

| Item               | Description                                                                                                   |
|:--------------------|:---------------------------------------------------------------------------------------------------------------|
| **Hosting Options** | AWS Elastic Beanstalk (for containerized or Node.js apps)                                                  |
| **API Endpoint**    | Ensure the API endpoint URL is configured in frontend environment variables (`REACT_APP_API_URL`).              |

### 3. 🛡️ IAM Roles and Permissions

| Item                       | Description                                                                              |
|:----------------------------|:------------------------------------------------------------------------------------------|
| **Least-privilege Roles**  | Assign least-privilege IAM roles to backend services for secure AWS resource access.     |
| **Cognito Permissions**    | Ensure the Cognito User Pool has proper permissions and policies for app integration.     |

### 4. ⚠️ Additional Notes

| Item                  | Description                                                                                          |
|:-----------------------|:------------------------------------------------------------------------------------------------------|
| **HTTPS Usage**       | Use HTTPS endpoints for secure communication between frontend and backend.                           |
| **Monitoring**        | Regularly monitor AWS service usage and costs.                                                      |
| **Logging & Alerts**  | Consider configuring AWS CloudWatch for logging and alerting backend services.                       |

- ⏳ Lambda charges only for actual compute time, saving cost when idle.  
- 💡 DynamoDB On-Demand avoids paying for unused capacity.  
- 🎯 Event-driven processing avoids overprovisioning compute resources.
