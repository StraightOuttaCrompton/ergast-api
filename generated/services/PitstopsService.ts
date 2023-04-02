/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PitstopsService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static pitstopsControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pitstops',
        });
    }

    /**
     * @param pitstopNumber
     * @returns any
     * @throws ApiError
     */
    public static pitstopsControllerFindOne(
        pitstopNumber: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pitstops/{pitstopNumber}',
            path: {
                'pitstopNumber': pitstopNumber,
            },
        });
    }

}
