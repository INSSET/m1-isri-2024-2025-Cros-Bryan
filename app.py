from flask import Flask, request, render_template

app = Flask(__name__)


@app.route('/')
def form():
    return render_template('form.html')


@app.route('/submit', methods=['POST'])
def submit_form():
    nom = request.form.get('nom')
    prenom = request.form.get('prenom')

    with open('../data.txt', 'a') as file:
        file.write(f"Nom: {nom}, Prenom: {prenom}\n")

    return "Données reçues et enregistrées !"


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3000)
