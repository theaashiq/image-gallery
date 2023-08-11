import React,{useState, useEffect}from 'react';
import ImageCard from './components/imagecard';
import ImageSearch from './components/ImageSearch';

const App = () => {
  const [images, setImages] = useState([])//to select the image
  const [isLoading, setIsLoading] = useState(true)//to load the image 
  const [term, setTerm] = useState('') // for search the term 

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
       .then(res => res.json())
       .then(data => {
        setImages(data.hits)
        setIsLoading(false)
       })
       .catch(err => console.log(err))     
  },[term])


  return (
      <div className="container mx-auto">

        <ImageSearch searchText={(text) => setTerm(text)}/>
        {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-1">No Images Founded</h1>}
        {isLoading ? <h1 className="text-6xl text-center mx-auto mt-1">Loading..</h1> : <div className="grid grid-cols-3 gap-4">
          {images.map(image => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>}
      </div>
           
    //  <ImageCard />
  )
}

export default App
