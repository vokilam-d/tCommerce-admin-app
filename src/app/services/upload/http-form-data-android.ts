//@ts-nocheck
import { Observable } from '@nativescript/core';
import {
  TNSHttpFormDataParam,
  TNSHttpFormDataRequestOptions,
  TNSHttpFormDataResponse
} from 'nativescript-http-formdata';

declare const okhttp3: any;

export class TNSHttpFormDataAndroid extends Observable {
  constructor() {
    super();
  }

  post(url: string, params: Array<TNSHttpFormDataParam>, options?: TNSHttpFormDataRequestOptions)
    : Promise<TNSHttpFormDataResponse> {
    return new Promise((resolve, reject) => {
      try {
        let client = new okhttp3.OkHttpClient();
        let builder = new okhttp3.MultipartBody.Builder();

        // builder.setType(okhttp3.MultipartBody.FORM);
        const FORM_MEDIA_TYPE = okhttp3.MediaType.parse('multipart/form-data');
        builder.setType(FORM_MEDIA_TYPE);

        for (let param of params) {
          if (param.fileName && param.contentType) {
            const MEDIA_TYPE = okhttp3.MediaType.parse(param.contentType);
            builder.addFormDataPart(param.parameterName, param.fileName, okhttp3.RequestBody.create(MEDIA_TYPE, param.data));
          } else {
            builder.addFormDataPart(param.parameterName, param.data);
          }
        }
        let requestBody = builder.build();
        let reqWithURL = new okhttp3.Request.Builder()
          .url(url);

        if (options && options.headers) {
          for (let k in options.headers) {
            reqWithURL.addHeader(k, options.headers[k]);
          }
        }
        const request = reqWithURL
          .post(requestBody)
          .build();
        let callback = new okhttp3.Callback({
          // all server errors will arrive here
          onResponse: (call, response) => {
            let body;
            try {
              body = response.body().string();
              if (body) {
                body = JSON.parse(body);
              } else {
                body = {
                  statusCode: 500,
                  message: 'NO_BODY'
                };
              }
            } catch (e) {
              body = response.body().string();
            }

            if (typeof body.statusCode === 'number' && body.statusCode >= 300) {
              reject(body);
            } else {
              resolve(body);
            }
          },
          // incase of timeout etc, this will be called
          onFailure: (call, response) => {
            reject(response);
          }
        });

        client.newCall(request).enqueue(callback);
      } catch (e) {
        reject(e);
      }
    });
  }
}
