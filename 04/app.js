/**
 * @jsx React.DOM
 */
(function(){
    //The game container (red)
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
                turn: 'o'
            };
        },
        //Tile click method to modify the state of the tiles array
        tileClick: function(position, player) {
            var tiles = this.state.tiles;
            //If the selected position is already filled, return to prevent it being replaced.
            if ( (tiles[position] === 'x' || tiles[position] === 'o') ) return;
            tiles[position] = player;
            this.setState({tiles: tiles, turn: player === 'o' ? 'x' : 'o'});

        },
        render: function() {
            return <div>
                <div id='game'>
                    { this.state.tiles.map(function(tile,position){
                        return (
                            <Tile status={tile} key={position} turn={this.state.turn} tileClick={this.tileClick} />
                            );
                    }, this) }
                </div>
                <Menu turn={this.state.turn} />
            </div>;
        }
    });
    //The tile component (green)
    var Tile = React.createClass({
        //The method to handle when a user clicks on the tile, calls the tileClick method on the parent component that is referenced in the props object.
        clickHandler: function() {
            this.props.tileClick(this.props.key, this.props.turn);
        },

        render: function() {
            return <div className={this.props.status === '' ? 'tile' : 'tile status-' + this.props.status} onClick={this.clickHandler}>{this.props.status}</div>;
        }
    });
    //The menu (blue)
    var Menu = React.createClass({
        render: function() {
            return <div id='menu'>
                <h3>Player {this.props.turn}'s turn.</h3>
            </div>;
        }
    });
    //The renderComponent method is called to render the Game component to the specified DOM element.
    React.renderComponent(
        <Game />,
        document.getElementById('container')
    );
})();