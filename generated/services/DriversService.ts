/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DriversService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static driversControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/drivers',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static driversControllerFindOne(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/drivers/{id}',
            path: {
                'id': id,
            },
        });
    }

}
