---
layout: post
title: "logistic regression"
description: ""
category: development
tags: [machine learning]
date: 2014-07-17
---

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

## Given

We have training data set 

$$
\begin{aligned}
&(x^{(1)}, y^{(1)}) \\
&(x^{(2)}, y^{(2)}) \\
&(x^{(3)}, y^{(3)}) \\
&......\\
&(x^{(m)}, y^{(m)})
\end{aligned}
$$

Here the super script $(i)$ denoted as i-th traininng example.

We want to train a model with appropriate $w$ and $b$ so that the prediction $\hat{y}^{(i)} \approx y^{(i)}$


## Hypothesis

We define it as linear model
$$
z^{(i)} = w^Tx^{(i)} + b
$$

We use `sigmoid` function to converge in between 0 and 1
$$
sigmoid(z) = \frac{1}{1 + e^{-z}}
$$

```python
def sigmoid(z):
    """
    Compute the sigmoid of z
    Arguments:
    z -- A scalar or numpy array of any size.
    Return:
    s -- sigmoid(z)
    """

    ### START CODE HERE ### (≈ 1 line of code)
    s = 1 / (1 + np.exp(-1 * z))
    ### END CODE HERE ###
    return s
```

## Initialize parameter

Set both $w$ and $b$ to $0$
Note that `w.shape = [m, 1]`, where `m` is the number of training example. 
So `w` is a `m` by `1` matrix

```python
def initialize_with_zeros(dim):
    """
    This function creates a vector of zeros of shape (dim, 1) for w and initializes b to 0.
    
    Argument:
    dim -- size of the w vector we want (or number of parameters in this case)
    
    Returns:
    w -- initialized vector of shape (dim, 1)
    b -- initialized scalar (corresponds to the bias)
    """
    
    ### START CODE HERE ### (≈ 1 line of code)
    w = np.zeros([dim, 1])
    b = 0
    ### END CODE HERE ###

    assert(w.shape == (dim, 1))
    assert(isinstance(b, float) or isinstance(b, int))
    
    return w, b
```

## Predict Value

This is the predict value from current model
$$
\hat{y}^{(i)} = sigmoid(z^{(i)}) 
$$

Also here we note that
$$
\frac{\partial \hat{y}}{\partial z} = \hat{y} (1 - \hat{y})
$$

## Loss Function

Now we need to calculate the difference between actual and expected values, here we define the function to compute the different by using $\log$ in logistic regression, rather than `square difference`. This is because in `optimization phase`, the `square difference equation` will result into many local optimal problem.

$$
\mathcal{L}(\hat{y}^{(i)}, y^{(i)}) = \left\{
  \begin{array}{l l}
    -\log(\hat{y}^{(i)}) & \quad \text{if $y = 1$  } \\
    -\log(1-\hat{y}^{(i)})   &\quad \text{if $y = 0$ } \\
  \end{array} \right.
$$

The equation above can be simplified as below:

$$
\mathcal{L}(\hat{y}^{(i)}, y^{(i)}) = - (y^{(i)} \log  \hat{y}^{(i)} + (1 - y^{(i)}) \log (1 - \hat{y}^{(i)}))
$$


## Cost Function
Now we have the loss value for each training example, we want to sum them so that we have an overall estimation about how much it cost for this model

$$
J = \frac{1}{m} \sum^{m}_{i = 1} \mathcal{L}(\hat{y}^{(i)}, y^{(i)})
$$
By doing this we know the average loss of this model

## Propagation


```python
def propagate(w, b, X, Y):
    """
    Implement the cost function and its gradient for the propagation explained above

    Arguments:
    w -- weights, a numpy array of size (num_px * num_px * 3, 1)
    b -- bias, a scalar
    X -- data of size (num_px * num_px * 3, number of examples)
    Y -- true "label" vector (containing 0 if non-cat, 1 if cat) of size (1, number of examples)

    Return:
    cost -- negative log-likelihood cost for logistic regression
    dw -- gradient of the loss with respect to w, thus same shape as w
    db -- gradient of the loss with respect to b, thus same shape as b
    
    Tips:
    - Write your code step by step for the propagation. np.log(), np.dot()
    """
    
    m = X.shape[1]
    
    # FORWARD PROPAGATION (FROM X TO COST)
    ### START CODE HERE ### (≈ 2 lines of code)
    #w.shape = [num, 1] X.shape = [num, NOE]
    A = sigmoid(np.dot(w.T, X) + b).T        #A.shape = [NOE, 1]  # compute activation
    # Y.shape = [1, NOE]
    cost = (np.dot(Y, np.log(A)) + np.dot((1 - Y), np.log(1 - A))) / m * -1   # compute cost
    ### END CODE HERE ###
    
    # BACKWARD PROPAGATION (TO FIND GRAD)
    ### START CODE HERE ### (≈ 2 lines of code)
    dw = np.dot(X, (A.T - Y).T) / m
    db = np.dot(A.T - Y, np.ones([m])) / m
    ### END CODE HERE ###

    assert(dw.shape == w.shape)
    assert(db.dtype == float)
    cost = np.squeeze(cost)
    assert(cost.shape == ())
    
    grads = {"dw": dw,
             "db": db}
    
    return grads, cost
```

### Forward
We move forward by computing the loss function and cost function.

### Backward
In order to compute backward, we need to calculate the derivitive from loss function and moving backward. 
Here we add some mathematical explanation for the equation above:

$$
\begin{aligned}
d\hat{y} &= \frac{\partial \mathcal{L}(\hat{y}, y)}{\partial \hat{y}} \\
&= \frac{1-y}{1 - \hat{y}} -\frac{y}{\hat{y}}
\end{aligned}
$$

Here we use chain rule to calculate the $dz$

$$
\begin{aligned}
dz &= \frac{\partial \mathcal{L}(\hat{y}, y)}{\partial z} \\
&= \frac{\partial \mathcal{L}(\hat{y}, y)}{\partial \hat{y}}  \times  \frac{\partial \hat{y}}{\partial z} \\
&= (\frac{1-y}{1 - \hat{y}} -\frac{y}{\hat{y}}) \times [\hat{y} (1 - \hat{y})] \\
&= \hat{y} - y
\end{aligned}
$$

We do the same to calculate $dw$

$$
\begin{aligned}
dw_i &= \frac{\partial \mathcal{L}(\hat{y}, y)}{\partial w_i} \\
&= x_i \times  dz\\
\therefore dw &= \frac{1}{m} X(\hat{Y}-Y)^T
\end{aligned}
$$

Same technique applies to $db$ as well

$$
\begin{aligned}
db &= \frac{\partial \mathcal{L}(\hat{y}, y)}{\partial b} \\
&= dz \\
\therefore db &= \frac{1}{m} \sum^{m}_{i=1} (\hat{y}^{(i)} - y^{(i)})
\end{aligned}
$$


## Optimization

Here we apply the `learning rate` to $dw$ and $db$ so that they move toward the optimal value

```python
def optimize(w, b, X, Y, num_iterations, learning_rate, print_cost = False):
    """
    This function optimizes w and b by running a gradient descent algorithm
    
    Arguments:
    w -- weights, a numpy array of size (num_px * num_px * 3, 1)
    b -- bias, a scalar
    X -- data of shape (num_px * num_px * 3, number of examples)
    Y -- true "label" vector (containing 0 if non-cat, 1 if cat), of shape (1, number of examples)
    num_iterations -- number of iterations of the optimization loop
    learning_rate -- learning rate of the gradient descent update rule
    print_cost -- True to print the loss every 100 steps
    
    Returns:
    params -- dictionary containing the weights w and bias b
    grads -- dictionary containing the gradients of the weights and bias with respect to the cost function
    costs -- list of all the costs computed during the optimization, this will be used to plot the learning curve.
    
    Tips:
    You basically need to write down two steps and iterate through them:
        1) Calculate the cost and the gradient for the current parameters. Use propagate().
        2) Update the parameters using gradient descent rule for w and b.
    """
    
    costs = []
    
    for i in range(num_iterations):
        
        
        # Cost and gradient calculation (≈ 1-4 lines of code)
        ### START CODE HERE ### 
        grads, cost = propagate(w, b, X, Y)
        ### END CODE HERE ###
        
        # Retrieve derivatives from grads
        dw = grads["dw"]
        db = grads["db"]
        
        # update rule (≈ 2 lines of code)
        ### START CODE HERE ###
        w = w - learning_rate * dw
        b = b - learning_rate * db
        ### END CODE HERE ###
        
        # Record the costs
        if i % 100 == 0:
            costs.append(cost)
        
        # Print the cost every 100 training iterations
        if print_cost and i % 100 == 0:
            print ("Cost after iteration %i: %f" %(i, cost))
    
    params = {"w": w,
              "b": b}
    
    grads = {"dw": dw,
             "db": db}
    
    return params, grads, costs
```

## Predict 
Once we are comfortable with the trained model, now is to test the performance of this one with test data.

```python
def predict(w, b, X):
    '''
    Predict whether the label is 0 or 1 using learned logistic regression parameters (w, b)
    
    Arguments:
    w -- weights, a numpy array of size (num_px * num_px * 3, 1)
    b -- bias, a scalar
    X -- data of size (num_px * num_px * 3, number of examples)
    
    Returns:
    Y_prediction -- a numpy array (vector) containing all predictions (0/1) for the examples in X
    '''
    
    m = X.shape[1]
    Y_prediction = np.zeros((1,m))
    w = w.reshape(X.shape[0], 1)
    
    # Compute vector "A" predicting the probabilities of a cat being present in the picture
    ### START CODE HERE ### (≈ 1 line of code)
    A = sigmoid(np.dot(w.T, X) + b)  #A.shape = [NOE, 1]
    ### END CODE HERE ###

    for i in range(A.shape[1]):
        
        # Convert probabilities A[0,i] to actual predictions p[0,i]
        ### START CODE HERE ### (≈ 4 lines of code)
        Y_prediction[0][i] = 1 if A[0][i] > 0.5 else 0
        ### END CODE HERE ###
    
    assert(Y_prediction.shape == (1, m))
    
    return Y_prediction
```


## Together
Now let's have everything combine together.

```python
def model(X_train, Y_train, X_test, Y_test, num_iterations = 2000, learning_rate = 0.5, print_cost = False):
    """
    Builds the logistic regression model by calling the function you've implemented previously
    
    Arguments:
    X_train -- training set represented by a numpy array of shape (num_px * num_px * 3, m_train)
    Y_train -- training labels represented by a numpy array (vector) of shape (1, m_train)
    X_test -- test set represented by a numpy array of shape (num_px * num_px * 3, m_test)
    Y_test -- test labels represented by a numpy array (vector) of shape (1, m_test)
    num_iterations -- hyperparameter representing the number of iterations to optimize the parameters
    learning_rate -- hyperparameter representing the learning rate used in the update rule of optimize()
    print_cost -- Set to true to print the cost every 100 iterations
    
    Returns:
    d -- dictionary containing information about the model.
    """
    
    ### START CODE HERE ###
    
    # initialize parameters with zeros (≈ 1 line of code)
    w, b = initialize_with_zeros(X_train.shape[0])

    # Gradient descent (≈ 1 line of code)
    parameters, grads, costs = optimize(w, b, X_train, Y_train, num_iterations, learning_rate)
    
    # Retrieve parameters w and b from dictionary "parameters"
    w = parameters["w"]
    b = parameters["b"]
    
    # Predict test/train set examples (≈ 2 lines of code)
    Y_prediction_test = predict(w, b, X_test)
    Y_prediction_train = predict(w, b, X_train)

    ### END CODE HERE ###

    # Print train/test Errors
    print("train accuracy: {} %".format(100 - np.mean(np.abs(Y_prediction_train - Y_train)) * 100))
    print("test accuracy: {} %".format(100 - np.mean(np.abs(Y_prediction_test - Y_test)) * 100))

    
    d = {"costs": costs,
         "Y_prediction_test": Y_prediction_test, 
         "Y_prediction_train" : Y_prediction_train, 
         "w" : w, 
         "b" : b,
         "learning_rate" : learning_rate,
         "num_iterations": num_iterations}
    
    return d
```


##  Others

1. Conjugate gradient
2. BFGS
3. L-BFGS
