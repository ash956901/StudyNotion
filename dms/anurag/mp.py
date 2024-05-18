import speech_recognition as sr
import pyttsx3

def listen():
    # Initialize recognizer
    recognizer = sr.Recognizer()
    
    with sr.Microphone() as source:
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
    
    try:
        print("Recognizing...")
        query = recognizer.recognize_google(audio, language="en-in")
        print(f"User said: {query}\n")
        return query.lower()
    except Exception as e:
        print(e)
        return ""

def speak(text):
    # Initialize the text-to-speech engine
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

def assistant():
    speak("Hello! I am your voice assistant. How can I help you today?")

    while True:
        query = listen()

        if "hello" in query:
            speak("Hello! How are you?")
        elif ("who is your best friend") in query:
            speak("Siri is my bestfriend")
        elif ("I am fine") in query:
            speak("Very well, Nice to hear you are doing fine")
        elif ("what is your name") in query:
            speak("My name is Aku.")
        elif ("good bye") in query:
            speak("Goodbye! Have a great day.")
            break
        else:
            speak("Sorry, I didn't understand. Can you repeat?")

if __name__ == "__main__":
    assistant()
