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
                ]
            };
        },
        render: function() {
            return <div>
                <div id='game'>
                    { this.state.tiles.map(function(){
                        return (
                            <Tile />
                            );
                    }, this) }
                </div>
                <Menu />
            </div>;
        }
    });
    //The tile component (green)
    var Tile = React.createClass({
        render: function() {
            return <div className='tile'></div>;
        }
    });
    //The menu (blue)
    var Menu = React.createClass({
        render: function() {
            return <div id='menu'></div>;
        }
    });
    //The renderComponent method is called to render the Game component to the specified DOM element.
    React.renderComponent(
        <Game />,
        document.getElementById('container')
    );
})();