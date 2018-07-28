# Class

## `TensorScriptModelInterface`

Base class for tensorscript models

### `constructor(options: Object, customTF: Object, properties: {model:Object,tf:Object,})`

### `settings: *`

### `model: *`

### `tf: *`

### `reshape: *`

### `getInputShape: *`

### `reshape(array: Array<number>, shape: Array<number>): Array<Array<number>>`

Reshapes an array

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| array | Array<number> |  | input array |
| shape | Array<number> |  | shape array |

### `getInputShape(matrix: Array<Array<number>>): Array<number>`

Returns the shape of an input matrix

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| matrix | Array<Array<number>> |  | input matrix |

### `train(x_matrix: Array<Array<number>>, y_matrix: Array<Array<number>>): Object`

Asynchronously trains tensorflow model, must be implemented by tensorscript class

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| x_matrix | Array<Array<number>> |  | independent variables |
| y_matrix | Array<Array<number>> |  | dependent variables |

### `calculate(matrix: Array<Array<number>>|Array<number>): {data: Promise}`

Predicts new dependent variables

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| matrix | Array<Array<number>>|Array<number> |  | new test independent variables |

### `loadModel(options: Object): Object`

Loads a saved tensoflow / keras model

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| options | Object |  | tensorflow load model options |

### `predict(x_matrix: Array<Array<number>>|Array<number>, options.json: Boolean, options.json: Boolean): Array<number>|Array<Array<number>>`

Returns prediction values from tensorflow model

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| x_matrix | Array<Array<number>>|Array<number> |  | new test independent variables |
| options.json | Boolean | optional: true, default: true | return object instead of typed array |
| options.json | Boolean | optional: true, default: true | return real values instead of integers |

# Function