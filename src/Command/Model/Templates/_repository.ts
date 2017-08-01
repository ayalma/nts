/**
 * Created by ali on 7/24/17.
 */
import {Singleton} from "typescript-ioc";
import {<%=capitalName%>} from "./<%=capitalName%>";
import {Get<%=capitalName%>Query} from "./Get<%=capitalName%>Query";
@Singleton
export class <%=capitalName%>Repository {
    constructor() {

    }

    public create(<%=name%>: <%=capitalName%>) {
        throw new Error('not implemented');
    }

    public update(<%=name%>: <%=capitalName%>) {
        throw new Error('not implemented');
    }

    public delete(<%=name%>: <%=capitalName%>) {
        throw new Error('not implemented');
    }

    public get(<%=name%>Query: Get<%=capitalName%>Query) {
        throw new Error('not implemented');
    }
}