"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

// Project Data Dictionary
const projectsData: Record<string, {
  title: string;
  category: string;
  image: string;
  tags: string[];
  duration: string;
  role: string;
  client: string;
  overview: string;
  challenge: string;
  solution: string;
  achievements: string[];
  techStack: { category: string; items: string[] }[];
  architecture: string[];
  codeSnippet: {
    filename: string;
    language: string;
    code: string;
  };
}> = {
  "qbot": {
    title: "QBot — AI Chatbot & Fine-Tuned LLM Platform",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80",
    tags: ["Reactjs", "FastAPI", "LoRA", "QLoRA", "Pinecone", "Llama 3", "EC2"],
    duration: "4 Months",
    role: "Lead Python & AI Engineer",
    client: "Qrious Tech Team LLP",
    overview: "QBot is an enterprise-grade AI chatbot platform designed to let merchants upload their unique documentation, FAQs, and files to create automated customer support systems. The platform utilizes local Llama 3 models fine-tuned with Parameter-Efficient Fine-Tuning (PEFT) techniques including LoRA and QLoRA, coupled with namespace-isolated RAG. The system generates an embeddable React script that loads a custom chatbot widget directly onto their website, delivering instant, context-aware answers based on the uploaded knowledge base.",
    challenge: "Parsing diverse unstructured document types (PDFs, DOCX, FAQ tables), chunking them without losing contextual continuity, and retrieving exact semantic matches. It was also critical to ensure that client queries did not result in hallucinations, all while maintaining sub-second response times.",
    solution: "Designed a hybrid pipeline utilizing FastAPI, LangChain, and fine-tuned open LLMs. We fine-tuned a Llama-3-8B model using QLoRA to align intent classification and tone with target merchant requirements, reducing host GPU memory footprint. Combined this with a hierarchical document parsing system that extracts clean text and slices it using recursive token-based splitting. Chunk vectors are uploaded to Pinecone with workspace-specific namespace tagging. At query time, the system performs a hybrid retrieval, injects history-aware context into Bedrock/Llama models, and streams replies via Server-Sent Events (SSE).",
    achievements: [
      "Fine-tuned Llama-3-8B using LoRA/QLoRA on custom support datasets, achieving 95% accuracy in intent classification and brand-tone adherence",
      "Reduced average query search and model generation latency to 850ms by deploying optimized 4-bit quantized model checkpoints",
      "Successfully integrated multitenancy separating Pinecone namespaces securely",
      "Created a lightweight script widget (< 15KB) that embeds easily in any client website"
    ],
    techStack: [
      { category: "AI & ML", items: ["LoRA & QLoRA Fine-tuning", "Llama 3 (PEFT)", "LangChain", "Pinecone Vector DB", "RAG Pipeline"] },
      { category: "Backend", items: ["FastAPI", "Uvicorn", "PostgreSQL", "SQLAlchemy", "Alembic"] },
      { category: "Frontend & Widget", items: ["React.js", "Tailwind CSS", "Vite", "Server-Sent Events"] },
      { category: "Cloud & MLOps", items: ["AWS EC2", "AWS S3", "Docker", "Nginx"] }
    ],
    architecture: [
      "User uploads unstructured PDF or FAQ documentation via the React admin panel.",
      "FastAPI parses the file, cleans tags/whitespace, and chunks text into 500-token blocks.",
      "Bedrock Embeddings translates chunks into 1536-dimensional vectors.",
      "Vectors are indexed inside Pinecone Vector DB using the merchant's workspace ID namespace.",
      "Embeddable widget triggers an API route; FastAPI queries Pinecone, formats prompt contexts, and streams Bedrock answers."
    ],
    codeSnippet: {
      filename: "rag_pipeline.py",
      language: "python",
      code: `import os
from fastapi import APIRouter
from langchain_community.vectorstores import Pinecone
from langchain_aws import BedrockEmbeddings
from langchain_aws.chat_models import BedrockChat
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

router = APIRouter()

# Initialize AWS Bedrock and Pinecone RAG
embeddings = BedrockEmbeddings(model_id="amazon.titan-embed-text-v1")
llm = BedrockChat(model_id="anthropic.claude-3-haiku-20240307-v1:0", model_kwargs={"temperature": 0.1})

def query_kb(namespace_id: str, user_query: str):
    # Load Pinecone vector index for specific tenant namespace
    vectorstore = Pinecone.from_existing_index(
        index_name=os.getenv("PINECONE_INDEX_NAME"),
        embedding=embeddings,
        namespace=namespace_id
    )
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
    
    # Contextual prompt assembly
    system_prompt = (
        "You are an AI support assistant for QBot. "
        "Answer the user query using ONLY the provided context below. "
        "If you do not know the answer, say that you do not know.\\n\\n"
        "Context:\\n{context}"
    )
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{input}"),
    ])
    
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    
    response = rag_chain.invoke({"input": user_query})
    return response["answer"]`
    }
  },
  "hireme-ai": {
    title: "HireMe AI — Intelligent Resume Screening & Candidate Management System",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
    tags: ["FastAPI", "LangChain", "LangGraph", "RAG", "PostgreSQL", "ChromaDB", "Docker"],
    duration: "5 Months",
    role: "Lead AI Backend Engineer",
    client: "HR Tech Product Client",
    overview: "HireMe AI is an AI-powered Resume Screening and Candidate Management System designed to automate recruitment. It features a smart matching engine that analyzes Job Descriptions (JDs) and candidate resumes to rank applicants based on skill alignment, experience, qualifications, and overall fit. By integrating structured resume parsing and agentic LLM matching, it speeds up candidate filtering for HR teams.",
    challenge: "Accurately extracting diverse structured details from unstructured resume formats, minimizing false positives/negatives in candidate matching, and handling heavy concurrent document parsing without degrading system responsiveness.",
    solution: "Designed a stateful LangGraph matching workflow combined with LangChain's vector search using ChromaDB. Implemented Celery and Redis to handle asynchronous background task parsing of incoming resumes, storing extracted structured data in PostgreSQL. Resume storage is handled securely via AWS S3.",
    achievements: [
      "Ranked and matched candidate resumes against specific JDs with over 90% matching precision",
      "Processed resume parsing asynchronously using Celery & Redis, ensuring sub-second UI response times",
      "Built a multi-agent validation loop with LangGraph to verify resume facts against JD requirements",
      "Successfully cut down manual HR screening and candidate shortlisting duration by 80%"
    ],
    techStack: [
      { category: "AI & RAG Orchestration", items: ["LangGraph", "LangChain", "OpenAI / Ollama LLMs", "ChromaDB Vector Store"] },
      { category: "Backend Core", items: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Celery", "Redis"] },
      { category: "Frontend Client", items: ["React.js", "Tailwind CSS", "WebSockets"] },
      { category: "DevOps & Infrastructure", items: ["Docker", "AWS S3", "AWS Lambda", "GitHub Actions"] }
    ],
    architecture: [
      "HR team creates and publishes a Job Description (JD) with custom requirements.",
      "Candidate resumes are uploaded to AWS S3, triggering an asynchronous Celery task for parsing.",
      "The system parses the document, extracts key skills and experience, and generates vector embeddings stored in ChromaDB.",
      "The LangGraph engine executes a multi-stage semantic comparison between the JD guidelines and candidate embeddings.",
      "Match scores, structured summaries, and custom insights are displayed on the React frontend dashboard via WebSockets."
    ],
    codeSnippet: {
      filename: "matching_workflow.py",
      language: "python",
      code: `from typing import Dict, List, TypedDict
from langgraph.graph import StateGraph, END

class MatchingState(TypedDict):
    job_description: str
    resume_text: str
    extracted_skills: List[str]
    match_score: float
    fit_assessment: str
    is_qualified: bool

def parse_skills_node(state: MatchingState) -> Dict:
    # Simulates extracting skills using LLM structured output
    return {"extracted_skills": ["FastAPI", "LangChain", "PostgreSQL", "Docker"]}

def calculate_match_node(state: MatchingState) -> Dict:
    # Evaluates semantic similarity and experience fit
    return {"match_score": 85.5, "fit_assessment": "Strong technical alignment in backend engineering."}

def verification_node(state: MatchingState) -> Dict:
    # Validates if candidate meets minimum thresholds
    is_qualified = state["match_score"] >= 75.0
    return {"is_qualified": is_qualified}

# Build LangGraph workflow
workflow = StateGraph(MatchingState)
workflow.add_node("parse_skills", parse_skills_node)
workflow.add_node("calculate_match", calculate_match_node)
workflow.add_node("verify_candidate", verification_node)

workflow.set_entry_point("parse_skills")
workflow.add_edge("parse_skills", "calculate_match")
workflow.add_edge("calculate_match", "verify_candidate")
workflow.add_edge("verify_candidate", END)

app = workflow.compile()`
    }
  },
  "vigilense": {
    title: "Vigilense — AI-Powered Computer Vision Surveillance Platform",
    category: "AI/ML",
    image: "/image/vigilense.png",
    tags: ["FastAPI", "YOLOv8", "OpenCV", "InsightFace", "DeepFace", "ByteTrack", "DeepSORT"],
    duration: "6 Months",
    role: "Lead Computer Vision Engineer",
    client: "Enterprise Security Client",
    overview: "Vigilense is an AI-powered computer vision surveillance platform built to process live CCTV camera feeds, images, and videos. It provides real-time security alerts and analytics, featuring key modules such as object detection, people counting, face recognition, vehicle detection, intrusion detection, and restricted zone monitoring. With multi-object tracking, it tracks individuals and assets across camera fields with high accuracy.",
    challenge: "Handling low-latency real-time video streaming processing of multiple high-definition CCTV feeds concurrently, maintaining high object tracking accuracy under varying light and weather conditions, and generating instant notification alerts without bottlenecks.",
    solution: "Constructed a high-throughput processing pipeline using OpenCV and YOLOv8 with tracking algorithms (ByteTrack and DeepSORT). The backend is powered by FastAPI and WebSockets for real-time alert dispatching, storing event logs in PostgreSQL and media alerts in AWS S3. Containerized using Docker for scalable edge deployment.",
    achievements: [
      "Maintained a sub-50ms inference latency for object detection and tracking per frame",
      "Accurately tracked and counted people and vehicles with over 95% accuracy across feeds",
      "Successfully detected zone intrusions and dispatched WebSocket notifications in under 200ms",
      "Deployed modular Edge-AI pipelines using containerized Docker setups on local surveillance nodes"
    ],
    techStack: [
      { category: "Computer Vision & ML", items: ["YOLOv8", "OpenCV", "InsightFace", "DeepFace", "Roboflow"] },
      { category: "Object Tracking", items: ["ByteTrack", "DeepSORT"] },
      { category: "Backend & Real-Time", items: ["FastAPI", "WebSockets", "PostgreSQL", "SQLAlchemy"] },
      { category: "Infrastructure & Storage", items: ["Docker", "AWS S3", "Ubuntu Edge Nodes"] }
    ],
    architecture: [
      "CCTV camera streams are captured and decoded using OpenCV frames.",
      "Each frame is run through a YOLOv8 detection model and mapped onto ByteTrack/DeepSORT to preserve object identities.",
      "Modules like intrusion detection check if bounding boxes cross predefined coordinates or zones.",
      "Recognized faces are compared against a local database containing vector representations of registered faces using DeepFace/InsightFace.",
      "When an event triggers, event metadata is saved to PostgreSQL, alert frames are pushed to AWS S3, and warning states are broadcasted to the frontend via WebSockets."
    ],
    codeSnippet: {
      filename: "surveillance_pipeline.py",
      language: "python",
      code: `import cv2
from ultralytics import YOLO

class SurveillancePipeline:
    def __init__(self, model_path: str):
        # Initialize YOLOv8 model
        self.model = YOLO(model_path)

    def process_stream(self, stream_url: str):
        cap = cv2.VideoCapture(stream_url)
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Run YOLOv8 detection
            results = self.model.track(source=frame, persist=True)

            for result in results:
                boxes = result.boxes
                for box in boxes:
                    # Class ID, Bounding Box coordinates, and Confidence score
                    cls_id = int(box.cls[0])
                    coords = box.xyxy[0].tolist()
                    conf = float(box.conf[0])
                    
                    if conf > 0.6:
                        # Draw bounding box and trigger custom alerts
                        self.trigger_zone_alert(cls_id, coords)

            # Display or push frame to WebRTC/WebSockets
            cv2.imshow("Surveillance Feed", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        cap.release()
        cv2.destroyAllWindows()

    def trigger_zone_alert(self, class_id: int, coordinates: list):
        # Custom logic for intrusion alerts
        pass`
    }
  },
  "learnify-ai": {
    title: "Learnify AI — Exam Prep & Concept Builder",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Reactjs", "FastAPI", "LangChain", "LangGraph", "RAG Pipeline", "AWS Lambda"],
    duration: "6 Months",
    role: "Lead Backend Developer",
    client: "EdTech Startup Contract",
    overview: "Learnify AI is an advanced educational technology platform that generates custom-tailored examination papers, sample tests, and concept summaries. Educators upload course books, lecture notes, or syllabus files, select their target difficulty, distribution of questions (MCQs, short answer, long paragraphs), and the AI automatically synthesizes evaluation papers.",
    challenge: "Maintaining complete curriculum coverage without skipping chapters, ensuring that generated answers align exactly with textbook facts rather than LLM generic training, and debugging long prompt chains across multi-stage generation runs.",
    solution: "Implemented a stateful multi-agent system using LangGraph. The workflow splits the uploaded PDF content into chapters, extracts primary learning concepts, writes corresponding test questions, reviews them through a Critic node to verify compliance, and renders the finalized paper. Integrated LangSmith for active pipeline tracing and performance auditing.",
    achievements: [
      "Engineered a dynamic test generator supporting 3 distinct difficulty modes (Easy/Medium/Hard)",
      "Processed large 400-page textbooks by indexing concept vectors dynamically in PostgreSQL",
      "Achieved 100% test coverage matching specific curriculum files without question duplication",
      "Leveraged AWS Lambda for serverless, cost-effective document processing and rendering"
    ],
    techStack: [
      { category: "Agentic Framework", items: ["LangGraph (State Machines)", "LangChain", "LangSmith Tracing"] },
      { category: "Backend Microservices", items: ["FastAPI", "PostgreSQL", "PyMuPDF Document Parser"] },
      { category: "Cloud & Hosting", items: ["AWS Lambda", "AWS S3 Buckets", "Serverless Framework"] },
      { category: "UI & Presentation", items: ["React.js", "Tailwind CSS", "PDF Document Exporters"] }
    ],
    architecture: [
      "User uploads a textbook file. The document is chunked, cleaned, and cataloged by chapter.",
      "The LangGraph 'Generator' agent receives concept maps and drafts a set of MCQs and descriptive questions.",
      "The draft is sent to the 'Critic' agent, which validates questions against the original PDF context.",
      "If errors or hallucinations are detected, the graph loops back to the generator with correction notes.",
      "The final approved questions are compiled and formatted into a print-ready PDF saved in AWS S3."
    ],
    codeSnippet: {
      filename: "exam_state_graph.py",
      language: "python",
      code: `from typing import Dict, TypedDict, List
from langgraph.graph import StateGraph, END

# Define state structure
class ExamState(TypedDict):
    syllabus_text: str
    concepts: List[str]
    drafted_questions: List[Dict]
    review_approved: bool
    critic_feedback: str

def extract_concepts_node(state: ExamState) -> Dict:
    # Analyzes text to find core syllabus chapters
    return {"concepts": ["Data Structures", "Big O Notation", "Sorting"]}

def generate_questions_node(state: ExamState) -> Dict:
    # Generates questions for each concept
    questions = [{"id": 1, "question": "What is the time complexity of QuickSort?", "answer": "O(N log N)"}]
    return {"drafted_questions": questions}

def critic_review_node(state: ExamState) -> Dict:
    # Validates questions against original source accuracy
    return {"review_approved": True, "critic_feedback": "All queries accurate."}

# Build LangGraph workflow
workflow = StateGraph(ExamState)
workflow.add_node("extract_concepts", extract_concepts_node)
workflow.add_node("generate_questions", generate_questions_node)
workflow.add_node("critic_review", critic_review_node)

# Connect edges
workflow.set_entry_point("extract_concepts")
workflow.add_edge("extract_concepts", "generate_questions")
workflow.add_edge("generate_questions", "critic_review")

# Conditional routing edge
workflow.add_conditional_edges(
    "critic_review",
    lambda state: "approve" if state["review_approved"] else "retry",
    {
        "approve": END,
        "retry": "generate_questions"
    }
)

exam_app = workflow.compile()`
    }
  },
  "website-generator": {
    title: "Website Generator AI — Prompt to Site",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    tags: ["FastAPI", "DSPy", "LangGraph", "Deep Agents", "Amazon Bedrock", "AWS Lambda"],
    duration: "4 Months",
    role: "Lead AI Developer & Architect",
    client: "Qrious Tech Team LLP",
    overview: "The Website Generator AI is a conversational agent platform. Users talk to a setup chatbot, describing their company, color preferences, and core business goals. The backend uses Bedrock and programmatic prompt builders to generate clean, responsive, single-page or multi-page websites with cohesive layouts, landing copy, and features, and publishes them instantly.",
    challenge: "Handling complex layout structures and ensuring that output HTML/CSS elements are fully valid, secure, and structured, rather than raw unclosed tags. Standard LLMs often fail at generating reliable, compilable layout structures repeatedly.",
    solution: "Used DSPy (Declarative Self-Improving Language Programs) to compile and optimize the agent's prompts. Created a structural state machine in LangGraph to separate the layout design task from the copywriting task. The code validator node parses the output HTML/CSS, detects defects, and prompts the agent programmatically to fix syntax.",
    achievements: [
      "Delivered a platform that builds and launches a multi-page web layout in under 1.5 minutes",
      "Achieved 99.2% valid HTML validation rates by utilizing structural validation layers",
      "Programmatically optimized system prompts with DSPy, reducing token overhead by 30%",
      "Serverless deployment of page builder functions on AWS Lambda for scale"
    ],
    techStack: [
      { category: "AI Systems", items: ["DSPy Prompt Compiler", "LangGraph", "Amazon Bedrock (Claude 3.5 Sonnet)", "Tailwind Code Builder"] },
      { category: "Backend Core", items: ["FastAPI", "Python AST & HTML Parsers", "BeautifulSoup4"] },
      { category: "Hosting Infrastructure", items: ["AWS Lambda", "AWS S3 Static Web Hosting", "CloudFront"] },
      { category: "Automation", items: ["GitHub API Integrations", "AWS API Gateway"] }
    ],
    architecture: [
      "User chats with the layout planner assistant to define company goals.",
      "DSPy-optimized signature predicts layout JSON outlining sections, color palettes, and copywriting briefs.",
      "Copywriting agent drafts section descriptions, headers, and call-to-actions.",
      "HTML coder agent stitches layouts, applying Tailwind responsive styles.",
      "Linter node inspects HTML tags. Once validated, files are written directly to AWS S3 static buckets."
    ],
    codeSnippet: {
      filename: "dspy_generator.py",
      language: "python",
      code: `import dspy

# Configure DSPy environment
dspy.settings.configure(lm=dspy.Bedrock(model="anthropic.claude-3-sonnet-20240229-v1:0"))

class WebSectionSignature(dspy.Signature):
    """Predicts structured HTML section properties from business description."""
    business_type = dspy.InputField(desc="Category of business, e.g. Dentist, Legal firm")
    color_palette = dspy.InputField(desc="Primary design colors, e.g. dark blue, minimalist beige")
    section_name = dspy.InputField(desc="The name of the section, e.g. Hero, Testimonials")
    
    section_html = dspy.OutputField(desc="Valid Tailwind CSS/HTML section string")

class SectionGenerator(dspy.Module):
    def __init__(self):
        super().__init__()
        # Deploys a Predict module enforcing signature parameters
        self.generate_html = dspy.Predict(WebSectionSignature)
        
    def forward(self, business_type: str, color_palette: str, section_name: str):
        prediction = self.generate_html(
            business_type=business_type,
            color_palette=color_palette,
            section_name=section_name
        )
        return prediction.section_html

# Example instantiation
generator = SectionGenerator()
# DSPy allows compiling these prompts using datasets of validated HTML mockups`
    }
  },
  "barter-club": {
    title: "Barter Club — Voucher & Coupon Platform",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    tags: ["Django", "Django REST Framework", "PostgreSQL", "Razorpay", "AWS CloudWatch"],
    duration: "8 Months",
    role: "Senior Django Backend Developer",
    client: "Barter Club Private Ltd.",
    overview: "Barter Club is a transactional barter platform where merchants can create, distribute, and manage promotional vouchers and digital coupons. Customers purchase cards via Razorpay, transfer coupons between their wallets, and redeem points at participating merchant outlets, backed by auditing logs.",
    challenge: "Preventing double-spend issues (where clients could redeem the same voucher twice through concurrent API calls) and processing payments asynchronously and securely under heavy concurrent transaction peaks.",
    solution: "Engineered a robust Django backend utilizing PostgreSQL database transaction locking (`select_for_update`) to isolate voucher balance updates. Built Webhook receivers for Razorpay payments and used Redis queues to scale transactions safely under load.",
    achievements: [
      "Implemented a secure ledger accounting database schema to guarantee zero balance mismatch",
      "Maintained sub-50ms API query execution for merchant voucher scans",
      "Created automatic Razorpay payout processes with built-in retry-on-failure logs",
      "Handled 5,000+ daily concurrent voucher redemptions with zero transaction failures"
    ],
    techStack: [
      { category: "Web Backend", items: ["Django", "Django REST Framework (DRF)", "Django ORM"] },
      { category: "Database & Ledger", items: ["PostgreSQL (with transaction locks)", "Redis", "PgBouncer Connection Pooler"] },
      { category: "Integrations", items: ["Razorpay Payment Gateway", "Amazon CloudWatch Logs", "Sentry"] },
      { category: "DevOps", items: ["AWS Gunicorn", "Nginx", "Docker Container Stack"] }
    ],
    architecture: [
      "Merchant issues a set of promo vouchers through the Django admin dashboard.",
      "Client acquires voucher using Razorpay checkout, registering transaction logs.",
      "Voucher is presented at checkout via QR code scanner.",
      "DRF backend opens an atomic database transaction block, lock-acquiring the voucher row.",
      "The system verifies balance status, marks the voucher as 'Redeemed', updates merchant ledger, and commits."
    ],
    codeSnippet: {
      filename: "voucher_redeem.py",
      language: "python",
      code: `from django.db import transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Voucher, LedgerEntry

class VoucherRedeemView(APIView):
    @transaction.atomic
    def post(self, request, voucher_code: str):
        # Enforce exclusive row lock on the target voucher to prevent double-spending
        try:
            voucher = Voucher.objects.select_for_update().get(code=voucher_code)
        except Voucher.DoesNotExist:
            return Response({"error": "Voucher not found"}, status=status.HTTP_404_NOT_FOUND)
            
        if voucher.status != "Active":
            return Response({"error": "Voucher already redeemed or expired"}, status=status.HTTP_400_BAD_REQUEST)
            
        # Update voucher state
        voucher.status = "Redeemed"
        voucher.save()
        
        # Log double-entry ledger bookkeeping
        LedgerEntry.objects.create(
            user=request.user,
            merchant=voucher.merchant,
            voucher=voucher,
            amount=voucher.value,
            transaction_type="Redeem"
        )
        
        return Response({"success": "Voucher successfully redeemed"}, status=status.HTTP_200_OK)`
    }
  },
  "hrms-system": {
    title: "HRMS — Human Resource Management System",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    tags: ["FastAPI", "Python", "MySQL", "Pandas", "Excel Export", "Background Tasks"],
    duration: "6 Months",
    role: "Backend API Engineer",
    client: "Internal Corporate Product",
    overview: "The Human Resource Management System (HRMS) is designed to streamline employee administration and organizational operations. It features secure RESTful APIs to manage employee profile records, attendance tracking, leave/holiday allocations, policy guidelines, and automated notifications. Built with background task scheduling, it automates recurring employee management workflows.",
    challenge: "Handling complex leave logic (roll-overs, allocations, and accruals), tracking precise employee time logs across timezones, and exporting large employee datasets into formatted Excel and CSV formats without memory leaks or server slowdowns.",
    solution: "Engineered a FastAPI-based backend with background tasks for non-blocking asynchronous notifications and database updates. Optimized MySQL schema designs with proper index keys on employee and attendance tables. Used Pandas to write memory-efficient Excel/CSV exporters for corporate administration dashboards.",
    achievements: [
      "Designed robust SQL database indexing, accelerating profile search speeds by 60%",
      "Implemented background leave accrual workers, eliminating manual calculations for HR teams",
      "Developed clean Pandas export scripts that handle large-scale database exports in under 500ms",
      "Constructed role-based access control (RBAC) to securely segregate admin and employee dashboards"
    ],
    techStack: [
      { category: "Web Backend", items: ["FastAPI", "Python REST APIs", "SQLAlchemy ORM"] },
      { category: "Database Core", items: ["MySQL", "Query Optimization", "Indexing"] },
      { category: "Data Processing", items: ["Pandas Library", "CSV / Excel Formatting", "Data Manipulation"] },
      { category: "Asynchronous Tools", items: ["FastAPI Background Tasks", "Cron Scheduling", "SMTP Mail Servers"] }
    ],
    architecture: [
      "Admin uploads employee list or creates individual profile records via FastAPI.",
      "Employees log time logs, attendance clock-ins, and leave requests.",
      "FastAPI validates roles and writes records to MySQL database.",
      "Accrual workers run in the background to calculate leave balances and trigger email warnings.",
      "Admin filters reports on dashboard and triggers a Pandas exporter task, receiving a downloadable Excel sheet."
    ],
    codeSnippet: {
      filename: "leave_approval.py",
      language: "python",
      code: `from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from .database import get_db
from .models import LeaveRequest
from .email import send_status_email

router = APIRouter(prefix="/leaves", tags=["Leaves"])

def notify_employee_task(request_id: int, status: str, email: str):
    # Simulates sending asynchronous notification emails
    send_status_email(email, f"Your leave request #{request_id} has been {status}.")

@router.post("/{request_id}/approve")
def approve_leave_request(
    request_id: int, 
    background_tasks: BackgroundTasks, 
    db: Session = Depends(get_db)
):
    # Fetch leave request with row updates
    leave_req = db.query(LeaveRequest).filter(LeaveRequest.id == request_id).first()
    if not leave_req:
        return {"error": "Leave request not found"}

    # Update request status
    leave_req.status = "Approved"
    db.commit()

    # Enqueue background task to avoid blocking the API thread
    background_tasks.add_task(
        notify_employee_task, 
        request_id=leave_req.id, 
        status="Approved", 
        email=leave_req.employee.email
    )

    return {"message": "Leave request approved successfully"}`
    }
  },
  "telegram-support-bot": {
    title: "AI-Powered Telegram Support Bot",
    category: "Automation",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    tags: ["n8n", "OpenAI API", "Voice Transcription", "API Automation", "Webhooks"],
    duration: "3 Months",
    role: "Automation Developer",
    client: "Productivity Suite Contract",
    overview: "An automated Telegram customer support assistant capable of handling texts and voice notes. It converts speech into structured queries, answers user FAQs using customized knowledge maps, triggers alerts, and logs incoming lead conversations to internal databases.",
    challenge: "Handling binary voice files (OGG format) from Telegram APIs, converting audio streams to clean readable text, maintaining long-term session logs, and deploying an automated system without constructing complex, expensive web servers.",
    solution: "Designed a serverless workflow inside n8n. Used webhook triggers to intercept Telegram updates. Integrated OpenAI's Whisper API to translate incoming voice notes to text. Deployed GPT-4 to classify intent, query knowledge records, and trigger automatic responses or team alerts.",
    achievements: [
      "Created an automation workflow with zero ongoing server maintenance costs",
      "Transcribed and resolved voice message inquiries in under 4 seconds",
      "Automated lead creation and customer routing to Slack channels and Google Sheets",
      "Maintained 99.9% uptime by utilizing n8n cloud webhook handlers"
    ],
    techStack: [
      { category: "Workflow Automation", items: ["n8n Workflow Engine", "Webhook HTTP Listeners", "REST Integration Nodes"] },
      { category: "AI Services", items: ["OpenAI Whisper API (Speech-to-Text)", "GPT-4 Intent Classifier", "Semantic Prompts"] },
      { category: "Integrations", items: ["Telegram Bot API", "Google Sheets API", "Slack API Alerts"] },
      { category: "Infrastructure", items: ["n8n Cloud Host", "JSON Data Parsers"] }
    ],
    architecture: [
      "Customer sends a text or voice message to the Telegram support bot.",
      "n8n webhook listener intercepts the request and downloads binary voice files (.ogg).",
      "Whisper API translates the voice note into a structured text string.",
      "GPT-4 extracts customer intent (e.g. inquiry, billing error, feedback) and queries FAQ documents.",
      "Bot replies to the customer on Telegram, and logs logs in Google Sheets, notifying teams on Slack."
    ],
    codeSnippet: {
      filename: "n8n_voice_node.js",
      language: "javascript",
      code: `// n8n Javascript Node to format Whisper API form-data payload
const binaryData = items[0].binary.data;
const fileBuffer = Buffer.from(binaryData.data, 'base64');

// Construct multipart/form-data for OpenAI API transcription request
const FormData = require('form-data');
const form = new FormData();

form.append('file', fileBuffer, {
  filename: 'voice_note.ogg',
  contentType: 'audio/ogg'
});
form.append('model', 'whisper-1');

return [{
  json: {
    headers: form.getHeaders(),
    body: form.getBuffer()
  }
}];`
    }
  }
};

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projectsData[slug];

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-serif font-bold text-[#1C1917] mb-2">Project Not Found</h1>
        <p className="text-stone-500 text-sm mb-6">The project details page you are trying to view does not exist.</p>
        <Link
          href="/"
          className="px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest bg-[#1C1917] text-[#FAF9F5] hover:bg-[#B45309] transition-colors duration-200"
        >
          &larr; Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] relative overflow-hidden selection:bg-[#B45309]/10 selection:text-[#B45309]">
      {/* Notebook sidebar guideline */}
      <div className="absolute top-0 bottom-0 left-[10%] md:left-[15%] w-px bg-[#EAEAE4] pointer-events-none hidden sm:block" />

      {/* Header Nav */}
      <header className="max-w-7xl mx-auto px-6 sm:px-8 relative z-20 pt-8 pl-6 sm:pl-16 md:pl-24">
        <div className="flex items-center justify-between border-b border-[#EAEAE4] pb-6">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-stone-500 hover:text-[#B45309] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to projects
          </Link>
          <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest hidden sm:block">
            ./case_studies/{slug}_metrics
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 pl-6 sm:pl-16 md:pl-24 py-12 md:py-16">

        {/* Title and Metadata */}
        <div className="max-w-4xl space-y-6 mb-12">
          <span className="inline-block px-3 py-1 rounded bg-[#EAEAE4]/50 border border-[#EAEAE4] text-[#B45309] text-[10px] font-mono uppercase tracking-widest">
            {project.category} / case_study
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
            {project.title}
          </h1>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-b border-[#EAEAE4] py-6 text-xs">
            <div className="space-y-1">
              <span className="text-stone-400 font-mono text-[9px] uppercase tracking-wider block">role</span>
              <span className="text-[#1C1917] font-semibold font-sans">{project.role}</span>
            </div>
            <div className="space-y-1">
              <span className="text-stone-400 font-mono text-[9px] uppercase tracking-wider block">client</span>
              <span className="text-[#1C1917] font-semibold font-sans">{project.client}</span>
            </div>
            <div className="space-y-1">
              <span className="text-stone-400 font-mono text-[9px] uppercase tracking-wider block">duration</span>
              <span className="text-[#1C1917] font-semibold font-sans">{project.duration}</span>
            </div>
            <div className="space-y-1">
              <span className="text-stone-400 font-mono text-[9px] uppercase tracking-wider block">technologies</span>
              <span className="text-[#1C1917] font-semibold font-sans line-clamp-1">{project.tags.slice(0, 3).join(", ")}</span>
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="w-full aspect-[21/9] rounded-lg overflow-hidden border border-[#EAEAE4] mb-12 shadow-sm relative bg-stone-100">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">

          {/* Left Column: Case details */}
          <div className="lg:col-span-8 space-y-10">

            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C1917] border-b border-[#EAEAE4]/80 pb-2">
                Project Overview
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                {project.overview}
              </p>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid md:grid-cols-2 gap-8 pt-4">
              <div className="p-6 rounded-lg bg-red-50/30 border border-red-100 space-y-3">
                <h3 className="text-sm font-mono font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  The Challenge
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FAF9F5] border border-[#EAEAE4] space-y-3">
                <h3 className="text-sm font-mono font-bold text-[#B45309] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]" />
                  The Solution
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="space-y-4 pt-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C1917] border-b border-[#EAEAE4]/80 pb-2">
                Engineering Achievements &amp; Metrics
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start p-3 bg-white rounded border border-[#EAEAE4]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-stone-600 text-xs sm:text-sm leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* System Execution Flow */}
            <div className="space-y-4 pt-4">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C1917] border-b border-[#EAEAE4]/80 pb-2">
                System Architecture Flow
              </h2>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-[#EAEAE4]">
                {project.architecture.map((step, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <div className="absolute -left-6 top-1 w-4.5 h-4.5 rounded-full bg-white border border-[#B45309] flex items-center justify-center">
                      <span className="text-[8px] font-mono font-bold text-[#B45309]">{idx + 1}</span>
                    </div>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Tech Stack & Tools */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">

            {/* Tech Stack Box */}
            <div className="p-6 rounded-lg border border-[#EAEAE4] bg-white space-y-6 shadow-sm">
              <h3 className="text-sm font-mono font-bold text-[#1C1917] uppercase tracking-wider border-b border-[#EAEAE4] pb-3 flex items-center gap-2">
                <Settings className="w-4 h-4 text-stone-500 animate-spin-slow" />
                Technology Stack
              </h3>

              <div className="space-y-6">
                {project.techStack.map((group, idx) => (
                  <div key={idx} className="space-y-2">
                    <span className="font-mono text-[9px] text-[#B45309] uppercase tracking-widest block font-bold">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-1 rounded bg-[#FAF9F5] border border-[#EAEAE4] text-[10px] text-stone-700 font-sans"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Promo */}
            <div className="p-6 rounded-lg border border-[#EAEAE4] bg-[#1C1917] text-[#FAF9F5] space-y-4">
              <h4 className="font-serif font-bold text-lg">Interested in this architecture?</h4>
              <p className="text-stone-400 text-xs leading-relaxed">
                Let's discuss how we can deploy a similar, custom-tailored system for your business requirements.
              </p>
              <Link
                href="/#contact"
                className="w-full py-2.5 rounded bg-[#B45309] hover:bg-[#B45309]/90 text-white font-mono text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
              >
                Hire Sachin Patel
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>



        {/* Bottom Navigation */}
        <div className="border-t border-[#EAEAE4] pt-12 flex justify-between items-center text-xs">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#B45309] hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to main portfolio
          </Link>
          <span className="text-stone-400 font-mono text-[9px]">© Sachin Patel. All rights reserved.</span>
        </div>

      </main>
    </div>
  );
}
