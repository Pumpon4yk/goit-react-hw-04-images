import { useEffect, useState } from 'react';
import { getImg } from '../api/apiImg';

import { Container } from './App.styled';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ButtonLoadMore from './Button';
import Loader from './Loader';
import Modal from './Modal';

export default function App() {
  const [imgList, setImgList] = useState([]);
  const [page, setPage] = useState(null);
  const [name, setName] = useState('');
  const [totalImg, setTotalImg] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    if(!page) return;

    setLoader(true);

    if (page === 1) {
      getImg(name, page).then(resp => {
        setImgList(resp.hits);
        setTotalImg(resp.totalHits);
        setLoader(false);

        setTimeout(() => {
          window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        }, 0);
      });
      return;
    }

    getImg(name, page).then(resp => {
      setImgList(prev => [...prev, ...resp.hits]);
      setLoader(false);

      setTimeout(() => {
        window.scrollBy({ top: window.innerHeight - 260, behavior: 'smooth' });
      }, 0);
    });
  }, [name, page]);


  const getName = nameSearch => {
    if(nameSearch === name) return;
    setName(nameSearch);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const onClickImg = (link, tag) => {
    setLargeImg(link);
    setTag(tag);
    setShowModal(prev => !prev);
  };

  return (
    <Container>
      <Searchbar getName={getName} />
      {page && <ImageGallery list={imgList} onClick={onClickImg} />}
      {loader ? (
        <Loader />
      ) : (
        page &&
        imgList.length !== totalImg && <ButtonLoadMore onClick={loadMore} />
      )}

      {showModal && (
        <Modal onShow={() => setShowModal(prev => !prev)}>
          <img src={largeImg} alt={tag} />
        </Modal>
      )}
    </Container>
  );
}