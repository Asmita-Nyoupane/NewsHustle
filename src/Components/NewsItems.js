import React from "react";

const NewsItems =(props)=> {
 
    let {title,description,imgUrl,newsUrl,author,date,source}=props
    return (
      <div className="my-3">
        <div className="card" style={{width: '18rem'}}>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%'}}>{source}
  </span>
          <img src={!imgUrl?"https://www.reuters.com/resizer/lsef-mTNIymeNBIczzILkkfN3Ss=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/PYYNPWE6GVKHLKQP4752F3SDVY.jpg":imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-body-secondary"> By {author} On { new Date(date).toUTCString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn  btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItems;
