import React from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import terminal from 'jquery.terminal';
import 'jquery.terminal/css/jquery.terminal.css';
import { postMoveWithToken, startNewRound } from '../utilities/fetchWithToken';


class GameConsole extends React.Component {
    componentDidMount() {
        const div = findDOMNode(this.refs.jterminal);
        const scrollable = document.getElementById('console');
        const gameId = this.props.gameId
        const userId = this.props.userId
        terminal(window, $);
        this.term = $(div).terminal([
            {
                start: function(){
                    startNewRound(gameId);
                    scrollable.scrollTop = scrollable.scrollHeight;
                },
                fold: function(){
                    postMoveWithToken({ command: 'fold' }, userId);
                    scrollable.scrollTop = scrollable.scrollHeight;
                },
                check: function() {
                    postMoveWithToken({ command: 'check' }, userId)
                    scrollable.scrollTop = scrollable.scrollHeight;
                },
                call: function() {
                    postMoveWithToken({ command: 'call' }, userId)
                    scrollable.scrollTop = scrollable.scrollHeight;
                },
                raise: function(x) {
                    postMoveWithToken({ command: 'raise', amount: x }, userId)
                    scrollable.scrollTop = scrollable.scrollHeight;
                },
                allin: function() {
                    postMoveWithToken({ command: 'allin' }, userId)
                    scrollable.scrollTop = scrollable.scrollHeight;
                },
                help: function() {
                    this.echo('\nAvailable Commands: [[;yellow;]\nfold] | fold your hand [[;yellow;]\ncheck] | pass betting action to next player [[;yellow;]\ncall] | match the current bet [[;yellow;]\nraise <amount>] | raise the current bet to <amount> [[;yellow;]\nallin] | raise the maximum amount of chips you have (or that other players can afford [[;yellow;]\nstart] | start new game (round must be over)\n')
                    scrollable.scrollTop = scrollable.scrollHeight;
                }
    
            },
        (cmd, t) => {
            t.echo("[[;red;black]Invalid Command: help for options]");
            scrollable.scrollTop = scrollable.scrollHeight;
        }
    ], {
            greetings: '[[gb;teal;black]Game Terminal]' + '[[gb;red;]\nhelp] for commands\n[[gb;yellow;]Enter your move in the console!]\n'
            
        })
        // if (this.props.playing) {this.props.status.forEach(s => this.term.echo(s))}
        this.props.status.forEach(s => this.term.echo(s))
    }

    shouldComponentUpdate(nextProps) {
        

        if (this.props.roundId !== nextProps.roundId) {
            this.term.clear();
            this.term.echo('[[gb;teal;black]Game Terminal]' + '[[gb;red;]\nhelp] for commands\n[[gb;yellow;]Enter your move in the console!]\n');
            nextProps.status.forEach(s => this.term.echo(s));
        } else if (nextProps.gameErrors) {
            this.term.echo(nextProps.gameErrors);
            this.props.clearGameErrors();
        } {
            const newStatusMessages = nextProps.status.slice(this.props.status.length)
            newStatusMessages.forEach(s => this.term.echo(s))
        }

        const div = document.getElementById('console');
        div.scrollTop = div.scrollHeight;

        return false;
    }



    render(){
        return (
            <div id="console">
                <div ref="jterminal" id="jterminal">
                </div> 
            </div>
        )
    }
}

export default GameConsole