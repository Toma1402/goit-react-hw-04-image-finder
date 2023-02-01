import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from 'services-api/fetchApi';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [image, setImage] = useState('');
  const [imageArr, setImageArr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleLoadMore = e => {
    setPage(page + 1);
  };
  const handleFormSubmit = imageName => {
    setImage(imageName);
    setPage(1);
    setLoading(true);
  };
  useEffect(() => {
    const fetchImagesByName = async () => {
      try {
        const resp = await fetchImages(image, page);
        if (!resp.total) {
          toast.warning('Sorry, we have not images named ' + image);
          setImageArr([]);
          setShowBtn(false);
          return;
        }

        setImageArr(prev => {
          return page === 1 ? [...resp.hits] : [...prev, ...resp.hits];
        });

        setTotal(resp.total);
        setShowBtn(true);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (image) {
      fetchImagesByName();
    }
  }, [image, page]);
  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />

      {error &&
        (() =>
          toast.error(
            "Sorry, didn't work. Try other name or repeat your request later!"
          ))}
      {loading && <Loader />}
      {imageArr && <ImageGallery imageArray={imageArr} />}
      {showBtn && <Button onLoadMore={handleLoadMore} />}
      <ToastContainer autoClose={3000} />
    </div>
  );
};
