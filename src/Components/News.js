import React, { useState,useEffect} from "react";
import NewsItems from "./NewsItems";
import Spineer from "./Spineer";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
   const[articles,setArticles]=useState([]);
   const[loading,setLoading]=useState(true);
   const[page,setPage]=useState(2);
   const[totalResults,setTotalResult]=useState(0);

    const capitalizedText=(string)=>{
    return(string.charAt(0).toUpperCase()+string.slice(1));
  } 

  const updateNews=async()=> {
    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parasedData = await data.json();
    props.setProgress(70);
    console.log(parasedData);
    setArticles(parasedData.articles);
    setTotalResult(parasedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
 
  useEffect(()=>{
    document.title=`${capitalizedText(props.category)} - NewsHustle`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const fetchMoreData = async() => {
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1);
      let data = await fetch(url);
      let parasedData = await data.json();
      console.log(parasedData);
      setArticles(articles.concat(parasedData.articles));
      setTotalResult(parasedData.totalResults); 
  };
    return (
      <>
        <h1 className="text-center" style={{ margin: "30px" ,marginTop: "60px"}}>
          News Hustle - Top {capitalizedText(props.category)} Headlines
        </h1>
          {loading && <Spineer />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spineer />}
        >
          <div className="container">
        <div className="row">
          {articles?.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        
      </>
    )
  }


News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general", 
}
News.propsType = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News
