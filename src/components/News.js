import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loding from './Loding';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
// import { paste } from '@testing-library/user-event/dist/paste';
// import Navbar from './Navbar';


 

// moun

export default class News extends Component {

  static defaultProps={
    country:'in',
    pageSize:6,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

    constructor(){
        super();
        this.state={
            articles: [
 
              ],
            loading:true,
            page:1,
            totalReaults:0
        }
    }
    async updateNews(){
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d15f395bcce430abbe65aa1264b4802&page=1&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(url);
      let parseData = await data.json()
      this.setState({articles:parseData.articles ,totalResults:parseData.totalResults,loading:false})
    }

    async componentDidMount(){
          // super();
        this.updateNews();
        // console.log(this.state)
    }
    // constructor(){
    //   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d15f395bcce430abbe65aa1264b4802&page=1&pageSize=${this.props.pageSize}`
    //   this.setState({loading:true})
    //   let data = fetch(url);
    //   let parseData = data.json()
    //   this.setState({articles:parseData.articles ,totalResults:parseData.totalResults,loading:false})
    // }
  // handleOnClickPrevious= async()=>{
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country} &category=${this.props.category}&apiKey=1d15f395bcce430abbe65aa1264b4802&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parseData = await data.json()
    //  this.setState({
    //     page:this.state.page-1,
    //     articles:parseData.articles,
    //     loading:false
    //  })
    // this.setState({oage:this.state.page-1});
    // this.updateNews();
      // console.log("previous chal rha hai")
    // }
//  handleOnclickNext=async ()=>{
  // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d15f395bcce430abbe65aa1264b4802&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parseData = await data.json()
        // this.setState({
        //   page:this.state.page+1,
        //   articles:parseData.articles,
        //   loading:false
        // })
//         this.setState({page:this.state.page+1});
//         this.updateNews();
//  }

 fetchMoreData = async() => {
    // this.setState({page:this.state.page+1}) 
     

    
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1d15f395bcce430abbe65aa1264b4802&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      // this.setState({loading:true})
      let data = await fetch(url);
      let parseData = await data.json()
      // if(this.state.articles.lengthparseData.totalReaults){
      this.setState({articles:this.state.articles.concat(parseData.articles) ,page:this.state.page+1,totalResults:parseData.totalResults,loading:false})
       
      // }
      
    
}
    // let hedline = this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1);
// 

  render() {
    // console.log("total result chal rha hai")
    // console.log(this.state.totalResults
    // let hedline = this.props.category.charAt(0).toUpperCase() + this.props.categoryslice(1);
     
    return (
       
        // document.body.style={backgroundColor:"black"}
        // <>
      <div className="container my-5">
        <h2 className='text-center'>NewsMonkey - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>
        {this.state.loading && <Loding/>}
        {/* <Spinner/> */}
        {/* <h1>NewsMonkey - Top Headlines</h1> */}
        {/* {this.state.loading && <Loding/>} */}
        {/* div. */}
        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Loading/>}
        > */}
        <InfiniteScroll dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={(this.state.articles.length!==this.state.totalReaults)}
          loader={<Loding/>}> 
        <div className="row my-4 mx-3">

          {this.state.articles.map((e)=>{
            return  <div className='col-md-4 my-3' key ={e.url}>
                       <Newsitem title={(e.title==null || e.title.length<71)?e.title:e.title.slice(0,71)+'...'} description={(e.description==null || e.description.length<130)?e.description:e.description.slice(0,130)+'...'} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} data={e.publishedAt} source={e.source.name}/>
               </div>

          })}
          
           {/* <InfiniteScroll/> */}
        </div>
        </InfiniteScroll>
        {/* <div className='contianer d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleOnClickPrevious}>&larr; Previous</button>
        <button disabled={this.state.page+1>(Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleOnclickNext}>Next  &rarr;</button>

        </div> */}
            
      </div>
       
       
    )
  }
}
