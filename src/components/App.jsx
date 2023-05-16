import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useScrollTo } from 'react-use-window-scroll';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import * as API from '../services/api';
import css from '../components/Api.module.css';
import { useEffect } from 'react';

export default function App() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  const onCloseModal = () => {
    setShowModal(false);
  };

  const handleCardClick = (largeImageURL, tags) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setAlt(tags);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const searchQuery = e.target.serchQuery.value.trim();
    console.log(searchQuery);

    if (searchQuery === '') {
      toast.info('Please, fill in the field', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    setIsLoading(false);

    try {
      const cards = await API.fetchCards(searchQuery);

      if (cards.hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query. Please try again.',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          }
        );
        return;
      }
      const totalPages = Math.ceil(cards.totalHits / 12);
      if (totalPages - 1 <= setPage(page)) {
        toast.info(
          "We're sorry, but you've reached the end of search results.",
          {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        );
      }
      toast.success(`Hooray! We found ${cards.totalHits} images.`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      setCards(cards.hits);
      setIsLoading(false);
      setPage(1);
      setSearchQuery(searchQuery);
      setTotalImages(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const onLoadMore = async e => {
    setIsLoading(true);

    try {
      const dataCards = await API.fetchCards(searchQuery, page + 1);
      console.log(cards);
      setCards([...cards, ...dataCards.hits]);
      setPage(page + 1);
      setIsLoading(false);

      if (totalImages - 1 <= page) {
        toast.info(
          "We're sorry, but you've reached the end of search results.",
          {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const hideBtn = page === totalImages;

  return (
    <div className={css.API}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery cards={cards} onClick={handleCardClick} />
      <ToastContainer />
      {cards.length > 0 && !hideBtn && <Button onClick={onLoadMore} />}
      {isLoading && <Loader />}
      {showModal && (
        <Modal alt={alt} largeImageURL={largeImageURL} onClose={onCloseModal} />
      )}
    </div>
  );
}

// class App extends Component {
//   state = {
//     cards: [],
//     isLoading: false,
//     page: 1,
//     searchQuery: '',
//     totalImages: 0,
//     showModal: false,
//     largeImageURL: '',
//     alt: '',
//   };

//   handleSubmit = async e => {
//     e.preventDefault();

//     const searchQuery = e.target.serchQuery.value.trim();

//     if (searchQuery === '') {
//       toast.info('Please, fill in the field', {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'colored',
//       });
//       return;
//     }

//     this.setState({
//       isLoading: true,
//     });

//     try {
//       const cards = await API.fetchCards(searchQuery);

//       if (cards.hits.length === 0) {
//         toast.error(
//           'Sorry, there are no images matching your search query. Please try again.',
//           {
//             position: 'top-right',
//             autoClose: 5000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: 'colored',
//           }
//         );
//         return;
//       }
//       const totalPages = Math.ceil(cards.totalHits / 12);
//       if (totalPages - 1 <= this.state.page) {
//         toast.info(
//           "We're sorry, but you've reached the end of search results.",
//           {
//             position: 'bottom-center',
//             autoClose: 5000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: 'light',
//           }
//         );
//       }
//       toast.success(`Hooray! We found ${cards.totalHits} images.`, {
//         position: 'top-right',
//         autoClose: 5000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'colored',
//       });

//       this.setState({
//         cards: cards.hits,
//         isLoading: false,
//         page: 1,
//         searchQuery: searchQuery,
//         totalImages: totalPages,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   onLoadMore = async e => {
//     this.setState({ isLoading: true });

//     try {
//       const cards = await API.fetchCards(
//         this.state.searchQuery,
//         this.state.page + 1
//       );

//       this.setState(prevState => ({
//         cards: [...prevState.cards, ...cards.hits],
//         page: this.state.page + 1,
//         isLoading: false,
//       }));

//       if (this.state.totalImages - 1 <= this.state.page) {
//         toast.info(
//           "We're sorry, but you've reached the end of search results.",
//           {
//             position: 'bottom-center',
//             autoClose: 5000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: 'light',
//           }
//         );
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

// !  onCloseModal = () => {
//     this.setState({ showModal: false });
//   };

// !  handleCardClick = (largeImageURL, tags) => {
//     this.setState({
//       showModal: true,
//       largeImageURL: largeImageURL,
//       alt: tags,
//     });
//   };

//   render() {
//     const {
//       page,
//       totalImages,
//       isLoading,
//       cards,
//       showModal,
//       alt,
//       largeImageURL,
//     } = this.state;

//     const hideBtn = page === totalImages;

//     return (
//       <div className={css.API}>
//         <Searchbar onSubmit={this.handleSubmit} />
//         <ImageGallery cards={cards} onClick={this.handleCardClick} />
//         <ToastContainer />
//         {cards.length > 0 && !hideBtn && <Button onClick={this.onLoadMore} />}
//         {isLoading && <Loader />}

//         {showModal && (
//           <Modal
//             alt={alt}
//             largeImageURL={largeImageURL}
//             onClose={this.onCloseModal}
//           />
//         )}
//       </div>
//     );
//   }
// }
// export default App;
