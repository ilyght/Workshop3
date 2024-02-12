from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.metrics import mean_squared_error
import pandas as pd

iris = load_iris()
X=iris.data
Y = iris.target

x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=1)

model = DecisionTreeClassifier()

model.fit(x_train, y_train)

y_pred = model.predict(x_test)

accuracy = model.score(x_test, y_test)

print(f"Précision du modèle : {accuracy:.2f}")

mse_tree=mean_squared_error(y_test,y_pred)
print(mse_tree)