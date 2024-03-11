/**
 * Interface for the response of the API
 * Para definir la estructura de la respuesta de la API
 * @interface ResponseApiDelivery
 * @param {boolean} success - If the request was successful
 * @param {string} message - Message of the response
 * @param {any} data - Data of the response
 * @param {any} error - Error of the response
 * @returns {void}
 */
export interface ResponseApiDelivery {
    success: boolean;
    message: string;
    data?: any;
    error?: any;
}