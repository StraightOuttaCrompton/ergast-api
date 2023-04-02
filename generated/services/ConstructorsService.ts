/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConstructorsService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static constructorsControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/constructors',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static constructorsControllerFindOne(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/constructors/{id}',
            path: {
                'id': id,
            },
        });
    }

}
