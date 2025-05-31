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

---

## 🛠 Setup Instructions

### Prerequisites

- Node.js (>=18)
- Antd Design

### Frontend Setup

- 

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


<br/>

# Part 2: Developing Processes

This section provides an overview of a proposed architecture for processing up to **10,000 news articles per hour** using AWS services, with a focus on scalability, availability and cost effectiveness. 

---

# 🏗️ Simple News Article Processing Architecture

This is a minimal AWS setup to process up to **10,000 news articles per hour** with scalability, availability, and cost in mind.

---

## 1. Ingestion & Event Trigger

| 🛠️ AWS Service           | 🎯 Role / Purpose                                                |
|:--------------------------|:-----------------------------------------------------------------|
| 📦 **Amazon S3**           | Store uploaded article files (`.txt`, `.doc`, `.docx`).         |
| 🔔 **S3 Event Notification** | Trigger processing when a new file is uploaded.               |



## 2. Processing & Storage

| 🛠️ AWS Service          | 🎯 Role / Purpose                                                           |
|:-------------------------|:----------------------------------------------------------------------------|
| ⚡ **AWS Lambda**        | Calls Mistral AI API to process the data                                    |
| 📚 **Amazon DynamoDB**   | Stores the processed data from Mistral AI (people, countries, organizations |


## 3. API / Frontend Layer

| 🛠️ AWS Service                  | 🎯 Role / Purpose                               |
|:--------------------------------|:-------------------------------------------------|
| 🌐 **Elastic Beanstalk**        | Hosts backend API that serves processed data.    |
| 🖥️ **React App**                | Frontend UI to display data, hosted on Amplify.  |

## Workflow Summary

1. User uploads article to **S3**.  
2. **S3 Event Notification** triggers a Lambda function.  
3. **Lambda** fetches file, processes it (via Mistral API), and stores results in **DynamoDB**.  
4. Frontend fetches data from backend API for display.

## ⚖️ Scalability Notes

- 📦 **Amazon S3** scales automatically to handle any number of uploads.  
- ⚡ **AWS Lambda** scales with concurrent executions to handle bursts of files.  
- 📚 **DynamoDB** in **On-Demand** mode scales seamlessly for reads/writes.  
- 🔄 Event-driven architecture smooths out load spikes by queuing events naturally.

## 🛡️ Availability Notes

- 🌍 High availability by default; All core services (S3, Lambda, DynamoDB) are **multi-AZ** by default.
- 🔁 Use **retry logic** in Lambda and error handling for failed processes.  
- 🏢 Elastic Beanstalk backend can be deployed across multiple Availability Zones for redundancy.

## 💰 Cost Efficiency Notes

- ⏳ Lambda charges only for actual compute time, saving cost when idle.  
- 💡 DynamoDB On-Demand avoids paying for unused capacity.  
- 🎯 Event-driven processing avoids overprovisioning compute resources.
