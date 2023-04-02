/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CircuitsService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static circuitsControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/circuits',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static circuitsControllerFindOne(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/circuits/{id}',
            path: {
                'id': id,
            },
        });
    }

}
