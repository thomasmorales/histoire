import http.server
import socketserver
import threading
import webbrowser
import time

# Définir le répertoire où les fichiers HTML sont stockés
PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler


# def open_browser():
#     time.sleep(1)
#     webbrowser.open("http://localhost:8000/src/histoire.html")


# mon_thread = threading.Thread(target=open_browser)
# mon_thread.start()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serveur démarré sur le port {PORT}")
    httpd.serve_forever()
