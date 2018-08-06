import * as React from 'react';
import { Query } from "../../../../node_modules/immutability-helper";
import update from 'immutability-helper';

export class AZComponent<P = {}, S = {}> extends React.Component<P, S> {
    
    constructor(props: Readonly<P>) {
        super(props);
    }

    updateState(query: Query<S>) {
        this.setState(update(this.state, query));
    }
}