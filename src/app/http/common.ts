import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';


export class OptBuilder {
    private o: any;
    constructor() {
        this.o = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
            withCredentials: false, // Must be false for Google Cloud Storage
        };
    }
    public header(k: string, v: string): OptBuilder {
        this.o.headers = this.o.headers.set(k, v);
        return this;
    }
    public param(k: string, v: string): OptBuilder {
        this.o.params = this.o.params.set(k, v);
        return this;
    }
    public jsonResponseBody(): OptBuilder {
        this.o.responseType = 'json';
        return this;
    }
    public textResponseBody(): OptBuilder {
        this.o.responseType = 'text';
        return this;
    }
    public fullResponse(): OptBuilder {
        this.o.observe = 'response';
        return this;
    }
    public gen(): any {
        return this.o;
    }
}

export function responseAllowHTTPError<T>(allowedCodes: Array<number>, dflt: T): (r: HttpErrorResponse) => T {
    return (r: HttpErrorResponse): T => {
        if (allowedCodes.find(v => v === r.status)) {
            return dflt;
        }
        throw r;
    };
}