/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SeasonsService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static seasonsControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/seasons',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static seasonsControllerFindOne(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/seasons/{id}',
            path: {
                'id': id,
            },
        });
    }

}
