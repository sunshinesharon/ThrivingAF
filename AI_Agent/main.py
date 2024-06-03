from langchain_community.llms import Ollama
from crewai import Agent, Task, Crew, Process

model = Ollama(model="llama3")

email = "nigerian prince sending some gold"

classifier = Agent(
    role = "email classifier",
    goal = "accurately classify emails based on their importance. give every email one of these ratings: important, casual, or spam",
    backstory = "You are an AI assistant whose only job is to classify emails accurately and honestly. Do not be afraid to give emails bad rating if they are not important. Your job is to help the user manage their inbox.",
    verbose = True,
    allow_delegation = False,
    llm = model
)

responder = Agent(
    role = "email responder",
    goal = "respond to emails based on their importance. Respond to important emails first, then casual emails, and ignore spam emails",
    backstory = "You are an AI assistant whose only job is to respond to emails accurately and honestly. Do not be afraid to ignore emails if they are not important. Your job is to help the user manage their inbox.",
    verbose = True,
    allow_delegation = False,
    llm = model
)


classify_email = Task(
    description = f"Classify the following email: '{email}'",
    agent = classifier,
    expected_output = "One of these three options: 'important', 'casual', or 'spam'",
)

respond_to_email = Task(
    description = f"Respond to the email: '{email}' based on the importance provided by the 'classifier' agent.",
    agent = responder,
    expected_output = "a very concise response to the email based on the importance provided by the 'classifier' agent.",
)

crew = Crew(
    agents = [classifier, responder],
    tasks = [classify_email, respond_to_email],
    verbose = 2,
    process = Process.sequential
)

output = crew.kickoff()
print(output)