/**
 * @jsx React.DOM
 */
(function(){

    var Game = React.createClass({
        getInitialState: function() {
            return {
                //Initial state of the game board.
                tiles:  [
                '', '', '',
                '', '', '',
                '', '', ''
                ],
                //Noughts always have the first go.
                turn: 'o',
                //If the game is won,the winning player is set here.
                winner: 'n'
            };
        },

        checkBoard: function() {
            var t = this.state.tiles;
            var check = function(a,b,c) {
                return !!(a + b + c).match(/^(xxx|ooo)$/gi);
            };
            if (check(t[0], t[1], t[2])) return t[0];
            if (check(t[3], t[4], t[5])) return t[3];
            if (check(t[6], t[7], t[8])) return t[6];

            if (check(t[0], t[3], t[6])) return t[0];
            if (check(t[1], t[4], t[7])) return t[1];
            if (check(t[2], t[5], t[8])) return t[2];

            if (check(t[0], t[4], t[8])) return t[0];
            if (check(t[2], t[4], t[6])) return t[2];

            if (t.join('').length === 9) return 'd';
            return 'n';
        },

        tileClick: function(position, player) {
            var tiles = this.state.tiles;
            //If the selected position is already filled, return to prevent it being replaced.
            if ( (tiles[position] === 'x' || tiles[position] === 'o') || (this.state.winner !== 'n') ) return;
            tiles[position] = player;
            this.setState({tiles: tiles, turn: player === 'o' ? 'x' : 'o', winner: this.checkBoard()});

        },

        resetGame: function() {
            this.setState(this.getInitialState());
        },

        render: function() {
            return (
                <div>
                    <div id='game'>
                        { this.state.tiles.map(function(tile, pos){
                            return (
                                <Tile status={tile} key={pos} turn={this.state.turn} tileClick={this.tileClick} />
                            );
                        }, this) }
                    </div>
                    <Menu turn={this.state.turn} winner={this.state.winner} resetAction={this.resetGame} />
                </div>
            );
        }
    });

    var Tile = React.createClass({
        clickHandler: function() {
            this.props.tileClick(this.props.key, this.props.turn);
        },

        render: function() {
            return <div className={this.props.status === '' ? 'tile' : 'tile status-' + this.props.status} onClick={this.clickHandler}>{this.props.status}</div>;
        }
    });

    var Menu = React.createClass({
        render: function() {
            return <div id='menu'>
                <h3 className={this.props.winner === 'n' ? 'visible' : 'hidden'}>Player {this.props.turn}'s turn.</h3>
                <h3 className={(this.props.winner === 'n') || (this.props.winner === 'd') ? 'hidden' : 'visible'}>Player {this.props.winner} won!</h3>
                <h3 className={this.props.winner === 'd' ? 'visible' : 'hidden'}>Draw Game :(</h3>
                <button onClick={this.props.resetAction}>Reset Game</button>
            </div>;
        }
    });

    React.renderComponent(
        <Game />,
        document.getElementById('container')
    );

})();