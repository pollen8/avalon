import * as React from 'react';
import { Component } from 'react';
// import validate from 'validation-promise';

interface IProps {

}

interface IData {
  [key: string]: string;
}
interface IState {
  data: IData;
}

interface Options {
  debug?: boolean;
}

export interface IInjectedProps {
  data: IData;
  setValue: (key: string, value: string) => void;
}

const Form = ({ debug = false }: Options = {}) =>
  <TOriginalProps extends {}>(
    WrappedComponent: (React.ComponentClass<TOriginalProps & IInjectedProps>
      | React.StatelessComponent<TOriginalProps & IInjectedProps>)
  ) => {
    return class extends Component<IProps, IState> {
      constructor(props: IProps) {
        super(props);
        this.state = {
          data: {}
        };
        this.setValue = this.setValue.bind(this);
      }

      public render() {
        return (
          <WrappedComponent setValue={this.setValue} data={this.state.data} />
        );
      }

      private setValue(key: string, value: string) {
        const data = this.state.data;
        data[key] = value;
        this.setState({ data });
      }

    };

  };

export default Form;
