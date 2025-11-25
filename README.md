# ML & DL Lab

A comprehensive repository containing **Machine Learning (ML) and Deep Learning (DL)** lab programs, assignments, and projects. Includes Python scripts, Jupyter notebooks, dataset utilities, evaluation metrics (Confusion Matrix, Classification Report), and visualization techniques like **Grad-CAM**.

---

## Repository Highlights

✔ Hands-on ML & DL experiments
✔ CNN, ANN, Classification & Regression models
✔ Preprocessing & data pipeline
✔ Evaluation metrics & result visualization
✔ Grad-CAM heatmap for model interpretability
✔ Contains both **basic and advanced lab work**

---

## Technologies Used

| Category             | Tools                                    |
| -------------------- | ---------------------------------------- |
| Languages            | Python (3.x)                             |
| ML Libraries         | Scikit-Learn, NumPy, Pandas              |
| DL Frameworks        | TensorFlow / Keras, PyTorch *(optional)* |
| Visualization        | Matplotlib, Seaborn, Grad-CAM            |
| Notebook Environment | Jupyter / Google Colab                   |

---

## Folder Structure

```
ml-dl-lab/
│── 📁 datasets/           # Sample datasets or links
│── 📁 notebooks/          # `.ipynb` projects and lab files
│   └── modified_assignment.ipynb
│── 📁 models/             # Saved ML/DL models
│── 📁 scripts/            # Python `.py` files
│── 📁 results/            # Evaluation reports & images
│── README.md
│── requirements.txt       # Package dependencies
```
---

## Example Features Implemented

* CNN Architecture for classification
* Model training & validation
* Confusion Matrix, Accuracy, Precision, Recall
* Classification Report
* Grad-CAM based heatmap visualization

---

## Installation & Setup

```bash
git clone https://github.com/your-username/ml-dl-lab.git
cd ml-dl-lab
pip install -r requirements.txt
```

If using **Google Colab**, upload repo and run `.ipynb` files.

---

## Requirements File Example

```
tensorflow
keras
numpy
pandas
matplotlib
scikit-learn
seaborn
opencv-python
```

---

## Sample Code (SNIPPET – CNN Model)

```python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense

model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(224,224,3)),
    MaxPooling2D(2,2),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(1, activation='sigmoid')  # Change units for multi-class
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.summary()
```

---

## Goals of This Repository

Implement ML & DL algorithms
Learn AI model lifecycle from training to evaluation
Use visual interpretation (Grad-CAM)
Prepare lab assignments and academic ML/DL projects

---

## Author

**Vishal Baraiya**
B.Tech CSE (3rd Year)
Passionate ML/DL & Full-Stack Developer
GitHub: *[https://github.com/mr-baraiya](https://github.com/mr-baraiya)*
LinkedIn: *[https://linkedin.com/in/baraiya-vishalbhai](https://linkedin.com/in/baraiya-vishalbhai)*

---

## Contribute & Feedback

Feel free to:

* Fork this repo and contribute
* Use it as reference for ML/DL coursework
* Raise issues or request more projects

---

## Final Note

> *“Learning AI through experiments is the best way to master it. This repository captures that journey.”* 
