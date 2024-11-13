from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
import json
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
# Create your views here.
bot=ChatBot('Example')
trainer = ChatterBotCorpusTrainer(bot)
trainer.train("chatterbot.corpus.english")
def index(request):
    return HttpResponse("Hello")
def article(request,article_id):
    return render(request,'blog/index.html',{'article_id':article_id})
def botResponse(request):
    if request.method == "POST":
        data = json.loads(request.body)  # Parse the JSON request body
        user_message = data.get("message")
        print(user_message)
        response = bot.get_response(user_message)
        print(response)
        # Process the message (e.g., you can respond with a mock or perform some logic here)
        #bot_response = f"You said: {user_message}"  # Replace with actual logic or response
        
        return JsonResponse({"response": str(response)})

    return JsonResponse({"error": "Invalid request"}, status=400)
