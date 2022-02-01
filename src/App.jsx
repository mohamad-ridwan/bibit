import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import NotFound from './components/notfound/NotFound';
import Category from './pages/category/Category';
import DetailBlog from './pages/detailblog/DetailBlog';
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import IndexContext from './services/context';

function App() {

  return (
    <div className="App">
      <IndexContext>
        <Router>
          <Navbar />

          <Switch>
            <Route exact path='/search' component={Search} />

            <Route exact path='/category/:id' component={Category} />

            <Route path='/blog/:id' component={DetailBlog} />

            <Route exact path='/' component={Home}/>

            <Route component={NotFound}/>
          </Switch>
        </Router>
      </IndexContext>
    </div>
  );
}

export default App;
