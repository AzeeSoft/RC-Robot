import * as React from 'react';
import { Query } from "immutability-helper";
import update from 'immutability-helper';

export class AZComponent<P = {}, S = {}> extends React.Component<P, S> {

    constructor(props: Readonly<P>) {
        super(props);
    }

    updateState(query: Query<S>, callback: () => void = () => {}) {
        this.setState((prevState, props) => {
            return update(prevState, query);
        }, callback);
    }
}