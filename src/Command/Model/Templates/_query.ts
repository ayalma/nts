/**
 * Created by ali on 7/30/17.
 */
export class Get<%=capitalName%>Query{

private _paging: Boolean;
private _pageSize: number;

    constructor() {
        this._paging = false;
        this._pageSize = 0;
    }

    get paging(): Boolean {
        return this._paging;
    }

    set paging(value: Boolean) {
        this._paging = value;
    }

    get pageSize(): number {
        return this._pageSize;
    }

    set pageSize(value: number) {
        this._pageSize = value;
    }


}