# Class

## `TensorScriptModelInterface`

Base class for tensorscript models

### `constructor(options: Object, customTF: Object)`

### `settings: *`

### `tf: *`

### `getInputShape: *`

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

### `predict(x_matrix: Array<Array<number>>|Array<number>): Promise`

Returns prediction values from tensorflow model

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| x_matrix | Array<Array<number>>|Array<number> |  | new test independent variables |

# Function