import requests
r = requests.get("http://localhost:5000/api/words?grade=1")
print(r.json())
