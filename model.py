import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib

df = pd.read_csv('data.csv')

print(df.head(), "\n")
print(f"Initial dataset shape: {df.shape}\n")  


# added
#Q1 = df['price'].quantile(0.15)
Q1 = df['price'].quantile(0.25)
Q3 = df['price'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR


df = df[(df['price'] >= lower_bound) & (df['price'] <= upper_bound)]

print(f"Dataset shape after removing outliers in price: {df.shape}\n")

# removed non numerical values for features
feature_columns = [
    'bedrooms',
    'bathrooms',
    'sqft_living',
    'sqft_lot',
    'floors',
    'waterfront',
    'view',
    'condition',
    'sqft_above',
    'sqft_basement',
    'yr_built',
    'yr_renovated'
]

X = df[feature_columns]
y = df['price']


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,      # 20%  80% 
    random_state=42     
)


param_grid = {
    'n_estimators': [100, 200],  
    'max_depth': [None, 5, 10],  
}

rf = RandomForestRegressor(random_state=42)
grid_search = GridSearchCV(
    estimator=rf,
    param_grid=param_grid,
    scoring='neg_mean_squared_error',  
    cv=3,                              # 
    n_jobs=-1                          
)

grid_search.fit(X_train, y_train)


best_model = grid_search.best_estimator_
print("Best Hyperparameters:", grid_search.best_params_, "\n")

y_pred = best_model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"Mean Squared Error: {mse:.2f}")
print(f"R-Squared Score: {r2:.2f}\n")


new_house = {
    'bedrooms': [4.0],
    'bathrooms': [2.5],
    'sqft_living': [2000],
    'sqft_lot': [8000],
    'floors': [1.0],
    'waterfront': [0],
    'view': [0],
    'condition': [3],
    'sqft_above': [2000],
    'sqft_basement': [0],
    'yr_built': [1990],
    'yr_renovated': [0]
}
new_house_df = pd.DataFrame(new_house)
predicted_price = best_model.predict(new_house_df)
print(f"Predicted price for the new house: ${predicted_price[0]:.2f}")


plt.figure(figsize=(7, 5))
plt.scatter(y_test, y_pred, alpha=0.6, color='blue')
plt.xlabel("Actual Prices")
plt.ylabel("Predicted Prices")
plt.title("Predicted vs. Actual House Prices (Outliers Removed)")


min_price = min(y_test.min(), y_pred.min())
max_price = max(y_test.max(), y_pred.max())
plt.plot([min_price, max_price], [min_price, max_price], color='red', linestyle='--')

plt.show()


joblib.dump(best_model, 'best_model.pkl')
