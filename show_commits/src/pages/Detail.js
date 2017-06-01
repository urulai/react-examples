import React from 'react';
import ajax from 'superagent';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commits: [],
      forks: [],
      pulls: [],
      html: <p>Select an option</p>
    };
  }

  fetchData(what) {
    ajax.get(`https://api.github.com/repos/facebook/react/${what}`)
      .end((error, response) => {
        if (!error && response) {
          this.setState({
            [what]: response.body
          });
        } else {
          console.log("There was an error fetching from GitHub", error);
        }
      })
  }

  componentWillMount() {
  	 this.fetchData('commits');
     this.fetchData('forks');
     this.fetchData('pulls');
  }

  getHtml(what) {
    let htmlContent;

    if(what === 'commits') {
      htmlContent = <div><p className="header">Commits</p>
                 {
                  this.state.commits.map((commit, index) => (
                    <p key={index}>{ commit.commit.author.name } 
                      <a href={ commit.commit.url }>{ commit.sha }</a>
                      <span>{ commit.commit.message }</span>
                    </p>
                    ))
                 }
                </div>
    }
    else if(what === 'forks') {
      htmlContent = <div><p className="header">Forks</p>
                 {
                  this.state.forks.map((fork, index) => (
                    <p key={index}>{ fork.id } 
                      <a href={ fork.forks_url }>{ fork.forks_url }</a>
                    </p>
                    ))
                 }
                </div>
    }
    else if(what === 'pulls') {
      htmlContent = <div><p className="header">Pulls</p>
                 {
                  this.state.pulls.map((pull, index) => (
                    <p key={index}>{ pull.number } 
                      <a href={ pull.id }>{ pull.html_url }</a>
                      <span>{ pull.body }</span>
                    </p>
                    ))
                 }
                </div>
      }
    else {
      htmlContent = <div>
                      <p className="header">Error</p>
                      <span>Something went wrong!</span>
                </div>
      }
      
      return {
        html: htmlContent
      };
    }

  buttonClicked(action) {    
    this.setState( this.getHtml(action.toLowerCase()) );
    }

  render() {
  	return <div>
              <button onClick={() => this.buttonClicked('Commits')} id="Commits">Commits</button>
              <button onClick={() => this.buttonClicked('Forks')} id="Forks" className="sibling">Forks</button>
              <button onClick={() => this.buttonClicked('Pulls')} id="Pulls" className="sibling">Pulls</button>
              <div>{this.state.html}</div>
            </div>
  }
}

export default Detail;
