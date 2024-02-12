import requests
import numpy as np

models_addresses = [
    "https://eb60-77-136-66-197.ngrok-free.app/predict?sepal_length=1&sepal_width=2&petal_length=1&petal_width=2",
    "https://eb60-77-136-66-197.ngrok-free.app/predict_tree?sepal_length=1&sepal_width=2&petal_length=1&petal_width=2"  #FAIRE TOURNER NGROK SUR UN AUTRE ORDINATEUR 
]

# fonction pour faire une prédiction de consensus
def consensus_prediction(models_addresses, features):
    predictions = []
    for model_address in models_addresses:
        try:
            # Faire une requête à chaque modèle pour obtenir une prédiction
            response = requests.get(model_address, params=features)
            prediction = response.json()['prediction']
            predictions.append(prediction)
        except Exception as e:
            print(f"Erreur lors de la requête au modèle à l'adresse {model_address}: {e}")

    # Calculer la prédiction de consensus en prenant la moyenne des prédictions de tous les modèles
    consensus_prediction = np.mean(predictions)
    return consensus_prediction

# Exemple d'utilisation de la fonction pour faire une prédiction de consensus
#features = {'longueur_sepale': 5.1, 'largeur_sepale': 3.5, 'longueur_petale': 1.4, 'largeur_petale': 0.2}
#prediction = consensus_prediction(models_addresses, features)
#print(f"Prédiction de consensus: {prediction}")
