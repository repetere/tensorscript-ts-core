# Class

## `TensorScriptModelInterface`

base class for tensorscript models

### `constructor()`

### `settings: *`

### `getInputShape(matrix: Array<number>): Array<number>`

returns the shape of an input matrix

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| matrix | Array<number> |  | input matrix |

### `train(x_matrix: *, y_matrix: *): Object`

asynchronously trains tensorflow model, must be implemented by tensorscript class

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| x_matrix | * |  | independent variables |
| y_matrix | * |  | dependent variables |

### `predict(matrix: *): Promise`

predicts new dependent variables

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| matrix | * |  | new test independent variables |

### `calculate(x_matrix: *): Promise`

returns prediction values from tensorflow model

| Name | Type | Attribute | Description |
| --- | --- | --- | --- |
| x_matrix | * |  |

# Function