import React, { useEffect, useState } from 'react'
import Tmdb from './Tmdb'
import './App.css'
import Header from './components/Header'
import FeatureMovie from './components/FeatureMovie'
import MovieRow from './components/MovieRow'

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadall = async () => {
      //pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list)
      
      //Pegando Filme em destaque
      let originals = list.filter(i=> i.slug === 'originals');
      let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randonChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
      // console.log(choosenInfo)
    }

    loadall()
  }, [])

  useEffect(() => {
    const scrollListiner = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListiner);

    return () => {
      window.addEventListener('scroll', scrollListiner);
    }
  },[])

  return (
    <div className="page">

    <Header black={blackHeader}/>

      {featureData &&
        <FeatureMovie item={featureData}/>
      }
      
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        Feito com <span role="img" aria-label="Coração">❤</span> para objetivo de estudo. <br />
        Direitos de imagem para Netflix <br />
        Dados pegos do site Themoviedb.org
      </footer>

          {movieList.length <= 0 && 

      <div className="loading">
          <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" />
      </div>
      }
    </div>
  );
}
/* Header
      Destaque
      As listas
      Footer */