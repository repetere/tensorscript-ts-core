import tf from '@tensorflow/tfjs';

/**
 * base class for tensorscript models
 * @interface TensorScriptModelInterface
 * @property {Object} settings - tensorflow model hyperparameters
 * @property {Object} model - tensorflow model
 * @property {Object} tf - tensorflow / tensorflow-node / tensorflow-node-gpu
 */
export class TensorScriptModelInterface {
  constructor(options = {}, customTF = {}) {
    this.settings = options;
    this.tf = customTF || tf;
    this.model; //tf
    return this;
  }
  /**
   * returns the shape of an input matrix
   * @example 
   * const input = [
   *   [ 0, 1, ],
   *   [ 1, 0, ],
   * ];
   * TensorScriptModelInterface.getInputShape(input) // => [2,2]
   * @param {Array<number>} matrix - input matrix 
   * @return {Array<number>} returns the shape of a matrix (e.g. [2,2])
   */
  static getInputShape(matrix=[]) {
    if (Array.isArray(matrix) === false || !matrix[ 0 ] || !matrix[ 0 ].length || Array.isArray(matrix[ 0 ]) === false) throw new TypeError('input must be a matrix');
    const x_dimensions = matrix[ 0 ].length;
    matrix.forEach(vector => {
      if (vector.length !== x_dimensions) throw new SyntaxError('input must have the same length in each row');
    });
    return [
      matrix.length, x_dimensions,
    ];
  }
  /**
   * asynchronously trains tensorflow model, must be implemented by tensorscript class
   * @param x_matrix - independent variables
   * @param y_matrix - dependent variables
   * @return {Object} returns trained tensorflow model 
   */
  train(x_matrix, y_matrix) {
    throw new ReferenceError('train method is not implemented');
  }
  /**
   * predicts new dependent variables
   * @param matrix - new test independent variables
   * @return {Promise} returns tensorflow prediction 
   */
  predict(matrix) {
    throw new ReferenceError('predict method is not implemented');
  }
  /**
   * returns prediction values from tensorflow model
   * @param x_matrix 
   * @return {Promise}
   */
  async calculate(x_matrix) {
    return this.predict(x_matrix).data();
  }
}