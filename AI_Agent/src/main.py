from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import yaml
from collections import OrderedDict
from crewai import Agent, Task, Crew, Process
from collections import OrderedDict

app = Flask(__name__)
CORS(app)

os.environ["OPENAI_API_BASE"] = "https://api.groq.com/openai/v1"
os.environ["OPENAI_MODEL_NAME"] = "llama3-70b-8192"
os.environ["OPENAI_API_KEY"] = "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"

def read_yaml_file(file_path):
    with open(file_path, 'r') as file:
        return yaml.safe_load(file)
 
example_response_file_path = '../conf/example.yml'
example_response = read_yaml_file(example_response_file_path)
example_response = yaml.dump(example_response, default_flow_style=False, sort_keys=False)
print(example_response)

questionnaire_response_file_path = '../conf/questionnaire.yml'
questionnaire_response = read_yaml_file(questionnaire_response_file_path)
questionnaire_response = yaml.dump(questionnaire_response, default_flow_style=False, sort_keys=False)
print(questionnaire_response)

def transform_to_json(output_text):
    json_output = OrderedDict()
    current_key = None

    lines = output_text.split('\n')
    
    # Handle the title separately
    if lines[0].startswith("*") and lines[0].endswith("*"):
        title = lines[0].strip("**").strip()
        json_output["title"] = title
        lines = lines[1:]

    for line in lines:
        if line.startswith("*") and line.endswith("*"):
            current_key = line.strip("**").strip().lower().replace(" ", "_").replace(":", "").replace(".", "")
            json_output[current_key] = ""
        elif current_key:
            if line.startswith("*") or line.startswith("+"):
                if not isinstance(json_output[current_key], list):
                    json_output[current_key] = []
                json_output[current_key].append(line.strip("*+ ").strip())
            else:
                if isinstance(json_output[current_key], list):
                    json_output[current_key][-1] += " " + line.strip()
                else:
                    json_output[current_key] += line.strip() + " "
    
    for key in json_output:
        if isinstance(json_output[key], str):
            json_output[key] = json_output[key].strip()
        elif isinstance(json_output[key], list):
            json_output[key] = [item.strip() for item in json_output[key]]

    print("Processed Keys:", list(json_output.keys()))

    desired_order = [
        "title",
        "executive_summary",
        "target_audience",
        "marketing_goals",
        "marketing_strategies",
        "content_marketing",
        "social_media_engagement",
        "industry_networking",
        "search_engine_optimization",
        "client_retention",
        "budget_allocation",
        "additional_recommendations"
    ]

    print("Desired Order:", desired_order)

    ordered_output = OrderedDict()
    for key in desired_order:
        if key in json_output:
            ordered_output[key] = json_output[key]
    
    for key in json_output:
        if key not in ordered_output:
            ordered_output[key] = json_output[key]

    return ordered_output
    
    #AI-Agent
@app.route("/ai", methods=["POST"])
def marketing_strategist_ai_agent():
    print("Post /ai called")
    json_content = request.json
    question_and_answer = json_content.get("question_and_answer")
    question_and_answer = yaml.dump(question_and_answer, default_flow_style=False, sort_keys=False)

    strategist = Agent(
        role="Marketing Strategist",
        goal="""The main objective of the Marketing Strategist is to synthesize the information provided by users through a series of predefined questions and use this data to craft detailed, actionable marketing strategies that align with the users' unique needs, capabilities, and goals.
        Please use the information provided below to enhance the response. Note that this information should not be considered part of the standard template but rather as specific guidelines for refinement
        Develop a detailed, actionable strategy that includes immediate steps for boosting Instagram followers and improving YouTube engagement.
        Identify engaging topics and content types suitable for both Instagram and YouTube, accompanied by a content calendar for the next three months.
        Establish a distinct brand voice, providing practical examples for its application in post captions and video scripts.
        Create detailed audience personas for both platforms, incorporating demographic data, interests, and behavioral insights.
        Perform a thorough competitor analysis within their industry for both platforms, outlining their strategies and highlighting what sets the influencer apart.
        Articulate a compelling unique selling proposition (USP) that clearly differentiates the influencer from the competition.
        Utilize a comprehensive marketing mix involving the 6 Ps of Marketing to enhance their online visibility.
        Explore additional marketing channels where competitors are active, justifying each recommended channel.
        Provide two budgetary frameworks: one aligning with their current financial plan and another based on industry best practices, potentially requiring a higher investment for quicker, more substantial results.""",
        backstory="""The Marketing Strategist is modeled after a veteran marketing strategist with over a decade of experience in diverse fields, particularly focusing on non-profit organizations and small businesses. This background allows the MSA to understand and address the unique challenges faced by freelancers and small entities. 
        The MSA is programmed with a deep understanding of marketing dynamics and trends, especially in digital and grassroots strategies. This AI agent is designed to think like a mentor who is genuinely interested in helping freelancers grow their business and reach their target audience effectively.""",
        verbose=True,
        allow_delegation=False,
    )
    generate_strategy = Task(
        description=f"Here are the questions along with the corresponding answers provided by the freelancer, : '{question_and_answer}'",
        agent=strategist,
        expected_output=example_response,
    )

    crew = Crew(
        agents=[strategist],
        tasks=[generate_strategy],
        verbose=2,
        process=Process.sequential
    )

    output = crew.kickoff()
    # Transform output to JSON
    json_output = transform_to_json(output)
    
    # Return the output as JSON
    return json_output

def start_app():
    app.run(host='0.0.0.0', port=8081, debug=True)

if __name__ == "__main__":
    start_app()
