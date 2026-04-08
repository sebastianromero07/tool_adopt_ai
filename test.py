import requests
import json

# ==========================================
# CONFIGURACIÓN (Pon tu API Key de Google aquí)
# ==========================================
API_KEY = "AIzaSyB6EMHhL90HZeILadEytoXHn2FhwfvK2KA"
# Usamos Gemini 1.5 Flash porque es el modelo más rápido y gratuito para este tipo de tareas
MODEL = "gemini-2.5-flash" 

def test_google_ai():
    # La API Key de Google va directamente en la URL
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"
    
    headers = {
        "Content-Type": "application/json"
    }
    
    # La estructura de datos de Google es diferente a la de OpenAI/Groq
    data = {
        "contents": [{
            "parts": [{"text": "hola dame un poema ."}]
        }]
    }
    
    print(f"Probando conexión a Google AI Studio con el modelo: {MODEL}...")
    
    try:
        response = requests.post(url, headers=headers, json=data)
        
        # Si la respuesta es exitosa (HTTP 200)
        if response.status_code == 200:
            result = response.json()
            # La ruta para leer la respuesta también cambia en Google
            mensaje_ia = result['candidates'][0]['content']['parts'][0]['text']
            print("\n✅ ¡ÉXITO! La API funciona correctamente.")
            print(f"Respuesta de la IA: {mensaje_ia}")
        
        # Si la API rechaza la petición
        else:
            print(f"\n❌ ERROR {response.status_code}: La API rechazó la petición.")
            print(f"Detalle del error: {response.text}")
            
            if response.status_code == 400:
                print("-> Causa probable: La estructura del JSON es incorrecta o tu API Key es inválida.")
            elif response.status_code == 403:
                print("-> Causa probable: No tienes permisos o la API Key no tiene acceso a este modelo.")
            elif response.status_code == 404:
                print("-> Causa probable: El modelo especificado no existe.")
                
    except Exception as e:
        print(f"\n⚠️ Error de conexión a red: {e}")

if __name__ == "__main__":
    test_google_ai()