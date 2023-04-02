/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StatusService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static statusControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/status',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static statusControllerFindOne(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/status/{id}',
            path: {
                'id': id,
            },
        });
    }

}
