import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/navbar/Navbar';
import Alert from './components/alert/Alert';
import ProjectList from './components/Projects/ProjectList';
import AddProject from './components/addproject/AddProject';
import Project from './components/Projects/Project';

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <Navbar />
        <section style={{marginTop: '4rem'}}>
        <Alert />
          <Switch>
            <Route exact path='/ProjectTracker' component={ProjectList} />
            <Route exact path='/add-project' component={AddProject} />
            <Route exact path='/project/:id' component={Project} />
          </Switch>
        </section>
      </Fragment>
    </Provider>
  )
}

export default App;

