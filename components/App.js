var GIPHY_API_URL = 'https://api.giphy.com',
    GIPHY_PUB_KEY = 'df7lhhcfGqqkzlnaBA6ZHAqUQLGJPBa6';

App = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });

        this.getGif(searchingText)
            .then( (gif) => {
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                });
            })
            .catch((error) => console.error(error));
    },

    getGif: function(searchingText) {
        return new Promise( (resolve, reject) => { 
            const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText).data;
                    var gif = {  // 5.
                		url: data.fixed_width_downsampled_url,
                		sourceUrl: data.url
            		};
                    resolve(gif);
                } 
            };
            xhr.send();
        });    
    },

    render: function(){

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Gif searcher</h1>
                <p>Find gif on <a href='http=://giphy'>giphy</a>. Press ENTER for start search more gifs.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif 
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>    
        )
    }
})