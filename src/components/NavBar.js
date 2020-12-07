import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore } from '../firebase';
import CartWidget from './CartWidget';

function NavBar() {
    useEffect(() => {
        const db = getFirestore();
        const categoryCollection = db.collection("category");
        // const filterCollection = itemCollection.where("title", "==", "Prod 1")
        //                                         .where("categoryId", "==", "asdasdasd");
        // filterCollection.get().then((querySnapshot) => {
        categoryCollection.get().then((querySnapshot) => {
          if(querySnapshot.size === 0) {
            console.log('No hay resultados');
          }
          setCategories(
            querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          )
        });
      }, []);
      const [categories, setCategories] = useState([]);
      
      function getCategories() {
        return categories.map((category) => <Link key={ category.id } className="dropdown-item" to={ '/category/' + category.key }>{category.titulo}</Link>);
      }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">Ecommerce - ReactJS</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Categorias
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            { getCategories() }
                        </div>
                    </li>
                </ul>
                <CartWidget />
            </div>
        </nav>
    );
  }

export default NavBar;