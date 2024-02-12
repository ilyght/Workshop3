from flask import Flask, jsonify, request
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import mean_squared_error
import numpy as np

iris = load_iris()
X = iris.data
y = iris.target

app = Flask(__name__)

x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)

modele_arbre = DecisionTreeClassifier()
modele_arbre.fit(x_train, y_train)

@app.route('/predict_tree', methods=['GET'])
def predict_tree():
    try:
        
        longueur_sepale = float(request.args.get('longueur_sepale'))
        largeur_sepale = float(request.args.get('largeur_sepale'))
        longueur_petale = float(request.args.get('longueur_petale'))
        largeur_petale = float(request.args.get('largeur_petale'))

        # Faire une prédiction en utilisant le modèle entraîné
        donnees_entree = np.array([[longueur_sepale, largeur_sepale, longueur_petale, largeur_petale]])
        prediction = modele_arbre.predict(donnees_entree)

        # Préparer la réponse
        reponse = {'prediction': int(prediction[0])}

        return jsonify(reponse)

    except Exception as e:
        return jsonify({'erreur': str(e)})

# Exécuter l'application Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081)
