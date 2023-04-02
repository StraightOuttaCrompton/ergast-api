/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LapsService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static lapsControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/laps',
        });
    }

    /**
     * @param lapNumber
     * @returns any
     * @throws ApiError
     */
    public static lapsControllerFindOne(
        lapNumber: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/laps/{lapNumber}',
            path: {
                'lapNumber': lapNumber,
            },
        });
    }

}
