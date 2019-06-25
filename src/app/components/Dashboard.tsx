import * as React from 'react';
import { ipcRenderer } from 'electron';


export class Dashboard extends React.Component<any, any> {
    public connection: any = null;

    constructor(props: any) {
        super(props);

        this.state = {
            dashText: "Hello"
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        ipcRenderer.on('get-data-response', (event: any, arg: string) => {
            console.log('[INFO] GET-DATA-RESPONSE received from MP.');
            console.log('[INFO] arg : ', arg);

            this.setState({
                dashText: arg
            });
        });
    }

    public handleClick(event: any) {
        event.preventDefault();
        ipcRenderer.send('get-data', this.state.dashText);
    }


    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Get Text</button>
                <div>Current Text : {this.state.dashText}</div>
            </div>
        )
    }
}