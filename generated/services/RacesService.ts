/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RacesService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static racesControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/races',
        });
    }

    /**
     * @param year
     * @param round
     * @returns any
     * @throws ApiError
     */
    public static racesControllerFindOne(
        year: number,
        round: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/races/{year}/{round}',
            path: {
                'year': year,
                'round': round,
            },
        });
    }

}
