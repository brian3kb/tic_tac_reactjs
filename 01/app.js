/**
 * @jsx React.DOM
 */
(function(){
    //The game container (red)
    var Game = React.createClass({
        render: function() {
            return <div>
                <div id='game'>
                    //game tiles will go here
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